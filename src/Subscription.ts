import {
  CreateMonitoredItemsRequest,
  CreateMonitoredItemsResponse,
  PublishRequest,
  PublishResponse,
} from './ua/generated'
import Client from './Client'
import { uint32 } from './types'

export default class Subscription extends EventTarget {
  public client: Client
  public id: uint32

  constructor(client: Client, id: uint32) {
    super()
    this.client = client
    this.id = id
  }

  public monitor(
    req: CreateMonitoredItemsRequest
  ): Promise<CreateMonitoredItemsResponse> {
    return new Promise((resolve) => {
      req.SubscriptionId = this.id
      this.client.secureChannel.send(req, resolve)
    })
  }

  public publish(req: PublishRequest): Promise<PublishResponse> {
    return new Promise((resolve) => {
      this.client.secureChannel.send(req, resolve)
    })
  }
}
