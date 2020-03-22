import run from './run'
import ExpandedNodeId from '../../dist/ua/ExpandedNodeId'
import { NewTwoByteNodeId } from '../../dist/ua/NodeId'

describe('ExpandedNodeId', () => {
  run([
    {
      name: 'without optional fields',
      instance: new ExpandedNodeId({
        NodeId: NewTwoByteNodeId(0xff)
      }),
      bytes: new Uint8Array([0x00, 0xff])
    },
    {
      name: 'with NamespaceUri',
      instance: new ExpandedNodeId({
        NodeId: NewTwoByteNodeId(0xff),
        NamespaceUri: 'foobar'
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x80, 0xff, 0x06, 0x00, 0x00, 0x00, 0x66, 0x6f,
        0x6f, 0x62, 0x61, 0x72,
      ])
    },
    {
      name: 'with ServerIndex',
      instance: new ExpandedNodeId({
        NodeId: NewTwoByteNodeId(0xff),
        ServerIndex: 32768
      }),
      bytes: new Uint8Array([0x40, 0xff, 0x00, 0x80, 0x00, 0x00])
    },
    {
      name: 'with NamespaceUri and ServerIndex',
      instance: new ExpandedNodeId({
        NodeId: NewTwoByteNodeId(0xff),
        NamespaceUri: 'foobar',
        ServerIndex: 32768
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0xc0, 0xff, 0x06, 0x00, 0x00, 0x00, 0x66, 0x6f,
        0x6f, 0x62, 0x61, 0x72, 0x00, 0x80, 0x00, 0x00,
      ])
    }
  ])
})
