'use client'

import MobileSettings from '../ui/mobileSettings'
import Option from '../ui/option'
import { Dispatch, SetStateAction } from 'react'
import type { TestSettings } from '@/types/settingsTypes'
import { handleNumericSetting } from '@/utils/toggleSettings'

interface SettingProps {
  options: TestSettings
  setOptions: Dispatch<SetStateAction<TestSettings>>
  gameActive: boolean
}

export default function TypingSetting({
  options,
  setOptions,
  gameActive,
}: SettingProps) {
  return (
    <section className="mx-auto w-[150px] md:w-[600px] lg:w-[600px] mt-12">
      <div className="flex bg-[#4F4F4F] p-2 rounded-lg text-white justify-between">
        <div className="flex max-md:hidden mx-auto text-sm">
          <div className="flex">
            <Option
              label="Punctuation"
              value={'puncuation'}
              icon="at"
              options={options}
              setOptions={setOptions}
              gameActive={gameActive}
            />
            <Option
              label="Numbers"
              value={'numbers'}
              icon="hashtag"
              options={options}
              setOptions={setOptions}
              gameActive={gameActive}
            />
          </div>
          <div className="h-[30px] w-[5px] rounded-xl bg-white mx-5"></div>
          <div className="flex">
            <Option
              label="Time"
              value={'time'}
              icon="time"
              options={options}
              setOptions={setOptions}
              gameActive={gameActive}
            />
            <Option
              label="Words"
              value={'words'}
              icon="aa"
              options={options}
              setOptions={setOptions}
              gameActive={gameActive}
            />
          </div>
          <div className="h-[30px] w-[5px] rounded-xl bg-white mx-5"></div>
          <ul className="flex items-center">
            {['15', '30', '60', '120'].map(duration => (
              <li
                key={duration}
                className={`text-sm cursor-pointer ml-2 rounded-md p-1 ${
                  options['count'] === parseInt(duration) ? 'bg-[#3c3c3c]' : ''
                }`}
                onClick={
                  gameActive
                    ? undefined
                    : () =>
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
        <div className="md:hidden flex justify-center items-center mx-auto text-center">
          <MobileSettings options={options} setOptions={setOptions} />
        </div>
      </div>
    </section>
  )
}
