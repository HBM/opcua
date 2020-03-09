import Variant from './Variant'
import { StatusOK } from './StatusCode'
import Bucket from './Bucket'

export const DataValueValue = 0x1
export const DataValueStatusCode = 0x2
export const DataValueSourceTimestamp = 0x4
export const DataValueServerTimestamp = 0x8
export const DataValueSourcePicoseconds = 0x10
export const DataValueServerPicoseconds = 0x20

interface Options {
  EncodingMask?: uint8
  Value: Variant
  Status: StatusCode
  SourceTimestamp: Date
  SourcePicoSeconds: uint16
  ServerTimestamp: Date
  ServerPicoSeconds: uint16
}

export default class DataValue {
  public EncodingMask: uint8
  public Value: Variant
  public Status: StatusCode
  public SourceTimestamp: Date
  public SourcePicoSeconds: uint16
  public ServerTimestamp: Date
  public ServerPicoSeconds: uint16

  constructor(options?: Options) {
    this.EncodingMask = options?.EncodingMask ?? 0
    this.Value = options?.Value ?? new Variant()
    this.Status = options?.Status ?? StatusOK
    this.SourceTimestamp = options?.SourceTimestamp ?? new Date()
    this.SourcePicoSeconds = options?.SourcePicoSeconds ?? 0
    this.ServerTimestamp = options?.ServerTimestamp ?? new Date()
    this.ServerPicoSeconds = options?.ServerPicoSeconds ?? 0
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint8(this.EncodingMask)

    if (this.has(DataValueValue)) {
      bucket.writeStruct(this.Value)
    }

    if (this.has(DataValueStatusCode)) {
      bucket.writeUint32(this.Status)
    }

    if (this.has(DataValueSourceTimestamp)) {
      bucket.writeDate(this.SourceTimestamp)
    }

    if (this.has(DataValueSourcePicoseconds)) {
      bucket.writeUint16(this.SourcePicoSeconds)
    }

    if (this.has(DataValueServerTimestamp)) {
      bucket.writeDate(this.ServerTimestamp)
    }

    if (this.has(DataValueServerPicoseconds)) {
      bucket.writeUint16(this.ServerPicoSeconds)
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
