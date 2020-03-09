import AcknowledgeMessage from './AcknowledgeMessage'
import run from '../ua/run'

describe('AcknowledgeMessage', () => {
  run([
    {
      name: 'normal',
      instance: new AcknowledgeMessage({
        ProtocolVersion: 0,
        ReceiveBufferSize: 65535,
        SendBufferSize: 65535,
        MaxMessageSize: 0,
        MaxChunkCount: 0
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x00, 0x00,
        0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ])
    }
  ])
})
