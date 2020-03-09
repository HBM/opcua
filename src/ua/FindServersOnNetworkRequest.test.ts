import { FindServersOnNetworkRequest, RequestHeader } from './generated'
import run from './run'
import ExtensionObject from './ExtensionObject'
import { NewByteStringNodeId } from './NodeId'

describe('FindServersOnNetworkRequest', () => {
  run([
    {
      name: 'normal',
      instance: new FindServersOnNetworkRequest({
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
        StartingRecordId: 1000,
        MaxRecordsToReturn: 0
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x05, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x08,
        0x22, 0x87, 0x62, 0xba, 0x81, 0xe1, 0x11, 0xa6,
        0x43, 0xf8, 0x77, 0x7b, 0xc6, 0x2f, 0xc8, 0x00,
        0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01, 0x01,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff,
        0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0xe8, 0x03, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0xff, 0xff, 0xff, 0xff,
      ])
    }
  ])
})