'use client'

import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './MobileMenue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import type { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser: User | null) => {
      setUser(newUser)
    })

    return () => unsubscribe()
  }, [])

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      })
  }

  return (
    <nav className="flex items-center max-w-screen-lg mx-auto p-3">
      <Link href={'/'} className="flex">
        <Image
          src={'/icons8-keyboard.png'}
          height={40}
          width={50}
          alt="Keyboard"
        />
        <h1 className="text-white font-extrabold text-3xl ml-3 pt-2">
          TypingT
        </h1>
      </Link>
      <div className="ml-auto flex max-md:hidden">
        <Link href={'/'} className="mr-4">
          <Image
            src={'/keyboard.png'}
            height={25}
            width={25}
            alt="First Image"
          />
        </Link>
        {user ? (
          <>
            <Link href={'/account'} className="ml-4 flex">
              <Image
                src={'/user.png'}
                height={25}
                width={25}
                alt="View Account"
              />
              <h3 className="font-semibold text-sm mt-1 ml-1 text-white">
                {user.displayName}
              </h3>
            </Link>
            <div className="ml-6 cursor-pointer" onClick={handleSignOut}>
              <Image src={'/logout.png'} height={25} width={25} alt="Logout" />
            </div>
          </>
        ) : (
          <Link href={'/login'} className="ml-4">
            <Image
              src={'/user.png'}
              height={25}
              width={25}
              alt="Second Image"
            />
          </Link>
        )}
      </div>
      <MobileMenu user={user} />
    </nav>
  )
}
