import { useEffect, useState } from 'react'
import useLoanFormStore from '../store/loanFormStore'
import {
  decryptData,
} from '../utils/encryption'

function useFormPersistence() {
  const [
    showResumePrompt,
    setShowResumePrompt,
  ] = useState(false)

 const {
  updateStepData,
} =
  useLoanFormStore()

  useEffect(() => {
    const savedDraft =
      localStorage.getItem(
        'loanFormDraft'
      )

    if (savedDraft) {
      setShowResumePrompt(
        true
      )
    }
  }, [])

  const resumeForm =
    async () => {
      try {
        const savedDraft =
          localStorage.getItem(
            'loanFormDraft'
          )

        if (
          !savedDraft
        ) {
          return
        }

        const decrypted =
          await decryptData(
            savedDraft
          )

        if (
  decrypted?.formData
) {
  Object.entries(
    decrypted.formData
  ).forEach(
    ([
      step,
      data,
    ]) => {
      updateStepData(
        step,
        data
      )
    }
  )

  console.log(
    'Draft restored'
  )
}

        setShowResumePrompt(
          false
        )
      } catch (
        error
      ) {
        console.error(
          'Resume failed:',
          error
        )
      }
    }

  const startFresh =
    () => {
      localStorage.removeItem(
        'loanFormDraft'
      )

      setShowResumePrompt(
        false
      )

      window.location.reload()
    }

  return {
    showResumePrompt,
    resumeForm,
    startFresh,
  }
}

export default useFormPersistence