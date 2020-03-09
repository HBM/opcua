interface Callback {
  resolve: (value: MessageEvent) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason: any) => void
}

export default class AsyncWebSocket {
  private socket: WebSocket
  private queue: MessageEvent[]
  private callbacks: Callback[]

  constructor(url: string) {
    this.socket = new WebSocket(url)
    this.socket.binaryType = 'arraybuffer'
    this.queue = []
    this.callbacks = []
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.onerror = reject

      this.socket.onopen = (): void => {
        this.socket.onmessage = (event: MessageEvent): void => {
          if (this.callbacks.length !== 0) {
            const shifted = this.callbacks.shift()
            if (shifted) {
              shifted.resolve(event)
              return
            }
          }
          this.queue.push(event)
        }
        resolve()
      }
    })
  }

  public write(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    this.socket.send(data)
  }

  public read(): Promise<MessageEvent> {
    if (this.queue.length !== 0) {
      return Promise.resolve(this.queue.shift() as MessageEvent)
    }

    return new Promise((resolve, reject) => {
      this.callbacks.push({ resolve, reject })
    })
  }
}
