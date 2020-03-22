import Bucket from '../ua/Bucket'
import { uint32 } from '../types'

interface Options {
  MessageType?: string
  IsFinal?: string
  MessageSize?: number
  SecureChannelId?: number
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/6.7.2/#6.7.2.2
export default class SecureConversationMessageHeader {
  public MessageType: string
  public IsFinal: string
  public MessageSize: uint32
  public SecureChannelId: uint32

  constructor(options?: Options) {
    this.MessageType = options?.MessageType ?? ''
    this.IsFinal = options?.IsFinal ?? ''
    this.MessageSize = options?.MessageSize ?? 0
    this.SecureChannelId = options?.SecureChannelId ?? 0
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeStringBytes(this.MessageType)
    bucket.writeStringBytes(this.IsFinal)
    bucket.writeUint32(this.MessageSize)
    bucket.writeUint32(this.SecureChannelId)
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.MessageType = bucket.readStringBytes(3)
    this.IsFinal = bucket.readStringBytes(1)
    this.MessageSize = bucket.readUint32()
    this.SecureChannelId = bucket.readUint32()
    return bucket.position
  }
}
