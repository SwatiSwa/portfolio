import { formatDate } from '@/lib/utils'
import { ArrowIcon } from '@/ui/icons'
import Link from 'next/link'
import React from 'react'

const projects = [
  {
    _id: 1,
    title: 'Formzillion',
    description:
      'Streamline your form creation and management. Effortlessly design, distribute, and collect data with our user-friendly platform  ',
    date: '2023-01-01',
    slug: 'formzillion',
    href: 'https://github.com/formzillion/formzillion.com',
  },
  {
    _id: 2,
    title: 'Order Assist',
    description:
      'Simplify and optimize order management processes, providing efficiency, convenience, and a seamless customer experience.',
    date: '2023-01-01',
    slug: 'order-assist',
    href: 'https://github.com/thirunavukkarasu/order-assist-app',
  },
  {
    _id: 3,
    title: 'Bottle Canvas',
    description:
      'Embark on a mesmerizing artistic journey, transforming ordinary bottles into extraordinary masterpieces through captivating painting techniques.',
    date: '2023-01-01',
    href: 'https://github.com/swatiswa/bottle-canvas',
  },
]

export default function Projects() {
  return (
    <section className="my-10">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="text-gray-600">
        Creations between playtime with my small one.
      </p>
      <div className="mt-5">
        <div className="grid gap-10 sm:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project._id}
              className="group relative flex flex-col space-y-2 border border-gray-300 p-4"
            >
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-extrabold">{project.title}</h2>
                <ArrowIcon />
              </div>
              {project.description && (
                <p className="text-muted-foreground">{project.description}</p>
              )}
              {project.date && (
                <p className="text-muted-foreground text-sm">
                  {formatDate(project.date)}
                </p>
              )}
              <Link
                href={project.href}
                target="_blank"
                className="absolute inset-0"
              >
                <span className="sr-only">View Project</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
