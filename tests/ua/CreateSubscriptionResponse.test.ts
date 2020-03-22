import run from './run'
import {
  CreateSubscriptionResponse,
  ResponseHeader
} from '../../dist/ua/generated'
import DiagnosticInfo from '../../dist/ua/DiagnosticInfo'
import ExtensionObject from '../../dist/ua/ExtensionObject'

describe('CreateSubscriptionResponse', () => {
  run([
    {
      name: 'normal',
      instance: new CreateSubscriptionResponse({
        ResponseHeader: new ResponseHeader({
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
          RequestHandle: 1,
          ServiceDiagnostics: new DiagnosticInfo(),
          StringTable: [],
          AdditionalHeader: new ExtensionObject()
        }),
        SubscriptionId: 1,
        RevisedPublishingInterval: 1000,
        RevisedLifetimeCount: 60,
        RevisedMaxKeepAliveCount: 20
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x40, 0x8f, 0x40, 0x3c, 0x00, 0x00, 0x00,
        0x14, 0x00, 0x00, 0x00,
      ])
    }
  ])
})
