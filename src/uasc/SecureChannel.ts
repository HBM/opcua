import { Message, ChunkHeader } from './Message'
import {
  mapNameToId,
  IdOpenSecureChannelRequestEncodingDefaultBinary,
  IdCreateSessionRequestEncodingDefaultBinary,
  IdActivateSessionRequestEncodingDefaultBinary,
  IdCreateSessionResponseEncodingDefaultBinary,
  IdActivateSessionResponseEncodingDefaultBinary
} from '../id/id'
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
  MessageSecurityModeNone,
  Request,
  BrowseResponse
} from '../ua/generated'
import SymmetricSecurityHeader from './SymmetricSecurityHeader'

export default class SecureChannel extends EventTarget {
  private secureChannelId: uint32
  private sequenceNumber: uint32
  private securityTokenId: uint32
  private requestId: uint32
  private connection: Connection
  private authenticationToken: NodeId | null

  // store request id and callback function (i.e. promise resolve function)
  private callbacks: Map<uint32, Function>

  constructor(endpointUrl: string) {
    super()
    this.secureChannelId = 0
    this.sequenceNumber = 0
    this.securityTokenId = 0
    this.requestId = 0
    this.connection = new Connection(endpointUrl)
    this.authenticationToken = null

    this.connection?.socket.addEventListener('message', this.onmessage)
    this.connection?.addEventListener('ack', this.onack)
    this.callbacks = new Map()
  }

  public onack = (): void => {
    // open secure channel
    const open = new OpenSecureChannelRequest({
      RequestHeader: new RequestHeader({
        RequestHandle: 0
      }),
      RequestType: SecurityTokenRequestTypeIssue,
      SecurityMode: MessageSecurityModeNone,
      RequestedLifetime: 3600000
    })
    this.send(open)
  }

  public send = (request: Request, resolve?: Function): void => {
    // set auth token if we already have one
    if (this.authenticationToken) {
      request.RequestHeader.AuthenticationToken = this.authenticationToken
    }

    // get type id from constructor name
    const typeId = mapNameToId.get(
      (request as object).constructor.name + 'EncodingDefaultBinary'
    )

    const message = new Message({
      ChunkHeader: new ChunkHeader({
        Header: new SecureConversationMessageHeader({
          IsFinal: ChunkTypeFinal,
          SecureChannelId: this.secureChannelId
        }),
        SequenceHeader: new SequenceHeader({
          SequenceNumber: this.sequenceNumber += 1,
          RequestId: this.requestId += 1
        })
      }),
      TypeId: new ExpandedNodeId({
        NodeId: NewFourByteNodeId(0, typeId as number)
      }),
      Service: request
    })

    // store resolve function for request id
    if (resolve) {
      this.callbacks.set(this.requestId, resolve)
    }

    // set message type and security header
    switch (typeId) {
      case IdOpenSecureChannelRequestEncodingDefaultBinary:
        message.ChunkHeader.Header.MessageType = MessageTypeOpenSecureChannel
        message.ChunkHeader.SecurityHeader = new AsymmetricSecurityHeader()
        break
      default:
        message.ChunkHeader.Header.MessageType = MessageTypeMessage
        message.ChunkHeader.SecurityHeader = new SymmetricSecurityHeader({
          TokenId: this.securityTokenId
        })
        break
    }

    // encode and send
    const body = message.encode()
    this.connection.socket.send(new Uint8Array(body))
  }

  public sendfoo = (request: unknown): void => {
    const message = new Message({
      ChunkHeader: new ChunkHeader({
        Header: new SecureConversationMessageHeader({
          MessageType: MessageTypeMessage,
          IsFinal: ChunkTypeFinal,
          SecureChannelId: this.secureChannelId
        }),
        SecurityHeader: new SymmetricSecurityHeader({
          TokenId: this.securityTokenId
        }),
        // AsymmetricSecurityHeader: new AsymmetricSecurityHeader(),
        SequenceHeader: new SequenceHeader({
          SequenceNumber: this.sequenceNumber += 1,
          RequestId: this.requestId += 1
        })
      }),
      TypeId: new ExpandedNodeId({
        NodeId: NewFourByteNodeId(
          0,
          IdCreateSessionRequestEncodingDefaultBinary
        )
      }),
      Service: request
    })
    const body = message.encode()

    this.connection.socket.send(new Uint8Array(body))
  }

  public sendactivate = (request: unknown): void => {
    const message = new Message({
      ChunkHeader: new ChunkHeader({
        Header: new SecureConversationMessageHeader({
          MessageType: MessageTypeMessage,
          IsFinal: ChunkTypeFinal,
          SecureChannelId: this.secureChannelId
        }),
        SecurityHeader: new SymmetricSecurityHeader({
          TokenId: this.securityTokenId
        }),
        SequenceHeader: new SequenceHeader({
          SequenceNumber: this.sequenceNumber += 1,
          RequestId: this.requestId += 1
        })
      }),
      TypeId: new ExpandedNodeId({
        NodeId: NewFourByteNodeId(
          0,
          IdActivateSessionRequestEncodingDefaultBinary
        )
      }),
      Service: request
    })
    const body = message.encode()

    this.connection.socket.send(new Uint8Array(body))
  }

  public onmessage = (event: MessageEvent): void => {
    const header = new ChunkHeader()
    let offset = header.decode(event.data)

    switch (header.Header.MessageType) {
      case 'OPN': {
        const typeId = new ExpandedNodeId()
        offset = decode({
          bytes: event.data,
          instance: typeId,
          position: offset
        })

        const response = new OpenSecureChannelResponse()
        offset = decode({
          bytes: event.data,
          instance: response,
          position: offset
        })

        this.secureChannelId = response.SecurityToken.ChannelId
        this.securityTokenId = response.SecurityToken.TokenId

        // create session
        const create = new CreateSessionRequest({})
        // const open = new OpenSecureChannelRequest({
        //   RequestHeader: new RequestHeader({
        //     RequestHandle: 0
        //   }),
        //   RequestType: SecurityTokenRequestTypeIssue,
        //   SecurityMode: MessageSecurityModeNone,
        //   RequestedLifetime: 3600000
        // })
        this.sendfoo(create)

        break
      }
      case 'MSG': {
        const typeId = new ExpandedNodeId()
        offset = decode({
          bytes: event.data,
          instance: typeId,
          position: offset
        })

        if (
          typeId.NodeId.Identifier ===
          IdCreateSessionResponseEncodingDefaultBinary
        ) {
          const response = new CreateSessionResponse()
          offset = decode({
            bytes: event.data,
            instance: response,
            position: offset
          })
          this.authenticationToken = response.AuthenticationToken
          const activate = new ActivateSessionRequest({
            RequestHeader: new RequestHeader({
              AuthenticationToken: this.authenticationToken
            })
          })
          this.sendactivate(activate)
        } else if (
          typeId.NodeId.Identifier ===
          IdActivateSessionResponseEncodingDefaultBinary
        ) {
          const activateSessionResponse = new ActivateSessionResponse()
          decode({
            bytes: event.data,
            instance: activateSessionResponse,
            position: offset
          })
          this.dispatchEvent(new Event('session:activate'))
        } else {
          const callback = this.callbacks.get(header.SequenceHeader.RequestId)
          if (callback) {
            const response = new BrowseResponse()
            decode({
              bytes: event.data,
              instance: response,
              position: offset
            })
            callback(response)
          }
        }

        break
      }

      default:
        break
    }
  }
}
