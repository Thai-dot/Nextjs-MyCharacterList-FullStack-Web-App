import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to My Character List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Welcome to My Character List
        </h1>
        <p>
          Explore your character list with modifications
        </p>
        <ul>
          <li><Link href="/character">Link</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
        
      </main>
    </>
  )
}
