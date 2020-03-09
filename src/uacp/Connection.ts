import AcknowledgeMessage from './AcknowledgeMessage'
import HelloMessage from './HelloMessage'
import { encode } from '../ua/encode'
import ConnectionProtocolMessageHeader from './ConnectionProtocolMessageHeader'
// import OpenSecureChannelResponse from '../ua/OpenSecureChannelResponse'
// import { Decode } from '../ua/decode'

const KB = 1024
const MB = 1024 * KB
const DefaultMaxMessageSize = 2 * MB

const DefaultReceiveBufferSize = 0xffff
const DefaultSendBufferSize = 0xffff
const DefaultMaxChunkCount = 512

interface Options {
  endpoint: string
}

export default class Connection extends EventTarget {
  public acknowledge: AcknowledgeMessage
  public socket: WebSocket

  constructor(options: Options) {
    super()
    this.socket = new WebSocket(options.endpoint)
    this.socket.binaryType = 'arraybuffer'
    this.acknowledge = new AcknowledgeMessage({
      ReceiveBufferSize: DefaultReceiveBufferSize,
      SendBufferSize: DefaultSendBufferSize,
      MaxChunkCount: 0,
      MaxMessageSize: 0
    })

    this.socket.addEventListener('message', this.onmessage)
    this.socket.addEventListener('open', this.onopen)
    this.socket.addEventListener('error', this.onerror)
  }

  public onerror = (event: Event): void => {
    console.log('onerror', event)
  }

  public onmessage = (event: MessageEvent): void => {

    const header = new ConnectionProtocolMessageHeader()
    const offset = header.decode(event.data)

    switch (header.MessageType) {
      case 'ACK': {
        const acknowledge = new AcknowledgeMessage()
        acknowledge.decode(event.data, offset)

        if (acknowledge.ProtocolVersion !== 0) {
          throw new Error('invalid version')
        }

        if (acknowledge.MaxChunkCount === 0) {
          acknowledge.MaxChunkCount = DefaultMaxChunkCount
        }

        if (acknowledge.MaxMessageSize === 0) {
          acknowledge.MaxMessageSize = DefaultMaxMessageSize
        }

        this.acknowledge = acknowledge
        this.dispatchEvent(new Event('ack'))
        break
      }

      default:
        break
    }
  }

  public onopen = (): void => {
    const hello = new HelloMessage({
      ProtocolVersion: this.acknowledge.ProtocolVersion,
      ReceiveBufferSize: this.acknowledge.ReceiveBufferSize,
      SendBufferSize: this.acknowledge.SendBufferSize,
      MaxMessageSize: this.acknowledge.MaxMessageSize,
      MaxChunkCount: this.acknowledge.MaxChunkCount,
      EndpointUrl: 'foo'
    })
    this.send('HEL', 'F', hello)
  }

  public send = (
    MessageType: string,
    ChunkType: string,
    message: unknown
  ): void => {
    const body = encode({ instance: message })

    // 8 bytes for header length
    const header = new ConnectionProtocolMessageHeader({
      MessageType,
      ChunkType,
      MessageSize: body.byteLength + 8
    }).encode()

    const b = new Uint8Array(header.byteLength + body.byteLength)
    b.set(new Uint8Array(header))
    b.set(new Uint8Array(body), header.byteLength)

    this.socket.send(b)
  }
}
