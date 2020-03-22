import ExtensionObject, {
  ExtensionObjectBinary
} from '../../dist/ua/ExtensionObject'
import {
  ActivateSessionRequest,
  AnonymousIdentityToken
} from '../../dist/ua/generated'
import {
  NewNullRequestHeader,
  NullRequestHeaderBytes
} from './RequestHeader.test'
import { NewFourByteExpandedNodeId } from '../../dist/ua/ExpandedNodeId'
import { IdAnonymousIdentityTokenEncodingDefaultBinary } from '../../dist/id/id'
import run from './run'

describe('ActivateSessionRequest', () => {
  run([
    {
      name: 'normal',
      instance: new ActivateSessionRequest({
        RequestHeader: NewNullRequestHeader(),
        UserIdentityToken: new ExtensionObject({
          TypeId: NewFourByteExpandedNodeId(
            0,
            IdAnonymousIdentityTokenEncodingDefaultBinary
          ),
          Encoding: ExtensionObjectBinary,
          Value: new AnonymousIdentityToken({
            PolicyId: 'anonymous'
          })
        })
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        ...NullRequestHeaderBytes,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0x01, 0x00, 0x41, 0x01, 0x01, 0x0d, 0x00, 0x00,
        0x00, 0x09, 0x00, 0x00, 0x00, 0x61, 0x6e, 0x6f,
        0x6e, 0x79, 0x6d, 0x6f, 0x75, 0x73, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      ])
    }
  ])
})
