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

import React, { useState } from 'react'
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

import './style.scss'

// const Folder = () => (
//   <svg
//     width="1em"
//     height="1em"
//     viewBox="0 0 16 16"
//     fill="currentColor"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M9.828 4a3 3 0 01-2.12-.879l-.83-.828A1 1 0 006.173 2H2.5a1 1 0 00-1 .981L1.546 4h-1L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3v1z" />
//     <path
//       fillRule="evenodd"
//       d="M13.81 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91h10.348a1 1 0 00.995-.91l.637-7A1 1 0 0013.81 4zM2.19 3A2 2 0 00.198 5.181l.637 7A2 2 0 002.826 14h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0013.81 3H2.19z"
//       clipRule="evenodd"
//     />
//   </svg>
// )

const FolderPlus = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M13.5 10a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13v-1.5a.5.5 0 01.5-.5z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M13 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z"
      clipRule="evenodd"
    />
  </svg>
)

const FolderMinus = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M11 11.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z"
      clipRule="evenodd"
    />
  </svg>
)

const App = () => {
  // const []

  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="wrapper">
      <div className="left bg-light">
        <div className="list-group">
          <a
            href="#item-1-1"
            className="list-group-item"
            data-toggle="collapse"
            onClick={onClick}
          >
            <div className="d-flex align-items-center">
              {isOpen ? <FolderMinus /> : <FolderPlus />}
              <span className="ml-2">Root Folder</span>
            </div>
          </a>
          <div className="list-group collapse" id="item-1-1">
            <a
              href="#objects"
              className="list-group-item"
              data-toggle="collapse"
            >
              Objects
            </a>
            <div className="list-group collapse" id="objects">
              <a href="#" className="list-group-item">
                Server
              </a>
            </div>
            <a href="#" className="list-group-item">
              Types
            </a>
            <a href="#" className="list-group-item">
              Views
            </a>
          </div>
        </div>
      </div>
      <div className="content">
        some content
        <button type="button" className="btn btn-primary">
          hello
        </button>
      </div>
      <div className="right">right</div>
      <div className="footer">some footer</div>
    </div>
  )
}

render(<App />, document.getElementById('app'))
