import SecureChannel from './uasc/SecureChannel'
import { BrowseRequest } from './ua/generated'

export default class Client extends EventTarget {
  public secureChannel: SecureChannel

  constructor() {
    super()
    this.secureChannel = new SecureChannel()
    this.secureChannel.addEventListener('session:activate', event => {
      this.dispatchEvent(new Event(event.type))
    })
  }

  public browse(req: BrowseRequest): void {
    console.log(req)
    this.secureChannel.send(req)
  }
}
