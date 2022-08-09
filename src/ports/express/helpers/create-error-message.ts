type CreateErrorMessage = {
  message: string
  error: boolean
}

function createErrorMessage (message: string): CreateErrorMessage {
  return { message: message, error: true }
}

export { createErrorMessage }
