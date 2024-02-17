'use client'

import { useState } from 'react'
import testSentences from '@/constants/tests'
import useKeyPress from '@/hooks/useKeyPress'
import { error } from 'console'

export default function TypingArea() {
  const [leftPadding, setLeftPadding] = useState(
    new Array(40).fill(' ').join('')
  )
  const [outgoingChars, setOutgoingChars] = useState('')
  const [charError, setCharError] = useState(false)
  const [errorKeys, setErrorKeys] = useState('')
  const [currentChar, setCurrentChar] = useState(
    testSentences.lowerCaseOnly.charAt(0)
  )
  const [incomingChars, setIncomingChars] = useState(
    testSentences.lowerCaseOnly.substring(1)
  )

  useKeyPress((key: string) => {
    let updatedOutgoingChars = outgoingChars
    let updatedIncomingChars = incomingChars

    if (!charError) {
      if (key === currentChar) {
        setCharError(false)
        if (leftPadding.length > 0) {
          setLeftPadding(leftPadding.substring(1))
        }
        updatedOutgoingChars += currentChar
        setOutgoingChars(updatedOutgoingChars)
        setCurrentChar(incomingChars.charAt(0))
        updatedIncomingChars = incomingChars.substring(1)
        setIncomingChars(updatedIncomingChars)
      } else {
        if (key !== 'Backspace') {
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
        setErrorKeys(prev => prev + key)
      }
    }
  })
  return (
    <div className="flex justify-center items-center text-3xl font-mono">
      <p className="Character">
        <span className="Character-out">
          {(leftPadding + outgoingChars).slice(-30)}
        </span>
        <span className="text-white">{errorKeys}</span>
        <span
          className={`w-[10px] ${charError ? 'bg-red-200' : 'bg-gray-500'}`}
        >
          {currentChar}
        </span>
        <span>{incomingChars.substring(0, 30)}</span>
      </p>
    </div>
  )
}
