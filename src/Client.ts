import SecureChannel from './uasc/SecureChannel'
import { BrowseRequest, BrowseResponse } from './ua/generated'

export default class Client extends EventTarget {
  public endpointUrl: string
  public secureChannel: SecureChannel

  constructor(endpointUrl: string) {
    super()
    this.endpointUrl = endpointUrl
    this.secureChannel = new SecureChannel(endpointUrl)
    this.secureChannel.addEventListener('session:activate', event => {
      this.dispatchEvent(new Event(event.type))
    })
  }

  public browse(req: BrowseRequest): Promise<BrowseResponse> {
    console.log(req)

    return new Promise(resolve => {
      // resolve()
      this.secureChannel.send(req, resolve)
    })
  }
}
