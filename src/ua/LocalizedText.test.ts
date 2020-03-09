import LocalizedText, {
  LocalizedTextLocale,
  LocalizedTextText
} from './LocalizedText'
import run from './run'

describe('LocalizedText', () => {
  run([
    {
      name: 'empty',
      instance: new LocalizedText(),
      bytes: new Uint8Array([0x00])
    },
    {
      name: 'locale',
      instance: new LocalizedText({
        EncodingMask: LocalizedTextLocale,
        Locale: 'foo'
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x01, 0x03, 0x00, 0x00, 0x00, 0x66, 0x6f, 0x6f
      ])
    },
    {
      name: 'text',
      instance: new LocalizedText({
        EncodingMask: LocalizedTextText,
        Text: 'bar'
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x02, 0x03, 0x00, 0x00, 0x00, 0x62, 0x61, 0x72
      ])
    },
    {
      name: 'both',
      instance: new LocalizedText({
        EncodingMask: LocalizedTextLocale | LocalizedTextText,
        Locale: 'foo',
        Text: 'bar'
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x03, 0x03, 0x00, 0x00, 0x00, 0x66, 0x6f, 0x6f,
        0x03, 0x00, 0x00, 0x00, 0x62, 0x61, 0x72
      ])
    }
  ])
})
