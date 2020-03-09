import Bucket from '../ua/Bucket'

interface Options {
  TokenId?: uint32
}

export default class SymmetricSecurityHeader {
  public TokenId: uint32

  constructor(options?: Options) {
    this.TokenId = options?.TokenId ?? 0
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeUint32(this.TokenId)
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.TokenId = bucket.readUint32()
    return bucket.position
  }
}
