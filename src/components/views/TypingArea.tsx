'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import testSentences from '@/constants/tests'
import useKeyPress from '@/hooks/useKeyPress'
import '../../styles/typingArea.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import type { TestSettings } from '@/types/settingsTypes'

interface AreaProps {
  options: TestSettings
  gameActive: boolean
  setGameActive: Dispatch<SetStateAction<boolean>>
}

export default function TypingArea({
  options,
  gameActive,
  setGameActive,
}: AreaProps) {
  const [leftPadding, setLeftPadding] = useState(
    new Array(40).fill(' ').join('')
  )
  const [outgoingChars, setOutgoingChars] = useState('')
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [totalErrors, setTotalErrors] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [charError, setCharError] = useState(false)
  const [errorKeys, setErrorKeys] = useState('')
  const [currentChar, setCurrentChar] = useState(
    testSentences.lowerCaseOnly.charAt(0)
  )
  const [incomingChars, setIncomingChars] = useState(
    testSentences.lowerCaseOnly.substring(1)
  )
  const accuracy =
    totalCharacters > 0
      ? Math.round(((totalCharacters - totalErrors) / totalCharacters) * 100)
      : 100

  useKeyPress((key: string) => {
    let updatedOutgoingChars = outgoingChars
    let updatedIncomingChars = incomingChars

    if (!charError) {
      if (key === currentChar) {
        if (!gameActive) {
          setGameActive(true)
        }
        setTotalCharacters(prev => prev + 1)
        if (leftPadding.length > 0) {
          setLeftPadding(leftPadding.substring(1))
        }
        if (key === ' ') {
          setWpm(prev => prev + 1)
        }
        updatedOutgoingChars += currentChar
        setOutgoingChars(updatedOutgoingChars)
        setCurrentChar(incomingChars.charAt(0))
        updatedIncomingChars = incomingChars.substring(1)
        setIncomingChars(updatedIncomingChars)
      } else {
        if (key !== 'Backspace' && key !== ' ' && gameActive) {
          setCharError(true)
          setErrorKeys(prev => prev + key)
        }
      }
    } else {
      if (key === 'Backspace') {
        if (errorKeys.length > 0) {
          setErrorKeys(errorKeys.slice(0, -1))
        } else {
          setErrorKeys('')
          setCharError(false)
        }
      } else {
        if (key !== ' ' && gameActive) {
          setErrorKeys(prev => prev + key)
          setTotalErrors(prev => prev + 1)
        }
      }
    }
  })

  function handleTestFinish() {}

  return (
    <div className="flex flex-col items-center md:text-3xl mt-12">
      <div className="text-center mb-4 flex items-center space-x-8">
        <div className="w-1/3">
          <CountdownCircleTimer
            isPlaying={gameActive}
            size={90}
            strokeWidth={3}
            duration={options.count as number}
            colors={['#6FF6FF', '#6FF6FF', '#6FF6FF', '#6FF6FF']}
            trailColor="#00000000"
            colorsTime={[7, 5, 2, 0]}
            onComplete={handleTestFinish}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
        <div className="w-1/3">
          <p className="font-bold">WPM</p>
          <p className="text-xl">{wpm}</p>
        </div>
        <div className="w-1/3">
          <p className="font-bold">Accuracy</p>
          <p className="text-xl">{accuracy}%</p>
        </div>
      </div>
      <div className="typing-area">
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-30)}
          </span>
          <span className="text-red-500">{errorKeys}</span>
          <span
            className={`rounded-lg ${gameActive ? 'cursor' : 'cursor-blink'} ${
              charError ? 'error' : ''
            }`}
          ></span>
          <span>{currentChar}</span>
          <span>{incomingChars.substring(0, 30)}</span>
        </p>
      </div>
    </div>
  )
}
