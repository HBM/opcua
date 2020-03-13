import Bucket from './Bucket'
import Guid from './Guid'
import {
  NodeIdType,
  NodeIdTypeTwoByte,
  NodeIdTypeFourByte,
  NodeIdTypeNumeric,
  NodeIdTypeGuid,
  NodeIdTypeByteString,
  NodeIdTypeString
} from './generated'

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
    this.Type = options?.Type ?? NodeIdTypeTwoByte
    this.Identifier = options?.Identifier ?? 0
    this.Namespace = options?.Namespace ?? 0
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint8(this.Type)

    switch (this.type()) {
      case NodeIdTypeTwoByte: {
        bucket.writeUint8(this.Identifier as number)
        break
      }
      case NodeIdTypeFourByte: {
        bucket.writeUint8(this.Namespace)
        bucket.writeUint16(this.Identifier as number)
        break
      }
      case NodeIdTypeNumeric: {
        bucket.writeUint16(this.Namespace)
        bucket.writeUint32(this.Identifier as number)
        break
      }
      case NodeIdTypeGuid: {
        bucket.writeUint16(this.Namespace)
        bucket.writeStruct(this.Identifier as Guid)
        break
      }
      case NodeIdTypeByteString: {
        bucket.writeUint16(this.Namespace)
        bucket.writeByteString(this.Identifier as ByteString)
        break
      }
      case NodeIdTypeString: {
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
      case NodeIdTypeTwoByte:
        this.Identifier = bucket.readUint8()
        return bucket.position

      case NodeIdTypeFourByte:
        this.Namespace = bucket.readUint8()
        this.Identifier = bucket.readUint16()
        return bucket.position

      case NodeIdTypeNumeric:
        this.Namespace = bucket.readUint16()
        this.Identifier = bucket.readUint32()
        return bucket.position

      case NodeIdTypeByteString:
        this.Namespace = bucket.readUint16()
        this.Identifier = bucket.readByteString()
        return bucket.position

      case NodeIdTypeString:
        this.Namespace = bucket.readUint16()
        this.Identifier = bucket.readString()
        return bucket.position

      case NodeIdTypeGuid:
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
    Type: NodeIdTypeTwoByte,
    Identifier: value,
    Namespace: 0
  })

export const NewFourByteNodeId = (namespace: number, value: number): NodeId =>
  new NodeId({
    Type: NodeIdTypeFourByte,
    Identifier: value,
    Namespace: namespace
  })

export const NewNumericNodeID = (namespace: uint16, id: uint32): NodeId =>
  new NodeId({
    Type: NodeIdTypeNumeric,
    Identifier: id,
    Namespace: namespace
  })

export const NewStringNodeId = (namespace: number, value: string): NodeId =>
  new NodeId({
    Type: NodeIdTypeString,
    Identifier: value,
    Namespace: namespace
  })

export const NewByteStringNodeId = (
  namespace: uint16,
  id: Uint8Array
): NodeId =>
  new NodeId({
    Type: NodeIdTypeByteString,
    Namespace: namespace,
    Identifier: id
  })
