import Bucket from '../../dist/ua/Bucket'
import NodeId, { NewTwoByteNodeId } from '../../dist/ua/NodeId'

describe('Bucket', () => {
  test('readInt8', () => {
    const bucket = new Bucket(new Uint8Array([0x01]).buffer)
    expect(bucket.readInt8()).toEqual(1)
  })

  test('writeInt8', () => {
    const bucket = new Bucket()
    bucket.writeInt8(1)
    const expected = new Uint8Array([0x01])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readUint8', () => {
    const bucket = new Bucket(new Uint8Array([0x01]).buffer)
    expect(bucket.readUint8()).toEqual(1)
  })

  test('writeUint8', () => {
    const bucket = new Bucket()
    bucket.writeUint8(1)
    const expected = new Uint8Array([0x01])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readInt16', () => {
    const bucket = new Bucket(new Uint8Array([0x01, 0x00]).buffer)
    expect(bucket.readInt16()).toEqual(1)
  })

  test('writeInt16', () => {
    const bucket = new Bucket()
    bucket.writeInt16(1)
    const expected = new Uint8Array([0x01, 0x00])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readUint16', () => {
    const bucket = new Bucket(new Uint8Array([0x01, 0x00]).buffer)
    expect(bucket.readUint16()).toEqual(1)
  })

  test('writeUint16', () => {
    const bucket = new Bucket()
    bucket.writeUint16(1)
    const expected = new Uint8Array([0x01, 0x00])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readInt32', () => {
    const bucket = new Bucket(new Uint8Array([0x01, 0x00, 0x00, 0x00]).buffer)
    expect(bucket.readInt32()).toEqual(1)
  })

  test('writeInt32', () => {
    const bucket = new Bucket()
    bucket.writeInt32(1)
    const expected = new Uint8Array([0x01, 0x00, 0x00, 0x00])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readUint32', () => {
    const bucket = new Bucket(new Uint8Array([0x01, 0x00, 0x00, 0x00]).buffer)
    expect(bucket.readUint32()).toEqual(1)
  })

  test('writeUint32', () => {
    const bucket = new Bucket()
    bucket.writeUint32(1)
    const expected = new Uint8Array([0x01, 0x00, 0x00, 0x00])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readFloat32', () => {
    const bucket = new Bucket(new Uint8Array([0xb6, 0xf3, 0x9d, 0x3f]).buffer)
    expect(bucket.readFloat32()).toBeCloseTo(1.234)
  })

  test('writeFloat32', () => {
    const bucket = new Bucket()
    bucket.writeFloat32(1.234)
    const expected = new Uint8Array([0xb6, 0xf3, 0x9d, 0x3f])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readInt64', () => {
    const bucket = new Bucket(
      new Uint8Array([0xfb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]).buffer
    )
    expect(bucket.readInt64()).toEqual(BigInt(-5))
  })

  test('writeInt64', () => {
    const bucket = new Bucket()
    bucket.writeInt64(BigInt(-5))
    // prettier-ignore
    const expected = new Uint8Array([
      0xfb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
    ])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readUint64', () => {
    const bucket = new Bucket(
      new Uint8Array([0xef, 0xcd, 0xab, 0x90, 0x78, 0x56, 0x34, 0x12]).buffer
    )
    expect(bucket.readUint64()).toEqual(BigInt('0x1234567890ABCDEF'))
  })

  test('writeUint64', () => {
    const bucket = new Bucket()
    bucket.writeUint64(BigInt('0x1234567890ABCDEF'))
    // prettier-ignore
    const expected = new Uint8Array([
      0xef, 0xcd, 0xab, 0x90, 0x78, 0x56, 0x34, 0x12
    ])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readFloat64', () => {
    const bucket = new Bucket(
      new Uint8Array([0x58, 0x39, 0xb4, 0xc8, 0x76, 0xbe, 0xf3, 0xbf]).buffer
    )
    expect(bucket.readFloat64()).toBeCloseTo(-1.234)
  })

  test('writeFloat64', () => {
    const bucket = new Bucket()
    bucket.writeFloat64(-1.234)
    // prettier-ignore
    const expected = new Uint8Array([
      0x58, 0x39, 0xb4, 0xc8, 0x76, 0xbe, 0xf3, 0xbf
    ])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readString', () => {
    // prettier-ignore
    const bucket = new Bucket(new Uint8Array([
      0x06, 0x00, 0x00, 0x00, 0x48, 0x6F, 0x74, 0xe6,
      0xb0, 0xb4
    ]).buffer)
    expect(bucket.readString()).toEqual('Hot水')
  })

  test('writeString', () => {
    const bucket = new Bucket()
    bucket.writeString('Hot水')
    // prettier-ignore
    const expected = new Uint8Array([
      0x06, 0x00, 0x00, 0x00, 0x48, 0x6F, 0x74, 0xe6,
      0xb0, 0xb4
    ])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readStringBytes', () => {
    const bucket = new Bucket(new Uint8Array([0x41, 0x43, 0x4b]).buffer)
    expect(bucket.readStringBytes(3)).toEqual('ACK')
  })

  test('writeStringBytes', () => {
    const bucket = new Bucket()
    bucket.writeStringBytes('ACK')
    // prettier-ignore
    const expected = new Uint8Array([
      0x41, 0x43, 0x4b
    ])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readStruct', () => {
    const bucket = new Bucket(new Uint8Array([0x00, 0x00]).buffer)
    const v = new NodeId()
    bucket.readStruct(v)
    expect(JSON.stringify(v)).toEqual(JSON.stringify(NewTwoByteNodeId(0)))
  })

  test('writeStruct', () => {
    const bucket = new Bucket()
    bucket.writeStruct(NewTwoByteNodeId(0))
    // prettier-ignore
    const expected = new Uint8Array([
      0x00, 0x00
    ])
    expect(bucket.bytes).toEqual(expected.buffer)
  })

  test('readDate', () => {
    const bucket = new Bucket(
      new Uint8Array([0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01]).buffer
    )
    expect(bucket.readDate()).toEqual(
      new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0))
    )
  })

  test('writeDate', () => {
    const bucket = new Bucket()
    bucket.writeDate(new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)))
    // prettier-ignore
    const expected = new Uint8Array([
      0x00, 0x98, 0x67, 0xdd, 0xfd, 0x30, 0xd4, 0x01
    ])
    expect(bucket.bytes).toEqual(expected.buffer)
  })
})
