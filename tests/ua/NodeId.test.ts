import run from './run'
import NodeId, {
  NewTwoByteNodeId,
  NewFourByteNodeId,
  NewStringNodeId,
  NewByteStringNodeId,
  ParseNodeId,
  NewNumericNodeId
} from '../../dist/ua/NodeId'

interface Case {
  s: string
  n: NodeId
}

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

  describe('parse', () => {
    const cases: Case[] = [
      { s: '', n: NewTwoByteNodeId(0) },
      { s: 'ns=0;i=1', n: NewTwoByteNodeId(1) },
      { s: 'i=1', n: NewTwoByteNodeId(1) },
      { s: 'i=2253', n: NewFourByteNodeId(0, 2253) },
      { s: 'ns=1;i=2', n: NewFourByteNodeId(1, 2) },
      { s: 'ns=256;i=2', n: NewNumericNodeId(256, 2) },
      { s: 'ns=1;i=65536', n: NewNumericNodeId(1, 65536) },
      { s: 'ns=65535;i=65536', n: NewNumericNodeId(65535, 65536) },
      // {s: "ns=1;g=5eac051c-c313-43d7-b790-24aa2c3cfd37", n: NewGUIDNodeID(1, "5eac051c-c313-43d7-b790-24aa2c3cfd37")},
      // {s: "ns=1;b=YWJj", n: NewByteStringNodeID(1, []byte{'a', 'b', 'c'})},
      { s: 'ns=1;s=a', n: NewStringNodeId(1, 'a') },
      { s: 'ns=1;a', n: NewStringNodeId(1, 'a') }
    ]
    for (const c of cases) {
      it(`string: ${c.s}`, () => {
        const result = ParseNodeId(c.s)
        expect(result).toEqual(c.n)
      })
    }
  })

  // start testing node id
})
