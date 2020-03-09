import { isEncoder, isDecoder } from './guards'
import { encode } from './encode'
import decode from './decode'

export default class Bucket {
  public bytes: ArrayBuffer
  public position: number

  constructor(b?: ArrayBuffer, position?: number) {
    this.bytes = b ?? new ArrayBuffer(0)
    this.position = position ?? 0
  }

  private append(slice: ArrayBuffer, elem: ArrayBuffer): ArrayBuffer {
    const result = new Uint8Array(slice.byteLength + elem.byteLength)
    result.set(new Uint8Array(slice))
    result.set(new Uint8Array(elem), slice.byteLength)
    return result.buffer
  }

  public readBoolean(): boolean {
    return this.readUint8() > 0
  }

  public writeBoolean(v: boolean): void {
    this.writeUint8(v ? 1 : 0)
  }

  public readN(n: number): Uint8Array {
    const result = new Uint8Array(this.bytes, this.position, n)
    this.position += n
    return result
  }

  public readInt8(): int8 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 1
    return dv.getInt8(0)
  }

  public writeInt8(n: int8): void {
    const d = new Uint8Array(1)
    const dv = new DataView(d.buffer)
    dv.setInt8(0, n)
    this.write(d)
  }

  public readUint8(): uint8 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 1
    return dv.getUint8(0)
  }

  public writeUint8(n: uint8): void {
    const d = new Uint8Array(1)
    const dv = new DataView(d.buffer)
    dv.setUint8(0, n)
    this.write(d)
  }

  public readInt16(): int16 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 2
    return dv.getInt16(0, true)
  }

  public writeInt16(n: int16): void {
    const d = new Uint8Array(2)
    const dv = new DataView(d.buffer)
    dv.setInt16(0, n, true)
    this.write(d)
  }

  public readUint16(): uint16 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 2
    return dv.getUint16(0, true)
  }

  public writeUint16(n: uint16): void {
    const d = new Uint8Array(2)
    const dv = new DataView(d.buffer)
    dv.setUint16(0, n, true)
    this.write(d)
  }

  public readInt32(): int32 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 4
    return dv.getInt32(0, true)
  }

  public writeInt32(n: int32): void {
    const d = new Uint8Array(4)
    const dv = new DataView(d.buffer)
    dv.setInt32(0, n, true)
    this.write(d)
  }

  public readUint32(): uint32 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 4
    return dv.getUint32(0, true)
  }

  public writeUint32(n: uint32): void {
    const d = new Uint8Array(4)
    const dv = new DataView(d.buffer)
    dv.setUint32(0, n, true)
    this.write(d)
  }

  public readInt64(): int64 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 8
    return dv.getBigInt64(0, true)
  }

  public writeInt64(n: bigint): void {
    const d = new Uint8Array(8)
    const dv = new DataView(d.buffer)
    dv.setBigInt64(0, n, true)
    this.write(d)
  }

  public readUint64(): uint64 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 8
    return dv.getBigUint64(0, true)
  }

  public writeUint64(n: bigint): void {
    const d = new Uint8Array(8)
    const dv = new DataView(d.buffer)
    dv.setBigUint64(0, n, true)
    this.write(d)
  }

  public readFloat32(): float32 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 4
    return dv.getFloat32(0, true)
  }

  public writeFloat32(n: float32): void {
    const d = new Uint8Array(4)
    const dv = new DataView(d.buffer)
    dv.setFloat32(0, n, true)
    this.write(d)
  }

  public readFloat64(): float64 {
    const dv = new DataView(this.bytes, this.position)
    this.position += 8
    return dv.getFloat64(0, true)
  }

  public writeFloat64(n: float64): void {
    const d = new Uint8Array(8)
    const dv = new DataView(d.buffer)
    dv.setFloat64(0, n, true)
    this.write(d)
  }

  public readString(): string {
    const n = this.readInt32()
    if (n === -1) {
      return ''
    }
    const d = this.readN(n)
    const decoder = new TextDecoder()
    return decoder.decode(d)
  }

  // write string with length
  public writeString(s: string): void {
    const encoder = new TextEncoder()
    const data = encoder.encode(s)
    if (data.byteLength === 0) {
      this.writeInt32(-1)
      return
    }
    this.writeInt32(data.byteLength)
    this.write(data)
  }

  public readByteString(): Uint8Array {
    const n = this.readInt32()
    if (n === -1) {
      return new Uint8Array()
    }
    return this.readN(n)
  }

  public writeByteString(b: Uint8Array): void {
    if (b.byteLength === 0) {
      this.writeInt32(-1)
      return
    }
    this.writeInt32(b.byteLength)
    this.write(b)
  }

  public readStringBytes(n: number): string {
    const d = this.readN(n)
    const decoder = new TextDecoder()
    return decoder.decode(d)
  }

  // write string without length
  public writeStringBytes(s: string): void {
    const encoder = new TextEncoder()
    const data = encoder.encode(s)
    this.write(data)
  }

  public readStruct(w: unknown): void {
    if (isDecoder(w)) {
      this.position = w.decode(this.bytes, this.position)
    } else {
      this.position = decode({
        bytes: this.bytes,
        instance: w,
        position: this.position
      })
    }
  }

  public writeStruct(instance: unknown): void {
    let d: ArrayBuffer
    if (isEncoder(instance)) {
      d = instance.encode()
    } else {
      d = encode({ instance })
    }
    this.write(d)
  }

  public readDate(): Date {
    const dv = new DataView(this.bytes, this.position)
    const value = dv.getBigInt64(0, true)
    this.position += 8
    return new Date(Number(value - BigInt(116444736000000000)) / 1e4)
  }

  public writeDate(date: Date): void {
    const b = new Uint8Array(8)
    const dv = new DataView(b.buffer)
    const value =
      BigInt(date.getTime()) * BigInt(1e4) + BigInt(116444736000000000)
    dv.setBigInt64(0, value, true)
    this.write(b)
  }

  public write(d: ArrayBuffer): void {
    this.bytes = this.append(this.bytes, d)
  }
}
