'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { formValidation } from '@/utils/formValidations'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [authError, setAuthError] = useState(false)
  const [authErrorMessage, setAuthErrorMessage] = useState('')
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
  })

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormInfo(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    const passed = formValidation(formInfo.email, formInfo.password)
    if (!passed.isValid && passed.message) {
      setAuthError(true)
      setAuthErrorMessage(passed.message)
      return
    }

    signInWithEmailAndPassword(auth, formInfo.email, formInfo.password)
      .then(userCredential => {
        const user = userCredential.user
        if (user) {
          router.push('/')
        }
      })
      .catch(error => {
        setAuthErrorMessage(error.message)
      })
  }

  return (
    <div className="flex  items-center justify-center mt-32">
      <div className="w-full max-w-[400px] p-8 bg-[#4F4F4F] rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">
          Sign In
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              id="email"
              placeholder="Email"
              type="email"
              name="email"
              onChange={e => handleFormChange(e)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              onChange={e => handleFormChange(e)}
            />
          </div>
          <div className="flex items-center justify-between">
            <a className="text-sm text-[#A1A1A1] hover:text-gray-200" href="#">
              Forgot Password?
            </a>
          </div>
          {authError && (
            <div
              className="bg-red-600 w-full rounded-lg text-sm font-semibold mt-2"
              key={4}
            >
              <p className="text-white p-2 text-center">{authErrorMessage}</p>
            </div>
          )}
          <div className="flex justify-center">
            <button className="bg-[#A9A9A9] text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 w-1/2 hover:bg-gray-400">
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-white">Dont Have An Account? </p>
          <Link className="font-medium text-[#6FF6FF] text-sm" href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
