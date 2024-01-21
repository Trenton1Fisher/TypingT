'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { CgMenuGridO, CgClose } from 'react-icons/cg'
import { navLinks, authLinks } from '@/constants'
import Route from '../ui/route'
import { signOut, type User } from 'firebase/auth'
import { auth } from '@/config/firebase'
import React from 'react'

type MobileMenuProps = {
  user: User | null
}

export default function MobileMenu(props: MobileMenuProps) {
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  function mobileMenuHandler() {
    setOpenMobileMenu(!openMobileMenu)
  }

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
    <>
      <div
        className="md:hidden ml-auto cursor-pointer"
        onClick={mobileMenuHandler}
      >
        {openMobileMenu ? (
          <CgClose color="white" size={30} />
        ) : (
          <CgMenuGridO color="white" size={30} />
        )}
      </div>

      {openMobileMenu ? (
        <div
          onClick={() => setOpenMobileMenu(false)}
          className=" fixed w-full h-screen top-0 left-0 bg-black/25 z-50"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="absolute h-screen left-0 top-0 w-60 bg-[#4F4F4F] z-[999] px-5 border-r overflow-y-hidden flex flex-col gap-10"
          >
            <div className="border-b py-5 text-center">
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
            </div>
            {props.user
              ? authLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <Route
                      route={link.route}
                      label={
                        index === 1 ? `${props!.user!.displayName}` : link.label
                      }
                      imagePath={link.imagePath}
                      alt={link.alt}
                      setOpenMobileMenu={setOpenMobileMenu}
                    />
                    {index === authLinks.length - 1 && (
                      <div
                        className="cursor-pointer flex"
                        onClick={handleSignOut}
                      >
                        <Image
                          src={'/logout.png'}
                          height={25}
                          width={25}
                          alt="Logout"
                        />
                        <h3 className="font-semibold text-white ml-3">
                          Logout
                        </h3>
                      </div>
                    )}
                  </React.Fragment>
                ))
              : navLinks.map((link, index) => (
                  <Route
                    route={link.route}
                    label={link.label}
                    imagePath={link.imagePath}
                    alt={link.alt}
                    setOpenMobileMenu={setOpenMobileMenu}
                    key={index}
                  />
                ))}
          </div>
        </div>
      ) : null}
    </>
  )
}
