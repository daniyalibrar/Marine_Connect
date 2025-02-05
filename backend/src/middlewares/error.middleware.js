function errorMiddleware(error, req, res, next) {
  let { status = 500, message, data } = error;

  console.warn(`[Error] ${error}`);

  // If status code is 500 - change the message to Intrnal server error
  message = status === 500 || !message ? "Internal server error" : message;

  error = {
    type: "error",
    status,
    message,
    ...(data && data),
  };

  res.status(status).json({ error });
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // Optional If data is a truthy object (like { key: "value" }), its properties will be spread into the error object.
    If data is falsy (like null, undefined, or false), nothing will be added to the error object, and it will remain as it is.
}
*/
