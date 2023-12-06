import { Barlow } from 'next/font/google'
import '../../styles/globals.scss'

const barlow = Barlow({ subsets: ['latin'],  weight: ['400'], })

export const metadata = {
  title: 'Categories - Pork - Recipebox',
  description: 'Application web basé sur des recettes de cuisines',
}

export default function RootLayout({ children }) {
  return (
    <div className={barlow.className}>{children}</div>
  )
}