import {
  useEffect,
  useState,
} from 'react'
import MaskedInput from '../../components/common/MaskedInput'
import Checkbox from '../../components/common/Checkbox'
import useVerification from '../../hooks/useVerification'
import useLoanFormStore from '../../store/loanFormStore'

function Step3KYC() {

  const {
  updateStepData,
  getStepData,
} = useLoanFormStore()

const savedData =
  getStepData('step3')

    const [panNumber, setPanNumber] =
  useState(
    savedData.panNumber || ''
  )

const [
  aadhaarNumber,
  setAadhaarNumber,
] = useState(
  savedData
    .aadhaarNumber || ''
)

const [
  aadhaarConsent,
  setAadhaarConsent,
] = useState(
  savedData
    .aadhaarConsent ||
    false
)

  const panVerification =
    useVerification()

  const aadhaarVerification =
    useVerification()

  const isPanVerified =
    panVerification.isVerified


  useEffect(() => {
  updateStepData(
  'step3',
  {
    panNumber,
    aadhaarNumber,
    aadhaarConsent,
    panVerified:
      isPanVerified,
  }
)
}, [
  panNumber,
  aadhaarNumber,
  aadhaarConsent,
  isPanVerified,
  updateStepData,
])

  return (
    <div className="w-full space-y-6">
      <MaskedInput
        label="PAN Number"
        name="panNumber"
        value={panNumber}
        maskType="pan"
        placeholder="Enter PAN number"
        onChange={(value) =>
          setPanNumber(value)
        }
        // onBlur={() =>
        //   panVerification.verify(
        //     panNumber,
        //     'pan'
        //   )
        //}
        isMasked={
          panVerification.isVerified
        }
        error={
          panVerification.error
        }
      />
      <div className="mt-2">
  <button
    type="button"
    onClick={() =>
      panVerification.verify(
        panNumber,
        'pan'
      )
    }
    disabled={
      !panNumber ||
      panNumber.length !==
        10 ||
      panVerification.isVerifying
    }
    className="rounded-lg bg-[#1F4E79] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
  >
    {panVerification.isVerifying
      ? 'Verifying...'
      : 'Verify PAN'}
  </button>
</div>

      <div>
        {panVerification
          .isVerifying && (
          <p className="text-amber-600">
            Verifying PAN...
          </p>
        )}

        {panVerification
          .isVerified && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Verified ✅
          </span>
        )}
      </div>

      <MaskedInput
        label="Aadhaar Number"
        name="aadhaarNumber"
        value={aadhaarNumber}
        maskType="aadhaar"
        placeholder="Enter Aadhaar number"
        onChange={(value) =>
          setAadhaarNumber(
            value
          )
        }
        // onBlur={() =>
        //   aadhaarVerification.verify(
        //     aadhaarNumber,
        //     'aadhaar'
        //   )
        // }
        error={
          aadhaarVerification.error
        }
        isMasked={
          aadhaarVerification.isVerified
        }
      />

      <div className="mt-2">
  <button
    type="button"
    onClick={() =>
      aadhaarVerification.verify(
        aadhaarNumber,
        'aadhaar'
      )
    }
    disabled={
      !aadhaarNumber ||
      aadhaarNumber.replace(
        /\s/g,
        ''
      ).length !==
        12 ||
      aadhaarVerification.isVerifying
    }
    className="rounded-lg bg-[#1F4E79] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
  >
    {aadhaarVerification.isVerifying
      ? 'Verifying...'
      : 'Verify Aadhaar'}
  </button>
</div>

      <div>
        {aadhaarVerification
          .isVerifying && (
          <p className="text-amber-600">
            Verifying Aadhaar...
          </p>
        )}

        {aadhaarVerification
          .isVerified && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Verified ✅
          </span>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Checkbox
          label="I consent to Aadhaar verification for KYC purposes."
          checked={
            aadhaarConsent
          }
          onChange={(event) =>
            setAadhaarConsent(
              event.target.checked
            )
          }
        />

        <p className="mt-3 text-sm text-slate-500">
          By providing Aadhaar
          details, you consent
          to identity
          verification as per
          applicable KYC
          regulations.
        </p>
      </div>
    </div>
  )
}

export default Step3KYC