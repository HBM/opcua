import SecureChannel from './uasc/SecureChannel'
import {
  BrowseRequest,
  BrowseResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  ReadRequest,
  ReadResponse,
  WriteRequest,
  CallRequest,
  CallResponse
} from './ua/generated'
import Subscription from './Subscription'

export default class Client extends EventTarget {
  public endpointUrl: string
  public secureChannel: SecureChannel
  public subscriptions: Map<uint32, Subscription>

  constructor(endpointUrl: string) {
    super()
    this.endpointUrl = endpointUrl
    this.secureChannel = new SecureChannel(endpointUrl)
    this.secureChannel.addEventListener('session:activate', event => {
      this.dispatchEvent(new Event(event.type))
    })
    this.subscriptions = new Map()
  }

  public browse(req: BrowseRequest): Promise<BrowseResponse> {
    return new Promise(resolve => {
      this.secureChannel.send(req, resolve)
    })
  }

  public read(req: ReadRequest): Promise<ReadResponse> {
    return new Promise(resolve => {
      this.secureChannel.send(req, resolve)
    })
  }

  public write(req: WriteRequest): Promise<WriteRequest> {
    return new Promise(resolve => {
      this.secureChannel.send(req, resolve)
    })
  }

  public call(req: CallRequest): Promise<CallResponse> {
    return new Promise(resolve => {
      this.secureChannel.send(req, resolve)
    })
  }

  public subscribe(
    req: CreateSubscriptionRequest
  ): Promise<CreateSubscriptionResponse> {
    return new Promise(resolve => {
      this.secureChannel.send(req, resolve)
    })
  }
}
