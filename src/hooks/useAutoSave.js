import { useEffect } from 'react'
import useLoanFormStore from '../store/loanFormStore'
import {
  encryptData,
} from '../utils/encryption'

function useAutoSave() {
  const formData =
    useLoanFormStore()

  useEffect(() => {
    const interval =
      setInterval(
        async () => {
          try {
            const encrypted =
              await encryptData(
                formData
              )

            if (
              encrypted
            ) {
              localStorage.setItem(
                'loanFormDraft',
                encrypted
              )

              console.log(
                'Form auto-saved'
              )
            }
          } catch (
            error
          ) {
            console.error(
              'Auto-save failed:',
              error
            )
          }
        },
        30000
      )

    return () =>
      clearInterval(
        interval
      )
  }, [formData])
}

export default useAutoSave