import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import compressImage from '../../utils/imageCompression'

function FileUpload({
  label,
  onFileSelect,
  acceptedTypes = {
    'image/*': [],
    'application/pdf': [],
  },
  maxSize = 5 * 1024 * 1024,
  file,
  error,
}) {
  const onDrop =
    useCallback(
      async (
        acceptedFiles,
        rejectedFiles
      ) => {
        if (
          rejectedFiles.length >
          0
        ) {
          alert(
            'Invalid file type or size exceeded'
          )

          return
        }

        const selectedFile =
          acceptedFiles[0]

        if (
          !selectedFile
        ) {
          return
        }

        const isImage =
          selectedFile.type.startsWith(
            'image/'
          )

        if (
          isImage
        ) {
          try {
            const result =
              await compressImage(
                selectedFile
              )

            onFileSelect({
              file:
                result.compressedFile,
              name:
                result.compressedFile
                  .name,
              size:
                result.compressedFile
                  .size,
              type:
                result.compressedFile
                  .type,
              originalSize:
                result.originalSize,
              compressedSize:
                result.compressedSize,
            })
          } catch (
            error
          ) {
            console.error(
              'Compression failed:',
              error
            )
          }

          return
        }

        onFileSelect({
          file:
            selectedFile,
          name:
            selectedFile.name,
          size:
            selectedFile.size,
          type:
            selectedFile.type,
        })
      },
      [onFileSelect]
    )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept:
      acceptedTypes,
    maxSize,
    multiple: false,
  })

  const uploadedFile =
    file?.file ||
    file ||
    null

  const fileName =
    uploadedFile?.name ||
    file?.name ||
    'Unknown file'

  const fileSize =
    uploadedFile?.size ||
    file?.size ||
    0

  const fileType =
    uploadedFile?.type ||
    file?.type ||
    ''

  const isRestoredFile =
    file &&
    !uploadedFile?.lastModified

  const isImage =
    fileType.startsWith(
      'image/'
    )

  const isPDF =
    fileType ===
    'application/pdf'

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${
          isDragActive
            ? 'border-[#1F4E79] bg-blue-50'
            : 'border-slate-300 bg-slate-50 hover:border-[#1F4E79]'
        }`}
      >
        <input
          {...getInputProps()}
        />

        <p className="text-sm text-slate-600">
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag & drop a file here, or click to browse'}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          PDF, JPG, PNG
          allowed (Max
          5MB)
        </p>
      </div>

      {file && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          {isImage &&
            !isRestoredFile && (
              <img
                src={URL.createObjectURL(
                  uploadedFile
                )}
                alt="Preview"
                className="mb-3 h-40 rounded-lg object-cover"
              />
            )}

          {isPDF && (
            <div className="mb-3 flex items-center gap-2 text-red-600">
              📄 PDF File
            </div>
          )}

          <p className="text-sm font-medium text-slate-700">
            {fileName}
          </p>

          {isRestoredFile && (
            <p className="text-xs text-green-600">
              Previously
              uploaded
            </p>
          )}

          <p className="text-xs text-slate-500">
            {(
              fileSize /
              1024 /
              1024
            ).toFixed(2)}{' '}
            MB
          </p>

          {file?.originalSize &&
            file?.compressedSize && (
              <div className="mt-2 text-xs text-slate-500">
                <p>
                  Original:{' '}
                  {(
                    file.originalSize /
                    1024 /
                    1024
                  ).toFixed(
                    2
                  )}{' '}
                  MB
                </p>

                <p>
                  Compressed:{' '}
                  {(
                    file.compressedSize /
                    1024 /
                    1024
                  ).toFixed(
                    2
                  )}{' '}
                  MB
                </p>
              </div>
            )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default FileUpload