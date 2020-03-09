import * as generated from './generated'
import Variant from './Variant'
import DiagnosticInfo from './DiagnosticInfo'
import ExpandedNodeId from './ExpandedNodeId'
import ExtensionObject from './ExtensionObject'
import LocalizedText from './LocalizedText'
import Guid from './Guid'
import NodeId from './NodeId'
import ConnectionProtocolMessageHeader from '../uacp/ConnectionProtocolMessageHeader'
import AcknowledgeMessage from '../uacp/AcknowledgeMessage'
import HelloMessage from '../uacp/HelloMessage'
import SequenceHeader from '../uasc/SequenceHeader'
import SymmetricSecurityHeader from '../uasc/SymmetricSecurityHeader'
import AsymmetricSecurityHeader from '../uasc/AsymmetricSecurityHeader'
import SecureConversationMessageHeader from '../uasc/SecureConversationMessageHeader'

const factory = (name: string): unknown => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((generated as any)[name]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new (generated as any)[name]()
  }
  switch (name) {
    case 'string':
      return String()
    case 'uint32':
      return Number()
    // case 'Uint32Array':
    //   return new Uint32Array()
    case 'Variant':
      return new Variant()
    case 'DiagnosticInfo':
      return new DiagnosticInfo()
    case 'ExpandedNodeId':
      return new ExpandedNodeId()
    case 'ExtensionObject':
      return new ExtensionObject()
    case 'Guid':
      return new Guid()
    case 'LocalizedText':
      return new LocalizedText()
    case 'NodeId':
      return new NodeId()
    case 'ConnectionProtocolMessageHeader':
      return new ConnectionProtocolMessageHeader()
    case 'AcknowledgeMessage':
      return new AcknowledgeMessage()
    case 'HelloMessage':
      return new HelloMessage()
    case 'SequenceHeader':
      return new SequenceHeader()
    case 'SymmetricSecurityHeader':
      return new SymmetricSecurityHeader()
    case 'AsymmetricSecurityHeader':
      return new AsymmetricSecurityHeader()
    case 'SecureConversationMessageHeader':
      return new SecureConversationMessageHeader()
    default:
      throw new Error(`unsupported class name: ${name}`)
  }
}

export default factory
