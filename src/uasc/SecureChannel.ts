import { Message, ChunkHeader } from './Message'
import {
  IdOpenSecureChannelRequest,
  IdCreateSessionRequest,
  IdActivateSessionRequest,
  IdCreateSessionResponse,
  IdActivateSessionResponse
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
  MessageSecurityModeNone
} from '../ua/generated'
import SymmetricSecurityHeader from './SymmetricSecurityHeader'

interface Options {
  connection?: Connection
}

export default class SecureChannel {
  private secureChannelId: uint32
  private sequenceNumber: uint32
  private securityTokenId: uint32
  private requestId: uint32
  private connection: Connection
  private authenticationToken: NodeId | null
  // private requestHeader: RequestHeader

  constructor(options?: Options) {
    this.secureChannelId = 0
    this.sequenceNumber = 0
    this.securityTokenId = 0
    this.requestId = 0
    this.connection =
      options?.connection ?? new Connection({ endpoint: 'ws://localhost:1234' })
    this.authenticationToken = null
    // this.requestHeader = new RequestHeader()

    this.connection?.socket.addEventListener('message', this.onmessage)
    this.connection?.addEventListener('ack', this.onack)
    // this.socket.addEventListener('message', this.onmessage)
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

  public send = (request: unknown): void => {
    const message = new Message({
      ChunkHeader: new ChunkHeader({
        Header: new SecureConversationMessageHeader({
          MessageType: MessageTypeOpenSecureChannel,
          IsFinal: ChunkTypeFinal,
          SecureChannelId: this.secureChannelId
        }),
        SecurityHeader: new AsymmetricSecurityHeader(),
        SequenceHeader: new SequenceHeader({
          SequenceNumber: this.sequenceNumber++,
          RequestId: this.requestId++
        })
      }),
      TypeId: new ExpandedNodeId({
        NodeId: NewFourByteNodeId(0, IdOpenSecureChannelRequest)
      }),
      Service: request
    })
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
          SequenceNumber: this.sequenceNumber++,
          RequestId: this.requestId++
        })
      }),
      TypeId: new ExpandedNodeId({
        NodeId: NewFourByteNodeId(0, IdCreateSessionRequest)
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
          SequenceNumber: this.sequenceNumber++,
          RequestId: this.requestId++
        })
      }),
      TypeId: new ExpandedNodeId({
        NodeId: NewFourByteNodeId(0, IdActivateSessionRequest)
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

        if (typeId.NodeId.Identifier === IdCreateSessionResponse) {
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
        } else if (typeId.NodeId.Identifier === IdActivateSessionResponse) {
          const activateSessionResponse = new ActivateSessionResponse()
          decode({
            bytes: event.data,
            instance: activateSessionResponse,
            position: offset
          })
        }

        break
      }

      default:
        break
    }
  }

  // public newRequestMessage(v: unknown): Message {

  //   this.requestHeader.RequestHandle++
  //   this.requestHeader.Timestamp = new Date()
  //   this.requestHeader.TimeoutHint = 5000

  //   return this.newMessage(v, 123)
  // }

  // public newMessage(service: unknown, id: number): Message {
  //   switch (id) {
  //     case IdOpenSecureChannelRequest:
  //       return new Message({
  //         MessageHeader: new MessageHeader({
  //           Header: new Header({
  //             MessageType: MessageTypeOpenSecureChannel,
  //             IsFinal: ChunkTypeFinal,
  //             SecureChannelId: this.secureChannelId
  //           }),
  //           AsymmetricSecurityHeader: new AsymmetricSecurityHeader(),
  //           SequenceHeader: new SequenceHeader({
  //             SequenceNumber: this.sequenceNumber,
  //             RequestId: this.requestId
  //           })
  //         }),
  //         TypeId: new ExpandedNodeId({
  //           NodeId: NewFourByteNodeId(0, id)
  //         }),
  //         Service: service
  //       })

  //     case IdCloseSecureChannelRequest:
  //       return new Message({
  //         MessageHeader: new MessageHeader({
  //           Header: new Header({
  //             MessageType: MessageTypeCloseSecureChannel,
  //             IsFinal: ChunkTypeFinal,
  //             SecureChannelId: this.secureChannelId
  //           }),
  //           SymmetricSecurityHeader: new SymmetricSecurityHeader({
  //             TokenId: this.securityTokenID
  //           }),
  //           SequenceHeader: new SequenceHeader({
  //             SequenceNumber: this.sequenceNumber,
  //             RequestId: this.requestId
  //           })
  //         }),
  //         TypeId: new ExpandedNodeId({
  //           NodeId: NewFourByteNodeId(0, id)
  //         }),
  //         Service: service
  //       })

  //     default:
  //       return new Message({
  //         MessageHeader: new MessageHeader({
  //           Header: new Header({
  //             MessageType: MessageTypeMessage,
  //             IsFinal: ChunkTypeFinal,
  //             SecureChannelId: this.secureChannelId
  //           }),
  //           SymmetricSecurityHeader: new SymmetricSecurityHeader({
  //             TokenId: this.securityTokenID
  //           }),
  //           SequenceHeader: new SequenceHeader({
  //             SequenceNumber: this.sequenceNumber,
  //             RequestId: this.requestId
  //           })
  //         }),
  //         TypeId: new ExpandedNodeId({
  //           NodeId: NewFourByteNodeId(0, id)
  //         }),
  //         Service: service
  //       })
  //   }
  // }
}
