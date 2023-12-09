const handleValidationError = (err) => {
    const errors = [
      {
        path: "",
        message: err.message
      }
    ]
    const statusCode = 400
    return {
      statusCode,
      message: "Validation Error",
      errorMessages: errors
    }
  }
  
  export default handleValidationError