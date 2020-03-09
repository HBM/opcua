import { X509IdentityToken } from './generated'
import run from './run'

describe('X509IdentityToken', () => {
  const encoder = new TextEncoder()
  run([
    {
      name: '',
      instance: new X509IdentityToken({
        PolicyId: 'x509',
        CertificateData: encoder.encode('certificate')
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x04, 0x00, 0x00, 0x00, 0x78, 0x35, 0x30, 0x39,
        0x0b, 0x00, 0x00, 0x00, 0x63, 0x65, 0x72, 0x74,
        0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65,
      ])
    }
  ])
})
