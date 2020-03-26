import run from './run'
import { UserTokenType, UserTokenPolicy } from '../../dist/ua/generated'

describe('UserTokenPolicy', () => {
  run([
    {
      name: 'normal',
      instance: new UserTokenPolicy({
        PolicyId: '1',
        TokenType: UserTokenType.Anonymous,
        IssuedTokenType: 'issued-token',
        IssuerEndpointUrl: 'issuer-uri',
        SecurityPolicyUri: 'sec-uri'
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0x00, 0x00, 0x31, 0x00, 0x00, 0x00,
        0x00, 0x0c, 0x00, 0x00, 0x00, 0x69, 0x73, 0x73,
        0x75, 0x65, 0x64, 0x2d, 0x74, 0x6f, 0x6b, 0x65,
        0x6e, 0x0a, 0x00, 0x00, 0x00, 0x69, 0x73, 0x73,
        0x75, 0x65, 0x72, 0x2d, 0x75, 0x72, 0x69, 0x07,
        0x00, 0x00, 0x00, 0x73, 0x65, 0x63, 0x2d, 0x75,
        0x72, 0x69,
      ])
    }
  ])
})