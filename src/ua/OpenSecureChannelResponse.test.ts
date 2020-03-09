import {
  OpenSecureChannelResponse,
  ResponseHeader,
  ChannelSecurityToken
} from './generated'
import run from './run'

describe('OpenSecureChannelResponse', () => {
  run([
    {
      name: 'normal',
      instance: new OpenSecureChannelResponse({
        ResponseHeader: new ResponseHeader({
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1
        }),
        SecurityToken: new ChannelSecurityToken({
          ChannelId: 1,
          TokenId: 2,
          CreatedAt: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RevisedLifetime: 6000000
        }),
        ServerNonce: new Uint8Array([0xff])
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
        0x02, 0x00, 0x00, 0x00, 0x00, 0x98, 0x67, 0xdd,
        0xfd, 0x30, 0xd4, 0x01, 0x80, 0x8d, 0x5b, 0x00,
        0x01, 0x00, 0x00, 0x00, 0xff
      ])
    }
  ])
})
