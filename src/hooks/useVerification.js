import { useState } from 'react'
import {
  validatePAN,
  validateAadhaar,
} from '../utils/validators'

function useVerification() {
  const [
    isVerifying,
    setIsVerifying,
  ] = useState(false)

  const [
    isVerified,
    setIsVerified,
  ] = useState(false)

  const [error, setError] =
    useState('')

  const verify = async (
    value,
    type
  ) => {
    setError('')
    setIsVerified(false)

    const validation =
      type === 'pan'
        ? validatePAN(value)
        : validateAadhaar(value)

    if (
      !validation.isValid
    ) {
      setError(
        validation.error
      )

      return false
    }

    setIsVerifying(true)

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          1500
        )
    )

    setIsVerifying(false)
    setIsVerified(true)

    return true
  }

  return {
    verify,
    isVerifying,
    isVerified,
    error,
  }
}

export default useVerification