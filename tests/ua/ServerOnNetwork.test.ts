import run from './run'
import { ServerOnNetwork } from '../../dist/ua/generated'

describe('ServerOnNetwork', () => {
  run([
    {
      name: 'normal',
      instance: new ServerOnNetwork({
        RecordId: 1,
        ServerName: 'server-name',
        DiscoveryUrl: 'discov-uri',
        ServerCapabilities: ['server-cap-1'],
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00,
        0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2d, 0x6e,
        0x61, 0x6d, 0x65, 0x0a, 0x00, 0x00, 0x00, 0x64,
        0x69, 0x73, 0x63, 0x6f, 0x76, 0x2d, 0x75, 0x72,
        0x69, 0x01, 0x00, 0x00, 0x00, 0x0c, 0x00, 0x00,
        0x00, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2d,
        0x63, 0x61, 0x70, 0x2d, 0x31,
      ])
    },
    {
      name: 'multiple',
      instance: new ServerOnNetwork({
        RecordId: 1,
        ServerName: 'server-name',
        DiscoveryUrl: 'discov-uri',
        ServerCapabilities: ['server-cap-1', 'server-cap-2'],
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00,
        0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2d, 0x6e,
        0x61, 0x6d, 0x65, 0x0a, 0x00, 0x00, 0x00, 0x64,
        0x69, 0x73, 0x63, 0x6f, 0x76, 0x2d, 0x75, 0x72,
        0x69, 0x02, 0x00, 0x00, 0x00, 0x0c, 0x00, 0x00,
        0x00, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2d,
        0x63, 0x61, 0x70, 0x2d, 0x31, 0x0c, 0x00, 0x00,
        0x00, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2d,
        0x63, 0x61, 0x70, 0x2d, 0x32,
      ])
    },
  ])
})
