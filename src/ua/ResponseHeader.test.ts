import { ResponseHeader } from './generated'
import ExtensionObject from './ExtensionObject'
import run from './run'
import DiagnosticInfo from './DiagnosticInfo'
import { NewTwoByteExpandedNodeId } from './ExpandedNodeId'

export const NewNullResponseHeader = (): ResponseHeader =>
  new ResponseHeader({
    Timestamp: new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0)),
    ServiceDiagnostics: new DiagnosticInfo(),
    AdditionalHeader: new ExtensionObject()
  })

// prettier-ignore
export const NullResponseHeaderBytes = new Uint8Array([
	0x00, 0x80, 0x3e, 0xd5, 0xde, 0xb1, 0x9d, 0x01,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00
])

describe('ResponseHeader', () => {
  run([
    {
      name: 'null',
      instance: NewNullResponseHeader(),
      bytes: NullResponseHeaderBytes
    },
    {
      name: 'normal',
      instance: new ResponseHeader({
        Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
        RequestHandle: 1,
        StringTable: ['foo', 'bar'],
        AdditionalHeader: new ExtensionObject({
          TypeId: NewTwoByteExpandedNodeId(255)
        })
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x02, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00,
        0x00, 0x66, 0x6f, 0x6f, 0x03, 0x00, 0x00, 0x00,
        0x62, 0x61, 0x72, 0x00, 0xff, 0x00,
      ])
    }
  ])
})
