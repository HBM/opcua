import Bucket from './Bucket'
import Guid from './Guid'
import { NodeIdType } from './generated'
import { ByteString, EnDecoder, uint16, uint32 } from '../types'

interface Options {
  Type?: NodeIdType
  Identifier: number | string | ByteString | Guid
  Namespace?: number
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.2.2/#5.2.2.9
export default class NodeId implements EnDecoder {
  public Type: NodeIdType
  public Identifier: number | string | ByteString | Guid
  public Namespace: uint16

  constructor(options?: Options) {
    this.Type = options?.Type ?? NodeIdType.TwoByte
    this.Identifier = options?.Identifier ?? 0
    this.Namespace = options?.Namespace ?? 0
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint8(this.Type)

    switch (this.type()) {
      case NodeIdType.TwoByte: {
        bucket.writeUint8(this.Identifier as number)
        break
      }
      case NodeIdType.FourByte: {
        bucket.writeUint8(this.Namespace)
        bucket.writeUint16(this.Identifier as number)
        break
      }
      case NodeIdType.Numeric: {
        bucket.writeUint16(this.Namespace)
        bucket.writeUint32(this.Identifier as number)
        break
      }
      case NodeIdType.Guid: {
        bucket.writeUint16(this.Namespace)
        bucket.writeStruct(this.Identifier as Guid)
        break
      }
      case NodeIdType.ByteString: {
        bucket.writeUint16(this.Namespace)
        bucket.writeByteString(this.Identifier as ByteString)
        break
      }
      case NodeIdType.String: {
        bucket.writeUint16(this.Namespace)
        bucket.writeString(this.Identifier as string)
        break
      }
      default:
        throw new Error(`invalid node id type ${this.Type}`)
    }
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)

    this.Type = bucket.readUint8()

    switch (this.type()) {
      case NodeIdType.TwoByte:
        this.Identifier = bucket.readUint8()
        return bucket.position

      case NodeIdType.FourByte:
        this.Namespace = bucket.readUint8()
        this.Identifier = bucket.readUint16()
        return bucket.position

      case NodeIdType.Numeric:
        this.Namespace = bucket.readUint16()
        this.Identifier = bucket.readUint32()
        return bucket.position

      case NodeIdType.ByteString:
        this.Namespace = bucket.readUint16()
        this.Identifier = bucket.readByteString()
        return bucket.position

      case NodeIdType.String:
        this.Namespace = bucket.readUint16()
        this.Identifier = bucket.readString()
        return bucket.position

      case NodeIdType.Guid:
        this.Namespace = bucket.readUint16()
        this.Identifier = new Guid()
        bucket.readStruct(this.Identifier)
        return bucket.position

      default:
        throw new Error(`invalid node id type ${this.type()}`)
    }
  }

  public setServerIndexFlag(): void {
    this.Type |= 0x40
  }

  public setNamespaceUriFlag(): void {
    this.Type |= 0x80
  }

  public type(): number {
    return this.Type & 0xf
  }
}

export const NewTwoByteNodeId = (value: number): NodeId =>
  new NodeId({
    Type: NodeIdType.TwoByte,
    Identifier: value,
    Namespace: 0
  })

export const NewFourByteNodeId = (namespace: number, value: number): NodeId =>
  new NodeId({
    Type: NodeIdType.FourByte,
    Identifier: value,
    Namespace: namespace
  })

export const NewNumericNodeID = (namespace: uint16, id: uint32): NodeId =>
  new NodeId({
    Type: NodeIdType.Numeric,
    Identifier: id,
    Namespace: namespace
  })

export const NewStringNodeId = (namespace: number, value: string): NodeId =>
  new NodeId({
    Type: NodeIdType.String,
    Identifier: value,
    Namespace: namespace
  })

export const NewByteStringNodeId = (
  namespace: uint16,
  id: Uint8Array
): NodeId =>
  new NodeId({
    Type: NodeIdType.ByteString,
    Namespace: namespace,
    Identifier: id
  })
