export function formValidation(
  email: string,
  password: string,
  username?: string
): { isValid: boolean; message?: string } {
  if (!email || !password) {
    return { isValid: false, message: 'Please Fill Out All Options' }
  }

  if (password.length < 8 || password.length > 16) {
    return {
      isValid: false,
      message: 'Password Must be between 8-16 characters',
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Email is Not Formatted Correctly' }
  }

  if (username && (username.length < 3 || username.length > 20)) {
    return {
      isValid: false,
      message: 'Username Must be between 3-20 characters',
    }
  }

  return { isValid: true }
}
