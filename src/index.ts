import Client from './Client'
import Subscription from './Subscription'
import * as Types from './types'

import Bucket from './ua/Bucket'
import decode from './ua/decode'
import { encode } from './ua/encode'

import DataValue, {
  DataValueValue,
  DataValueStatusCode,
  DataValueSourceTimestamp,
  DataValueServerTimestamp,
  DataValueSourcePicoseconds,
  DataValueServerPicoseconds,
} from './ua/DataValue'

const DataValueMask = {
  DataValueValue,
  DataValueStatusCode,
  DataValueSourceTimestamp,
  DataValueServerTimestamp,
  DataValueSourcePicoseconds,
  DataValueServerPicoseconds,
}

import DiagnosticInfo, {
  SymbolicId,
  NamespaceUri,
  LocalizedText as LT,
  Locale,
  AdditionalInfo,
  InnerStatusCode,
  InnerDiagnosticInfo,
} from './ua/DiagnosticInfo'

const DiagnosticMask = {
  SymbolicId,
  NamespaceUri,
  LocalizedText: LT,
  Locale,
  AdditionalInfo,
  InnerStatusCode,
  InnerDiagnosticInfo,
}

import { TypeId, AttributeId } from './ua/enums'

import ExpandedNodeId, {
  NewTwoByteExpandedNodeId,
  NewFourByteExpandedNodeId,
} from './ua/ExpandedNodeId'

import ExtensionObject, {
  ExtensionObjectEmpty,
  ExtensionObjectBinary,
} from './ua/ExtensionObject'

import factory from './ua/factory'
import * as EnumsTypesClasses from './ua/generated'

import {
  isEncoder,
  isDecoder,
  isTypedArray,
  isNotNullObject,
  keyInObject,
} from './ua/guards'

const guards = {
  isEncoder,
  isDecoder,
  isTypedArray,
  isNotNullObject,
  keyInObject,
}

import Guid from './ua/Guid'

import LocalizedText, {
  LocalizedTextLocale,
  LocalizedTextText,
} from './ua/LocalizedText'

import NodeId, {
  NewTwoByteNodeId,
  NewFourByteNodeId,
  NewNumericNodeId,
  NewStringNodeId,
  NewGuidNodeId,
  NewByteStringNodeId,
  ParseNodeId,
} from './ua/NodeId'

import QualifiedName from './ua/QualifiedName'

import {
  SecurityTokenRequestTypeIssue,
  SecurityTokenRequestTypeRenew,
} from './ua/SecurityTokenRequestType'

import { decodeService } from './ua/service'
import { StatusCode } from './ua/StatusCode'
import { isPrimitiveType } from './ua/utils'

import Variant, {
  VariantArrayDimensions,
  VariantArrayValues,
} from './ua/Variant'

import { Id } from './id/id'

export default Client
export {
  Bucket,
  DataValue,
  DataValueMask,
  Types,
  Subscription,
  decode,
  DiagnosticInfo,
  DiagnosticMask,
  encode,
  TypeId,
  AttributeId,
  ExpandedNodeId,
  NewTwoByteExpandedNodeId,
  NewFourByteExpandedNodeId,
  ExtensionObject,
  ExtensionObjectEmpty,
  ExtensionObjectBinary,
  factory,
  EnumsTypesClasses,
  guards,
  Guid,
  LocalizedText,
  LocalizedTextLocale,
  LocalizedTextText,
  NodeId,
  NewTwoByteNodeId,
  NewFourByteNodeId,
  NewNumericNodeId,
  NewStringNodeId,
  NewGuidNodeId,
  NewByteStringNodeId,
  ParseNodeId,
  QualifiedName,
  SecurityTokenRequestTypeIssue,
  SecurityTokenRequestTypeRenew,
  decodeService,
  StatusCode,
  isPrimitiveType,
  Variant,
  VariantArrayDimensions,
  VariantArrayValues,
  Id
}
