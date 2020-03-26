import React, { useContext, useState, useEffect } from 'react'
import { OPCUAContext } from './context'
import {
  ReferenceDescription,
  BrowseRequest,
  BrowseDescription,
  BrowseDirection,
  BrowseResultMask,
  ReadValueId,
  ReadRequest,
  NodeClass
} from '../../dist/ua/generated'
import { Id } from '../../dist/id/id'
import { ChevronDown, ChevronRight, Play, Folder, Server } from './icons'
import { Link, useParams } from 'react-router-dom'
import { AttributeId } from '../../dist/ua/enums'
import LocalizedText from '../../dist/ua/LocalizedText'
import classnames from 'classnames'

interface Properties {
  referenceDescription: ReferenceDescription
}

// const foo = new Map<uint32, SVGElement>()

const Icon = (props: Properties) => {
  if (props.referenceDescription.NodeId.NodeId.Identifier === Id.Server) {
    return <Server />
  }
  if (props.referenceDescription.NodeClass === NodeClass.Method) {
    return <Play />
  }
  return <Folder />
}

const ListGroup = (props: Properties) => {
  const { id } = useParams()
  const ctx = useContext(OPCUAContext)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [references, setReferences] = useState<ReferenceDescription[]>([])

  const onClick = () => {
    setIsOpen(!isOpen)
    browse()
  }

  const read = async () => {
    const response = await ctx.client.read(
      new ReadRequest({
        NodesToRead: [
          new ReadValueId({
            NodeId: props.referenceDescription.NodeId.NodeId,
            AttributeId: AttributeId.DisplayName
          })
        ]
      })
    )
    if (response.Results) {
      setName((response.Results[0].Value?.Value as LocalizedText).Text)
    }
  }

  const browse = async () => {
    const req = new BrowseRequest({
      NodesToBrowse: [
        new BrowseDescription({
          NodeId: props.referenceDescription.NodeId.NodeId,
          BrowseDirection: BrowseDirection.Forward,
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
  }

  useEffect(() => {
    read()
  }, [])

  console.log(references)

  console.log(id, props.referenceDescription.NodeId.NodeId.toString())

  return (
    <ul className="list-group">
      <li
        className={classnames('list-group-item py-2', {
          active: id === props.referenceDescription.NodeId.NodeId.toString()
        })}
      >
        <div className="d-flex align-items-center">
          <a onClick={onClick}>{isOpen ? <ChevronDown /> : <ChevronRight />}</a>

          <span className="ml-1">
            <Icon referenceDescription={props.referenceDescription} />
          </span>

          <span className="ml-2">
            <Link
              to={`/id/${props.referenceDescription.NodeId.NodeId.toString()}`}
            >
              {name}
            </Link>
          </span>
        </div>
      </li>
      <div
        className={classnames('list-group collapse', {
          show: isOpen
        })}
      >
        {references
          //   .filter(ref => ref.ReferenceTypeId.Identifier === Id.Organizes)
          .map((ref, i) => {
            if (ref.NodeId.NodeId.Identifier === Id.FolderType) {
              return null
            }
            return <ListGroup key={i} referenceDescription={ref} />
            // return (
            //   <React.Fragment key={i}>

            //         <li className="list-group-item">
            //         <div className="d-flex align-items-center">
            //           <span>
            //             <Play />
            //           </span>

            //         <Link
            //         to={`/id/${ref.NodeId.NodeId.toString()}`}

            //       >
            //           <span className="ml-2">{ref.DisplayName.Text}</span>
            //       </Link>
            //       </div>

            //         </li>
            //         {ref.ReferenceTypeId.Identifier === Id.Organizes ? (
            //       <ListGroup nodeId={ref.NodeId.NodeId} />
            //     ) : ( null
            //     )}
            //   </React.Fragment>
            // )
          })}
      </div>
    </ul>
  )
}

// const filter = (ref: ReferenceDescription) => {
//   return (
//     ref.IsForward && ref.ReferenceTypeId.Identifier !== Id.HasTypeDefinition
//   )
// }

// const Objects = () => {
//   const ctx = useContext(OPCUAContext)
//   const [references, setReferences] = useState<ReferenceDescription[]>([])

//   const browse = async () => {
//     // browse all objects
//     const objects = await ctx.client.browse(
//       new BrowseRequest({
//         NodesToBrowse: [
//           new BrowseDescription({
//             NodeId: NewTwoByteNodeId(Id.ObjectsFolder),
//             BrowseDirection: BrowseDirection.Both,
//             IncludeSubtypes: true,
//             ResultMask: BrowseResultMask.All
//           })
//         ]
//       })
//     )

//     if (objects.Results) {
//       if (objects.Results[0].References) {
//         setReferences(objects.Results[0].References)
//       }
//     }
//   }

//   useEffect(() => {
//     browse()
//   }, [])

//   return (
//     <div className="list-group">
//       {references.filter(filter).map((ref, i) => {
//         return (
//           <React.Fragment key={i}>
//             <Link
//               to={`/id/${ref.NodeId.NodeId.toString()}`}
//               className="list-group-item py-2"
//             >
//               {ref.DisplayName.Text}
//             </Link>
//           </React.Fragment>
//         )
//       })}
//     </div>
//   )
// }

export default ListGroup
