import Bucket from '../ua/Bucket'
import { uint32 } from '../types'

interface Options {
  ProtocolVersion?: number
  ReceiveBufferSize?: number
  SendBufferSize?: number
  MaxMessageSize?: number
  MaxChunkCount?: number
  EndpointUrl?: string
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/7.1.2/#7.1.2.3
export default class HelloMessage {
  public ProtocolVersion: uint32
  public ReceiveBufferSize: uint32
  public SendBufferSize: uint32
  public MaxMessageSize: uint32
  public MaxChunkCount: uint32
  public EndpointUrl: string

  constructor(options?: Options) {
    this.ProtocolVersion = options?.ProtocolVersion ?? 0
    this.ReceiveBufferSize = options?.ReceiveBufferSize ?? 0
    this.SendBufferSize = options?.SendBufferSize ?? 0
    this.MaxMessageSize = options?.MaxMessageSize ?? 0
    this.MaxChunkCount = options?.MaxChunkCount ?? 0
    this.EndpointUrl = options?.EndpointUrl ?? ''
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint32(this.ProtocolVersion)
    bucket.writeUint32(this.ReceiveBufferSize)
    bucket.writeUint32(this.SendBufferSize)
    bucket.writeUint32(this.MaxMessageSize)
    bucket.writeUint32(this.MaxChunkCount)
    bucket.writeString(this.EndpointUrl)
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.ProtocolVersion = bucket.readUint32()
    this.ReceiveBufferSize = bucket.readUint32()
    this.SendBufferSize = bucket.readUint32()
    this.MaxMessageSize = bucket.readUint32()
    this.MaxChunkCount = bucket.readUint32()
    this.EndpointUrl = bucket.readString()
    return bucket.position
  }
}
