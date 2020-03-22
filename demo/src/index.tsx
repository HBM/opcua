import Client from '../../dist/Client'
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
  PublishRequest,
  CallRequest,
  CallMethodRequest,
  CallMethodResult,
  MonitoringModeReporting
} from '../../dist/ua/generated'
import { NewTwoByteNodeId, NewFourByteNodeId } from '../../dist/ua/NodeId'
import { IdRootFolder, IdObjectsFolder } from '../../dist/id/id'
import Subscription from '../../dist/Subscription'
import { TypeIdString, AttributeIdEventNotifier } from '../../dist/ua/enums'
import Variant from '../../dist/ua/Variant'

import React from 'react'
import { render } from 'react-dom'
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

  // send some publish requests so we get some notifications
  // but do not wait for the response
  sub.publish(new PublishRequest())
  sub.publish(new PublishRequest())

  // create monitored items
  const createMonitoredItemsRequest = new CreateMonitoredItemsRequest({
    ItemsToCreate: [
      new MonitoredItemCreateRequest({
        ItemToMonitor: new ReadValueId({
          NodeId: NewFourByteNodeId(0, 2253),
          AttributeId: AttributeIdEventNotifier
        }),
        MonitoringMode: MonitoringModeReporting
      })
    ]
  })

  const createMonitoredItemsResponse = await sub.monitor(
    createMonitoredItemsRequest
  )
  console.log(createMonitoredItemsResponse)

  // call a method on an object
  const callRequest = new CallRequest({
    MethodsToCall: [
      new CallMethodRequest({
        ObjectId: NewTwoByteNodeId(IdObjectsFolder),
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

  // call a method to trigger an event
  const trigger = new CallRequest({
    MethodsToCall: [
      new CallMethodRequest({
        ObjectId: NewTwoByteNodeId(IdObjectsFolder),
        MethodId: NewFourByteNodeId(1, 62541)
      })
    ]
  })

  const triggerResponse = await client.call(trigger)
  console.log(triggerResponse)
})()

class HelloMessage extends React.Component {
  render() {
    return <div>quite</div>
  }
}

render(<HelloMessage />, document.getElementById('app'))
