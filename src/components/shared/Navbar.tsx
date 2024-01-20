import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './MobileMenue'

export default function Navbar() {
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
        <Link href={'/login'} className="ml-4">
          <Image src={'/user.png'} height={25} width={25} alt="Second Image" />
        </Link>
      </div>
      <MobileMenu />
    </nav>
  )
}
