import Bucket from './Bucket'
import factory from './factory'
import { mapIdToName } from '../id/id'
import ExpandedNodeId, { NewTwoByteExpandedNodeId } from './ExpandedNodeId'
import { uint8, EnDecoder } from '../types'

export const ExtensionObjectEmpty = 0
export const ExtensionObjectBinary = 1

interface Options {
  TypeId?: ExpandedNodeId
  Encoding?: uint8
  Value?: unknown
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.2.2/#5.2.2.15
export default class ExtensionObject implements EnDecoder {
  public TypeId: ExpandedNodeId
  public Encoding: uint8
  public Value: unknown

  constructor(options?: Options) {
    this.TypeId = options?.TypeId ?? NewTwoByteExpandedNodeId(0)
    this.Encoding = options?.Encoding ?? 0
    this.Value = options?.Value ?? null
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeStruct(this.TypeId)
    bucket.writeUint8(this.Encoding)
    if (this.Encoding == ExtensionObjectEmpty) {
      return bucket.bytes
    }

    const body = new Bucket()
    body.writeStruct(this.Value)

    bucket.writeUint32(body.bytes.byteLength)
    bucket.write(body.bytes)

    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)

    this.TypeId = new ExpandedNodeId()
    bucket.readStruct(this.TypeId)

    this.Encoding = bucket.readUint8()

    if (this.Encoding === ExtensionObjectEmpty) {
      return bucket.position
    }

    const length = bucket.readUint32()
    if (length === 0 || length === 0xffffffff) {
      return bucket.position
    }

    const name = mapIdToName.get(this.TypeId.NodeId.Identifier as number)
    if (name === undefined) {
      throw new Error(
        `invalid extension object with id ${this.TypeId.NodeId.Identifier}`
      )
    }

    this.Value = factory(name)
    bucket.readStruct(this.Value)

    return bucket.position
  }
}
