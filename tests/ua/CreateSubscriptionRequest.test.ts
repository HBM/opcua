import run from './run'
import {
  CreateSubscriptionRequest,
  RequestHeader,
} from '../../dist/ua/generated'
import { NewByteStringNodeId } from '../../dist/ua/NodeId'
import ExtensionObject from '../../dist/ua/ExtensionObject'
import { NewTwoByteExpandedNodeId } from '../../dist/ua/ExpandedNodeId'

describe('CreateSubscriptionRequest', () => {
  run([
    {
      name: 'normal',
      instance: new CreateSubscriptionRequest({
        RequestHeader: new RequestHeader({
          // prettier-ignore
          AuthenticationToken: NewByteStringNodeId(0, new Uint8Array([
            0xfe, 0x8d, 0x87, 0x79, 0xf7, 0x03, 0x27, 0x77,
            0xc5, 0x03, 0xa1, 0x09, 0x50, 0x29, 0x27, 0x60,
          ])),
          AuditEntryId: '',
          RequestHandle: 1003429,
          TimeoutHint: 10000,
          AdditionalHeader: new ExtensionObject({
            TypeId: NewTwoByteExpandedNodeId(0),
          }),
          Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
        }),
        RequestedPublishingInterval: 500,
        RequestedLifetimeCount: 2400,
        RequestedMaxKeepAliveCount: 10,
        MaxNotificationsPerPublish: 65536,
        PublishingEnabled: true,
        Priority: 0,
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x05, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0xfe,
        0x8d, 0x87, 0x79, 0xf7, 0x03, 0x27, 0x77, 0xc5,
        0x03, 0xa1, 0x09, 0x50, 0x29, 0x27, 0x60, 0x00,
        0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01, 0xa5,
        0x4f, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff,
        0xff, 0xff, 0xff, 0x10, 0x27, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40,
        0x7f, 0x40, 0x60, 0x09, 0x00, 0x00, 0x0a, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
      ])
    },
  ])
})
