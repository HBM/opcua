import run from './run'
import {
  FindServersResponse,
  ResponseHeader,
  ApplicationDescription,
  ApplicationType
} from '../../dist/ua/generated'
import DiagnosticInfo from '../../dist/ua/DiagnosticInfo'
import ExtensionObject from '../../dist/ua/ExtensionObject'
import LocalizedText, { LocalizedTextText } from '../../dist/ua/LocalizedText'

describe('FindServersResponse', () => {
  run([
    {
      name: 'normal',
      instance: new FindServersResponse({
        ResponseHeader: new ResponseHeader({
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
          ServiceDiagnostics: new DiagnosticInfo(),
          StringTable: [],
          AdditionalHeader: new ExtensionObject()
        }),
        Servers: [
          new ApplicationDescription({
            ApplicationUri: 'app-uri',
            ProductUri: 'prod-uri',
            ApplicationName: new LocalizedText({
              EncodingMask: LocalizedTextText,
              Text: 'app-name'
            }),
            ApplicationType: ApplicationType.Server,
            GatewayServerUri: 'gw-uri',
            DiscoveryProfileUri: 'prof-uri',
            DiscoveryUrls: ['discov-uri-1', 'discov-uri-2']
          }),
          new ApplicationDescription({
            ApplicationUri: 'app-uri',
            ProductUri: 'prod-uri',
            ApplicationName: new LocalizedText({
              EncodingMask: LocalizedTextText,
              Text: 'app-name'
            }),
            ApplicationType: ApplicationType.Server,
            GatewayServerUri: 'gw-uri',
            DiscoveryProfileUri: 'prof-uri',
            DiscoveryUrls: ['discov-uri-1', 'discov-uri-2']
          })
        ]
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00,
        0x61, 0x70, 0x70, 0x2d, 0x75, 0x72, 0x69, 0x08,
        0x00, 0x00, 0x00, 0x70, 0x72, 0x6f, 0x64, 0x2d,
        0x75, 0x72, 0x69, 0x02, 0x08, 0x00, 0x00, 0x00,
        0x61, 0x70, 0x70, 0x2d, 0x6e, 0x61, 0x6d, 0x65,
        0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00,
        0x67, 0x77, 0x2d, 0x75, 0x72, 0x69, 0x08, 0x00,
        0x00, 0x00, 0x70, 0x72, 0x6f, 0x66, 0x2d, 0x75,
        0x72, 0x69, 0x02, 0x00, 0x00, 0x00, 0x0c, 0x00,
        0x00, 0x00, 0x64, 0x69, 0x73, 0x63, 0x6f, 0x76,
        0x2d, 0x75, 0x72, 0x69, 0x2d, 0x31, 0x0c, 0x00,
        0x00, 0x00, 0x64, 0x69, 0x73, 0x63, 0x6f, 0x76,
        0x2d, 0x75, 0x72, 0x69, 0x2d, 0x32, 0x07, 0x00,
        0x00, 0x00, 0x61, 0x70, 0x70, 0x2d, 0x75, 0x72,
        0x69, 0x08, 0x00, 0x00, 0x00, 0x70, 0x72, 0x6f,
        0x64, 0x2d, 0x75, 0x72, 0x69, 0x02, 0x08, 0x00,
        0x00, 0x00, 0x61, 0x70, 0x70, 0x2d, 0x6e, 0x61,
        0x6d, 0x65, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00,
        0x00, 0x00, 0x67, 0x77, 0x2d, 0x75, 0x72, 0x69,
        0x08, 0x00, 0x00, 0x00, 0x70, 0x72, 0x6f, 0x66,
        0x2d, 0x75, 0x72, 0x69, 0x02, 0x00, 0x00, 0x00,
        0x0c, 0x00, 0x00, 0x00, 0x64, 0x69, 0x73, 0x63,
        0x6f, 0x76, 0x2d, 0x75, 0x72, 0x69, 0x2d, 0x31,
        0x0c, 0x00, 0x00, 0x00, 0x64, 0x69, 0x73, 0x63,
        0x6f, 0x76, 0x2d, 0x75, 0x72, 0x69, 0x2d, 0x32,
      ])
    }
  ])
})