import Bucket from '../ua/Bucket'

interface Options {
  SecurityPolicyUri?: string
  SenderCertificate?: string
  ReceiverCertificateThumbprint?: string
}

// https://reference.opcfoundation.org/v104/Core/docs/Part6/6.7.2/#6.7.2.3
export default class AsymmetricSecurityHeader {
  public SecurityPolicyUri: string
  public SenderCertificate: string
  public ReceiverCertificateThumbprint: string

  constructor(options?: Options) {
    this.SecurityPolicyUri =
      options?.SecurityPolicyUri ??
      'http://opcfoundation.org/UA/SecurityPolicy#None'
    this.SenderCertificate = options?.SenderCertificate ?? ''
    this.ReceiverCertificateThumbprint =
      options?.ReceiverCertificateThumbprint ?? ''
  }

  public encode(): ArrayBuffer {
    const bucket = new Bucket()
    bucket.writeString(this.SecurityPolicyUri)
    bucket.writeString(this.SenderCertificate)
    bucket.writeString(this.ReceiverCertificateThumbprint)
    return bucket.bytes
  }

  public decode(b: ArrayBuffer, position?: number): number {
    const bucket = new Bucket(b, position)
    this.SecurityPolicyUri = bucket.readString()
    this.SenderCertificate = bucket.readString()
    this.ReceiverCertificateThumbprint = bucket.readString()
    return bucket.position
  }
}
