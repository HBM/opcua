import run from './run'
import NodeId, {
  NewTwoByteNodeId,
  NewFourByteNodeId,
  NewStringNodeId,
  NewByteStringNodeId,
  ParseNodeId,
  NewNumericNodeId,
  NewGuidNodeId
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
      name: 'Numeric',
      instance: NewNumericNodeId(10, 0xdeadbeef),
      // prettier-ignore
      bytes: new Uint8Array([
				0x02, 0x0a, 0x00, 0xef, 0xbe, 0xad, 0xde
      ])
    },
    {
      name: 'String',
      instance: NewStringNodeId(255, 'foobar'),
      // prettier-ignore
      bytes: new Uint8Array([
        0x03, 0xff, 0x00, 0x06, 0x00, 0x00, 0x00, 0x66,
        0x6f, 0x6f, 0x62, 0x61, 0x72,
      ])
    },
    {
      name: 'Guid',
      instance: NewGuidNodeId(4660, '72962B91-FA75-4AE6-8D28-B404DC7DAF63'),
      // prettier-ignore
      bytes: new Uint8Array([
        0x04, 0x34, 0x12, 0x91, 0x2b, 0x96, 0x72, 0x75,
        0xfa, 0xe6, 0x4a, 0x8d, 0x28, 0xb4, 0x04, 0xdc,
        0x7d, 0xaf, 0x63,
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
      {s: "ns=1;g=5eac051c-c313-43d7-b790-24aa2c3cfd37", n: NewGuidNodeId(1, "5eac051c-c313-43d7-b790-24aa2c3cfd37")},
      {s: "ns=1;b=YWJj", n: NewByteStringNodeId(1, new Uint8Array([0x61, 0x62, 0x63]))},
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
