import { Barlow } from 'next/font/google'
import './styles/globals.scss'
import Head from 'next/head'

const barlow = Barlow({ subsets: ['latin'], weight: ['400'], })

export const metadata = {
  title: 'Home - Recipebox',
  description: 'Application web basé sur des recettes de cuisines',
  image: '/logo.svg'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href={metadata.image} />
        <meta property="og:image" content={metadata.image} />
      </head>
      <body className={barlow.className}>{children}</body>
    </html>
  )
}