import run from './run'
import { SignatureData } from '../../dist/ua/generated'

describe('SignatureData', () => {
  run([
    {
      name: 'normal',
      instance: new SignatureData({
        Algorithm: 'alg',
        Signature: new Uint8Array([0xde, 0xad, 0xbe, 0xef])
      }),
      // prettier-ignore
      bytes: new Uint8Array([
      0x03, 0x00, 0x00, 0x00, 0x61, 0x6c, 0x67, 0x04,
      0x00, 0x00, 0x00, 0xde, 0xad, 0xbe, 0xef,
    ])
    }
  ])
})
