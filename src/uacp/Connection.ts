import AcknowledgeMessage from './AcknowledgeMessage'
import HelloMessage from './HelloMessage'
import { encode } from '../ua/encode'
import ConnectionProtocolMessageHeader from './ConnectionProtocolMessageHeader'

const KB = 1024
const MB = 1024 * KB
const DefaultMaxMessageSize = 2 * MB

const DefaultReceiveBufferSize = 0xffff
const DefaultSendBufferSize = 0xffff
const DefaultMaxChunkCount = 512

export default class Connection {
  public endpointUrl: string
  public socket: WebSocket | null
  private resolvers: Map<string, Function>

  constructor(endpointUrl: string) {
    this.endpointUrl = endpointUrl
    this.socket = null
    this.resolvers = new Map()
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

        const resolve = this.resolvers.get('hello')
        if (resolve) {
          resolve(acknowledge)
          this.resolvers.delete('hello')
        }

        break
      }

      default:
        break
    }
  }

  public open(): Promise<void> {
    return new Promise((resolve) => {
      this.socket = new WebSocket(this.endpointUrl)
      this.socket.binaryType = 'arraybuffer'
      this.resolvers.set('open', resolve)

      this.socket.addEventListener('message', this.onmessage)
      this.socket.addEventListener('open', this.onopen)
      this.socket.addEventListener('error', this.onerror)
    })
  }

  public hello(): Promise<AcknowledgeMessage> {
    return new Promise((resolve) => {
      this.resolvers.set('hello', resolve)

      const hello = new HelloMessage({
        ProtocolVersion: 0,
        ReceiveBufferSize: DefaultReceiveBufferSize,
        SendBufferSize: DefaultSendBufferSize,
        MaxMessageSize: 0,
        MaxChunkCount: 0,
        EndpointUrl: this.endpointUrl,
      })
      this.send('HEL', 'F', hello)
    })
  }

  public onopen = (): void => {
    const resolve = this.resolvers.get('open')
    if (resolve) {
      resolve()
      this.resolvers.delete('open')
    }
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
      MessageSize: body.byteLength + 8,
    }).encode()

    const b = new Uint8Array(header.byteLength + body.byteLength)
    b.set(new Uint8Array(header))
    b.set(new Uint8Array(body), header.byteLength)

    if (this.socket) {
      this.socket.send(b)
    }
  }
}
