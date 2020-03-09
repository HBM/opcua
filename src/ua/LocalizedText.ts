import Bucket from './Bucket'

interface Options {
  EncodingMask?: uint8
  Locale?: string
  Text?: string
}

export const LocalizedTextLocale: uint8 = 0x01
export const LocalizedTextText: uint8 = 0x02

// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.2.2/#5.2.2.14
export default class LocalizedText implements EnDecoder {
  public EncodingMask: uint8
  public Locale: string
  public Text: string

  constructor(options?: Options) {
    this.EncodingMask = options?.EncodingMask ?? 0
    this.Locale = options?.Locale ?? ''
    this.Text = options?.Text ?? ''
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint8(this.EncodingMask)

    if (this.has(LocalizedTextLocale)) {
      bucket.writeString(this.Locale)
    }

    if (this.has(LocalizedTextText)) {
      bucket.writeString(this.Text)
    }

    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.EncodingMask = bucket.readUint8()
    if (this.has(LocalizedTextLocale)) {
      this.Locale = bucket.readString()
    }
    if (this.has(LocalizedTextText)) {
      this.Text = bucket.readString()
    }
    return bucket.position
  }

  public has(mask: uint8): boolean {
    return (this.EncodingMask & mask) === mask
  }
}
