import Client from '../src/Client'
import { BrowseRequest, BrowseDescription } from '../src/ua/generated'
import { NewTwoByteNodeId } from '../src/ua/NodeId'
import { IdRootFolder } from '../src/id/id'

const client = new Client()

client.addEventListener('session:activate', async event => {
  console.log(event)

  const req = new BrowseRequest({
    NodesToBrowse: [
      new BrowseDescription({
        NodeId: NewTwoByteNodeId(IdRootFolder)
      })
    ]
  })

  const res = await client.browse(req)
  console.log('awaited')
  console.log(res)
})
