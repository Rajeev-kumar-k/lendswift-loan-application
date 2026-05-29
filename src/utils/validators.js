const VALID_PAN_ENTITY_TYPES =
  ['P', 'C', 'F', 'H', 'A', 'T']

export const validatePAN = (
  pan
) => {
  const cleanPAN =
    pan.toUpperCase().trim()

  const panRegex =
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/

  if (
    !panRegex.test(cleanPAN)
  ) {
    return {
      isValid: false,
      error:
        'Invalid PAN format',
    }
  }

  const entityType =
    cleanPAN[3]

  if (
    !VALID_PAN_ENTITY_TYPES.includes(
      entityType
    )
  ) {
    return {
      isValid: false,
      error:
        'Invalid PAN entity type',
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

const multiplicationTable = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,2,3,4,0,6,7,8,9,5],
  [2,3,4,0,1,7,8,9,5,6],
  [3,4,0,1,2,8,9,5,6,7],
  [4,0,1,2,3,9,5,6,7,8],
  [5,9,8,7,6,0,4,3,2,1],
  [6,5,9,8,7,1,0,4,3,2],
  [7,6,5,9,8,2,1,0,4,3],
  [8,7,6,5,9,3,2,1,0,4],
  [9,8,7,6,5,4,3,2,1,0],
]

const permutationTable = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,5,7,6,2,8,3,0,9,4],
  [5,8,0,3,7,9,6,1,4,2],
  [8,9,1,6,0,4,3,5,2,7],
  [9,4,5,3,1,2,6,8,7,0],
  [4,2,8,6,5,7,3,9,0,1],
  [2,7,9,3,8,0,6,4,1,5],
  [7,0,4,6,9,1,3,2,5,8],
]

const validateVerhoeff = (
  number
) => {
  let checksum = 0

  const reversed =
    number
      .split('')
      .reverse()

  for (
    let i = 0;
    i < reversed.length;
    i += 1
  ) {
    checksum =
      multiplicationTable[
        checksum
      ][
        permutationTable[
          i % 8
        ][
          Number(
            reversed[i]
          )
        ]
      ]
  }

  return checksum === 0
}

export const validateAadhaar =
  (aadhaar) => {
    const cleanAadhaar =
      aadhaar
        .replace(/\s/g, '')
        .trim()

    const aadhaarRegex =
      /^[2-9][0-9]{11}$/

    if (
      !aadhaarRegex.test(
        cleanAadhaar
      )
    ) {
      return {
        isValid: false,
        error:
          'Invalid Aadhaar format',
      }
    }

    if (
      !validateVerhoeff(
        cleanAadhaar
      )
    ) {
      return {
        isValid: false,
        error:
          'Invalid Aadhaar checksum',
      }
    }

    return {
      isValid: true,
      error: '',
    }
  }