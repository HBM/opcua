import Bucket from '../ua/Bucket'
import { uint32 } from '../types'

interface Options {
  MessageType?: string
  ChunkType?: string
  MessageSize?: uint32
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/7.1.2/#7.1.2.2
export default class ConnectionProtocolMessageHeader {
  public MessageType: string
  public ChunkType: string
  public MessageSize: uint32

  constructor(options?: Options) {
    this.MessageType = options?.MessageType ?? ''
    this.ChunkType = options?.ChunkType ?? ''
    this.MessageSize = options?.MessageSize ?? 0
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeStringBytes(this.MessageType)
    bucket.writeStringBytes(this.ChunkType)
    bucket.writeUint32(this.MessageSize)
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.MessageType = bucket.readStringBytes(3)
    this.ChunkType = bucket.readStringBytes(1)
    this.MessageSize = bucket.readUint32()
    return bucket.position
  }
}
