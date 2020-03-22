import run from './run'
import { WriteValue } from '../../dist/ua/generated'
import { NewFourByteNodeId } from '../../dist/ua/NodeId'
import { AttributeIdValue, TypeIdFloat } from '../../dist/ua/enums'
import DataValue, {
  DataValueValue,
  DataValueSourceTimestamp,
  DataValueServerTimestamp
} from '../../dist/ua/DataValue'
import Variant from '../../dist/ua/Variant'

describe('WriteValue', () => {
  run([
    {
      name: 'normal',
      instance: new WriteValue({
        NodeId: NewFourByteNodeId(0, 2256),
        AttributeId: AttributeIdValue,
        Value: new DataValue({
          EncodingMask:
            DataValueValue |
            DataValueSourceTimestamp |
            DataValueServerTimestamp,
          Value: new Variant({
            EncodingMask: TypeIdFloat,
            Value: 2.5001699924468994
          }),
          SourceTimestamp: new Date(Date.UTC(2018, 8, 17, 14, 28, 29, 112)),
          ServerTimestamp: new Date(Date.UTC(2018, 8, 17, 14, 28, 29, 112))
        })
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0xd0, 0x08, 0x0d, 0x00, 0x00, 0x00,
        0xff, 0xff, 0xff, 0xff, 0x0d, 0x0a, 0xc9, 0x02,
        0x20, 0x40, 0x80, 0x3b, 0xe8, 0xb3, 0x92, 0x4e,
        0xd4, 0x01, 0x80, 0x3b, 0xe8, 0xb3, 0x92, 0x4e,
        0xd4, 0x01,
      ])
    }
  ])
})
