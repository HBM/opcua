export const isEncoder = (instance: unknown): instance is Encoder =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance !== null && typeof (instance as any)['encode'] === 'function'

export const isDecoder = (instance: unknown): instance is Decoder =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance !== null && typeof (instance as any)['decode'] === 'function'

export const isTypedArray = (instance: unknown): instance is TypedArray =>
  instance instanceof Uint8Array ||
  instance instanceof Uint16Array ||
  instance instanceof Uint32Array

export const isNotNullObject = (instance: unknown): instance is object =>
  typeof instance === 'object' && instance !== null

export const keyInObject = (v: object, key: string): key is keyof typeof v =>
  key in v

// export const isIndexable = (instance: unknown, value: string): value is keyof typeof instance => {
//   return typeof instance === 'object' && instance !== null && value in instance
// }
