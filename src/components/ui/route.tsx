import Link from 'next/link'
import Image from 'next/image'
import { Route } from 'next'
import { Dispatch, SetStateAction } from 'react'

type RouteProps = {
  label: string
  route: string
  imagePath: string
  alt: string
  setOpenMobileMenu: Dispatch<SetStateAction<boolean>>
}

export default function Route(props: RouteProps) {
  return (
    <Link
      href={props.route}
      className="flex"
      onClick={() => props.setOpenMobileMenu(false)}
    >
      <Image src={props.imagePath} height={25} width={25} alt={props.alt} />
      <h3 className="font-semibold text-white ml-3">{props.label}</h3>
    </Link>
  )
}
