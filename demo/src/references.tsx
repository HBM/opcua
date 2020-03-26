import React, { useContext, useState, useEffect } from 'react'
import { OPCUAContext } from './context'
import { useParams } from 'react-router-dom'
import { ParseNodeId, NewTwoByteNodeId } from '../../dist/ua/NodeId'
import {
  ReferenceDescription,
  BrowseRequest,
  BrowseDirection,
  BrowseResultMask,
  BrowseDescription
} from '../../dist/ua/generated'
import { Id } from '../../dist/id/id'

const References = () => {
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
      <table
        className="table table-sm table-hover mb-0"
        style={{
          tableLayout: 'fixed'
        }}
      >
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

export default References
