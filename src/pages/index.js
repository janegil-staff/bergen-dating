
import { Inter } from '@next/font/google'
import LandingPage from '@/components/home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <LandingPage />
  )
}
