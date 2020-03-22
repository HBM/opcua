import Bucket from './Bucket'
import { isDecoder, keyInObject, isNotNullObject } from './guards'
import factory from './factory'
import { isPrimitiveType } from './utils'
import { TypedArray } from '../types'

const NewArray = (
  subtype: string,
  length: number
): TypedArray | Array<unknown> => {
  if (subtype === 'uint8') {
    return new Uint8Array(length)
  }
  if (subtype === 'uint16') {
    return new Uint16Array(length)
  }
  if (subtype === 'uint32') {
    return new Uint32Array(length)
  }
  if (subtype === 'float64') {
    return new Float64Array(length)
  }
  return new Array<unknown>(length)
}

interface Arguments {
  bytes: ArrayBuffer
  instance: unknown
  key?: PropertyKey
  type?: string
  position?: number
}

const decode = (args: Arguments): number => {
  const { bytes, instance, position } = args
  const key = args.key ?? ''
  const type = args.type ?? typeof instance

  const bucket = new Bucket(bytes, position)

  if (isDecoder(instance)) {
    return instance.decode(bytes, position)
  }

  switch (type) {
    case 'boolean': {
      Reflect.set(instance as object, key, bucket.readBoolean())
      break
    }

    case 'int8': {
      Reflect.set(instance as object, key, bucket.readInt8())
      break
    }

    case 'uint8': {
      Reflect.set(instance as object, key, bucket.readUint8())
      break
    }

    case 'int16': {
      Reflect.set(instance as object, key, bucket.readInt16())
      break
    }

    case 'uint16': {
      Reflect.set(instance as object, key, bucket.readUint16())
      break
    }

    case 'int32': {
      Reflect.set(instance as object, key, bucket.readInt32())
      break
    }

    case 'uint32': {
      Reflect.set(instance as object, key, bucket.readUint32())
      break
    }

    case 'int64': {
      Reflect.set(instance as object, key, bucket.readInt64())
      break
    }

    case 'uint64': {
      Reflect.set(instance as object, key, bucket.readUint64())
      break
    }

    case 'float32': {
      Reflect.set(instance as object, key, bucket.readFloat32())
      break
    }

    case 'float64': {
      Reflect.set(instance as object, key, bucket.readFloat64())
      break
    }

    case 'string': {
      Reflect.set(instance as object, key, bucket.readString())
      break
    }

    case 'Date': {
      Reflect.set(instance as object, key, bucket.readDate())
      break
    }

    case 'ByteString': {
      Reflect.set(instance as object, key, bucket.readByteString())
      break
    }

    case 'Array': {
      const n = bucket.readInt32()
      if (n === -1) {
        return bucket.position
      }

      // create array by name with length
      const subtype = Reflect.getMetadata(
        'design:subtype',
        instance as object,
        key as string
      )
      const a = NewArray(subtype, n)

      for (let i = 0; i < n; i++) {
        // create new instance of given type and add it to the array
        a[i] = factory(subtype)
        // decode instance
        bucket.position = decode({
          bytes: bucket.bytes,
          instance: isPrimitiveType(subtype) ? a : a[i],
          key: i,
          type: subtype,
          position: bucket.position
        })
      }
      Reflect.set(instance as object, key, a)
      break
    }

    default:
      for (const name of Object.getOwnPropertyNames(instance)) {
        if (isNotNullObject(instance) && keyInObject(instance, name)) {
          const type = Reflect.getMetadata('design:type', instance, name)
          bucket.position = decode({
            bytes: bytes,
            instance: type === 'object' ? instance[name] : instance,
            key: name,
            type,
            position: bucket.position
          })
        }
      }
  }
  return bucket.position
}

export default decode
