import ConnectionProtocolMessageHeader from './ConnectionProtocolMessageHeader'
import run from '../ua/run'

describe('MessageHeader', () => {
  run([
    {
      name: 'normal',
      instance: new ConnectionProtocolMessageHeader({
        MessageType: 'ACK',
        ChunkType: 'F',
        MessageSize: 28
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x41, 0x43, 0x4b, 0x46, 0x1c, 0x00, 0x00, 0x00,
      ])
    }
  ])
})
