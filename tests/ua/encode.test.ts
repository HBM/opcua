import { Type, TypeArray } from '../../dist/ua/generated'
import { encode } from '../../dist/ua/encode'
import {
  int16,
  uint8,
  int8,
  uint16,
  int32,
  uint32,
  int64,
  uint64,
  float32,
  float64,
  ByteString,
} from '../../dist/types'

describe('encoding', () => {
  test('true', () => {
    class Wrapper {
      @Type('boolean')
      value = true
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x01]).buffer
    )
  })

  test('false', () => {
    class Wrapper {
      @Type('boolean')
      value = false
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x00]).buffer
    )
  })

  test('int8', () => {
    class Wrapper {
      @Type('int8')
      value: int8 = -5
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0xfb]).buffer
    )
  })

  test('uint8', () => {
    class Wrapper {
      @Type('uint8')
      value: uint8 = 5
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x05]).buffer
    )
  })

  test('int16', () => {
    class Wrapper {
      @Type('int16')
      value: int16 = -5
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0xfb, 0xff]).buffer
    )
  })

  test('uint16', () => {
    class Wrapper {
      @Type('uint16')
      value: uint16 = 0x1234
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x34, 0x12]).buffer
    )
  })

  test('int32', () => {
    class Wrapper {
      @Type('int32')
      value: int32 = -5
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0xfb, 0xff, 0xff, 0xff]).buffer
    )
  })

  test('uint32', () => {
    class Wrapper {
      @Type('uint32')
      value: uint32 = 0x12345678
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x78, 0x56, 0x34, 0x12]).buffer
    )
  })

  test('int64', () => {
    class Wrapper {
      @Type('int64')
      value: int64 = BigInt(-5)
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0xfb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]).buffer
    )
  })

  test('uint64', () => {
    class Wrapper {
      @Type('uint64')
      value: uint64 = BigInt('0x1234567890ABCDEF')
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0xef, 0xcd, 0xab, 0x90, 0x78, 0x56, 0x34, 0x12]).buffer
    )
  })

  test('float32', () => {
    class Wrapper {
      @Type('float32')
      value: float32 = 1.234
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0xb6, 0xf3, 0x9d, 0x3f]).buffer
    )
  })

  test('float64', () => {
    class Wrapper {
      @Type('float64')
      value: float64 = -1.234
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x58, 0x39, 0xb4, 0xc8, 0x76, 0xbe, 0xf3, 0xbf]).buffer
    )
  })

  test('Uint32Array', () => {
    class Wrapper {
      @TypeArray('uint32')
      value: Uint32Array = new Uint32Array([0x1234, 0x4567])
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      // prettier-ignore
      new Uint8Array([
        0x02, 0x00, 0x00, 0x00, 0x34, 0x12, 0x00, 0x00,
        0x67, 0x45, 0x00, 0x00
      ]).buffer
    )
  })

  test('null Uint32Array', () => {
    class Wrapper {
      @TypeArray('uint32')
      value: Uint32Array | null = null
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0xff, 0xff, 0xff, 0xff]).buffer
    )
  })

  test('empty Uint32Array', () => {
    class Wrapper {
      @TypeArray('uint32')
      value: Uint32Array = new Uint32Array()
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x00, 0x00, 0x00, 0x00]).buffer
    )
  })

  test('string', () => {
    class Wrapper {
      @Type('string')
      value = 'abc'
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x03, 0x00, 0x00, 0x00, 0x61, 0x62, 0x63]).buffer
    )
  })

  test('empty string', () => {
    class Wrapper {
      @Type('string')
      value = ''
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0xff, 0xff, 0xff, 0xff]).buffer
    )
  })

  test('ByteString', () => {
    class Wrapper {
      @Type('ByteString')
      value: ByteString = new Uint8Array([0x01, 0x02, 0x03])
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x03, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03]).buffer
    )
  })

  test('Date', () => {
    class Wrapper {
      @Type('Date')
      value: Date = new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0))
    }
    expect(encode({ instance: new Wrapper() })).toEqual(
      new Uint8Array([0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01]).buffer
    )
  })
})
