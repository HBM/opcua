import run from './run'
import { CloseSessionResponse, ResponseHeader } from '../../dist/ua/generated'
import DiagnosticInfo from '../../dist/ua/DiagnosticInfo'
import ExtensionObject from '../../dist/ua/ExtensionObject'

describe('CloseSessionResponse', () => {
  run([
    {
      name: 'normal',
      instance: new CloseSessionResponse({
        ResponseHeader: new ResponseHeader({
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
          ServiceDiagnostics: new DiagnosticInfo(),
          StringTable: [],
          AdditionalHeader: new ExtensionObject(),
        }),
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      ])
    },
  ])
})
