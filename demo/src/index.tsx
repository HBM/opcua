// import Client from '../../dist/Client'
import {
  BrowseRequest,
  BrowseDescription,
  BrowseDirectionBoth,
  BrowseResultMaskAll,
  BrowseResult,
  ReferenceDescription
  // CreateSubscriptionRequest,
  // CreateMonitoredItemsRequest,
  // MonitoredItemCreateRequest,
  // ReadValueId,
  // PublishRequest,
  // CallRequest,
  // CallMethodRequest,
  // CallMethodResult,
  // MonitoringModeReporting
} from '../../dist/ua/generated'
import { NewTwoByteNodeId } from '../../dist/ua/NodeId'
import { IdRootFolder, IdOrganizes } from '../../dist/id/id'
// import Subscription from '../../dist/Subscription'
// import { TypeIdString, AttributeIdEventNotifier } from '../../dist/ua/enums'
// import Variant from '../../dist/ua/Variant'

import React, { useState, useEffect, useContext } from 'react'
import { render } from 'react-dom'
// ;(async function() {
//   const client = new Client('ws://localhost:1234')

//   // open socket connection
//   await client.open()
//   console.log('open')

//   // send hello and wait for acknowledge
//   const ack = await client.hello()
//   console.log('ack', ack)

//   // open secure channel
//   const openSecureChannelResponse = await client.openSecureChannel()
//   console.log('open secure channel', openSecureChannelResponse)

//   // create session
//   const createSessionResponse = await client.createSession()
//   console.log('create session response', createSessionResponse)

//   // activate session
//   const activateSessionResponse = await client.activateSession()
//   console.log('activate session response', activateSessionResponse)

//   // // browse root folder
//   // const req = new BrowseRequest({
//   //   NodesToBrowse: [
//   //     new BrowseDescription({
//   //       NodeId: NewTwoByteNodeId(IdRootFolder),
//   //       BrowseDirection: BrowseDirectionBoth,
//   //       IncludeSubtypes: true,
//   //       ResultMask: BrowseResultMaskAll
//   //     })
//   //   ]
//   // })

//   // const res = await client.browse(req)
//   // for (const result of res.Results as BrowseResult[]) {
//   //   for (const ref of result.References as ReferenceDescription[]) {
//   //     console.log(ref.DisplayName.Text)
//   //   }
//   // }

//   // create subscription
//   const createSubscriptionRequest = new CreateSubscriptionRequest({
//     RequestedPublishingInterval: 1000,
//     RequestedLifetimeCount: 60,
//     RequestedMaxKeepAliveCount: 20,
//     MaxNotificationsPerPublish: 0,
//     PublishingEnabled: true
//   })
//   const createSubscriptionResponse = await client.subscribe(
//     createSubscriptionRequest
//   )
//   console.log(createSubscriptionResponse)

//   const sub = new Subscription(
//     client,
//     createSubscriptionResponse.SubscriptionId
//   )

//   // send some publish requests so we get some notifications
//   // but do not wait for the response
//   sub.publish(new PublishRequest())
//   sub.publish(new PublishRequest())

//   // create monitored items
//   const createMonitoredItemsRequest = new CreateMonitoredItemsRequest({
//     ItemsToCreate: [
//       new MonitoredItemCreateRequest({
//         ItemToMonitor: new ReadValueId({
//           NodeId: NewFourByteNodeId(0, 2253),
//           AttributeId: AttributeIdEventNotifier
//         }),
//         MonitoringMode: MonitoringModeReporting
//       })
//     ]
//   })

//   const createMonitoredItemsResponse = await sub.monitor(
//     createMonitoredItemsRequest
//   )
//   console.log(createMonitoredItemsResponse)

//   // call a method on an object
//   const callRequest = new CallRequest({
//     MethodsToCall: [
//       new CallMethodRequest({
//         ObjectId: NewTwoByteNodeId(IdObjectsFolder),
//         MethodId: NewFourByteNodeId(1, 62542),
//         InputArguments: [
//           new Variant({
//             EncodingMask: TypeIdString,
//             Value: '<- please prepend hello'
//           })
//         ]
//       })
//     ]
//   })

//   const callResponse = await client.call(callRequest)
//   console.log(callResponse)

//   // show the method call result
//   for (const result of callResponse.Results as CallMethodResult[]) {
//     for (const args of result.OutputArguments as Variant[]) {
//       console.log(args.Value)
//     }
//   }

//   // call a method to trigger an event
//   const trigger = new CallRequest({
//     MethodsToCall: [
//       new CallMethodRequest({
//         ObjectId: NewTwoByteNodeId(IdObjectsFolder),
//         MethodId: NewFourByteNodeId(1, 62541)
//       })
//     ]
//   })

//   const triggerResponse = await client.call(trigger)
//   console.log(triggerResponse)
// })()

import './style.scss'
import { FolderMinus, FolderPlus } from './icons'
import { OPCUAProvider, OPCUAContext } from './context'

const App = () => {
  return (
    <OPCUAProvider>
      <Index />
    </OPCUAProvider>
  )
}

const Index = () => {
  // const []
  const ctx = useContext(OPCUAContext)

  const [isOpen, setIsOpen] = useState(false)
  const [references, setReferences] = useState<ReferenceDescription[]>([])

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  const browse = async () => {
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

    const res = await ctx.client.browse(req)
    if (res.Results) {
      if (res.Results[0].References) {
        setReferences(res.Results[0].References)
      }
    }

    for (const result of res.Results as BrowseResult[]) {
      for (const ref of result.References as ReferenceDescription[]) {
        console.log(ref.DisplayName.Text)
      }
    }
  }

  useEffect(() => {
    browse()
  }, [])

  return (
    <div className="wrapper">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            OPC UA
          </a>
        </nav>
      </header>
      <div className="left bg-light">
        <div className="list-group">
          <a
            href="#item-1-1"
            className="list-group-item py-2"
            data-toggle="collapse"
            onClick={onClick}
          >
            <div className="d-flex align-items-center">
              {isOpen ? <FolderMinus /> : <FolderPlus />}
              <span className="ml-2">Root Folder</span>
            </div>
          </a>
          <div className="list-group collapse" id="item-1-1">
            {references
              .filter(ref => ref.ReferenceTypeId.Identifier === IdOrganizes)
              .map((ref, i) => {
                return (
                  <a key={i} href="#" className="list-group-item py-2">
                    {ref.DisplayName.Text}
                  </a>
                )
              })}
          </div>
        </div>

        <div className="list-group">
          <a
            href="#item-1-1"
            className="list-group-item py-2"
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
              className="list-group-item py-2"
              data-toggle="collapse"
            >
              Objects
            </a>
            <div className="list-group collapse" id="objects">
              <a href="#" className="list-group-item py-2">
                Server
              </a>
            </div>
            <a href="#" className="list-group-item py-2">
              Types
            </a>
            <a href="#" className="list-group-item py-2">
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
