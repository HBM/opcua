import decode from './decode'
import { TypeArray, Type } from './generated'

describe('decode', () => {
  test('true', () => {
    class Wrapper {
      @Type('boolean')
      value = false
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x01]).buffer,
      instance: result
    })
    expect(result.value).toBe(true)
  })

  test('false', () => {
    class Wrapper {
      @Type('boolean')
      value = true
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x00]).buffer,
      instance: result
    })
    expect(result.value).toBe(false)
  })

  test('int8', () => {
    class Wrapper {
      @Type('int8')
      value: int8 = 0
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0xfb]).buffer,
      instance: result
    })
    expect(result.value).toBe(-5)
  })

  test('uint8', () => {
    class Wrapper {
      @Type('uint8')
      value: uint8 = 0
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x05]).buffer,
      instance: result
    })
    expect(result.value).toBe(5)
  })

  test('int16', () => {
    class Wrapper {
      @Type('int16')
      value: int16 = 0
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0xfb, 0xff]).buffer,
      instance: result
    })
    expect(result.value).toBe(-5)
  })

  test('uint16', () => {
    class Wrapper {
      @Type('uint16')
      value: uint16 = 0
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x34, 0x12]).buffer,
      instance: result
    })
    expect(result.value).toBe(0x1234)
  })

  test('int32', () => {
    class Wrapper {
      @Type('int32')
      value: int32 = 0
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0xfb, 0xff, 0xff, 0xff]).buffer,
      instance: result
    })
    expect(result.value).toBe(-5)
  })

  test('uint32', () => {
    class Wrapper {
      @Type('uint32')
      value: uint32 = 0
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x78, 0x56, 0x34, 0x12]).buffer,
      instance: result
    })
    expect(result.value).toBe(0x12345678)
  })

  test('int64', () => {
    class Wrapper {
      @Type('int64')
      value: int64 = BigInt(0)
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0xfb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
        .buffer,
      instance: result
    })
    expect(result.value).toBe(BigInt(-5))
  })

  test('uint64', () => {
    class Wrapper {
      @Type('uint64')
      value: uint64 = BigInt(0)
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0xef, 0xcd, 0xab, 0x90, 0x78, 0x56, 0x34, 0x12])
        .buffer,
      instance: result
    })
    expect(result.value).toBe(BigInt('0x1234567890ABCDEF'))
  })

  test('float32', () => {
    class Wrapper {
      @Type('float32')
      value: float32 = 0
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0xb6, 0xf3, 0x9d, 0x3f]).buffer,
      instance: result
    })
    expect(result.value).toBeCloseTo(1.234)
  })

  test('float64', () => {
    class Wrapper {
      @Type('float64')
      value: float64 = 0
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x58, 0x39, 0xb4, 0xc8, 0x76, 0xbe, 0xf3, 0xbf])
        .buffer,
      instance: result
    })
    expect(result.value).toBeCloseTo(-1.234)
  })

  test('Uint32Array', () => {
    class Wrapper {
      @TypeArray('uint32')
      value: Uint32Array = new Uint32Array()
    }
    const result = new Wrapper()
    decode({
      // prettier-ignore
      bytes: new Uint8Array([
        0x02, 0x00, 0x00, 0x00, 0x34, 0x12, 0x00, 0x00,
        0x67, 0x45, 0x00, 0x00
      ]).buffer,
      instance: result
    })
    expect(result.value).toEqual(new Uint32Array([0x1234, 0x4567]))
  })

  test('null Uint32Array', () => {
    class Wrapper {
      @TypeArray('uint32')
      value: Uint32Array | null = null
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff]).buffer,
      instance: result
    })
    expect(result.value).toEqual(null)
  })

  test('empty Uint32Array', () => {
    class Wrapper {
      @TypeArray('uint32')
      value: Uint32Array | null = null
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x00, 0x00, 0x00, 0x00]).buffer,
      instance: result
    })
    expect(result.value).toEqual(new Uint32Array())
  })

  test('string', () => {
    class Wrapper {
      @Type('string')
      value = ''
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x03, 0x00, 0x00, 0x00, 0x61, 0x62, 0x63]).buffer,
      instance: result
    })
    expect(result.value).toEqual('abc')
  })

  test('empty string', () => {
    class Wrapper {
      @Type('string')
      value = ''
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff]).buffer,
      instance: result
    })
    expect(result.value).toEqual('')
  })

  test('ByteString', () => {
    class Wrapper {
      @Type('ByteString')
      value: ByteString = new Uint8Array()
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x03, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03]).buffer,
      instance: result
    })
    expect(result.value).toEqual(new Uint8Array([0x01, 0x02, 0x03]))
  })

  test('Date', () => {
    class Wrapper {
      @Type('Date')
      value: Date = new Date()
    }
    const result = new Wrapper()
    decode({
      bytes: new Uint8Array([0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01])
        .buffer,
      instance: result
    })
    expect(result.value).toEqual(new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)))
  })
})
