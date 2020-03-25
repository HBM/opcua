// import Client from '../../dist/Client'
import {
  BrowseDirection,
  BrowseResultMask,
  BrowseRequest,
  BrowseDescription,
  BrowseResult,
  ReferenceDescription,
  ReadRequest,
  ReadValueId,
  AttributeWriteMask,
  EventNotifierType,
  NodeClass
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
import { NewTwoByteNodeId, ParseNodeId } from '../../dist/ua/NodeId'
import { Id } from '../../dist/id/id'
// import Subscription from '../../dist/Subscription'
// import { TypeIdString, AttributeIdEventNotifier } from '../../dist/ua/enums'
// import Variant from '../../dist/ua/Variant'

import React, { useState, useEffect, useContext } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'
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
import { AttributeId } from '../../dist/ua/enums'
import QualifiedName from '../../dist/ua/QualifiedName'
import LocalizedText from '../../dist/ua/LocalizedText'

const App = () => {
  return (
    <OPCUAProvider>
      <Router>
        <Index />
      </Router>
    </OPCUAProvider>
  )
}

const filter = (ref: ReferenceDescription) => {
  return (
    ref.IsForward && ref.ReferenceTypeId.Identifier !== Id.HasTypeDefinition
  )
}

const Objects = () => {
  const ctx = useContext(OPCUAContext)
  const [references, setReferences] = useState<ReferenceDescription[]>([])

  const browse = async () => {
    // browse all objects
    const objects = await ctx.client.browse(
      new BrowseRequest({
        NodesToBrowse: [
          new BrowseDescription({
            NodeId: NewTwoByteNodeId(Id.ObjectsFolder),
            BrowseDirection: BrowseDirection.Both,
            IncludeSubtypes: true,
            ResultMask: BrowseResultMask.All
          })
        ]
      })
    )

    if (objects.Results) {
      if (objects.Results[0].References) {
        setReferences(objects.Results[0].References)
      }
    }

    console.log(objects)
  }

  useEffect(() => {
    browse()
  }, [])

  return (
    <div className="list-group">
      {references.filter(filter).map((ref, i) => {
        return (
          <React.Fragment key={i}>
            <Link
              to={`/id/${ref.NodeId.NodeId.toString()}`}
              className="list-group-item py-2"
            >
              {ref.DisplayName.Text}
            </Link>
          </React.Fragment>
        )
      })}
    </div>
  )
}

const ReferencesComponet = () => {
  const ctx = useContext(OPCUAContext)
  let { id } = useParams()
  const NodeId = ParseNodeId(id as string)

  const [references, setReferences] = useState<ReferenceDescription[]>([])

  const read = async () => {
    const response = await ctx.client.browse(
      new BrowseRequest({
        NodesToBrowse: [
          new BrowseDescription({
            NodeId,
            BrowseDirection: BrowseDirection.Forward,
            ReferenceTypeId: NewTwoByteNodeId(Id.References),
            IncludeSubtypes: true,
            ResultMask: BrowseResultMask.All
          })
        ]
      })
    )

    if (response.Results) {
      setReferences(response.Results[0].References as ReferenceDescription[])
    }
  }

  useEffect(() => {
    read()
  }, [id])

  return (
    <div className="card">
      <div className="card-header border-0">References</div>
      <table className="table table-sm table-hover mb-0">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Target</th>
          </tr>
        </thead>
        <tbody>
          {references.map((ref, i) => {
            return (
              <tr key={i}>
                <td>
                  {Id[ref.ReferenceTypeId.Identifier as number]} (
                  {ref.ReferenceTypeId.Identifier})
                </td>
                <td>{ref.DisplayName.Text}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const ReferenceDescriptionComponent = () => {
  const ctx = useContext(OPCUAContext)
  let { id } = useParams()
  const NodeId = ParseNodeId(id as string)

  const [nodeClass, setNodeClass] = useState(0)
  const [browseName, setBrowseName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [description, setDescription] = useState('')
  const [writeMask, setWriteMask] = useState(0)
  const [userWriteMask, setUserWriteMask] = useState(0)
  const [eventNotifier, setEventNotifier] = useState(0)

  const read = async () => {
    const response = await ctx.client.read(
      new ReadRequest({
        NodesToRead: [
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.NodeClass
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.BrowseName
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.DisplayName
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.Description
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.WriteMask
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.UserWriteMask
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.EventNotifier
          })
        ]
      })
    )

    const results = response.Results
    if (results) {
      setNodeClass(results[0].Value?.Value as number)
      setBrowseName((response.Results![1].Value?.Value as QualifiedName).Name)
      setDisplayName((response.Results![2].Value?.Value as LocalizedText).Text)
      setDescription((response.Results![3].Value?.Value as LocalizedText).Text)
      setWriteMask(response.Results![4].Value?.Value as AttributeWriteMask)
      setUserWriteMask(response.Results![5].Value?.Value as AttributeWriteMask)
      setEventNotifier(response.Results![6].Value?.Value as EventNotifierType)
    }
  }

  useEffect(() => {
    read()
  }, [id])

  return (
    <React.Fragment>
      <div className="card mb-5">
        <div className="card-header border-0">Attributes</div>
        <table className="table table-sm table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Node Id</td>
              <td>...</td>
            </tr>
            <tr>
              <td>Node Class</td>
              <td>
                {NodeClass[nodeClass]} ({nodeClass})
              </td>
            </tr>
            <tr>
              <td>Browse Name</td>
              <td>{browseName}</td>
            </tr>
            <tr>
              <td>Display Name</td>
              <td>{displayName}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>Write Mask</td>
              <td>
                {AttributeWriteMask[writeMask]} ({writeMask})
              </td>
            </tr>
            <tr>
              <td>User Write Mask</td>
              <td>
                {AttributeWriteMask[userWriteMask]} ({userWriteMask})
              </td>
            </tr>
            <tr>
              <td>Event Notifier</td>
              <td>
                {EventNotifierType[eventNotifier]} ({eventNotifier})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ReferencesComponet />
    </React.Fragment>
  )
}

const Index = () => {
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
          NodeId: NewTwoByteNodeId(Id.RootFolder),
          BrowseDirection: BrowseDirection.Both,
          IncludeSubtypes: true,
          ResultMask: BrowseResultMask.All
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
              .filter(ref => ref.ReferenceTypeId.Identifier === Id.Organizes)
              .map((ref, i) => {
                return (
                  <React.Fragment key={i}>
                    <Link
                      to={`/id/${ref.NodeId.NodeId.toString()}`}
                      className="list-group-item py-2"
                    >
                      {ref.DisplayName.Text}
                    </Link>
                    {ref.NodeId.NodeId.Identifier === Id.ObjectsFolder ? (
                      <Objects />
                    ) : null}
                  </React.Fragment>
                )
              })}
          </div>
        </div>
      </div>
      <div className="content">
        <Switch>
          <Route path="/id/:id">
            <ReferenceDescriptionComponent />
          </Route>
        </Switch>
      </div>
      <div className="right">right</div>
      <div className="footer">some footer</div>
    </div>
  )
}

render(<App />, document.getElementById('app'))
