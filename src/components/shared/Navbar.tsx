'use client'

import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './MobileMenue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import type { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'

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
      <Tooltip
        placement="bottom"
        content="Leaderboard"
        classNames={{
          base: [
            "before:bg-neutral-400",
            "bg-[#4F4F4F] rounded-full",
          ],
          content: [
            "p-2 text-xs",
            " rounded-lg text-white",
          ],
        }}
      >
        <Link href={'/leaderboard'}>
          <Image className='ml-4' src={'/crown.png'} height={25} width={25} alt='Leaderboard' />
        </Link>
      </Tooltip>
      <div className="ml-auto flex max-md:hidden">
        <Tooltip
          placement="bottom"
          content="Typing Test"
          classNames={{
            base: [
              "before:bg-neutral-400",
              "bg-[#4F4F4F] rounded-full",
            ],
            content: [
              "p-2 text-xs",
              " rounded-lg text-white",
            ],
          }}
        >
          <Link href={'/'} className="mr-4">
            <Image
              src={'/keyboard.png'}
              height={25}
              width={25}
              alt="First Image"
            />
          </Link>
        </Tooltip>
        {user ? (
          <>
            <Tooltip
              placement="bottom"
              content="Account"
              classNames={{
                base: [
                  "before:bg-neutral-400",
                  "bg-[#4F4F4F] rounded-full",
                ],
                content: [
                  "p-2 text-xs",
                  " rounded-lg text-white",
                ],
              }}
            >
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
            </Tooltip>
            <Tooltip
              placement="bottom"
              content="Sign Out"
              classNames={{
                base: [
                  "before:bg-neutral-400",
                  "bg-[#4F4F4F] rounded-full",
                ],
                content: [
                  "p-2 text-xs",
                  " rounded-lg text-white",
                ],
              }}
            >
              <div className="ml-6 cursor-pointer" onClick={handleSignOut}>
                <Image src={'/logout.png'} height={25} width={25} alt="Logout" />
              </div>
            </Tooltip>
          </>
        ) : (
          <Tooltip
            placement="bottom"
            content="Sign In"
            classNames={{
              base: [
                "before:bg-neutral-400",
                "bg-[#4F4F4F] rounded-full",
              ],
              content: [
                "p-2 text-xs",
                " rounded-lg text-white",
              ],
            }}
          >
            <Link href={'/login'} className="ml-4">
              <Image
                src={'/user.png'}
                height={25}
                width={25}
                alt="Second Image"
              />
            </Link>
          </Tooltip>
        )}
      </div>
      <MobileMenu user={user} />
    </nav>
  )
}
