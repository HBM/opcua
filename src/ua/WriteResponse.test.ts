import run from './run'
import { WriteResponse, ResponseHeader } from './generated'
import ExtensionObject from './ExtensionObject'
import DiagnosticInfo from './DiagnosticInfo'
import { StatusCodeOK, StatusCodeBadUserAccessDenied } from './StatusCode'

describe('WriteResponse', () => {
  run([
    {
      name: 'single',
      instance: new WriteResponse({
        ResponseHeader: new ResponseHeader({
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
          ServiceDiagnostics: new DiagnosticInfo(),
          StringTable: [],
          AdditionalHeader: new ExtensionObject()
        }),
        Results: new Uint32Array([StatusCodeOK])
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0xff, 0xff, 0xff, 0xff,
      ])
    },
    {
      name: 'single',
      instance: new WriteResponse({
        ResponseHeader: new ResponseHeader({
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
          ServiceDiagnostics: new DiagnosticInfo(),
          StringTable: [],
          AdditionalHeader: new ExtensionObject()
        }),
        Results: new Uint32Array([StatusCodeOK, StatusCodeBadUserAccessDenied])
      }),
      // prettier-ignore
      bytes: new Uint8Array([
          0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
          0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
          0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
          0x00, 0x00, 0x1f, 0x80, 0xff, 0xff, 0xff, 0xff,
        ])
    }
  ])
})
