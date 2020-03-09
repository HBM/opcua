import Bucket from './Bucket'
import { StatusOK } from './StatusCode'

interface Options {
  EncodingMask?: uint8
  SymbolicId?: int32
  NamespaceUri?: int32
  Locale?: int32
  LocalizedText?: int32
  AdditionalInfo?: string
  InnerStatusCode?: StatusCode
  InnerDiagnosticInfo?: null | DiagnosticInfo
}

export const SymbolicId = 0x1
export const NamespaceUri = 0x2
export const LocalizedText = 0x4
export const Locale = 0x8
export const AdditionalInfo = 0x10
export const InnerStatusCode = 0x20
export const InnerDiagnosticInfo = 0x40

// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.2.2/#5.2.2.12
export default class DiagnosticInfo implements EnDecoder {
  public EncodingMask: uint8
  public SymbolicId: int32
  public NamespaceUri: int32
  public Locale: int32
  public LocalizedText: int32
  public AdditionalInfo: string
  public InnerStatusCode: StatusCode
  public InnerDiagnosticInfo: DiagnosticInfo | null

  constructor(options?: Options) {
    this.EncodingMask = options?.EncodingMask ?? 0x00
    this.SymbolicId = options?.SymbolicId ?? 0
    this.NamespaceUri = options?.NamespaceUri ?? 0
    this.Locale = options?.Locale ?? 0
    this.LocalizedText = options?.LocalizedText ?? 0
    this.AdditionalInfo = options?.AdditionalInfo ?? ''
    this.InnerStatusCode = options?.InnerStatusCode ?? StatusOK
    this.InnerDiagnosticInfo = options?.InnerDiagnosticInfo ?? null
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.EncodingMask = bucket.readUint8()

    if (this.has(SymbolicId)) {
      this.SymbolicId = bucket.readInt32()
    }

    if (this.has(NamespaceUri)) {
      this.NamespaceUri = bucket.readInt32()
    }

    if (this.has(Locale)) {
      this.Locale = bucket.readInt32()
    }

    if (this.has(LocalizedText)) {
      this.LocalizedText = bucket.readInt32()
    }

    if (this.has(AdditionalInfo)) {
      this.AdditionalInfo = bucket.readString()
    }

    if (this.has(InnerStatusCode)) {
      this.InnerStatusCode = bucket.readUint32()
    }

    if (this.has(InnerDiagnosticInfo)) {
      this.InnerDiagnosticInfo = new DiagnosticInfo()
      bucket.readStruct(this.InnerDiagnosticInfo)
    }

    return bucket.position
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint8(this.EncodingMask)

    if (this.has(SymbolicId)) {
      bucket.writeInt32(this.SymbolicId)
    }

    if (this.has(NamespaceUri)) {
      bucket.writeInt32(this.NamespaceUri)
    }

    if (this.has(Locale)) {
      bucket.writeInt32(this.Locale)
    }

    if (this.has(LocalizedText)) {
      bucket.writeInt32(this.LocalizedText)
    }

    if (this.has(AdditionalInfo)) {
      bucket.writeString(this.AdditionalInfo)
    }

    if (this.has(InnerStatusCode)) {
      bucket.writeUint32(this.InnerStatusCode)
    }

    if (this.has(InnerDiagnosticInfo)) {
      bucket.writeStruct(this.InnerDiagnosticInfo)
    }

    return bucket.bytes
  }

  public has(mask: uint8): boolean {
    return (this.EncodingMask & mask) === mask
  }
}
