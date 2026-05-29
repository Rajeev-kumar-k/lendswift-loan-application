function ErrorMessage({ message }) {
  if (!message) {
    return null
  }

  return (
    <p
      role="alert"
      aria-live="polite"
      className="mt-1 text-sm font-medium text-[#E74C3C]"
    >
      {message}
    </p>
  )
}

export default ErrorMessage