import Client from '../src/Client'
import {
  BrowseRequest,
  BrowseDescription,
  BrowseDirectionBoth,
  BrowseResultMaskAll,
  CreateSubscriptionRequest,
  BrowseResult,
  ReferenceDescription,
  CreateMonitoredItemsRequest,
  MonitoredItemCreateRequest,
  ReadValueId,
  MonitoringModeReporting
} from '../src/ua/generated'
import { NewTwoByteNodeId, NewStringNodeId } from '../src/ua/NodeId'
import { IdRootFolder } from '../src/id/id'
import Subscription from '../src/Subscription'
import { AttributeIdValue } from '../src/ua/enums'

const client = new Client('ws://localhost:1234')

client.addEventListener('session:activate', async event => {
  console.log(event)

  // browse root folder
  const req = new BrowseRequest({
    NodesToBrowse: [
      new BrowseDescription({
        NodeId: NewTwoByteNodeId(IdRootFolder),
        BrowseDirection: BrowseDirectionBoth,
        IncludeSubtypes: true,
        ResultMask: BrowseResultMaskAll
      })
    ]
  })

  const res = await client.browse(req)

  for (const result of res.Results as BrowseResult[]) {
    for (const ref of result.References as ReferenceDescription[]) {
      console.log(ref.DisplayName.Text)
    }
  }

  // create subscription
  const createSubscriptionRequest = new CreateSubscriptionRequest({
    RequestedPublishingInterval: 1000,
    RequestedLifetimeCount: 60,
    RequestedMaxKeepAliveCount: 20,
    MaxNotificationsPerPublish: 0,
    PublishingEnabled: true
  })
  const createSubscriptionResponse = await client.subscribe(
    createSubscriptionRequest
  )
  console.log(createSubscriptionResponse)

  const sub = new Subscription(
    client,
    createSubscriptionResponse.SubscriptionId
  )

  // create monitored items
  const createMonitoredItemsRequest = new CreateMonitoredItemsRequest({
    ItemsToCreate: [
      new MonitoredItemCreateRequest({
        ItemToMonitor: new ReadValueId({
          NodeId: NewStringNodeId(1, 'the.answer'),
          AttributeId: AttributeIdValue
        }),
        MonitoringMode: MonitoringModeReporting
      })
    ]
  })

  const createMonitoredItemsResponse = sub.monitor(createMonitoredItemsRequest)
  console.log(createMonitoredItemsResponse)
})
