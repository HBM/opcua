import run from './run'
import { ReadValueId } from './generated'
import { AttributeIdValue } from './enums'
import { NewFourByteNodeId } from './NodeId'
import QualifiedName from './QualifiedName'

describe('ReadValueId', () => {
  run([
    {
      name: 'normal',
      instance: new ReadValueId({
        NodeId: NewFourByteNodeId(0, 2256),
        AttributeId: AttributeIdValue,
        DataEncoding: new QualifiedName()
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0xd0, 0x08, 0x0d, 0x00, 0x00, 0x00,
        0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff,
        0xff, 0xff,
      ])
    }
  ])
})
