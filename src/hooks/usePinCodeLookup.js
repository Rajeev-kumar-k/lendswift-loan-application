import { useState } from 'react'
import pinCodeData from '../utils/pinCodeData.json'

function usePinCodeLookup() {
  const [result, setResult] =
    useState({
      city: '',
      state: '',
      postOffice: '',
      isLoading: false,
      error: '',
    })

  const lookupPinCode = async (
    pinCode
  ) => {
    if (
      !pinCode ||
      pinCode.length !== 6
    ) {
      setResult({
        city: '',
        state: '',
        postOffice: '',
        isLoading: false,
        error: '',
      })

      return
    }

    setResult((prev) => ({
      ...prev,
      isLoading: true,
      error: '',
    }))

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 800)
    )

    const pinData =
      pinCodeData.find(
        (item) =>
          item.pinCode ===
          pinCode
      )

    if (!pinData) {
      setResult({
        city: '',
        state: '',
        postOffice: '',
        isLoading: false,
        error:
          'PIN code not found',
      })

      return
    }

    setResult({
      city: pinData.city,
      state: pinData.state,
      postOffice:
        pinData.postOffice,
      isLoading: false,
      error: '',
    })
  }

  return {
    ...result,
    lookupPinCode,
  }
}

export default usePinCodeLookup