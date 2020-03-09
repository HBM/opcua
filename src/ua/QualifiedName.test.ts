import run from './run'
import QualifiedName from './QualifiedName'

describe('QualifiedName', () => {
  run([
    {
      name: 'normal',
      instance: new QualifiedName({
        NamespaceIndex: 1,
        Name: 'foobar'
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0x06, 0x00, 0x00, 0x00, 0x66, 0x6f,
        0x6f, 0x62, 0x61, 0x72,
      ])
    },
    {
      name: 'empty',
      instance: new QualifiedName({
        NamespaceIndex: 1
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x00, 0xff, 0xff, 0xff, 0xff,
      ])
    }
  ])
})
