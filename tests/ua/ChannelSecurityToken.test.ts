import run from './run'
import { ChannelSecurityToken } from '../../dist/ua/generated'

describe('ChannelSecurityToken', () => {
  run([
    {
      name: 'normal',
      instance: new ChannelSecurityToken({
        ChannelId: 1,
        TokenId: 2,
        CreatedAt: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
        RevisedLifetime: 6000000,
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00,
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x80, 0x8d, 0x5b, 0x00,
      ])
    },
  ])
})
