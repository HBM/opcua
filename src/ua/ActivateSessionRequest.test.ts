import ExtensionObject, { ExtensionObjectBinary } from './ExtensionObject'
import { AnonymousIdentityToken, ActivateSessionRequest } from './generated'
import {
  NullRequestHeaderBytes,
  NewNullRequestHeader
} from './RequestHeader.test'
import run from './run'
import { IdAnonymousIdentityTokenEncodingDefaultBinary } from '../id/id'
import { NewFourByteExpandedNodeId } from './ExpandedNodeId'

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
