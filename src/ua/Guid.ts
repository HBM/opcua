import Bucket from './Bucket'
import { EnDecoder, uint32, uint16 } from '../types'

const parse = (s: string): number[] => {
  const out: number[] = []
  for (let i = 0; i < s.length; i += 2) {
    out.push(parseInt(s.substr(i, 2), 16))
  }
  return out
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.2.2/#5.2.2.6
// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.1.3/
export default class Guid implements EnDecoder {
  public Data1: uint32
  public Data2: uint16
  public Data3: uint16
  public Data4: Uint8Array

  constructor(s?: string) {
    s = s ?? '00000000-0000-0000-0000-000000000000'
    const h = parse(s.replace(/-/g, ''))
    const data = new Uint8Array(h)
    const dv = new DataView(data.buffer)
    // attention! big endian
    this.Data1 = dv.getUint32(0)
    this.Data2 = dv.getUint16(4)
    this.Data3 = dv.getUint16(6)
    this.Data4 = data.subarray(8, 16)
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint32(this.Data1)
    bucket.writeUint16(this.Data2)
    bucket.writeUint16(this.Data3)
    bucket.write(this.Data4)
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.Data1 = bucket.readUint32()
    this.Data2 = bucket.readUint16()
    this.Data3 = bucket.readUint16()
    this.Data4 = bucket.readN(8)
    return bucket.position
  }

  public toString(): string {
    const a = Array.from(this.Data4.slice(0, 2))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    const b = Array.from(this.Data4.slice(2))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    return `${this.Data1.toString(16)}-${this.Data2.toString(
      16
    )}-${this.Data3.toString(16)}-${a}-${b}`.toUpperCase()
  }
}
