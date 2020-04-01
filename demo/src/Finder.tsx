import React, { useEffect, useContext, useState } from 'react'
import { OPCUAContext } from './context'
import {
  ReferenceDescription,
  BrowseRequest,
  BrowseDescription,
  BrowseDirection,
  BrowseResultMask,
  NodeClass,
} from '../../dist/ua/generated'
import { useParams, Link } from 'react-router-dom'
import { ParseNodeId } from '../../dist/ua/NodeId'
import { Folder, Play, FileText, BoxArrowInRight, Layers } from './icons'

interface IconProps {
  nodeClass: NodeClass
}

const Icon = (props: IconProps) => {
  if (props.nodeClass === NodeClass.Object) {
    return <Folder />
  }
  if (props.nodeClass === NodeClass.Method) {
    return <Play />
  }
  if (props.nodeClass === NodeClass.Variable) {
    return <FileText />
  }
  if (props.nodeClass === NodeClass.ReferenceType) {
    return <BoxArrowInRight />
  }
  if (props.nodeClass === NodeClass.DataType) {
    return <Layers />
  }
  return null
}

const Finder = () => {
  const ctx = useContext(OPCUAContext)
  const [references, setReferences] = useState<ReferenceDescription[]>([])
  const { id } = useParams()
  const NodeId = ParseNodeId(id as string)

  const browse = async () => {
    const req = new BrowseRequest({
      NodesToBrowse: [
        new BrowseDescription({
          NodeId,
          BrowseDirection: BrowseDirection.Both,
          IncludeSubtypes: true,
          ResultMask: BrowseResultMask.All,
        }),
      ],
    })

    const res = await ctx.client.browse(req)
    if (res.Results) {
      if (res.Results[0].References) {
        setReferences(res.Results[0].References)
      }
    }
  }

  useEffect(() => {
    browse()
  }, [id])

  return (
    <table className="table table-sm table-hover">
      <tbody>
        {references
          .filter(
            (ref) =>
              !(
                ref.NodeClass === NodeClass.Unspecified ||
                ref.NodeClass === NodeClass.ObjectType ||
                ref.NodeClass === NodeClass.VariableType
              )
          )
          .sort((a, b) => a.NodeClass - b.NodeClass)
          .map((ref, i) => {
            if (!ref.IsForward) {
              return (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          width: '1em',
                        }}
                      ></span>
                      <Link
                        to={`/id/${ref.NodeId.NodeId.toString()}`}
                        className="ml-2"
                      >
                        ..
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            }
            return (
              <tr key={i}>
                <td>
                  <div className="d-flex align-items-center">
                    <Icon nodeClass={ref.NodeClass} />
                    <span className="ml-2">
                      <Link to={`/id/${ref.NodeId.NodeId.toString()}`}>
                        {ref.DisplayName.Text}
                      </Link>
                    </span>
                  </div>
                </td>
                <td></td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default Finder
