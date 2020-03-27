import run from './run'
import Guid from '../../dist/ua/Guid'

describe('Guid', () => {
  run([
    {
      name: 'spec',
      instance: new Guid('72962B91-FA75-4AE6-8D28-B404DC7DAF63'),
      // prettier-ignore
      bytes: new Uint8Array([
        0x91, 0x2b, 0x96, 0x72, 0x75, 0xfa, 0xe6, 0x4a,
        0x8d, 0x28, 0xb4, 0x04, 0xdc, 0x7d, 0xaf, 0x63
      ])
    },
    {
      name: 'open62541',
      instance: new Guid('a123456c-0abc-1a2b-815f-687212aaee1b'),
      // prettier-ignore
      bytes: new Uint8Array([
        0x6c, 0x45, 0x23, 0xa1, 0xbc, 0x0a, 0x2b, 0x1a,
        0x81, 0x5f, 0x68, 0x72, 0x12, 0xaa, 0xee, 0x1b
      ])
    },
  ])

  it('toString()', () => {
    const guid = new Guid('72962B91-FA75-4AE6-8D28-B404DC7DAF63')
    expect(guid.toString()).toBe('72962B91-FA75-4AE6-8D28-B404DC7DAF63')
  })
})
