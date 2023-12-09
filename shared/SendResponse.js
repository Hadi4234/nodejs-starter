import { response } from "express";

const sendResponse = (response, data) => {
    const responseData = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message || null,
      meta: data.meta || null || undefined,
      data: data.data || null || undefined,
    };
  
    response.status(data.statusCode).json(responseData);
  };
  
  export default sendResponse;