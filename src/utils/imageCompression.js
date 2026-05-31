async function compressImage(
  file,
  quality = 0.7
) {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const image =
        new Image()

      const imageUrl =
        URL.createObjectURL(
          file
        )

      image.src =
        imageUrl

      image.onload =
        async () => {
          try {
            const canvas =
              document.createElement(
                'canvas'
              )

            const context =
              canvas.getContext(
                '2d'
              )

            const maxWidth =
              1200

            let width =
              image.width

            let height =
              image.height

            if (
              width >
              maxWidth
            ) {
              height =
                (
                  height *
                  maxWidth
                ) /
                width

              width =
                maxWidth
            }

            canvas.width =
              width
            canvas.height =
              height

            context.drawImage(
              image,
              0,
              0,
              width,
              height
            )

            canvas.toBlob(
              async (
                blob
              ) => {
                if (
                  !blob
                ) {
                  reject(
                    new Error(
                      'Compression failed'
                    )
                  )
                  return
                }

                const compressedFile =
                  new File(
                    [blob],
                    file.name,
                    {
                      type:
                        'image/jpeg',
                    }
                  )

                const sizeInMB =
                  blob.size /
                  1024 /
                  1024

                if (
                  sizeInMB >
                    2 &&
                  quality >
                    0.3
                ) {
                  const furtherCompressed =
                    await compressImage(
                      file,
                      quality -
                        0.1
                    )

                  resolve(
                    furtherCompressed
                  )

                  return
                }

                resolve({
                  compressedFile,
                  originalSize:
                    file.size,
                  compressedSize:
                    blob.size,
                })
              },
              'image/jpeg',
              quality
            )

            URL.revokeObjectURL(
              imageUrl
            )
          } catch (
            error
          ) {
            reject(
              error
            )
          }
        }

      image.onerror =
        () => {
          reject(
            new Error(
              'Failed to load image'
            )
          )
        }
    }
  )
}

export default compressImage