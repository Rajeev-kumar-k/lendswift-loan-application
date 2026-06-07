import {
  useEffect,
  useRef,
  useState,
} from 'react'
import useLoanFormStore from '../store/loanFormStore'
import {
  encryptData,
} from '../utils/encryption'

function useAutoSave(
  currentStep,
  interval = 3000
) {
  const formData =
    useLoanFormStore(
      (
        state
      ) =>
        state.formData
    )

  const timerRef =
    useRef(null)

  const [
    saveMessage,
    setSaveMessage,
  ] = useState('')

  useEffect(() => {
    if (
      timerRef.current
    ) {
      clearTimeout(
        timerRef.current
      )
    }

    timerRef.current =
      setTimeout(
        async () => {
          try {
            const loanType =
              formData
                ?.step1
                ?.loanType ||
              'general'

            const key =
              `lendswift_draft_${loanType}`

            const payload =
              {
                version:
                  '1.0',

                timestamp:
                  new Date().toISOString(),

                step:
                  currentStep,

                loanType,

                formData,
              }

            const encrypted =
              await encryptData(
                payload
              )

            if (
              encrypted
            ) {
              localStorage.setItem(
                key,
                encrypted
              )

              console.log(
  'AUTOSAVE RUNNING',
  formData
)

console.log(
  'KEY:',
  key
)

console.log(
  'ENCRYPTED:',
  encrypted
)
              const savedAt =
                new Date().toLocaleTimeString(
                  [],
                  {
                    hour:
                      '2-digit',
                    minute:
                      '2-digit',
                  }
                )

              setSaveMessage(
                `Draft saved at ${savedAt}`
              )

              setTimeout(
                () =>
                  setSaveMessage(
                    ''
                  ),
                2000
              )

              console.log(
                'Draft auto-saved'
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
        interval
      )

    return () => {
      if (
        timerRef.current
      ) {
        clearTimeout(
          timerRef.current
        )
      }
    }
  }, [
    formData,
    currentStep,
    interval,
  ])

  return {
    saveMessage,
  }
}

export default useAutoSave