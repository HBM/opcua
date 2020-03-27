import run from './run'
import Variant from '../../dist/ua/Variant'
import { TypeId } from '../../dist/ua/enums'
import Guid from '../../dist/ua/Guid'

describe('Variant', () => {
  run([
    {
      name: 'boolean',
      instance: new Variant({
        EncodingMask: TypeId.Boolean,
        Value: false,
      }),
      bytes: new Uint8Array([0x01, 0x00]),
    },
    {
      name: 'int8',
      instance: new Variant({
        EncodingMask: TypeId.SByte,
        Value: -5,
      }),
      bytes: new Uint8Array([0x02, 0xfb]),
    },
    {
      name: 'uint8',
      instance: new Variant({
        EncodingMask: TypeId.Byte,
        Value: 5,
      }),
      bytes: new Uint8Array([0x03, 0x05]),
    },
    {
      name: 'int16',
      instance: new Variant({
        EncodingMask: TypeId.Int16,
        Value: -5,
      }),
      bytes: new Uint8Array([0x04, 0xfb, 0xff]),
    },
    {
      name: 'uint16',
      instance: new Variant({
        EncodingMask: TypeId.Uint16,
        Value: 5,
      }),
      bytes: new Uint8Array([0x05, 0x05, 0x00]),
    },
    {
      name: 'int32',
      instance: new Variant({
        EncodingMask: TypeId.Int32,
        Value: -5,
      }),
      bytes: new Uint8Array([0x06, 0xfb, 0xff, 0xff, 0xff]),
    },
    {
      name: 'uint32',
      instance: new Variant({
        EncodingMask: TypeId.Uint32,
        Value: 5,
      }),
      bytes: new Uint8Array([0x07, 0x05, 0x00, 0x00, 0x00]),
    },
    {
      name: 'int64',
      instance: new Variant({
        EncodingMask: TypeId.Int64,
        Value: BigInt(-5),
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x08, 0xfb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff
      ])
    },
    {
      name: 'uint64',
      instance: new Variant({
        EncodingMask: TypeId.Uint64,
        Value: BigInt(5),
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x09, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00
      ])
    },
    {
      name: 'float32',
      instance: new Variant({
        EncodingMask: TypeId.Float,
        Value: 4.000669956207275,
      }),
      bytes: new Uint8Array([0x0a, 0x7d, 0x05, 0x80, 0x40]),
    },
    {
      name: 'float64',
      instance: new Variant({
        EncodingMask: TypeId.Double,
        Value: 4.00067,
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x0b, 0x71, 0x5a, 0xf0, 0xa2, 0xaf, 0x0, 0x10,
        0x40
      ])
    },
    {
      name: 'string',
      instance: new Variant({
        EncodingMask: TypeId.String,
        Value: 'abc',
      }),
      bytes: new Uint8Array([0x0c, 0x03, 0x00, 0x00, 0x00, 0x61, 0x62, 0x63]),
    },
    {
      name: 'DateTime',
      instance: new Variant({
        EncodingMask: TypeId.DateTime,
        Value: new Date(Date.UTC(2018, 8, 17, 14, 28, 29, 112)),
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x0d, 0x80, 0x3b, 0xe8, 0xb3, 0x92, 0x4e, 0xd4,
        0x01
      ])
    },
    {
      name: 'Guid',
      instance: new Variant({
        EncodingMask: TypeId.GUID,
        Value: new Guid('72962B91-FA75-4AE6-8D28-B404DC7DAF63'),
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x0e, 0x91, 0x2b, 0x96, 0x72, 0x75, 0xfa, 0xe6,
        0x4a, 0x8d, 0x28, 0xb4, 0x04, 0xdc, 0x7d, 0xaf,
        0x63
      ])
    },
    {
      name: 'ByteString',
      instance: new Variant({
        EncodingMask: TypeId.ByteString,
        Value: new Uint8Array([0x01, 0x02, 0x03]),
      }),
      bytes: new Uint8Array([0x0f, 0x03, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03]),
    },
  ])
})
