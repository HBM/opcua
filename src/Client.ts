import ConnectionProtocolMessageHeader from './uacp/ConnectionProtocolMessageHeader'
import HelloMessage from './uacp/HelloMessage'
import { OpenSecureChannelRequest } from './ua/generated'
import { encode } from './ua/encode'

export default class Client {
  public socket: WebSocket

  constructor(url: string) {
    this.socket = new WebSocket(url)
    this.socket.binaryType = 'arraybuffer'

    this.socket.onmessage = this.onmessage
    this.socket.onopen = this.onopen
  }

  public onopen(event: Event): void {
    this.hello()
  }

  public hello(): void {
    // send hello message
    const hello = new HelloMessage({
      ProtocolVersion: 0,
      ReceiveBufferSize: 65536,
      SendBufferSize: 65536,
      MaxMessageSize: 16777216,
      MaxChunkCount: 5000,
      EndpointUrl: 'opc.tcp://zemirco:4840/'
    })
    this.send('HELF', hello)
  }

  public onmessage(event: MessageEvent): void {
    const data = new Uint8Array(event.data)

    const header = new ConnectionProtocolMessageHeader()
    header.decode(data)


    switch (header.MessageType) {
      case 'ACK': {
        const open = new OpenSecureChannelRequest()
        this.send('OPNF', open)
        break
      }

      default:
        break
    }
  }

  public send(type: string, instance: unknown): void {
    const body = encode({ instance })

    const header = new ConnectionProtocolMessageHeader({
      MessageType: type.substring(0, 3),
      ChunkType: type.substring(3, 4),
      MessageSize: body.byteLength + 8
    }).encode()

    // todo: use append
    const b = new Uint8Array(header.byteLength + body.byteLength)
    b.set(new Uint8Array(header))
    b.set(new Uint8Array(body), header.byteLength)

    this.socket.send(b)
  }
}

// if len(typ) != 4 {
//     return errors.Errorf("invalid msg type: %s", typ)
// }

// body, err := ua.Encode(msg)
// if err != nil {
//     return errors.Errorf("encode msg failed: %s", err)
// }

// h := Header{
//     MessageType: typ[:3],
//     ChunkType:   typ[3],
//     MessageSize: uint32(len(body) + hdrlen),
// }

// if h.MessageSize > c.ack.SendBufSize {
//     return errors.Errorf("send packet too large: %d > %d bytes", h.MessageSize, c.ack.SendBufSize)
// }

// hdr, err := h.Encode()
// if err != nil {
//     return errors.Errorf("encode hdr failed: %s", err)
// }

// b := append(hdr, body...)
// if _, err := c.c.Write(b); err != nil {
//     return errors.Errorf("write failed: %s", err)
// }
