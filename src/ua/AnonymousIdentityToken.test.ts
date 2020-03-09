import { AnonymousIdentityToken } from './generated'
import run from './run'

describe('AnonymousIdentityToken', () => {
  run([
    {
      name: 'normal',
      instance: new AnonymousIdentityToken({
        PolicyId: 'anonymous'
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x09, 0x00, 0x00, 0x00, 0x61, 0x6e, 0x6f, 0x6e,
        0x79, 0x6d, 0x6f, 0x75, 0x73,
      ])
    }
  ])
})
