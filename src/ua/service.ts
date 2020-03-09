import * as spec from './generated'
import * as id from '../id/id'
import ExpandedNodeId from './ExpandedNodeId'
import decode from './decode'

const registry = new Map()

registry

interface Service {
  typeId: ExpandedNodeId
  service: unknown
}

export const decodeService = (b: ArrayBuffer, position?: number): Service => {
  const typeId = new ExpandedNodeId()
  position = typeId.decode(b, position)

  // b = b.subarray(n)

  // create new instance from given type id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const name = (id as any)[typeId.NodeId.Type] as string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const service = new (spec as any)[name]()

  // decode(b, service, position)
  decode({
    bytes: b,
    instance: service,
    position
  })

  return {
    typeId,
    service
  }
}
