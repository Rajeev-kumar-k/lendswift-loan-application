import { create } from 'zustand'

const useLoanFormStore =
  create((set) => ({
    formData: {
      step1: {},
      step2: {},
      step3: {},
      step4: {},
      step5: {},
    },

    updateStepData: (
      step,
      data
    ) =>
      set((state) => ({
        formData: {
          ...state.formData,
          [step]: {
            ...state.formData[
              step
            ],
            ...data,
          },
        },
      })),

    getStepData: (step) => {
      return (
        useLoanFormStore.getState()
          .formData[step] ||
        {}
      )
    },

    resetForm: () =>
      set({
        formData: {
          step1: {},
          step2: {},
          step3: {},
          step4: {},
          step5: {},
        },
      }),
  }))

export default useLoanFormStore