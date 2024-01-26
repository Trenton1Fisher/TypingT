'use client'

import Image from 'next/image'
import { useState } from 'react'
import { handleNumericSetting } from '@/utils/toggleSettings'
import Option from './option'
import type { MobileSettingsProps } from '@/types/settingsTypes'

export default function MobileSettings({
  options,
  setOptions,
}: MobileSettingsProps) {
  const [openSetting, setOpenSettings] = useState(false)
  return (
    <>
      <div
        className="flex justify-center items-center"
        onClick={() => setOpenSettings(true)}
      >
        <Image
          src={'/settings.png'}
          height={15}
          width={15}
          alt="Typing Test Settings"
        />
        <p className="text-white text-sm ml-1">Test Settings</p>
      </div>
      {openSetting && (
        <div
          className="z-[999] fixed inset-0 flex items-center justify-center text-lg p-8 backdrop-filter backdrop-blur-md"
          onClick={() => setOpenSettings(false)}
        >
          <div
            className="bg-[#4F4F4F] relative p-6 rounded-md w-[410px] h-full min-h-[410px]"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setOpenSettings(false)}
            >
              x
            </button>
            <div className="my-2">
              <Option
                label="Punctuation"
                value={'puncuation'}
                icon="at"
                options={options}
                setOptions={setOptions}
              />
              <Option
                label="Numbers"
                value={'numbers'}
                icon="hashtag"
                options={options}
                setOptions={setOptions}
              />
            </div>
            <div className="my-4 text-lg">
              <Option
                label="Time"
                value={'time'}
                icon="time"
                options={options}
                setOptions={setOptions}
              />
              <Option
                label="Words"
                value={'words'}
                icon="aa"
                options={options}
                setOptions={setOptions}
              />
            </div>
            <ul className="my-4">
              {['15', '30', '60', '120'].map(duration => (
                <li
                  key={duration}
                  className={`text-lg cursor-pointer ml-2 rounded-md p-1 ${
                    options['count'] === parseInt(duration)
                      ? 'bg-[#3c3c3c]'
                      : ''
                  }`}
                  onClick={() =>
                    handleNumericSetting({
                      value: parseInt(duration),
                      setOptions,
                    })
                  }
                >
                  {duration}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
