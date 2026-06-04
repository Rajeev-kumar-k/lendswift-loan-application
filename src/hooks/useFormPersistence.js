import {
  useEffect,
  useState,
} from 'react'
import useLoanFormStore from '../store/loanFormStore'
import {
  decryptData,
} from '../utils/encryption'

function useFormPersistence(
  setCurrentStep
) {
  const [
    showResumePrompt,
    setShowResumePrompt,
  ] = useState(false)

  const [
    savedDraftKey,
    setSavedDraftKey,
  ] = useState(null)

  const {
    updateStepData,
    resetForm,
  } =
    useLoanFormStore()

  useEffect(() => {
    const draftKeys =
      Object.keys(
        localStorage
      ).filter(
        (key) =>
          key.startsWith(
            'lendswift_draft_'
          )
      )

    if (
      draftKeys.length >
      0
    ) {
      setSavedDraftKey(
        draftKeys[0]
      )

      setShowResumePrompt(
        true
      )
    }
  }, [])

  const resumeForm =
    async () => {
      try {
        if (
          !savedDraftKey
        ) {
          return
        }

        const savedDraft =
          localStorage.getItem(
            savedDraftKey
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
          !decrypted
        ) {
          return
        }

        const {
          version,
          timestamp,
          step,
          formData,
        } =
          decrypted

        if (
          version !==
          '1.0'
        ) {
          localStorage.removeItem(
            savedDraftKey
          )

          return
        }

        const savedTime =
          new Date(
            timestamp
          ).getTime()

        const currentTime =
          Date.now()

        const hours72 =
          72 *
          60 *
          60 *
          1000

        if (
          currentTime -
            savedTime >
          hours72
        ) {
          localStorage.removeItem(
            savedDraftKey
          )

          return
        }

        Object.entries(
          formData ||
            {}
        ).forEach(
          ([
            stepKey,
            data,
          ]) => {
            updateStepData(
              stepKey,
              data
            )
          }
        )

        setCurrentStep(
          step || 0
        )

        console.log(
          'Draft restored'
        )

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
      Object.keys(
        localStorage
      )
        .filter(
          (key) =>
            key.startsWith(
              'lendswift_draft_'
            )
        )
        .forEach(
          (key) =>
            localStorage.removeItem(
              key
            )
        )

      resetForm()

      setShowResumePrompt(
        false
      )

      setCurrentStep(
        0
      )
    }

  return {
    showResumePrompt,
    resumeForm,
    startFresh,
  }
}

export default useFormPersistence