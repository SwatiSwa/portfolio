/**
 * The career record — one source of truth for /work, /about, the homepage previews, the
 * projects list and PROFILE.md.
 *
 * Transcribed from the LinkedIn profile export. Dates are ISO strings so they sort and
 * format; `end: null` means the role is current, which is deliberately distinct from an
 * empty string that would render as a blank date.
 *
 * Deliberately absent: the mobile number that export contains. This repo is public, so a
 * phone number committed here is scrapable forever. The site offers email and social links
 * instead.
 */

export const profile = {
  name: 'Swati Gupta',
  headline:
    "Technical Lead at EPAM Systems | Engineering Manager | Ex-BYJU'S | Ex-TCS",
  location: 'Bengaluru, Karnataka, India',
  summary:
    'Highly skilled Engineering Manager and Full Stack Developer with 10+ years of ' +
    'experience developing and delivering robust, scalable, and user-friendly web ' +
    'applications. Expertise in MERN stack, PERN stack, and AWS cloud, with a deep ' +
    'understanding of Supply Chain, Digital Finance, and Sales domains. Proven track ' +
    'record of collaborating with cross-functional teams to achieve business objectives ' +
    'and drive results. Passionate about using technology to solve complex business ' +
    'challenges.',
  email: 'swati.gu11@gmail.com',
  languages: ['English', 'Hindi'],
} as const

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/swati-thiru/' },
  { label: 'GitHub', href: 'https://github.com/SwatiSwa' },
  { label: 'Twitter', href: 'https://www.twitter.com/swatigu11' },
] as const

export type Role = {
  title: string
  /** ISO date. Only the month and year are ever shown. */
  start: string
  /** ISO date, or null while the role is ongoing. */
  end: string | null
  location: string
  highlights: string[]
}

export type Company = {
  name: string
  /** Newest first, matching how the profile lists them. */
  roles: Role[]
}

export const companies: Company[] = [
  {
    name: 'EPAM Systems',
    roles: [
      {
        title: 'Technical Lead',
        start: '2023-05-01',
        end: null,
        location: 'Bengaluru, Karnataka, India',
        highlights: ['Working with the Atlassian Jira team as a tech lead.'],
      },
    ],
  },
  {
    name: "BYJU'S",
    roles: [
      {
        title: 'Engineering Manager',
        start: '2021-06-01',
        end: '2022-10-01',
        location: 'Bangalore Urban, Karnataka, India',
        highlights: [
          'Set team strategy, led the team to deliver results consistently and sustainably, grew and developed talented engineers, and cultivated a healthy, results-driven culture.',
          'Set up and managed infrastructure on AWS, including EC2 instances, S3 buckets, IAM and VPC.',
          'Used product thinking to participate in product planning, OKRs and roadmap development.',
          'Led cross-functional teams to deliver products within tight timelines.',
          'Collaborated with cross-functional stakeholders including product, business leaders, sales, marketing and customers.',
        ],
      },
      {
        title: 'Senior Tech Lead',
        start: '2019-10-01',
        end: '2021-06-01',
        location: 'Bangalore Urban, Karnataka, India',
        highlights: [
          'Designed, developed and maintained full-stack web applications using the MERN and PERN stacks.',
          'Collaborated with cross-functional teams to design and implement cloud-based solutions on AWS.',
          'Led and mentored junior developers to ensure adherence to coding standards, best practices and project management.',
        ],
      },
      {
        title: 'Tech Lead',
        start: '2018-10-01',
        end: '2019-09-01',
        location: 'Bangalore Urban, Karnataka, India',
        highlights: [],
      },
      {
        title: 'Full-stack Developer',
        start: '2018-03-01',
        end: '2018-10-01',
        location: 'Bangalore, Karnataka, India',
        highlights: [
          'Built user management, order management and payment management systems on the MERN stack, managed through AWS.',
          'Integrated payment providers including Paytm, PayU, Bajaj, Pine Labs, Kotak, ICICI, Zest, Avanse, IIFL and RBL, alongside PAN India APIs, CIBIL APIs through TransUnion CIBIL, and penny drop for validating customer bank accounts.',
        ],
      },
    ],
  },
  {
    name: 'US Tech Solutions',
    roles: [
      {
        title: 'Full Stack Developer',
        start: '2017-10-01',
        end: '2018-03-01',
        location: 'Bengaluru, Karnataka, India',
        highlights: [
          'Developed a browser extension to test the accessibility of a web application using HTML, CSS and native JavaScript APIs.',
          'Built an Angular 2 + Node.js + MySQL dashboard to represent accessibility results.',
          'Wrote unit test cases with Jasmine and Mocha, and smoke tests for the extension using Selenium JS and Mocha.',
        ],
      },
    ],
  },
  {
    name: 'Tata Consultancy Services',
    roles: [
      {
        title: 'Web Developer',
        start: '2017-02-01',
        end: '2017-09-01',
        location: 'Bengaluru Area, India',
        highlights: [
          'Worked on media analytics (audio and video) for a Nielsen client.',
          'Developed JavaScript APIs integrated into audio and video players to track crediting as content played.',
          'Developed sender and receiver applications for Chromecast.',
        ],
      },
      {
        title: 'Web Developer',
        start: '2014-09-01',
        end: '2017-01-01',
        location: 'Chennai Area, India',
        highlights: [
          'Proposed and drove migrating a TIBCO GI-based application to Sencha ExtJS, built from scratch.',
          'Collaborated with Sencha engineers on the base layout and UI components, and with Nielsen architects on packaging structure, event handling and module decoupling.',
          'Built reusable Grid, QueryBuilder, Enumeration and Form components.',
          'Automated the ExtJS build process for non-production and production environments.',
          'Mentored new associates on JavaScript, ExtJS and writing better code.',
        ],
      },
    ],
  },
]

export type Education = {
  school: string
  credential: string
  period: string
}

export const education: Education[] = [
  {
    school: 'VTU, Reva Institute of Technology and Management',
    credential: 'Bachelor of Engineering (B.E.), Information Science',
    period: '2010 – 2014',
  },
  {
    school: 'Free Code Camp',
    credential:
      'Full Stack Web Development Certification, Computer Software Engineering',
    period: '2017',
  },
]

export const certifications: string[] = [
  'Advanced Agile: The Team’s Mindset',
  'Engineering Management Interview Course',
  'Leadership: Effective One-on-One',
  'Leadership: Practical Leadership Skills',
  'OCJP',
]

export const awards: string[] = ['Best Team Award']

export type SkillGroup = {
  group: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    group: 'Engineering',
    items: [
      'MERN stack',
      'PERN stack',
      'Express.js',
      'Node.js',
      'Angular',
      'AWS — EC2, S3, IAM, VPC',
      'MySQL',
    ],
  },
  {
    group: 'Leadership',
    items: [
      'People Management',
      'Stakeholder Management',
      'Mentoring',
      'OKRs & Roadmapping',
    ],
  },
  {
    group: 'Domains',
    items: ['Supply Chain', 'Digital Finance', 'Sales'],
  },
]

export type Project = {
  title: string
  description: string
  date: string
  href: string
}

export const projects: Project[] = [
  {
    title: 'Formzillion',
    description:
      'Streamline your form creation and management. Effortlessly design, distribute, and collect data with our user-friendly platform.',
    date: '2023-01-01',
    href: 'https://github.com/formzillion/formzillion.com',
  },
  {
    title: 'Order Assist',
    description:
      'Simplify and optimize order management processes, providing efficiency, convenience, and a seamless customer experience.',
    date: '2023-01-01',
    href: 'https://github.com/thirunavukkarasu/order-assist-app',
  },
  {
    title: 'Bottle Canvas',
    description:
      'Embark on a mesmerizing artistic journey, transforming ordinary bottles into extraordinary masterpieces through captivating painting techniques.',
    date: '2023-01-01',
    href: 'https://github.com/swatiswa/bottle-canvas',
  },
]

export type Testimonial = {
  quote: string
  name: string
  title: string
}

/**
 * Empty on purpose, and the section that renders it stays hidden while it is.
 *
 * LinkedIn's PDF export omits recommendations, so the only text available second-hand is a
 * paraphrase from a scrape that got the employer history wrong. A paraphrase is not a
 * quotation, and printing one under a named colleague's name would put words in their
 * mouth. This fills in only with the real text.
 */
export const testimonials: Testimonial[] = []
