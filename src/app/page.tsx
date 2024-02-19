'use client'

import TypingSetting from '@/components/views/TypingSetting'
import TypingArea from '@/components/views/TypingArea'
import type { TestSettings } from '@/types/settingsTypes'
import { useState } from 'react'

export default function Home() {
  const [gameActive, setGameActive] = useState(false)
  const [options, setOptions] = useState<TestSettings>({
    punctuation: false,
    numbers: false,
    time: true,
    words: false,
    count: 60,
  })

  return (
    <main>
      <TypingSetting
        options={options}
        setOptions={setOptions}
        gameActive={gameActive}
      />
      <TypingArea
        options={options}
        gameActive={gameActive}
        setGameActive={setGameActive}
      />
    </main>
  )
}
