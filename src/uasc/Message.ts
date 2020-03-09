import SecureConversationMessageHeader from './SecureConversationMessageHeader'
import AsymmetricSecurityHeader from './AsymmetricSecurityHeader'
import SymmetricSecurityHeader from './SymmetricSecurityHeader'
import SequenceHeader from './SequenceHeader'
import Bucket from '../ua/Bucket'
import ExpandedNodeId from '../ua/ExpandedNodeId'
import { decodeService } from '../ua/service'
import {
  MessageTypeMessage,
  MessageTypeCloseSecureChannel,
  MessageTypeOpenSecureChannel
} from './MessageType'

export class ChunkHeader {
  public Header: SecureConversationMessageHeader
  public SecurityHeader: AsymmetricSecurityHeader | SymmetricSecurityHeader
  public SequenceHeader: SequenceHeader

  constructor(options?: {
    Header?: SecureConversationMessageHeader
    SecurityHeader?: AsymmetricSecurityHeader | SymmetricSecurityHeader
    SequenceHeader?: SequenceHeader
  }) {
    this.Header = options?.Header ?? new SecureConversationMessageHeader()
    this.SecurityHeader =
      options?.SecurityHeader ?? new AsymmetricSecurityHeader()
    this.SequenceHeader = options?.SequenceHeader ?? new SequenceHeader()
  }

  // public encode(): ArrayBuffer {
  //   const bucket = new Bucket()
  //   bucket.writeStruct(this.Header)
  //   switch (this.Header.MessageType) {
  //     case MessageTypeOpenSecureChannel: {
  //       bucket.writeStruct(this.AsymmetricSecurityHeader)
  //       break
  //     }

  //     case MessageTypeMessage:
  //     case MessageTypeCloseSecureChannel: {
  //       bucket.writeStruct(this.SymmetricSecurityHeader)
  //       break
  //     }

  //     default:
  //       break
  //   }
  //   bucket.writeStruct(this.SequenceHeader)
  //   return bucket.bytes
  // }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)

    bucket.readStruct(this.Header)

    switch (this.Header.MessageType) {
      case MessageTypeOpenSecureChannel: {
        this.SecurityHeader = new AsymmetricSecurityHeader()
        bucket.readStruct(this.SecurityHeader)
        break
      }

      case MessageTypeMessage:
      case MessageTypeCloseSecureChannel: {
        this.SecurityHeader = new SymmetricSecurityHeader()
        bucket.readStruct(this.SecurityHeader)
        break
      }

      default:
        break
    }

    bucket.readStruct(this.SequenceHeader)

    return bucket.position
  }
}

export class Message {
  public ChunkHeader: ChunkHeader
  public TypeId: ExpandedNodeId
  public Service: unknown

  constructor(options?: {
    ChunkHeader?: ChunkHeader
    TypeId?: ExpandedNodeId
    Service?: unknown
  }) {
    this.ChunkHeader = options?.ChunkHeader ?? new ChunkHeader()
    this.TypeId = options?.TypeId ?? new ExpandedNodeId()
    this.Service = options?.Service
  }

  public decode(b: ArrayBuffer, position?: number): number {
    // let pos = 0
    position = this.ChunkHeader.decode(b)
    position = this.ChunkHeader.SequenceHeader.decode(b, position)

    const { typeId, service } = decodeService(b, position)
    this.TypeId = typeId
    this.Service = service

    return b.byteLength
  }

  public encode(): ArrayBuffer {
    const body = new Bucket()
    // body.writeStruct(this.MessageHeader)
    switch (this.ChunkHeader.Header.MessageType) {
      case MessageTypeOpenSecureChannel: {
        body.writeStruct(this.ChunkHeader.SecurityHeader)
        break
      }

      case MessageTypeMessage:
      case MessageTypeCloseSecureChannel: {
        body.writeStruct(this.ChunkHeader.SecurityHeader)
        break
      }

      default:
        throw new Error(
          `invalid message type ${this.ChunkHeader.Header.MessageType}`
        )
    }
    body.writeStruct(this.ChunkHeader.SequenceHeader)
    body.writeStruct(this.TypeId)
    body.writeStruct(this.Service)
    this.ChunkHeader.Header.MessageSize = 12 + body.bytes.byteLength
    const bucket = new Bucket()
    bucket.writeStruct(this.ChunkHeader.Header)
    bucket.write(body.bytes)
    return bucket.bytes
  }
}
