import { useEffect, useState } from 'react'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Checkbox from '../../components/common/Checkbox'
import usePinCodeLookup from '../../hooks/usePinCodeLookup'
import useLoanFormStore from '../../store/loanFormStore'

const residenceOptions = [
  {
    label: 'Owned',
    value: 'owned',
  },
  {
    label: 'Rented',
    value: 'rented',
  },
  {
    label: 'Family Owned',
    value: 'family',
  },
]

function Step4Address() {
  const {
    updateStepData,
    getStepData,
  } = useLoanFormStore()

  const savedData =
    getStepData('step4')

  const [
    currentAddress,
    setCurrentAddress,
  ] = useState(
    savedData.currentAddress ||
      ''
  )

  const [pinCode, setPinCode] =
    useState(
      savedData.pinCode || ''
    )

  const [city, setCity] =
    useState(
      savedData.city || ''
    )

  const [state, setState] =
    useState(
      savedData.state || ''
    )

  const [
    postOffice,
    setPostOffice,
  ] = useState(
    savedData.postOffice ||
      ''
  )

  const [
    residenceType,
    setResidenceType,
  ] = useState(
    savedData.residenceType ||
      ''
  )

  const [
    rentAmount,
    setRentAmount,
  ] = useState(
    savedData.rentAmount ||
      ''
  )

  const [
    yearsAtAddress,
    setYearsAtAddress,
  ] = useState(
    savedData.yearsAtAddress ||
      ''
  )

  const [
    previousAddress,
    setPreviousAddress,
  ] = useState(
    savedData.previousAddress ||
      ''
  )

  const [
    sameAsPermanent,
    setSameAsPermanent,
  ] = useState(
    savedData.sameAsPermanent ||
      false
  )

  const [
    stateWarning,
    setStateWarning,
  ] = useState('')

  const {
    city: lookupCity,
    state: lookupState,
    postOffice:
      lookupPostOffice,
    isLoading,
    error,
    lookupPinCode,
  } = usePinCodeLookup()

  useEffect(() => {
    lookupPinCode(pinCode)
  }, [pinCode])

  useEffect(() => {
    if (lookupCity) {
      setCity(lookupCity)
      setState(lookupState)
      setPostOffice(
        lookupPostOffice
      )
    }
  }, [
    lookupCity,
    lookupState,
    lookupPostOffice,
  ])

  useEffect(() => {
    if (
      lookupState &&
      state &&
      lookupState !== state
    ) {
      setStateWarning(
        'State does not match PIN code'
      )
    } else {
      setStateWarning('')
    }
  }, [state, lookupState])

  useEffect(() => {
    if (sameAsPermanent) {
      const permanentAddress =
        {
          currentAddress:
            '123 MG Road',
          pinCode:
            '680001',
          city: 'Thrissur',
          state: 'Kerala',
          postOffice:
            'Thrissur HO',
        }

      setCurrentAddress(
        permanentAddress.currentAddress
      )

      setPinCode(
        permanentAddress.pinCode
      )

      setCity(
        permanentAddress.city
      )

      setState(
        permanentAddress.state
      )

      setPostOffice(
        permanentAddress.postOffice
      )
    }
  }, [sameAsPermanent])

  useEffect(() => {
    updateStepData(
      'step4',
      {
        currentAddress,
        pinCode,
        city,
        state,
        postOffice,
        residenceType,
        rentAmount,
        yearsAtAddress,
        previousAddress,
        sameAsPermanent,
      }
    )
  }, [
    currentAddress,
    pinCode,
    city,
    state,
    postOffice,
    residenceType,
    rentAmount,
    yearsAtAddress,
    previousAddress,
    sameAsPermanent,
    updateStepData,
  ])

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Input
        label="Current Address"
        name="currentAddress"
        value={currentAddress}
        onChange={(event) =>
          setCurrentAddress(
            event.target.value
          )
        }
      />

      <Input
        label="PIN Code"
        name="pinCode"
        value={pinCode}
        placeholder="Enter 6 digit PIN"
        onChange={(event) =>
          setPinCode(
            event.target.value
              .replace(/\D/g, '')
              .slice(0, 6)
          )
        }
      />

      {isLoading && (
        <p className="text-amber-700">
          Looking up PIN code...
        </p>
      )}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <Input
        label="City"
        name="city"
        value={city}
        readOnly
      />

      <Input
        label="State"
        name="state"
        value={state}
        onChange={(event) =>
          setState(
            event.target.value
          )
        }
      />

      {stateWarning && (
        <p className="text-amber-700">
          {stateWarning}
        </p>
      )}

      <Input
        label="Post Office"
        name="postOffice"
        value={postOffice}
        readOnly
      />

      <Select
        label="Residence Type"
        name="residenceType"
        options={
          residenceOptions
        }
        placeholder="Select type"
        value={residenceType}
        onChange={(event) =>
          setResidenceType(
            event.target.value
          )
        }
      />

      {residenceType ===
        'rented' && (
        <Input
          label="Monthly Rent"
          name="rentAmount"
          value={rentAmount}
          onChange={(event) =>
            setRentAmount(
              event.target.value
            )
          }
        />
      )}

      <Input
        label="Years at Address"
        name="yearsAtAddress"
        type="number"
        value={yearsAtAddress}
        onChange={(event) =>
          setYearsAtAddress(
            event.target.value
          )
        }
      />

      {Number(
        yearsAtAddress
      ) < 1 &&
        yearsAtAddress !==
          '' && (
          <Input
            label="Previous Address"
            name="previousAddress"
            value={
              previousAddress
            }
            onChange={(
              event
            ) =>
              setPreviousAddress(
                event.target
                  .value
              )
            }
          />
        )}

      <div className="md:col-span-2">
        <Checkbox
          label="Same as permanent address"
          checked={
            sameAsPermanent
          }
          onChange={(event) =>
            setSameAsPermanent(
              event.target
                .checked
            )
          }
        />
      </div>
    </div>
  )
}

export default Step4Address