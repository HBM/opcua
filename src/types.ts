export type int8 = number
export type uint8 = number
export type int16 = number
export type uint16 = number
export type int32 = number
export type uint32 = number
export type int64 = bigint
export type uint64 = bigint
export type float32 = number
export type float64 = number
export type ByteString = Uint8Array

export type TypedArray = Uint8Array | Uint16Array | Uint32Array | Float64Array

export type TypeId = uint8

export type AttributeId = uint32

export type StatusCode = uint32
export type SecurityTokenRequestType = uint32
export type MessageSecurityMode = uint32
export type ApplicationType = uint32

export interface Encoder {
  encode(): ArrayBuffer
}

export interface Decoder {
  decode(b: ArrayBuffer, position?: number): number
}

export interface EnDecoder {
  encode(): ArrayBuffer
  decode(b: ArrayBuffer, position?: number): number
}
