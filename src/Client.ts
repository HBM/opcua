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
  CallResponse,
  OpenSecureChannelResponse,
  CreateSessionResponse,
  ActivateSessionResponse,
} from './ua/generated'
import Subscription from './Subscription'
import AcknowledgeMessage from './uacp/AcknowledgeMessage'
import { uint32 } from './types'

export default class Client {
  public endpointUrl: string
  public secureChannel: SecureChannel
  public subscriptions: Map<uint32, Subscription>

  constructor(endpointUrl: string) {
    this.endpointUrl = endpointUrl
    this.secureChannel = new SecureChannel(endpointUrl)
    this.subscriptions = new Map()
  }

  public open(): Promise<void> {
    return this.secureChannel.open()
  }

  public hello(): Promise<AcknowledgeMessage> {
    return this.secureChannel.hello()
  }

  public openSecureChannel(): Promise<OpenSecureChannelResponse> {
    return this.secureChannel.openSecureChannel()
  }

  public createSession(): Promise<CreateSessionResponse> {
    return this.secureChannel.createSession()
  }

  public activateSession(): Promise<ActivateSessionResponse> {
    return this.secureChannel.activateSession()
  }

  public browse(req: BrowseRequest): Promise<BrowseResponse> {
    return new Promise((resolve) => {
      this.secureChannel.send(req, resolve)
    })
  }

  public read(req: ReadRequest): Promise<ReadResponse> {
    return new Promise((resolve) => {
      this.secureChannel.send(req, resolve)
    })
  }

  public write(req: WriteRequest): Promise<WriteRequest> {
    return new Promise((resolve) => {
      this.secureChannel.send(req, resolve)
    })
  }

  public call(req: CallRequest): Promise<CallResponse> {
    return new Promise((resolve) => {
      this.secureChannel.send(req, resolve)
    })
  }

  public subscribe(
    req: CreateSubscriptionRequest
  ): Promise<CreateSubscriptionResponse> {
    return new Promise((resolve) => {
      this.secureChannel.send(req, resolve)
    })
  }
}
