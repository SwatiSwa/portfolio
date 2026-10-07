/**
 * Generates the hero portrait set: public/hero/*.png -> public/images/hero/*.webp
 *
 * The five sources are one photograph with only the gaze repainted, so they must stay
 * pixel-registered: any frame-to-frame drift would crossfade as ghosting across the whole
 * image rather than just the eyes. `report()` measures that before a single file is written,
 * which is why the check lives here rather than in a throwaway script — re-running the
 * conversion after regenerating the art should always re-verify the assumption it depends on.
 *
 * Run: node scripts/optimize-hero-images.mjs
 */
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'public/hero')
const OUT = path.join(ROOT, 'public/images/hero')

const DIRECTIONS = ['center', 'left', 'right', 'up', 'down']

/**
 * Two widths cover the portrait's display range: ~640 for a phone at 1x, ~1200 for a
 * desktop/retina slot. The 1254px sources are never upscaled past their own size.
 */
const WIDTHS = [1200, 640]
const QUALITY = 80

/**
 * The portrait slot is 4:5. Cropping here rather than leaving it to CSS `object-cover`
 * keeps the unseen side pixels out of the payload. Change this and the layout must follow.
 */
const ASPECT = 5 / 4

/** Per-channel delta above which a pixel counts as "different", to ignore codec noise. */
const DIFF_THRESHOLD = 10

const srcPath = (dir) => path.join(SRC, `swati-${dir}.png`)
const outPath = (dir, w) => path.join(OUT, `swati-${dir}-${w}.webp`)

async function raw(file) {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  return { ...info, data }
}

/**
 * Compares every variant against `center` and reports where they disagree. A gaze-only
 * difference confines the changed pixels to a small box around the eyes; anything spread
 * across the frame means the images are misaligned and will ghost when crossfaded.
 */
async function report() {
  const base = await raw(srcPath('center'))
  const total = base.width * base.height

  console.log(`\nAlignment check (vs center, ${base.width}x${base.height})`)
  console.log('  variant   changed px     of image   changed region')
  console.log('  ────────  ────────────   ────────   ────────────────────')

  for (const dir of DIRECTIONS) {
    if (dir === 'center') continue

    const cmp = await raw(srcPath(dir))
    if (cmp.width !== base.width || cmp.height !== base.height) {
      console.log(
        `  ${dir.padEnd(8)}  SIZE MISMATCH (${cmp.width}x${cmp.height})`
      )
      continue
    }

    let count = 0
    let minX = Infinity
    let minY = Infinity
    let maxX = -1
    let maxY = -1

    for (let i = 0; i < base.data.length; i += base.channels) {
      if (
        Math.abs(base.data[i] - cmp.data[i]) <= DIFF_THRESHOLD &&
        Math.abs(base.data[i + 1] - cmp.data[i + 1]) <= DIFF_THRESHOLD &&
        Math.abs(base.data[i + 2] - cmp.data[i + 2]) <= DIFF_THRESHOLD
      ) {
        continue
      }

      count++
      const p = i / base.channels
      const px = p % base.width
      const py = Math.floor(p / base.width)
      if (px < minX) minX = px
      if (px > maxX) maxX = px
      if (py < minY) minY = py
      if (py > maxY) maxY = py
    }

    const pct = ((count / total) * 100).toFixed(2)
    const box =
      count === 0 ? 'identical' : `x ${minX}-${maxX}, y ${minY}-${maxY}`
    console.log(
      `  ${dir.padEnd(8)}  ${String(count).padStart(10)}   ${pct.padStart(
        6
      )}%   ${box}`
    )
  }
  console.log()
}

async function convert() {
  await mkdir(OUT, { recursive: true })

  for (const dir of DIRECTIONS) {
    for (const w of WIDTHS) {
      const dest = outPath(dir, w)
      await sharp(srcPath(dir))
        .resize({
          width: w,
          height: Math.round(w * ASPECT),
          fit: 'cover',
          position: 'centre',
        })
        .webp({ quality: QUALITY })
        .toFile(dest)

      const bytes = (await stat(dest)).size
      console.log(
        `  ${path.relative(ROOT, dest).padEnd(46)} ${(bytes / 1024).toFixed(
          1
        )} KB`
      )
    }
  }
}

await report()
console.log('Converting:')
await convert()
console.log('\nDone.')
