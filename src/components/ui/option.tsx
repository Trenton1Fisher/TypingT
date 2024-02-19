'use client'

import Image from 'next/image'
import { handleStringSetting } from '@/utils/toggleSettings'
import type { OptionProps } from '@/types/settingsTypes'

export default function Option({
  label,
  value,
  icon,
  options,
  setOptions,
  gameActive,
}: OptionProps) {
  return (
    <div
      className={`flex items-center cursor-pointer ml-2 p-1 rounded-md ${
        options[value] ? 'bg-[#3c3c3c]' : ''
      }`}
      onClick={
        gameActive
          ? undefined
          : () =>
              handleStringSetting({
                optionName: value,
                options: options,
                setOptions: setOptions,
              })
      }
    >
      <Image src={`/${icon}.png`} alt={label} width={15} height={15} />
      <p className=" ml-1">{label}</p>
    </div>
  )
}
