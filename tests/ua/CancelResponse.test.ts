import run from './run'
import { CancelResponse, ResponseHeader } from '../../dist/ua/generated'
import DiagnosticInfo from '../../dist/ua/DiagnosticInfo'
import ExtensionObject from '../../dist/ua/ExtensionObject'

describe('CancelResponse', () => {
  run([
    {
      name: 'normal',
      instance: new CancelResponse({
        ResponseHeader: new ResponseHeader({
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
          ServiceDiagnostics: new DiagnosticInfo(),
          StringTable: [],
          AdditionalHeader: new ExtensionObject(),
        }),
        CancelCount: 1,
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x00, 0x00,
      ])
    },
  ])
})
