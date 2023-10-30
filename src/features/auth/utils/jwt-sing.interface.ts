export interface JWTSingInterface {
  payload: object;
  expires: string | number;
}

export interface PayloadTokenInterface {
  role: string;
  sub: string;
  isExpired: boolean;
}

export interface JWTPayloadDecode {
  exp: number;
  iat: number;
  role: string;
  sub: string;
}
