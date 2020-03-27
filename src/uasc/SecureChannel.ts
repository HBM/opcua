import { Message, ChunkHeader } from './Message'
import { Id } from '../id/id'
import ExpandedNodeId from '../ua/ExpandedNodeId'
import NodeId, { NewFourByteNodeId } from '../ua/NodeId'
import SecureConversationMessageHeader from './SecureConversationMessageHeader'
import { MessageTypeOpenSecureChannel, MessageTypeMessage } from './MessageType'
import { ChunkTypeFinal } from './ChunkType'
import SequenceHeader from './SequenceHeader'
import AsymmetricSecurityHeader from './AsymmetricSecurityHeader'
import Connection from '../uacp/Connection'
import decode from '../ua/decode'
// import OpenSecureChannelResponse from '../ua/OpenSecureChannelResponse'
import { SecurityTokenRequestTypeIssue } from '../ua/SecurityTokenRequestType'
import {
  OpenSecureChannelRequest,
  OpenSecureChannelResponse,
  RequestHeader,
  CreateSessionRequest,
  CreateSessionResponse,
  ActivateSessionRequest,
  ActivateSessionResponse,
  MessageSecurityMode,
  Request,
} from '../ua/generated'
import SymmetricSecurityHeader from './SymmetricSecurityHeader'
import factory from '../ua/factory'
import AcknowledgeMessage from '../uacp/AcknowledgeMessage'
import { uint32 } from '../types'

export default class SecureChannel {
  private secureChannelId: uint32
  private sequenceNumber: uint32
  private securityTokenId: uint32
  private requestId: uint32
  private connection: Connection
  private authenticationToken: NodeId | null

  // store request id and callback function (i.e. promise resolve function)
  private callbacks: Map<uint32, Function>

  constructor(endpointUrl: string) {
    this.secureChannelId = 0
    this.sequenceNumber = 0
    this.securityTokenId = 0
    this.requestId = 0
    this.connection = new Connection(endpointUrl)
    this.authenticationToken = null
    this.callbacks = new Map()
  }

  public async open(): Promise<void> {
    await this.connection.open()
    if (this.connection.socket) {
      this.connection.socket.addEventListener('message', this.onmessage)
    }
  }

  public hello(): Promise<AcknowledgeMessage> {
    return this.connection.hello()
  }

  public openSecureChannel(): Promise<OpenSecureChannelResponse> {
    return new Promise((resolve) => {
      const open = new OpenSecureChannelRequest({
        RequestHeader: new RequestHeader(),
        RequestType: SecurityTokenRequestTypeIssue,
        SecurityMode: MessageSecurityMode.None,
        RequestedLifetime: 3600000,
      })
      this.send(open, resolve)
    })
  }

  public createSession(): Promise<CreateSessionResponse> {
    return new Promise((resolve) => {
      const create = new CreateSessionRequest()
      this.send(create, resolve)
    })
  }

  public activateSession(): Promise<ActivateSessionResponse> {
    return new Promise((resolve) => {
      const activate = new ActivateSessionRequest()
      this.send(activate, resolve)
    })
  }

  public send = (request: Request, resolve?: Function): void => {
    // set auth token if we already have one
    if (this.authenticationToken) {
      request.RequestHeader.AuthenticationToken = this.authenticationToken
    }

    // get type id from constructor name
    const typeId =
      Id[
        ((request as object).constructor.name +
          'EncodingDefaultBinary') as keyof typeof Id
      ]

    const message = new Message({
      ChunkHeader: new ChunkHeader({
        Header: new SecureConversationMessageHeader({
          IsFinal: ChunkTypeFinal,
          SecureChannelId: this.secureChannelId,
        }),
        SequenceHeader: new SequenceHeader({
          SequenceNumber: this.sequenceNumber += 1,
          RequestId: this.requestId += 1,
        }),
      }),
      TypeId: new ExpandedNodeId({
        NodeId: NewFourByteNodeId(0, typeId as number),
      }),
      Service: request,
    })

    // store resolve function for request id
    if (resolve) {
      this.callbacks.set(this.requestId, resolve)
    }

    // set message type and security header
    switch (typeId) {
      case Id.OpenSecureChannelRequestEncodingDefaultBinary:
        message.ChunkHeader.Header.MessageType = MessageTypeOpenSecureChannel
        message.ChunkHeader.SecurityHeader = new AsymmetricSecurityHeader()
        break
      default:
        message.ChunkHeader.Header.MessageType = MessageTypeMessage
        message.ChunkHeader.SecurityHeader = new SymmetricSecurityHeader({
          TokenId: this.securityTokenId,
        })
        break
    }

    // encode and send
    const body = message.encode()
    if (this.connection.socket) {
      this.connection.socket.send(new Uint8Array(body))
    }
  }

  public onmessage = (event: MessageEvent): void => {
    const header = new ChunkHeader()
    let offset = header.decode(event.data)

    const typeId = new ExpandedNodeId()
    offset = decode({
      bytes: event.data,
      instance: typeId,
      position: offset,
    })

    switch (header.Header.MessageType) {
      case 'OPN': {
        const response = new OpenSecureChannelResponse()
        offset = decode({
          bytes: event.data,
          instance: response,
          position: offset,
        })

        this.secureChannelId = response.SecurityToken.ChannelId
        this.securityTokenId = response.SecurityToken.TokenId

        const callback = this.callbacks.get(header.SequenceHeader.RequestId)
        if (callback) {
          callback(response)
        }

        break
      }
      case 'MSG': {
        const callback = this.callbacks.get(header.SequenceHeader.RequestId)
        if (!callback) {
          return
        }

        const name = Id[typeId.NodeId.Identifier as number]

        if (!name) {
          return
        }

        const instance = factory(name)
        decode({
          bytes: event.data,
          instance,
          position: offset,
        })

        if (
          typeId.NodeId.Identifier ===
          Id.CreateSessionResponseEncodingDefaultBinary
        ) {
          this.authenticationToken = (instance as CreateSessionResponse).AuthenticationToken
        }

        callback(instance)
        // remove callback from map
        this.callbacks.delete(header.SequenceHeader.RequestId)

        break
      }

      default:
        break
    }
  }
}
