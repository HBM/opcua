// import Client from '../src/Client'

// const client = new Client('ws://localhost:7681')
// console.log(client)

// import Connection from '../src/uacp/Connection'
import SecureChannel from '../src/uasc/SecureChannel'

const channel = new SecureChannel()

console.log(channel)

// const connection = new Connection({ endpoint: 'ws://localhost:7681' })

// console.log(connection)

// connection.addEventListener('ack', event => {
//   console.log('high level ack', event)
// })
