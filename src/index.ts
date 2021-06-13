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
import {
  Type,
  TypeArray,
  Request,
  NodeIdType,
  NamingRuleType,
  OpenFileMode,
  IdentityCriteriaType,
  TrustListMasks,
  PubSubState,
  DataSetFieldFlags,
  DataSetFieldContentMask,
  OverrideValueHandling,
  DataSetOrderingType,
  UadpNetworkMessageContentMask,
  UadpDataSetMessageContentMask,
  JsonNetworkMessageContentMask,
  JsonDataSetMessageContentMask,
  BrokerTransportQualityOfService,
  DiagnosticsLevel,
  PubSubDiagnosticsCounterClassification,
  IdType,
  NodeClass,
  PermissionType,
  AccessLevelType,
  AccessLevelExType,
  EventNotifierType,
  AccessRestrictionType,
  StructureType,
  ApplicationType,
  MessageSecurityMode,
  UserTokenType,
  SecurityTokenRequestType,
  NodeAttributesMask,
  AttributeWriteMask,
  BrowseDirection,
  BrowseResultMask,
  FilterOperator,
  TimestampsToReturn,
  HistoryUpdateType,
  PerformUpdateType,
  MonitoringMode,
  DataChangeTrigger,
  DeadbandType,
  RedundancySupport,
  ServerState,
  ModelChangeStructureVerbMask,
  AxisScaleEnumeration,
  ExceptionDeviationFormat,
  KeyValuePair,
  AdditionalParametersType,
  EphemeralKeyType,
  EndpointType,
  RationalNumber,
  Vector,
  ThreeDVector,
  CartesianCoordinates,
  ThreeDCartesianCoordinates,
  Orientation,
  ThreeDOrientation,
  Frame,
  ThreeDFrame,
  IdentityMappingRuleType,
  CurrencyUnitType,
  TrustListDataType,
  DecimalDataType,
  DataTypeSchemaHeader,
  DataTypeDescription,
  StructureDescription,
  EnumDescription,
  SimpleTypeDescription,
  UABinaryFileDataType,
  DataSetMetaDataType,
  FieldMetaData,
  ConfigurationVersionDataType,
  PublishedDataSetDataType,
  PublishedDataSetSourceDataType,
  PublishedVariableDataType,
  PublishedDataItemsDataType,
  PublishedEventsDataType,
  DataSetWriterDataType,
  DataSetWriterTransportDataType,
  DataSetWriterMessageDataType,
  PubSubGroupDataType,
  WriterGroupDataType,
  WriterGroupTransportDataType,
  WriterGroupMessageDataType,
  PubSubConnectionDataType,
  ConnectionTransportDataType,
  NetworkAddressDataType,
  NetworkAddressUrlDataType,
  ReaderGroupDataType,
  ReaderGroupTransportDataType,
  ReaderGroupMessageDataType,
  DataSetReaderDataType,
  DataSetReaderTransportDataType,
  DataSetReaderMessageDataType,
  SubscribedDataSetDataType,
  TargetVariablesDataType,
  FieldTargetDataType,
  SubscribedDataSetMirrorDataType,
  PubSubConfigurationDataType,
  UadpWriterGroupMessageDataType,
  UadpDataSetWriterMessageDataType,
  UadpDataSetReaderMessageDataType,
  JsonWriterGroupMessageDataType,
  JsonDataSetWriterMessageDataType,
  JsonDataSetReaderMessageDataType,
  DatagramConnectionTransportDataType,
  DatagramWriterGroupTransportDataType,
  BrokerConnectionTransportDataType,
  BrokerWriterGroupTransportDataType,
  BrokerDataSetWriterTransportDataType,
  BrokerDataSetReaderTransportDataType,
  AliasNameDataType,
  RolePermissionType,
  StructureField,
  StructureDefinition,
  EnumDefinition,
  Node,
  InstanceNode,
  TypeNode,
  ObjectNode,
  ObjectTypeNode,
  VariableNode,
  VariableTypeNode,
  ReferenceTypeNode,
  MethodNode,
  ViewNode,
  DataTypeNode,
  ReferenceNode,
  Argument,
  EnumValueType,
  EnumField,
  OptionSet,
  Union,
  TimeZoneDataType,
  ApplicationDescription,
  RequestHeader,
  ResponseHeader,
  ServiceFault,
  SessionlessInvokeRequestType,
  SessionlessInvokeResponseType,
  FindServersRequest,
  FindServersResponse,
  ServerOnNetwork,
  FindServersOnNetworkRequest,
  FindServersOnNetworkResponse,
  UserTokenPolicy,
  EndpointDescription,
  GetEndpointsRequest,
  GetEndpointsResponse,
  RegisteredServer,
  RegisterServerRequest,
  RegisterServerResponse,
  DiscoveryConfiguration,
  MdnsDiscoveryConfiguration,
  RegisterServer2Request,
  RegisterServer2Response,
  ChannelSecurityToken,
  OpenSecureChannelRequest,
  OpenSecureChannelResponse,
  CloseSecureChannelRequest,
  CloseSecureChannelResponse,
  SignedSoftwareCertificate,
  SignatureData,
  CreateSessionRequest,
  CreateSessionResponse,
  UserIdentityToken,
  AnonymousIdentityToken,
  UserNameIdentityToken,
  X509IdentityToken,
  IssuedIdentityToken,
  ActivateSessionRequest,
  ActivateSessionResponse,
  CloseSessionRequest,
  CloseSessionResponse,
  CancelRequest,
  CancelResponse,
  NodeAttributes,
  ObjectAttributes,
  VariableAttributes,
  MethodAttributes,
  ObjectTypeAttributes,
  VariableTypeAttributes,
  ReferenceTypeAttributes,
  DataTypeAttributes,
  ViewAttributes,
  GenericAttributeValue,
  GenericAttributes,
  AddNodesItem,
  AddNodesResult,
  AddNodesRequest,
  AddNodesResponse,
  AddReferencesItem,
  AddReferencesRequest,
  AddReferencesResponse,
  DeleteNodesItem,
  DeleteNodesRequest,
  DeleteNodesResponse,
  DeleteReferencesItem,
  DeleteReferencesRequest,
  DeleteReferencesResponse,
  ViewDescription,
  BrowseDescription,
  ReferenceDescription,
  BrowseResult,
  BrowseRequest,
  BrowseResponse,
  BrowseNextRequest,
  BrowseNextResponse,
  RelativePathElement,
  RelativePath,
  BrowsePath,
  BrowsePathTarget,
  BrowsePathResult,
  TranslateBrowsePathsToNodeIdsRequest,
  TranslateBrowsePathsToNodeIdsResponse,
  RegisterNodesRequest,
  RegisterNodesResponse,
  UnregisterNodesRequest,
  UnregisterNodesResponse,
  EndpointConfiguration,
  QueryDataDescription,
  NodeTypeDescription,
  QueryDataSet,
  NodeReference,
  ContentFilterElement,
  ContentFilter,
  FilterOperand,
  ElementOperand,
  LiteralOperand,
  AttributeOperand,
  SimpleAttributeOperand,
  ContentFilterElementResult,
  ContentFilterResult,
  ParsingResult,
  QueryFirstRequest,
  QueryFirstResponse,
  QueryNextRequest,
  QueryNextResponse,
  ReadValueId,
  ReadRequest,
  ReadResponse,
  HistoryReadValueId,
  HistoryReadResult,
  HistoryReadDetails,
  ReadEventDetails,
  ReadRawModifiedDetails,
  ReadProcessedDetails,
  ReadAtTimeDetails,
  ReadAnnotationDataDetails,
  HistoryData,
  ModificationInfo,
  HistoryModifiedData,
  HistoryEvent,
  HistoryReadRequest,
  HistoryReadResponse,
  WriteValue,
  WriteRequest,
  WriteResponse,
  HistoryUpdateDetails,
  UpdateDataDetails,
  UpdateStructureDataDetails,
  UpdateEventDetails,
  DeleteRawModifiedDetails,
  DeleteAtTimeDetails,
  DeleteEventDetails,
  HistoryUpdateResult,
  HistoryUpdateRequest,
  HistoryUpdateResponse,
  CallMethodRequest,
  CallMethodResult,
  CallRequest,
  CallResponse,
  MonitoringFilter,
  DataChangeFilter,
  EventFilter,
  AggregateConfiguration,
  AggregateFilter,
  MonitoringFilterResult,
  EventFilterResult,
  AggregateFilterResult,
  MonitoringParameters,
  MonitoredItemCreateRequest,
  MonitoredItemCreateResult,
  CreateMonitoredItemsRequest,
  CreateMonitoredItemsResponse,
  MonitoredItemModifyRequest,
  MonitoredItemModifyResult,
  ModifyMonitoredItemsRequest,
  ModifyMonitoredItemsResponse,
  SetMonitoringModeRequest,
  SetMonitoringModeResponse,
  SetTriggeringRequest,
  SetTriggeringResponse,
  DeleteMonitoredItemsRequest,
  DeleteMonitoredItemsResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  ModifySubscriptionRequest,
  ModifySubscriptionResponse,
  SetPublishingModeRequest,
  SetPublishingModeResponse,
  NotificationMessage,
  NotificationData,
  DataChangeNotification,
  MonitoredItemNotification,
  EventNotificationList,
  EventFieldList,
  HistoryEventFieldList,
  StatusChangeNotification,
  SubscriptionAcknowledgement,
  PublishRequest,
  PublishResponse,
  RepublishRequest,
  RepublishResponse,
  TransferResult,
  TransferSubscriptionsRequest,
  TransferSubscriptionsResponse,
  DeleteSubscriptionsRequest,
  DeleteSubscriptionsResponse,
  BuildInfo,
  RedundantServerDataType,
  EndpointUrlListDataType,
  NetworkGroupDataType,
  SamplingIntervalDiagnosticsDataType,
  ServerDiagnosticsSummaryDataType,
  ServerStatusDataType,
  SessionDiagnosticsDataType,
  SessionSecurityDiagnosticsDataType,
  ServiceCounterDataType,
  StatusResult,
  SubscriptionDiagnosticsDataType,
  ModelChangeStructureDataType,
  SemanticChangeStructureDataType,
  Range,
  EUInformation,
  ComplexNumberType,
  DoubleComplexNumberType,
  AxisInformation,
  XVType,
  ProgramDiagnosticDataType,
  ProgramDiagnostic2DataType,
  Annotation,
} from './ua/generated'

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
  Id,
  Type,
  TypeArray,
  Request,
  NodeIdType,
  NamingRuleType,
  OpenFileMode,
  IdentityCriteriaType,
  TrustListMasks,
  PubSubState,
  DataSetFieldFlags,
  DataSetFieldContentMask,
  OverrideValueHandling,
  DataSetOrderingType,
  UadpNetworkMessageContentMask,
  UadpDataSetMessageContentMask,
  JsonNetworkMessageContentMask,
  JsonDataSetMessageContentMask,
  BrokerTransportQualityOfService,
  DiagnosticsLevel,
  PubSubDiagnosticsCounterClassification,
  IdType,
  NodeClass,
  PermissionType,
  AccessLevelType,
  AccessLevelExType,
  EventNotifierType,
  AccessRestrictionType,
  StructureType,
  ApplicationType,
  MessageSecurityMode,
  UserTokenType,
  SecurityTokenRequestType,
  NodeAttributesMask,
  AttributeWriteMask,
  BrowseDirection,
  BrowseResultMask,
  FilterOperator,
  TimestampsToReturn,
  HistoryUpdateType,
  PerformUpdateType,
  MonitoringMode,
  DataChangeTrigger,
  DeadbandType,
  RedundancySupport,
  ServerState,
  ModelChangeStructureVerbMask,
  AxisScaleEnumeration,
  ExceptionDeviationFormat,
  KeyValuePair,
  AdditionalParametersType,
  EphemeralKeyType,
  EndpointType,
  RationalNumber,
  Vector,
  ThreeDVector,
  CartesianCoordinates,
  ThreeDCartesianCoordinates,
  Orientation,
  ThreeDOrientation,
  Frame,
  ThreeDFrame,
  IdentityMappingRuleType,
  CurrencyUnitType,
  TrustListDataType,
  DecimalDataType,
  DataTypeSchemaHeader,
  DataTypeDescription,
  StructureDescription,
  EnumDescription,
  SimpleTypeDescription,
  UABinaryFileDataType,
  DataSetMetaDataType,
  FieldMetaData,
  ConfigurationVersionDataType,
  PublishedDataSetDataType,
  PublishedDataSetSourceDataType,
  PublishedVariableDataType,
  PublishedDataItemsDataType,
  PublishedEventsDataType,
  DataSetWriterDataType,
  DataSetWriterTransportDataType,
  DataSetWriterMessageDataType,
  PubSubGroupDataType,
  WriterGroupDataType,
  WriterGroupTransportDataType,
  WriterGroupMessageDataType,
  PubSubConnectionDataType,
  ConnectionTransportDataType,
  NetworkAddressDataType,
  NetworkAddressUrlDataType,
  ReaderGroupDataType,
  ReaderGroupTransportDataType,
  ReaderGroupMessageDataType,
  DataSetReaderDataType,
  DataSetReaderTransportDataType,
  DataSetReaderMessageDataType,
  SubscribedDataSetDataType,
  TargetVariablesDataType,
  FieldTargetDataType,
  SubscribedDataSetMirrorDataType,
  PubSubConfigurationDataType,
  UadpWriterGroupMessageDataType,
  UadpDataSetWriterMessageDataType,
  UadpDataSetReaderMessageDataType,
  JsonWriterGroupMessageDataType,
  JsonDataSetWriterMessageDataType,
  JsonDataSetReaderMessageDataType,
  DatagramConnectionTransportDataType,
  DatagramWriterGroupTransportDataType,
  BrokerConnectionTransportDataType,
  BrokerWriterGroupTransportDataType,
  BrokerDataSetWriterTransportDataType,
  BrokerDataSetReaderTransportDataType,
  AliasNameDataType,
  RolePermissionType,
  StructureField,
  StructureDefinition,
  EnumDefinition,
  Node,
  InstanceNode,
  TypeNode,
  ObjectNode,
  ObjectTypeNode,
  VariableNode,
  VariableTypeNode,
  ReferenceTypeNode,
  MethodNode,
  ViewNode,
  DataTypeNode,
  ReferenceNode,
  Argument,
  EnumValueType,
  EnumField,
  OptionSet,
  Union,
  TimeZoneDataType,
  ApplicationDescription,
  RequestHeader,
  ResponseHeader,
  ServiceFault,
  SessionlessInvokeRequestType,
  SessionlessInvokeResponseType,
  FindServersRequest,
  FindServersResponse,
  ServerOnNetwork,
  FindServersOnNetworkRequest,
  FindServersOnNetworkResponse,
  UserTokenPolicy,
  EndpointDescription,
  GetEndpointsRequest,
  GetEndpointsResponse,
  RegisteredServer,
  RegisterServerRequest,
  RegisterServerResponse,
  DiscoveryConfiguration,
  MdnsDiscoveryConfiguration,
  RegisterServer2Request,
  RegisterServer2Response,
  ChannelSecurityToken,
  OpenSecureChannelRequest,
  OpenSecureChannelResponse,
  CloseSecureChannelRequest,
  CloseSecureChannelResponse,
  SignedSoftwareCertificate,
  SignatureData,
  CreateSessionRequest,
  CreateSessionResponse,
  UserIdentityToken,
  AnonymousIdentityToken,
  UserNameIdentityToken,
  X509IdentityToken,
  IssuedIdentityToken,
  ActivateSessionRequest,
  ActivateSessionResponse,
  CloseSessionRequest,
  CloseSessionResponse,
  CancelRequest,
  CancelResponse,
  NodeAttributes,
  ObjectAttributes,
  VariableAttributes,
  MethodAttributes,
  ObjectTypeAttributes,
  VariableTypeAttributes,
  ReferenceTypeAttributes,
  DataTypeAttributes,
  ViewAttributes,
  GenericAttributeValue,
  GenericAttributes,
  AddNodesItem,
  AddNodesResult,
  AddNodesRequest,
  AddNodesResponse,
  AddReferencesItem,
  AddReferencesRequest,
  AddReferencesResponse,
  DeleteNodesItem,
  DeleteNodesRequest,
  DeleteNodesResponse,
  DeleteReferencesItem,
  DeleteReferencesRequest,
  DeleteReferencesResponse,
  ViewDescription,
  BrowseDescription,
  ReferenceDescription,
  BrowseResult,
  BrowseRequest,
  BrowseResponse,
  BrowseNextRequest,
  BrowseNextResponse,
  RelativePathElement,
  RelativePath,
  BrowsePath,
  BrowsePathTarget,
  BrowsePathResult,
  TranslateBrowsePathsToNodeIdsRequest,
  TranslateBrowsePathsToNodeIdsResponse,
  RegisterNodesRequest,
  RegisterNodesResponse,
  UnregisterNodesRequest,
  UnregisterNodesResponse,
  EndpointConfiguration,
  QueryDataDescription,
  NodeTypeDescription,
  QueryDataSet,
  NodeReference,
  ContentFilterElement,
  ContentFilter,
  FilterOperand,
  ElementOperand,
  LiteralOperand,
  AttributeOperand,
  SimpleAttributeOperand,
  ContentFilterElementResult,
  ContentFilterResult,
  ParsingResult,
  QueryFirstRequest,
  QueryFirstResponse,
  QueryNextRequest,
  QueryNextResponse,
  ReadValueId,
  ReadRequest,
  ReadResponse,
  HistoryReadValueId,
  HistoryReadResult,
  HistoryReadDetails,
  ReadEventDetails,
  ReadRawModifiedDetails,
  ReadProcessedDetails,
  ReadAtTimeDetails,
  ReadAnnotationDataDetails,
  HistoryData,
  ModificationInfo,
  HistoryModifiedData,
  HistoryEvent,
  HistoryReadRequest,
  HistoryReadResponse,
  WriteValue,
  WriteRequest,
  WriteResponse,
  HistoryUpdateDetails,
  UpdateDataDetails,
  UpdateStructureDataDetails,
  UpdateEventDetails,
  DeleteRawModifiedDetails,
  DeleteAtTimeDetails,
  DeleteEventDetails,
  HistoryUpdateResult,
  HistoryUpdateRequest,
  HistoryUpdateResponse,
  CallMethodRequest,
  CallMethodResult,
  CallRequest,
  CallResponse,
  MonitoringFilter,
  DataChangeFilter,
  EventFilter,
  AggregateConfiguration,
  AggregateFilter,
  MonitoringFilterResult,
  EventFilterResult,
  AggregateFilterResult,
  MonitoringParameters,
  MonitoredItemCreateRequest,
  MonitoredItemCreateResult,
  CreateMonitoredItemsRequest,
  CreateMonitoredItemsResponse,
  MonitoredItemModifyRequest,
  MonitoredItemModifyResult,
  ModifyMonitoredItemsRequest,
  ModifyMonitoredItemsResponse,
  SetMonitoringModeRequest,
  SetMonitoringModeResponse,
  SetTriggeringRequest,
  SetTriggeringResponse,
  DeleteMonitoredItemsRequest,
  DeleteMonitoredItemsResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  ModifySubscriptionRequest,
  ModifySubscriptionResponse,
  SetPublishingModeRequest,
  SetPublishingModeResponse,
  NotificationMessage,
  NotificationData,
  DataChangeNotification,
  MonitoredItemNotification,
  EventNotificationList,
  EventFieldList,
  HistoryEventFieldList,
  StatusChangeNotification,
  SubscriptionAcknowledgement,
  PublishRequest,
  PublishResponse,
  RepublishRequest,
  RepublishResponse,
  TransferResult,
  TransferSubscriptionsRequest,
  TransferSubscriptionsResponse,
  DeleteSubscriptionsRequest,
  DeleteSubscriptionsResponse,
  BuildInfo,
  RedundantServerDataType,
  EndpointUrlListDataType,
  NetworkGroupDataType,
  SamplingIntervalDiagnosticsDataType,
  ServerDiagnosticsSummaryDataType,
  ServerStatusDataType,
  SessionDiagnosticsDataType,
  SessionSecurityDiagnosticsDataType,
  ServiceCounterDataType,
  StatusResult,
  SubscriptionDiagnosticsDataType,
  ModelChangeStructureDataType,
  SemanticChangeStructureDataType,
  Range,
  EUInformation,
  ComplexNumberType,
  DoubleComplexNumberType,
  AxisInformation,
  XVType,
  ProgramDiagnosticDataType,
  ProgramDiagnostic2DataType,
  Annotation
}
