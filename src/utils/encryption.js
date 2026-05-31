const ENCRYPTION_KEY =
  'lendswift-secure-key'

async function getKey() {
  const encoder =
    new TextEncoder()

  const keyMaterial =
    await crypto.subtle.importKey(
      'raw',
      encoder.encode(
        ENCRYPTION_KEY
      ),
      'PBKDF2',
      false,
      ['deriveKey']
    )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt:
        encoder.encode(
          'lendswift-salt'
        ),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    {
      name: 'AES-GCM',
      length: 256,
    },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encryptData(
  data
) {
  try {
    const key =
      await getKey()

    const encoder =
      new TextEncoder()

    const iv =
      crypto.getRandomValues(
        new Uint8Array(12)
      )

    const encrypted =
      await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        key,
        encoder.encode(
          JSON.stringify(
            data
          )
        )
      )

    return JSON.stringify({
      iv: Array.from(iv),
      data:
        Array.from(
          new Uint8Array(
            encrypted
          )
        ),
    })
  } catch (error) {
    console.error(
      'Encryption failed:',
      error
    )

    return null
  }
}

export async function decryptData(
  encryptedData
) {
  try {
    const parsed =
      JSON.parse(
        encryptedData
      )

    const key =
      await getKey()

    const decrypted =
      await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv:
            new Uint8Array(
              parsed.iv
            ),
        },
        key,
        new Uint8Array(
          parsed.data
        )
      )

    const decoder =
      new TextDecoder()

    return JSON.parse(
      decoder.decode(
        decrypted
      )
    )
  } catch (error) {
    console.error(
      'Decryption failed:',
      error
    )

    return null
  }
}