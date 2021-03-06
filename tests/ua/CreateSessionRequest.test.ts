import run from './run'
import {
  CreateSessionRequest,
  RequestHeader,
  ApplicationDescription,
  ApplicationType,
} from '../../dist/ua/generated'
import { NewByteStringNodeId } from '../../dist/ua/NodeId'
import LocalizedText, { LocalizedTextText } from '../../dist/ua/LocalizedText'

describe('CreateSessionRequest', () => {
  run([
    {
      name: 'normal',
      instance: new CreateSessionRequest({
        RequestHeader: new RequestHeader({
          AuthenticationToken: NewByteStringNodeId(
            0x00,
            // prettier-ignore
            new Uint8Array([
              0x08, 0x22, 0x87, 0x62, 0xba, 0x81, 0xe1, 0x11,
              0xa6, 0x43, 0xf8, 0x77, 0x7b, 0xc6, 0x2f, 0xc8
            ])
          ),
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
        }),
        ClientDescription: new ApplicationDescription({
          ApplicationUri: 'app-uri',
          ProductUri: 'prod-uri',
          ApplicationName: new LocalizedText({
            EncodingMask: LocalizedTextText,
            Text: 'app-name',
          }),
          ApplicationType: ApplicationType.Client,
          GatewayServerUri: 'gw-uri',
          DiscoveryProfileUri: 'profile-uri',
          DiscoveryUrls: ['1', '2'],
        }),
        ServerUri: 'server-uri',
        EndpointUrl: 'endpoint-url',
        SessionName: 'session-name',
        RequestedSessionTimeout: 6000000,
        MaxResponseMessageSize: 65534,
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x05, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x08,
        0x22, 0x87, 0x62, 0xba, 0x81, 0xe1, 0x11, 0xa6,
        0x43, 0xf8, 0x77, 0x7b, 0xc6, 0x2f, 0xc8, 0x00,
        0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01, 0x01,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff,
        0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x61, 0x70,
        0x70, 0x2d, 0x75, 0x72, 0x69, 0x08, 0x00, 0x00,
        0x00, 0x70, 0x72, 0x6f, 0x64, 0x2d, 0x75, 0x72,
        0x69, 0x02, 0x08, 0x00, 0x00, 0x00, 0x61, 0x70,
        0x70, 0x2d, 0x6e, 0x61, 0x6d, 0x65, 0x01, 0x00,
        0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x67, 0x77,
        0x2d, 0x75, 0x72, 0x69, 0x0b, 0x00, 0x00, 0x00,
        0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x2d,
        0x75, 0x72, 0x69, 0x02, 0x00, 0x00, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x31, 0x01, 0x00, 0x00, 0x00,
        0x32, 0x0a, 0x00, 0x00, 0x00, 0x73, 0x65, 0x72,
        0x76, 0x65, 0x72, 0x2d, 0x75, 0x72, 0x69, 0x0c,
        0x00, 0x00, 0x00, 0x65, 0x6e, 0x64, 0x70, 0x6f,
        0x69, 0x6e, 0x74, 0x2d, 0x75, 0x72, 0x6c, 0x0c,
        0x00, 0x00, 0x00, 0x73, 0x65, 0x73, 0x73, 0x69,
        0x6f, 0x6e, 0x2d, 0x6e, 0x61, 0x6d, 0x65, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00,
        0x00, 0x00, 0x00, 0x60, 0xe3, 0x56, 0x41, 0xfe,
        0xff, 0x00, 0x00,
    ])
    },
  ])
})
