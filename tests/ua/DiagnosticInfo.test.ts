import run from './run'
import DiagnosticInfo, {
  SymbolicId,
  NamespaceUri,
  LocalizedText,
  Locale,
  AdditionalInfo,
  InnerStatusCode,
  InnerDiagnosticInfo
} from '../../dist/ua/DiagnosticInfo'

describe('DiagnosticInfo', () => {
  run([
    {
      name: 'nothing',
      instance: new DiagnosticInfo(),
      bytes: new Uint8Array([0x00])
    },
    {
      name: 'has symbolicID',
      instance: new DiagnosticInfo({
        EncodingMask: SymbolicId,
        SymbolicId: 1
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x01, 0x00, 0x00, 0x00
      ])
    },
    {
      name: 'has namespaceURI',
      instance: new DiagnosticInfo({
        EncodingMask: NamespaceUri,
        NamespaceUri: 2
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x02, 0x02, 0x00, 0x00, 0x00
      ])
    },
    {
      name: 'has localizedText',
      instance: new DiagnosticInfo({
        EncodingMask: LocalizedText,
        LocalizedText: 3
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x04, 0x03, 0x00, 0x00, 0x00
      ])
    },
    {
      name: 'has locale',
      instance: new DiagnosticInfo({
        EncodingMask: Locale,
        Locale: 4
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x08, 0x04, 0x00, 0x00, 0x00
      ])
    },
    {
      name: 'has additionalInfo',
      instance: new DiagnosticInfo({
        EncodingMask: AdditionalInfo,
        AdditionalInfo: 'foobar'
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x10, 0x06, 0x00, 0x00, 0x00, 0x66, 0x6f, 0x6f,
        0x62, 0x61, 0x72
      ])
    },
    {
      name: 'has innerStatusCode',
      instance: new DiagnosticInfo({
        EncodingMask: InnerStatusCode,
        InnerStatusCode: 6
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x20, 0x06, 0x00, 0x00, 0x00
      ])
    },
    {
      name: 'has innerDiagnosticInfo',
      instance: new DiagnosticInfo({
        EncodingMask: InnerDiagnosticInfo,
        InnerDiagnosticInfo: new DiagnosticInfo({
          EncodingMask: SymbolicId,
          SymbolicId: 7
        })
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x40, 0x01, 0x07, 0x00, 0x00, 0x00
      ])
    },
    {
      name: 'has all',
      instance: new DiagnosticInfo({
        EncodingMask:
          SymbolicId |
          NamespaceUri |
          LocalizedText |
          Locale |
          AdditionalInfo |
          InnerStatusCode |
          InnerDiagnosticInfo,
        SymbolicId: 1,
        NamespaceUri: 2,
        Locale: 3,
        LocalizedText: 4,
        AdditionalInfo: 'foobar',
        InnerStatusCode: 6,
        InnerDiagnosticInfo: new DiagnosticInfo({
          EncodingMask: SymbolicId,
          SymbolicId: 7
        })
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x7f, 0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00,
        0x00, 0x03, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00,
        0x00, 0x06, 0x00, 0x00, 0x00, 0x66, 0x6f, 0x6f,
        0x62, 0x61, 0x72, 0x06, 0x00, 0x00, 0x00, 0x01,
        0x07, 0x00, 0x00, 0x00
      ])
    }
  ])
})
