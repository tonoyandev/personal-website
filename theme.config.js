/** *************************************************************
 * Please refer to the Theme Options section in documentation   *
 ****************************************************************/

/**
 * Icons from react-icons: https://react-icons.github.io/react-icons
 */


import { IoLogoLinkedin } from 'react-icons/io5'
import { SiTelegram, SiUpwork } from 'react-icons/si'
import { TfiHome, TfiPencilAlt } from 'react-icons/tfi'
import { SlUser, SlBriefcase, SlEnvolope, SlTrophy } from 'react-icons/sl'

/**
 * Main Menu Items
 */

export const menu = [
  {
    name: 'Home',
    slug: '/',
    Icon: TfiHome,
  },
  {
    name: 'About',
    slug: '/about',
    Icon: SlUser,
  },
  {
    name: 'Services',
    slug: '/services',
    Icon: SlBriefcase,
  },
  {
    name: 'Articles',
    slug: '/blog',
    Icon: TfiPencilAlt,
  },
  {
    name: 'Reviews',
    slug: '/reviews',
    Icon: SlTrophy,
  },
  {
    name: 'Contact',
    slug: '/contact',
    Icon: SlEnvolope,
  },
]

/**
 * Social Links under the Main Menu
 */

export const social = [
  {
    name: 'Telegram',
    url: 'https://www.t.me/tonoyandev',
    Icon: SiTelegram,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tonoyandev/',
    Icon: IoLogoLinkedin,
  },
  {
    name: 'Upwork',
    url: 'https://www.upwork.com/freelancers/tonoyandev',
    Icon: SiUpwork,
  }
]

/**
 * General configurations
 */

export const config = {
  dateLocale: 'en-US',
  dateOptions: {
    // dateOptions is passed to JavaScript's toLocaleDateString()
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  },
  convertKit: {
    tipUrl: 'https://fantastic-mover-3439.ck.page/products/blog',
  },
  contactForm: {
    inputs: require('./content/contact-form.json'),
    recipient: 'tonoyandeveloper@gmail.com',
    sender: 'hi@tonoyan.dev',
    subject: 'Email from Tonoyan.Dev contact form',
  },
}

/**
 * MDX/Markdown configurations
 */

export const mdxConfig = {
  publicDir: 'public',
  pagesDir: 'content',
  fileExt: '.md',
  collections: ['/blog', '/projects'],
  remarkPlugins: [],
  rehypePlugins: [],
}

/**
 * Global SEO configuration for next-seo plugin
 * https://github.com/garmeeh/next-seo
 */

export const siteMetaData = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000',
  authorName: 'Ararat Tonoyan',
  siteName: 'Ararat Tonoyan',
  defaultTitle: 'Ararat Tonoyan: Blockchain Consultant & Web3 Expert',
  titleTemplate: 'Ararat Tonoyan | %s',
  description: 'Ararat Tonoyan: Top-rated blockchain consultant, Web3 and Ethereum expert. Providing cutting-edge blockchain development, consultancy, and audit services with a proven track record. Solving complex problems with innovative blockchain solutions.',
  email: 'hi@tonoyan.dev',
  locale: 'en_US',
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
}
