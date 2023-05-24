import Image from 'next/image'
import portraitImage from '../../public/avatars/portrait.jpg'

export default function About() {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
            I’m Swati Gupta. I live in Bengaluru City, where I develop the
            future.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              {`Greetings, I'm Swati Gupta, a triple threat in the tech world.
                I'm a skilled developer, experienced engineering manager, and
                mom. With 8 years of experience under my
                belt, I've learned to master the art of multitasking and still
                produce top-notch results.`}
            </p>
            <p>
              {`I'm a coding ninja with a passion for making the impossible,
                possible. I excel in MERN & PERN Stack and I'm always up for a
                challenge, the tougher the better. My work is quick, efficient,
                and always delivered with a chuckle (because laughter is the
                best medicine, even for tight deadlines).`}
            </p>
            <p>
              {`As an engineering manager, I'm the captain of the ship, steering
                projects to success and guiding my team to greatness. I'm a
                gifted communicator and a problem-solving wizard, and I have the
                ability to break down complex issues into manageable tasks.`}
            </p>
            <p>
              {`As a working mom, I'm a pro at juggling a million balls at once.
                I've honed my time-management skills to perfection and I know
                how to prioritize my responsibilities to make sure both work and
                family receive the attention they deserve. I bring the same
                level of dedication and discipline to my professional life, and
                I'm always eager for a new adventure.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
