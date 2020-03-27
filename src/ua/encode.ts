import Bucket from './Bucket'
import { isEncoder, isTypedArray, keyInObject, isNotNullObject } from './guards'

interface Arguments {
  instance: unknown
  type?: string
  subtype?: string
}

export const encode = (args: Arguments): ArrayBuffer => {
  const { instance } = args
  const type = args.type ?? typeof instance
  const subtype = args.subtype ?? ''
  const bucket = new Bucket()
  if (isEncoder(instance)) {
    return instance.encode()
  }
  switch (type) {
    case 'boolean': {
      bucket.writeBoolean(instance as boolean)
      break
    }

    case 'int8': {
      bucket.writeInt8(instance as number)
      break
    }

    case 'uint8': {
      bucket.writeUint8(instance as number)
      break
    }

    case 'int16': {
      bucket.writeInt16(instance as number)
      break
    }

    case 'uint16': {
      bucket.writeUint16(instance as number)
      break
    }

    case 'int32': {
      bucket.writeInt32(instance as number)
      break
    }

    case 'uint32': {
      bucket.writeUint32(instance as number)
      break
    }

    case 'int64': {
      bucket.writeInt64(BigInt(instance))
      break
    }

    case 'uint64': {
      bucket.writeUint64(BigInt(instance))
      break
    }

    case 'float32': {
      bucket.writeFloat32(instance as number)
      break
    }

    case 'float64': {
      bucket.writeFloat64(instance as number)
      break
    }

    case 'string': {
      bucket.writeString(instance as string)
      break
    }

    case 'Date': {
      bucket.writeDate(instance as Date)
      break
    }

    case 'ByteString': {
      bucket.writeByteString(instance as Uint8Array)
      break
    }

    case 'Array': {
      if (instance === null) {
        bucket.writeInt32(-1)
        return bucket.bytes
      }
      if (isTypedArray(instance) || Array.isArray(instance)) {
        bucket.writeUint32(instance.length)
        for (const item of instance) {
          const b = encode({
            instance: item,
            type: subtype,
          })
          bucket.write(b)
        }
      }
      break
    }

    // all complex objects, structs and classes
    default: {
      for (const name of Object.getOwnPropertyNames(instance)) {
        if (isNotNullObject(instance) && keyInObject(instance, name)) {
          const type = Reflect.getMetadata('design:type', instance, name)
          const subtype = Reflect.getMetadata('design:subtype', instance, name)
          const b = encode({
            instance: instance[name],
            type,
            subtype,
          })
          bucket.write(b)
        }
      }
    }
  }
  return bucket.bytes
}
