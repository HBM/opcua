type int8 = number
type uint8 = number
type int16 = number
type uint16 = number
type int32 = number
type uint32 = number
type int64 = bigint
type uint64 = bigint
type float32 = number
type float64 = number
type ByteString = Uint8Array

type TypedArray = Uint8Array | Uint16Array | Uint32Array | Float64Array

type StatusCode = uint32
type SecurityTokenRequestType = uint32
type MessageSecurityMode = uint32
type ApplicationType = uint32

interface Encoder {
  encode(): ArrayBuffer
}

interface Decoder {
  decode(b: ArrayBuffer, position?: number): number
}

interface EnDecoder {
  encode(): ArrayBuffer
  decode(b: ArrayBuffer, position?: number): number
}
