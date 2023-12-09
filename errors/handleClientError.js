
const handleClientError = err => {
    let errors = []
    let message = ""
    const statusCode = 400
  
    if (err.code === "P2025") {
      message = err.meta?.cause || "Record not found!"
      errors = [
        {
          path: "",
          message
        }
      ]
    } else if (err.code === "P2003") {
      if (err.message.includes("delete()` invocation:")) {
        message = "Delete failed"
        errors = [
          {
            path: "",
            message
          }
        ]
      }
    }
  
    return {
      statusCode,
      message,
      errorMessages: errors
    }
  }
  
  export default handleClientError