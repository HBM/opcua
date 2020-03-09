import {
  NewTwoByteNodeId,
  NewFourByteNodeId,
  NewStringNodeId,
  NewByteStringNodeId
} from './NodeId'
import run from './run'

describe('NodeId', () => {
  run([
    {
      name: 'TwoByte',
      instance: NewTwoByteNodeId(72),
      bytes: new Uint8Array([0x00, 0x48])
    },
    {
      name: 'FourByte',
      instance: NewFourByteNodeId(5, 1025),
      bytes: new Uint8Array([0x01, 0x05, 0x01, 0x04])
    },
    {
      name: 'String',
      instance: NewStringNodeId(1, 'Hot水'),
      // prettier-ignore
      bytes: new Uint8Array([
        0x03, 0x01, 0x00, 0x06, 0x00, 0x00, 0x00, 0x48,
        0x6F, 0x74, 0xe6, 0xb0, 0xb4
      ])
    },
    {
      name: 'ByteString',
      instance: NewByteStringNodeId(
        32768,
        new Uint8Array([0xde, 0xad, 0xbe, 0xef])
      ),
      // prettier-ignore
      bytes: new Uint8Array([
        0x05, 0x00, 0x80, 0x04, 0x00, 0x00, 0x00, 0xde,
        0xad, 0xbe, 0xef,
      ])
    }
  ])
})
