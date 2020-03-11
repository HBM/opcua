// import Client from '../src/Client'

// const client = new Client('ws://localhost:7681')
// console.log(client)

// import Connection from '../src/uacp/Connection'
// import SecureChannel from '../src/uasc/SecureChannel'

// const channel = new SecureChannel()

// console.log(channel)

// const connection = new Connection({ endpoint: 'ws://localhost:7681' })

// console.log(connection)

// connection.addEventListener('ack', event => {
//   console.log('high level ack', event)
// })

import Client from '../src/Client'
import { BrowseRequest, BrowseDescription } from '../src/ua/generated'
import { NewTwoByteNodeId } from '../src/ua/NodeId'
import { IdRootFolder } from '../src/id/id'

const client = new Client()

client.addEventListener('session:activate', event => {
  console.log(event)

  const req = new BrowseRequest({
    NodesToBrowse: [
      new BrowseDescription({
        NodeId: NewTwoByteNodeId(IdRootFolder)
      })
    ]
  })
  client.browse(req)

  // browser request
})
