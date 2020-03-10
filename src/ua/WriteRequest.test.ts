import run from './run'
import { WriteRequest, RequestHeader, WriteValue } from './generated'
import { NewByteStringNodeId, NewFourByteNodeId } from './NodeId'
import ExtensionObject from './ExtensionObject'
import { AttributeIdValue, TypeIdFloat } from './enums'
import DataValue, {
  DataValueValue,
  DataValueSourceTimestamp,
  DataValueServerTimestamp
} from './DataValue'
import Variant from './Variant'

describe('WriteRequest', () => {
  run([
    {
      name: 'normal',
      instance: new WriteRequest({
        RequestHeader: new RequestHeader({
          // prettier-ignore
          AuthenticationToken: NewByteStringNodeId(0x00, new Uint8Array([
            0x08, 0x22, 0x87, 0x62, 0xba, 0x81, 0xe1, 0x11,
            0xa6, 0x43, 0xf8, 0x77, 0x7b, 0xc6, 0x2f, 0xc8,
          ])),
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
          AdditionalHeader: new ExtensionObject()
        }),
        NodesToWrite: [
          new WriteValue({
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
          })
        ]
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x05, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x08,
        0x22, 0x87, 0x62, 0xba, 0x81, 0xe1, 0x11, 0xa6,
        0x43, 0xf8, 0x77, 0x7b, 0xc6, 0x2f, 0xc8, 0x00,
        0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01, 0x01,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff,
        0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00,
        0xd0, 0x08, 0x0d, 0x00, 0x00, 0x00, 0xff, 0xff,
        0xff, 0xff, 0x0d, 0x0a, 0xc9, 0x02, 0x20, 0x40,
        0x80, 0x3b, 0xe8, 0xb3, 0x92, 0x4e, 0xd4, 0x01,
        0x80, 0x3b, 0xe8, 0xb3, 0x92, 0x4e, 0xd4, 0x01,
      ])
    }
  ])
})
