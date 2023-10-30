enum EnumHttpCodes {
  INVALID_CREDENTIALS = 105,
  OK = 200,
  CREATED = 201,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  GATEWAY_TIMEOUT = 504,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  ERROR_CONN_ABORTED = 'ECONNABORTED',
  BAD_REQUEST = 400,
}

export default EnumHttpCodes;
