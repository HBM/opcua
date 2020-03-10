import run from './run'
import { ResponseHeader, ReadResponse } from './generated'
import ExtensionObject from './ExtensionObject'
import DiagnosticInfo from './DiagnosticInfo'
import DataValue, { DataValueValue } from './DataValue'
import Variant from './Variant'
import { TypeIdFloat } from './enums'

describe('ReadRequest', () => {
  run([
    {
      name: 'normal',
      instance: new ReadResponse({
        ResponseHeader: new ResponseHeader({
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
          ServiceDiagnostics: new DiagnosticInfo(),
          StringTable: [],
          AdditionalHeader: new ExtensionObject()
        }),
        Results: [
          new DataValue({
            EncodingMask: DataValueValue,
            Value: new Variant({
              Value: 2.5001559257507324,
              EncodingMask: TypeIdFloat
            })
          })
        ],
        DiagnosticInfos: [new DiagnosticInfo()]
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x00, 0x00, 0x01, 0x0a, 0x8e, 0x02,
        0x20, 0x40, 0x01, 0x00, 0x00, 0x00, 0x00,
      ])
    }
  ])
})
