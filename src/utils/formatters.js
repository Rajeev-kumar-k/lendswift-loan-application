export const formatINR = (value) => {
  if (!value) {
    return ''
  }

  const numericValue = value
    .toString()
    .replace(/\D/g, '')

  return new Intl.NumberFormat(
    'en-IN'
  ).format(numericValue)
}