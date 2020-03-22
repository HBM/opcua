import Bucket from './Bucket'
import DiagnosticInfo from './DiagnosticInfo'
import QualifiedName from './QualifiedName'
import LocalizedText from './LocalizedText'
import ExtensionObject from './ExtensionObject'
import NodeId from './NodeId'
import ExpandedNodeId from './ExpandedNodeId'
import Guid from './Guid'
import {
  TypeIdBoolean,
  TypeIdSByte,
  TypeIdByte,
  TypeIdInt16,
  TypeIdUint16,
  TypeIdInt32,
  TypeIdUint32,
  TypeIdInt64,
  TypeIdUint64,
  TypeIdFloat,
  TypeIdDouble,
  TypeIdString,
  TypeIdDateTime,
  TypeIdGUID,
  TypeIdByteString,
  TypeIdNodeID,
  TypeIdExpandedNodeID,
  TypeIdStatusCode,
  TypeIdQualifiedName,
  TypeIdLocalizedText,
  TypeIdExtensionObject,
  TypeIdDataValue,
  TypeIdVariant,
  TypeIdDiagnosticInfo
} from './enums'
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
  TypeId
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
      case TypeIdBoolean: {
        b.writeBoolean(v as boolean)
        break
      }
      case TypeIdSByte: {
        b.writeInt8(v as int8)
        break
      }
      case TypeIdByte: {
        b.writeUint8(v as uint8)
        break
      }
      case TypeIdInt16: {
        b.writeInt16(v as int16)
        break
      }
      case TypeIdUint16: {
        b.writeUint16(v as uint16)
        break
      }
      case TypeIdInt32: {
        b.writeInt32(v as int32)
        break
      }
      case TypeIdUint32: {
        b.writeUint32(v as uint32)
        break
      }
      case TypeIdInt64: {
        b.writeInt64(v as int64)
        break
      }
      case TypeIdUint64: {
        b.writeUint64(v as uint64)
        break
      }
      case TypeIdFloat: {
        b.writeFloat32(v as float32)
        break
      }
      case TypeIdDouble: {
        b.writeFloat64(v as float64)
        break
      }
      case TypeIdString: {
        b.writeString(v as string)
        break
      }
      case TypeIdDateTime: {
        b.writeDate(v as Date)
        break
      }
      case TypeIdGUID: {
        b.writeStruct(v)
        break
      }
      case TypeIdByteString: {
        b.writeByteString(v as Uint8Array)
        break
      }
      //   case 'XMLElement': {
      //     b.writeString(string(v))
      //     break
      //   }
      case TypeIdNodeID: {
        b.writeStruct(v)
        break
      }
      case TypeIdExpandedNodeID: {
        b.writeStruct(v)
        break
      }
      case TypeIdStatusCode: {
        b.writeUint32(v as uint32)
        break
      }
      case TypeIdQualifiedName: {
        b.writeStruct(v)
        break
      }
      case TypeIdLocalizedText: {
        b.writeStruct(v)
        break
      }
      case TypeIdExtensionObject: {
        b.writeStruct(v)
        break
      }
      case TypeIdDataValue: {
        b.writeStruct(v)
        break
      }
      case TypeIdVariant: {
        b.writeStruct(v)
        break
      }
      case TypeIdDiagnosticInfo: {
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
      case TypeIdBoolean: {
        return b.readBoolean()
      }
      case TypeIdSByte: {
        return b.readInt8()
      }
      case TypeIdByte: {
        return b.readUint8()
      }
      case TypeIdInt16: {
        return b.readInt16()
      }
      case TypeIdUint16: {
        return b.readUint16()
      }
      case TypeIdInt32: {
        return b.readInt32()
      }
      case TypeIdUint32: {
        return b.readUint32()
      }
      case TypeIdInt64: {
        return b.readInt64()
      }
      case TypeIdUint64: {
        return b.readUint64()
      }
      case TypeIdFloat: {
        return b.readFloat32()
      }
      case TypeIdDouble: {
        return b.readFloat64()
      }
      case TypeIdString: {
        return b.readString()
      }
      case TypeIdDateTime: {
        return b.readDate()
      }
      case TypeIdGUID: {
        const v = new Guid()
        b.readStruct(v)
        return v
      }
      case TypeIdByteString: {
        return b.readByteString()
      }
      // case TypeIDXMLElement: {
      // return XMLElement(buf.ReadString())
      // break
      // }
      case TypeIdNodeID: {
        const v = new NodeId()
        b.readStruct(v)
        return v
      }
      case TypeIdExpandedNodeID: {
        const v = new ExpandedNodeId()
        b.readStruct(v)
        return v
      }
      case TypeIdStatusCode: {
        return b.readUint32()
      }
      case TypeIdQualifiedName: {
        const v = new QualifiedName()
        b.readStruct(v)
        return v
      }
      case TypeIdLocalizedText: {
        const v = new LocalizedText()
        b.readStruct(v)
        return v
      }
      case TypeIdExtensionObject: {
        const v = new ExtensionObject()
        b.readStruct(v)
        return v
      }
      case TypeIdDataValue: {
        const v = new Date()
        b.readStruct(v)
        return v
      }
      case TypeIdVariant: {
        // todo(fs): limit recursion depth to 100
        const v = new Variant()
        b.readStruct(v)
        return v
      }
      case TypeIdDiagnosticInfo: {
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
