import { getDateTime } from './date'

describe('date', () => {
  test('decode', () => {
    // prettier-ignore
    const expected = new Uint8Array([
      0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01
    ])
    const dv = new DataView(expected.buffer)
    const date = getDateTime(dv, 0)
    expect(date).toEqual(new Date(2018, 7, 10, 23, 0, 0, 0))
  })
})
