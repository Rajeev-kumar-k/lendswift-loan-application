import { useEffect, useRef } from 'react'
import SignaturePad from 'react-signature-canvas'

function SignatureCanvas({
  value,
  onChange,
  error,
}) {
  const signatureRef =
    useRef(null)

    useEffect(() => {
  if (
    value &&
    signatureRef.current
  ) {
    signatureRef.current.fromDataURL(
      value
    )
  }
}, [value])

  const clearSignature =
    () => {
      signatureRef.current.clear()

      onChange('')
    }

  const saveSignature =
    () => {
      if (
        signatureRef.current.isEmpty()
      ) {
        onChange('')
        return
      }

      const signature =
        signatureRef.current.toDataURL(
          'image/png'
        )

      onChange(
        signature
      )
    }

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Signature
      </label>

      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">
        <SignaturePad
          ref={
            signatureRef
          }
          penColor="black"
          canvasProps={{
            className:
              'h-48 w-full',
          }}
          onEnd={
            saveSignature
          }
        />
      </div>

      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={
            clearSignature
          }
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Clear
        </button>
      </div>

      {!value && (
        <p className="mt-2 text-sm text-amber-700">
          Signature is
          required
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default SignatureCanvas