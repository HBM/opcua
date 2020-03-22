import Bucket from '../ua/Bucket'
import { uint32 } from '../types'

interface Options {
  SequenceNumber?: uint32
  RequestId?: uint32
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/6.7.2/#6.7.2.4
export default class SequenceHeader {
  public SequenceNumber: uint32
  public RequestId: uint32

  constructor(options?: Options) {
    this.SequenceNumber = options?.SequenceNumber ?? 0
    this.RequestId = options?.RequestId ?? 0
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint32(this.SequenceNumber)
    bucket.writeUint32(this.RequestId)
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.SequenceNumber = bucket.readUint32()
    this.RequestId = bucket.readUint32()
    return bucket.position
  }
}
