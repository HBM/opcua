import Variant from './Variant'
import Bucket from './Bucket'
import { uint8, uint16, uint32, StatusCode } from '../types'

export const DataValueValue = 0x1
export const DataValueStatusCode = 0x2
export const DataValueSourceTimestamp = 0x4
export const DataValueServerTimestamp = 0x8
export const DataValueSourcePicoseconds = 0x10
export const DataValueServerPicoseconds = 0x20

interface Options {
  EncodingMask?: uint8
  Value?: Variant
  Status?: StatusCode
  SourceTimestamp?: Date
  SourcePicoSeconds?: uint16
  ServerTimestamp?: Date
  ServerPicoSeconds?: uint16
}

export default class DataValue {
  public EncodingMask: uint8
  public Value: Variant | null
  public Status: StatusCode | null
  public SourceTimestamp: Date | null
  public SourcePicoSeconds: uint16 | null
  public ServerTimestamp: Date | null
  public ServerPicoSeconds: uint16 | null

  constructor(options?: Options) {
    this.EncodingMask = options?.EncodingMask ?? 0
    this.Value = this.has(DataValueValue) ? (options?.Value as Variant) : null
    this.Status = this.has(DataValueStatusCode)
      ? (options?.Status as StatusCode)
      : null
    this.SourceTimestamp = this.has(DataValueSourceTimestamp)
      ? (options?.SourceTimestamp as Date)
      : null
    this.SourcePicoSeconds = this.has(DataValueSourcePicoseconds)
      ? (options?.SourcePicoSeconds as uint16)
      : null
    this.ServerTimestamp = this.has(DataValueServerTimestamp)
      ? (options?.ServerTimestamp as Date)
      : null
    this.ServerPicoSeconds = this.has(DataValueServerPicoseconds)
      ? (options?.ServerPicoSeconds as uint16)
      : null
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint8(this.EncodingMask)

    if (this.has(DataValueValue)) {
      bucket.writeStruct(this.Value)
    }

    if (this.has(DataValueStatusCode)) {
      bucket.writeUint32(this.Status as uint32)
    }

    if (this.has(DataValueSourceTimestamp)) {
      bucket.writeDate(this.SourceTimestamp as Date)
    }

    if (this.has(DataValueSourcePicoseconds)) {
      bucket.writeUint16(this.SourcePicoSeconds as uint16)
    }

    if (this.has(DataValueServerTimestamp)) {
      bucket.writeDate(this.ServerTimestamp as Date)
    }

    if (this.has(DataValueServerPicoseconds)) {
      bucket.writeUint16(this.ServerPicoSeconds as uint16)
    }

    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.EncodingMask = bucket.readUint8()

    if (this.has(DataValueValue)) {
      this.Value = new Variant()
      bucket.readStruct(this.Value)
    }

    if (this.has(DataValueStatusCode)) {
      this.Status = bucket.readUint32()
    }

    if (this.has(DataValueSourceTimestamp)) {
      this.SourceTimestamp = bucket.readDate()
    }

    if (this.has(DataValueSourcePicoseconds)) {
      this.SourcePicoSeconds = bucket.readUint16()
    }

    if (this.has(DataValueServerTimestamp)) {
      this.ServerTimestamp = bucket.readDate()
    }

    if (this.has(DataValueServerPicoseconds)) {
      this.ServerPicoSeconds = bucket.readUint16()
    }

    return bucket.position
  }

  public has(mask: uint8): boolean {
    return (this.EncodingMask & mask) === mask
  }
}
