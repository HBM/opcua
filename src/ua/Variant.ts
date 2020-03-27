import Bucket from './Bucket'
import DiagnosticInfo from './DiagnosticInfo'
import QualifiedName from './QualifiedName'
import LocalizedText from './LocalizedText'
import ExtensionObject from './ExtensionObject'
import NodeId from './NodeId'
import ExpandedNodeId from './ExpandedNodeId'
import Guid from './Guid'
import { TypeId } from './enums'
import {
  EnDecoder,
  uint8,
  int32,
  int8,
  int16,
  uint16,
  uint32,
  int64,
  uint64,
  float32,
  float64,
} from '../types'

// VariantArrayDimensions flags whether the array has more than one dimension
export const VariantArrayDimensions = 0x40

// VariantArrayValues flags whether the value is an array.
export const VariantArrayValues = 0x80

export default class Variant implements EnDecoder {
  public EncodingMask: uint8
  public ArrayLength: int32
  public Value: unknown
  public ArrayDimensionsLength: int32 | null
  public ArrayDimensions: int32[] | null

  constructor(options?: {
    EncodingMask?: uint8
    ArrayLength?: int32
    Value: unknown
    ArrayDimensionsLength?: int32
    ArrayDimensions?: int32[]
  }) {
    this.EncodingMask = options?.EncodingMask ?? 0
    this.ArrayLength = options?.ArrayLength ?? 0
    this.Value = options?.Value ?? null
    this.ArrayDimensionsLength = options?.ArrayDimensionsLength ?? null
    this.ArrayDimensions = options?.ArrayDimensions ?? null
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.EncodingMask = bucket.readUint8()

    if (!this.has(VariantArrayValues)) {
      this.Value = this.decodeValue(bucket)
      return bucket.position
    }

    this.ArrayLength = bucket.readInt32()

    return bucket.position
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint8(this.EncodingMask)
    if (this.has(VariantArrayValues)) {
      bucket.writeInt32(this.ArrayLength)
    }

    this.encodeRecursive(bucket, this.Value)

    return bucket.bytes
  }

  public encodeRecursive(b: Bucket, val: unknown): void {
    this.encodeValue(b, val)
  }

  public encodeValue(b: Bucket, v: unknown): void {
    switch (this.type()) {
      case TypeId.Boolean: {
        b.writeBoolean(v as boolean)
        break
      }
      case TypeId.SByte: {
        b.writeInt8(v as int8)
        break
      }
      case TypeId.Byte: {
        b.writeUint8(v as uint8)
        break
      }
      case TypeId.Int16: {
        b.writeInt16(v as int16)
        break
      }
      case TypeId.Uint16: {
        b.writeUint16(v as uint16)
        break
      }
      case TypeId.Int32: {
        b.writeInt32(v as int32)
        break
      }
      case TypeId.Uint32: {
        b.writeUint32(v as uint32)
        break
      }
      case TypeId.Int64: {
        b.writeInt64(v as int64)
        break
      }
      case TypeId.Uint64: {
        b.writeUint64(v as uint64)
        break
      }
      case TypeId.Float: {
        b.writeFloat32(v as float32)
        break
      }
      case TypeId.Double: {
        b.writeFloat64(v as float64)
        break
      }
      case TypeId.String: {
        b.writeString(v as string)
        break
      }
      case TypeId.DateTime: {
        b.writeDate(v as Date)
        break
      }
      case TypeId.GUID: {
        b.writeStruct(v)
        break
      }
      case TypeId.ByteString: {
        b.writeByteString(v as Uint8Array)
        break
      }
      //   case 'XMLElement': {
      //     b.writeString(string(v))
      //     break
      //   }
      case TypeId.NodeID: {
        b.writeStruct(v)
        break
      }
      case TypeId.ExpandedNodeID: {
        b.writeStruct(v)
        break
      }
      case TypeId.StatusCode: {
        b.writeUint32(v as uint32)
        break
      }
      case TypeId.QualifiedName: {
        b.writeStruct(v)
        break
      }
      case TypeId.LocalizedText: {
        b.writeStruct(v)
        break
      }
      case TypeId.ExtensionObject: {
        b.writeStruct(v)
        break
      }
      case TypeId.DataValue: {
        b.writeStruct(v)
        break
      }
      case TypeId.Variant: {
        b.writeStruct(v)
        break
      }
      case TypeId.DiagnosticInfo: {
        b.writeStruct(v)
        break
      }
      default:
        throw new Error(`unsupported type: ${this.type()}`)
    }
  }

  public has(mask: uint8): boolean {
    return (this.EncodingMask & mask) === mask
  }

  public type(): TypeId {
    return this.EncodingMask & 0x3f
  }

  public decodeValue(b: Bucket): unknown {
    switch (this.type()) {
      case TypeId.Boolean: {
        return b.readBoolean()
      }
      case TypeId.SByte: {
        return b.readInt8()
      }
      case TypeId.Byte: {
        return b.readUint8()
      }
      case TypeId.Int16: {
        return b.readInt16()
      }
      case TypeId.Uint16: {
        return b.readUint16()
      }
      case TypeId.Int32: {
        return b.readInt32()
      }
      case TypeId.Uint32: {
        return b.readUint32()
      }
      case TypeId.Int64: {
        return b.readInt64()
      }
      case TypeId.Uint64: {
        return b.readUint64()
      }
      case TypeId.Float: {
        return b.readFloat32()
      }
      case TypeId.Double: {
        return b.readFloat64()
      }
      case TypeId.String: {
        return b.readString()
      }
      case TypeId.DateTime: {
        return b.readDate()
      }
      case TypeId.GUID: {
        const v = new Guid()
        b.readStruct(v)
        return v
      }
      case TypeId.ByteString: {
        return b.readByteString()
      }
      // case TypeIDXMLElement: {
      // return XMLElement(buf.ReadString())
      // break
      // }
      case TypeId.NodeID: {
        const v = new NodeId()
        b.readStruct(v)
        return v
      }
      case TypeId.ExpandedNodeID: {
        const v = new ExpandedNodeId()
        b.readStruct(v)
        return v
      }
      case TypeId.StatusCode: {
        return b.readUint32()
      }
      case TypeId.QualifiedName: {
        const v = new QualifiedName()
        b.readStruct(v)
        return v
      }
      case TypeId.LocalizedText: {
        const v = new LocalizedText()
        b.readStruct(v)
        return v
      }
      case TypeId.ExtensionObject: {
        const v = new ExtensionObject()
        b.readStruct(v)
        return v
      }
      case TypeId.DataValue: {
        const v = new Date()
        b.readStruct(v)
        return v
      }
      case TypeId.Variant: {
        // todo(fs): limit recursion depth to 100
        const v = new Variant()
        b.readStruct(v)
        return v
      }
      case TypeId.DiagnosticInfo: {
        // todo(fs): limit recursion depth to 100
        const v = new DiagnosticInfo()
        b.readStruct(v)
        return v
      }
      default:
        return null
    }
  }
}
