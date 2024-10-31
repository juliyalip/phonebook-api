const errorMessageList = {
  400: "Bad request",
  401: "Unauthorization",
  403: "Forbidden",
  404: "Not found",
  409: "conflict"
}

export const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error
}