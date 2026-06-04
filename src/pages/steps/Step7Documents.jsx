import { useState } from 'react'
import FileUpload from '../../components/common/FileUpload'
import SignatureCanvas from '../../components/common/SignatureCanvas'
import useLoanFormStore from '../../store/loanFormStore'

function Step7Documents() {
  const {
    getStepData,
    updateStepData,
  } = useLoanFormStore()

  const step1Data =
    getStepData('step1')

  const step3Data =
    getStepData('step3')

  const step5Data =
    getStepData('step5')

  const savedData =
    getStepData('step7')

  const [
    documents,
    setDocuments,
  ] = useState(
    savedData || {}
  )

  const loanType =
    step1Data.loanType

  const employmentType =
    step5Data.employmentType

  const panVerified =
  step3Data.panVerified

  const updateDocument =
    (key, value) => {
      const updated =
        {
          ...documents,
          [key]:
            value,
        }

      setDocuments(
        updated
      )

      updateStepData(
        'step7',
        updated
      )
    }

  const documentChecklist =
    [
      {
        key:
          'panCard',
        label:
          'PAN Card Copy',
        required:
          !panVerified,
      },
      {
        key:
          'aadhaarFront',
        label:
          'Aadhaar Front',
        required:
          true,
      },
      {
        key:
          'aadhaarBack',
        label:
          'Aadhaar Back',
        required:
          true,
      },
      {
        key:
          'bankStatement',
        label:
          'Bank Statement (6 Months)',
        required:
          true,
      },
      {
        key:
          'photo',
        label:
          'Passport Size Photograph',
        required:
          true,
        imageOnly:
          true,
      },
    ]

  if (
    employmentType ===
    'salaried'
  ) {
    documentChecklist.push(
      {
        key:
          'salarySlips',
        label:
          'Salary Slips (3 Months)',
        required:
          true,
      }
    )
  }

  if (
    employmentType ===
      'self-employed' ||
    employmentType ===
      'business-owner'
  ) {
    documentChecklist.push(
      {
        key: 'itr',
        label:
          'ITR (2 Years)',
        required:
          true,
      }
    )
  }

  if (
    loanType ===
    'home'
  ) {
    documentChecklist.push(
      {
        key:
          'propertyDocs',
        label:
          'Property Documents',
        required:
          true,
      }
    )
  }

  if (
    loanType ===
    'business'
  ) {
    documentChecklist.push(
      {
        key:
          'businessCertificate',
        label:
          'Business Registration Certificate',
        required:
          true,
      },
      {
        key:
          'gstReturns',
        label:
          'GST Returns (4 Quarters)',
        required:
          true,
      }
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Required
          Documents
        </h2>

        <div className="space-y-5">
          {documentChecklist.map(
            (
              document
            ) => (
              <div
                key={
                  document.key
                }
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-700">
                      {
                        document.label
                      }
                    </h3>

                    <p className="text-sm text-slate-500">
                      {document.required
                        ? 'Required'
                        : 'Optional'}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      documents[
                        document
                          .key
                      ]
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {documents[
                      document
                        .key
                    ]
                      ? 'Uploaded'
                      : 'Pending'}
                  </span>
                </div>

                <FileUpload
                  file={
                    documents[
                      document
                        .key
                    ]
                  }
                  acceptedTypes={
                    document.imageOnly
                      ? {
                          'image/*':
                            [],
                        }
                      : {
                          'image/*':
                            [],
                          'application/pdf':
                            [],
                        }
                  }
                  onFileSelect={(
                    file
                  ) =>
                    updateDocument(
                      document.key,
                      file
                    )
                  }
                />
              </div>
            )
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <SignatureCanvas
          value={
            documents.signature
          }
          onChange={(
            value
          ) =>
            updateDocument(
              'signature',
              value
            )
          }
        />
      </div>
    </div>
  )
}

export default Step7Documents