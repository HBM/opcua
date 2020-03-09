import Bucket from './Bucket'
import DiagnosticInfo from './DiagnosticInfo'
import QualifiedName from './QualifiedName'
import LocalizedText from './LocalizedText'
import ExtensionObject from './ExtensionObject'
import NodeId from './NodeId'
import ExpandedNodeId from './ExpandedNodeId'
import Guid from './Guid'

// VariantArrayDimensions flags whether the array has more than one dimension
export const VariantArrayDimensions = 0x40

// VariantArrayValues flags whether the value is an array.
export const VariantArrayValues = 0x80

type TypeID = uint8

export const TypeIDNull: TypeID = 0 // not part of specification but some servers (e.g. Prosys) return it anyway
export const TypeIDBoolean: TypeID = 1
export const TypeIDSByte: TypeID = 2
export const TypeIDByte: TypeID = 3
export const TypeIDInt16: TypeID = 4
export const TypeIDUint16: TypeID = 5
export const TypeIDInt32: TypeID = 6
export const TypeIDUint32: TypeID = 7
export const TypeIDInt64: TypeID = 8
export const TypeIDUint64: TypeID = 9
export const TypeIDFloat: TypeID = 10
export const TypeIDDouble: TypeID = 11
export const TypeIDString: TypeID = 12
export const TypeIDDateTime: TypeID = 13
export const TypeIDGUID: TypeID = 14
export const TypeIDByteString: TypeID = 15
export const TypeIDXMLElement: TypeID = 16
export const TypeIDNodeID: TypeID = 17
export const TypeIDExpandedNodeID: TypeID = 18
export const TypeIDStatusCode: TypeID = 19
export const TypeIDQualifiedName: TypeID = 20
export const TypeIDLocalizedText: TypeID = 21
export const TypeIDExtensionObject: TypeID = 22
export const TypeIDDataValue: TypeID = 23
export const TypeIDVariant: TypeID = 24
export const TypeIDDiagnosticInfo: TypeID = 25

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
      case TypeIDBoolean: {
        b.writeBoolean(v as boolean)
        break
      }
      case TypeIDSByte: {
        b.writeInt8(v as int8)
        break
      }
      case TypeIDByte: {
        b.writeUint8(v as uint8)
        break
      }
      case TypeIDInt16: {
        b.writeInt16(v as int16)
        break
      }
      case TypeIDUint16: {
        b.writeUint16(v as uint16)
        break
      }
      case TypeIDInt32: {
        b.writeInt32(v as int32)
        break
      }
      case TypeIDUint32: {
        b.writeUint32(v as uint32)
        break
      }
      case TypeIDInt64: {
        b.writeInt64(v as int64)
        break
      }
      case TypeIDUint64: {
        b.writeUint64(v as uint64)
        break
      }
      case TypeIDFloat: {
        b.writeFloat32(v as float32)
        break
      }
      case TypeIDDouble: {
        b.writeFloat64(v as float64)
        break
      }
      case TypeIDString: {
        b.writeString(v as string)
        break
      }
      case TypeIDDateTime: {
        b.writeDate(v as Date)
        break
      }
      case TypeIDGUID: {
        b.writeStruct(v)
        break
      }
      case TypeIDByteString: {
        b.writeByteString(v as Uint8Array)
        break
      }
      //   case 'XMLElement': {
      //     b.writeString(string(v))
      //     break
      //   }
      case TypeIDNodeID: {
        b.writeStruct(v)
        break
      }
      case TypeIDExpandedNodeID: {
        b.writeStruct(v)
        break
      }
      case TypeIDStatusCode: {
        b.writeUint32(v as uint32)
        break
      }
      case TypeIDQualifiedName: {
        b.writeStruct(v)
        break
      }
      case TypeIDLocalizedText: {
        b.writeStruct(v)
        break
      }
      case TypeIDExtensionObject: {
        b.writeStruct(v)
        break
      }
      case TypeIDDataValue: {
        b.writeStruct(v)
        break
      }
      case TypeIDVariant: {
        b.writeStruct(v)
        break
      }
      case TypeIDDiagnosticInfo: {
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

  public type(): TypeID {
    return this.EncodingMask & 0x3f
  }

  public decodeValue(b: Bucket): unknown {
    switch (this.type()) {
      case TypeIDBoolean: {
        return b.readBoolean()
      }
      case TypeIDSByte: {
        return b.readInt8()
      }
      case TypeIDByte: {
        return b.readUint8()
      }
      case TypeIDInt16: {
        return b.readInt16()
      }
      case TypeIDUint16: {
        return b.readUint16()
      }
      case TypeIDInt32: {
        return b.readInt32()
      }
      case TypeIDUint32: {
        return b.readUint32()
      }
      case TypeIDInt64: {
        return b.readInt64()
      }
      case TypeIDUint64: {
        return b.readUint64()
      }
      case TypeIDFloat: {
        return b.readFloat32()
      }
      case TypeIDDouble: {
        return b.readFloat64()
      }
      case TypeIDString: {
        return b.readString()
      }
      case TypeIDDateTime: {
        return b.readDate()
      }
      case TypeIDGUID: {
        const v = new Guid()
        b.readStruct(v)
        return v
      }
      case TypeIDByteString: {
        return b.readByteString()
      }
      // case TypeIDXMLElement: {
      // return XMLElement(buf.ReadString())
      // break
      // }
      case TypeIDNodeID: {
        const v = new NodeId()
        b.readStruct(v)
        return v
      }
      case TypeIDExpandedNodeID: {
        const v = new ExpandedNodeId()
        b.readStruct(v)
        return v
      }
      case TypeIDStatusCode: {
        return b.readUint32()
      }
      case TypeIDQualifiedName: {
        const v = new QualifiedName()
        b.readStruct(v)
        return v
      }
      case TypeIDLocalizedText: {
        const v = new LocalizedText()
        b.readStruct(v)
        return v
      }
      case TypeIDExtensionObject: {
        const v = new ExtensionObject()
        b.readStruct(v)
        return v
      }
      case TypeIDDataValue: {
        const v = new Date()
        b.readStruct(v)
        return v
      }
      case TypeIDVariant: {
        // todo(fs): limit recursion depth to 100
        const v = new Variant()
        b.readStruct(v)
        return v
      }
      case TypeIDDiagnosticInfo: {
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
