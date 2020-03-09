import { SignedSoftwareCertificate } from './generated'
import run from './run'

describe('SignedSoftwareCertificate', () => {
  run([
    {
      name: 'empty',
      instance: new SignedSoftwareCertificate(),
      bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
    },
    {
      name: 'dummy',
      instance: new SignedSoftwareCertificate({
        CertificateData: new Uint8Array([0xca, 0xfe]),
        Signature: new Uint8Array([0xde, 0xad, 0xbe, 0xef])
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x02, 0x00, 0x00, 0x00, 0xca, 0xfe, 0x04, 0x00,
        0x00, 0x00, 0xde, 0xad, 0xbe, 0xef,
      ])
    }
  ])
})
