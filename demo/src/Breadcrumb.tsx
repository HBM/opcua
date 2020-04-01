import React, { useEffect, useContext, useState } from 'react'
import { OPCUAContext } from './context'
import {
  ReferenceDescription,
  BrowseRequest,
  BrowseDescription,
  BrowseDirection,
  BrowseResultMask,
  ReadRequest,
  ReadValueId,
} from '../../dist/ua/generated'
import { useParams, Link } from 'react-router-dom'
import NodeId, { ParseNodeId } from '../../dist/ua/NodeId'
import { AttributeId } from '../../dist/ua/enums'
import LocalizedText from '../../dist/ua/LocalizedText'
import { Id } from '../../dist/id/id'

const Breadcrumb = () => {
  const ctx = useContext(OPCUAContext)
  const [references, setReferences] = useState<ReferenceDescription[]>([])
  const { id } = useParams()
  const [name, setName] = useState('')

  let refs: ReferenceDescription[] = []

  // browse parent references
  const browse = async (NodeId: NodeId) => {
    // stop browsing at the root node and update the breadcrumb
    if (NodeId.Identifier == Id.RootFolder) {
      setReferences([...refs])
      return
    }

    // browse recursively
    const req = new BrowseRequest({
      NodesToBrowse: [
        new BrowseDescription({
          NodeId,
          BrowseDirection: BrowseDirection.Inverse,
          IncludeSubtypes: true,
          ResultMask: BrowseResultMask.All,
        }),
      ],
    })

    const res = await ctx.client.browse(req)
    if (res.Results) {
      if (res.Results[0].References) {
        refs = [...res.Results[0].References, ...refs]
        browse(res.Results[0].References[0].NodeId.NodeId)
      }
    }
  }

  // read current node
  const read = async (NodeId: NodeId) => {
    const response = await ctx.client.read(
      new ReadRequest({
        NodesToRead: [
          new ReadValueId({
            NodeId,
            AttributeId: AttributeId.DisplayName,
          }),
        ],
      })
    )

    const results = response.Results
    if (results) {
      setName((results[0].Value?.Value as LocalizedText).Text)
    }
  }

  useEffect(() => {
    const NodeId = ParseNodeId(id as string)
    browse(NodeId)
    read(NodeId)
  }, [id])

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {references.map((ref, i) => {
          return (
            <li className="breadcrumb-item" key={i}>
              <Link to={`/id/${ref.NodeId.NodeId.toString()}`}>
                {ref.DisplayName.Text}
              </Link>
            </li>
          )
        })}
        <li className="breadcrumb-item active" aria-current="page">
          {name}
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb
