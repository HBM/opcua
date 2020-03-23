import run from './run'
import { WriteResponse, ResponseHeader } from '../../dist/ua/generated'
import DiagnosticInfo from '../../dist/ua/DiagnosticInfo'
import ExtensionObject from '../../dist/ua/ExtensionObject'
import {
  StatusCode
} from '../../dist/ua/StatusCode'

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
        Results: new Uint32Array([StatusCode.OK])
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
        Results: new Uint32Array([StatusCode.OK, StatusCode.BadUserAccessDenied])
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
