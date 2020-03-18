import Client from '../src/Client'
import {
  BrowseRequest,
  BrowseDescription,
  BrowseDirectionBoth,
  BrowseResultMaskAll,
  BrowseResult,
  ReferenceDescription,
  CreateSubscriptionRequest,
  CreateMonitoredItemsRequest,
  MonitoredItemCreateRequest,
  ReadValueId,
  MonitoringModeReporting,
  PublishRequest,
  CallRequest,
  CallMethodRequest,
  CallMethodResult
} from '../src/ua/generated'
import {
  NewTwoByteNodeId,
  NewStringNodeId,
  NewFourByteNodeId
} from '../src/ua/NodeId'
import { IdRootFolder } from '../src/id/id'
import Subscription from '../src/Subscription'
import { AttributeIdValue, TypeIdString } from '../src/ua/enums'
import Variant from '../src/ua/Variant'
;(async function() {
  const client = new Client('ws://localhost:1234')

  // open socket connection
  await client.open()
  console.log('open')

  // send hello and wait for acknowledge
  const ack = await client.hello()
  console.log('ack', ack)

  // open secure channel
  const openSecureChannelResponse = await client.openSecureChannel()
  console.log('open secure channel', openSecureChannelResponse)

  // create session
  const createSessionResponse = await client.createSession()
  console.log('create session response', createSessionResponse)

  // activate session
  const activateSessionResponse = await client.activateSession()
  console.log('activate session response', activateSessionResponse)

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

  const createMonitoredItemsResponse = await sub.monitor(
    createMonitoredItemsRequest
  )
  console.log(createMonitoredItemsResponse)

  const publishRequest = new PublishRequest()
  const publishResponse = await sub.publish(publishRequest)

  console.log(publishResponse)

  // call a method on an object
  const callRequest = new CallRequest({
    MethodsToCall: [
      new CallMethodRequest({
        ObjectId: NewTwoByteNodeId(85),
        MethodId: NewFourByteNodeId(1, 62542),
        InputArguments: [
          new Variant({
            EncodingMask: TypeIdString,
            Value: '<- please prepend hello'
          })
        ]
      })
    ]
  })

  const callResponse = await client.call(callRequest)
  console.log(callResponse)

  // show the method call result
  for (const result of callResponse.Results as CallMethodResult[]) {
    for (const args of result.OutputArguments as Variant[]) {
      console.log(args.Value)
    }
  }
})()
