import React, { useContext, useState, useEffect } from 'react'
import { OPCUAContext } from './context'
import { useParams } from 'react-router-dom'
import { ParseNodeId } from '../../dist/ua/NodeId'
import {
  ReadRequest,
  ReadValueId,
  AttributeWriteMask,
  EventNotifierType,
  NodeClass,
  NodeIdType,
} from '../../dist/ua/generated'
import { AttributeId } from '../../dist/ua/enums'
import QualifiedName from '../../dist/ua/QualifiedName'
import LocalizedText from '../../dist/ua/LocalizedText'

const Attributes = () => {
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
            AttributeId: AttributeId.NodeClass,
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.BrowseName,
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.DisplayName,
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.Description,
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.WriteMask,
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.UserWriteMask,
          }),
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.EventNotifier,
          }),
        ],
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
    <div className="card mb-5">
      <div className="card-header border-0">Attributes</div>
      <table
        className="table table-sm table-hover mb-0"
        style={{
          tableLayout: 'fixed',
        }}
      >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Node Id</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td className="pl-4">Namespace Index</td>
            <td>{NodeId.Namespace}</td>
          </tr>
          <tr>
            <td className="pl-4">Identifier Type</td>
            <td>
              {NodeIdType[NodeId.Type]} ({NodeId.Type})
            </td>
          </tr>
          <tr>
            <td className="pl-4">Identifier</td>
            <td>{NodeId.Identifier}</td>
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
  )
}

export default Attributes
