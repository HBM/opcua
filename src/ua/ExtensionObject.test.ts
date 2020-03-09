import ExtensionObject, {
  ExtensionObjectBinary,
  ExtensionObjectEmpty
} from './ExtensionObject'
import { AnonymousIdentityToken } from './generated'
import { IdAnonymousIdentityToken } from '../id/id'
import run from './run'
import {
  NewTwoByteExpandedNodeId,
  NewFourByteExpandedNodeId
} from './ExpandedNodeId'

describe('ExtensionObject', () => {
  run([
    {
      name: 'empty',
      instance: new ExtensionObject({
        TypeId: NewTwoByteExpandedNodeId(0),
        Encoding: ExtensionObjectEmpty
      }),
      bytes: new Uint8Array([0x00, 0x00, 0x00])
    },
    {
      name: 'anonymous',
      instance: new ExtensionObject({
        TypeId: NewFourByteExpandedNodeId(0, IdAnonymousIdentityToken),
        Encoding: ExtensionObjectBinary,
        Value: new AnonymousIdentityToken({
          PolicyId: 'anonymous'
        })
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0x41, 0x01, 0x01, 0x0d, 0x00, 0x00,
        0x00, 0x09, 0x00, 0x00, 0x00, 0x61, 0x6e, 0x6f,
        0x6e, 0x79, 0x6d, 0x6f, 0x75, 0x73,
      ])
    }
  ])
})