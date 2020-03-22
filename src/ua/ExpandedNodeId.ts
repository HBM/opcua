import NodeId, { NewTwoByteNodeId, NewFourByteNodeId } from './NodeId'
import Bucket from './Bucket'
import { uint8, uint16 } from '../types'

interface Options {
  NodeId?: NodeId
  NamespaceUri?: string
  ServerIndex?: number
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.2.2/#5.2.2.10
export default class ExpandedNodeId {
  public NodeId: NodeId
  public NamespaceUri: string
  public ServerIndex: number

  constructor(options?: Options) {
    this.NodeId = options?.NodeId ?? NewTwoByteNodeId(0)
    this.NamespaceUri = options?.NamespaceUri ?? ''
    this.ServerIndex = options?.ServerIndex ?? 0

    if (options?.NamespaceUri) {
      this.NodeId.setNamespaceUriFlag()
    }

    if (options?.ServerIndex) {
      this.NodeId.setServerIndexFlag()
    }
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeStruct(this.NodeId)
    if (this.hasNamespaceUri()) {
      bucket.writeString(this.NamespaceUri)
    }
    if (this.hasServerIndex()) {
      bucket.writeUint32(this.ServerIndex)
    }
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    bucket.readStruct(this.NodeId)
    if (this.hasNamespaceUri()) {
      this.NamespaceUri = bucket.readString()
    }
    if (this.hasServerIndex()) {
      this.ServerIndex = bucket.readUint32()
    }
    return bucket.position
  }

  public hasNamespaceUri(): boolean {
    return ((this.NodeId.Type >> 7) & 0x1) === 1
  }

  public hasServerIndex(): boolean {
    return ((this.NodeId.Type >> 6) & 0x1) === 1
  }
}

export const NewTwoByteExpandedNodeId = (id: uint8): ExpandedNodeId =>
  new ExpandedNodeId({
    NodeId: NewTwoByteNodeId(id)
  })

export const NewFourByteExpandedNodeId = (
  ns: uint8,
  id: uint16
): ExpandedNodeId =>
  new ExpandedNodeId({
    NodeId: NewFourByteNodeId(ns, id)
  })
