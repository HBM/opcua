export const Type = (name: string) => (
  target: object,
  key: string | symbol
): void => {
  Reflect.defineMetadata('design:type', name, target, key)
}

export const TypeArray = (name: string) => (
  target: object,
  key: string | symbol
): void => {
  Reflect.defineMetadata('design:type', 'Array', target, key)
  Reflect.defineMetadata('design:subtype', name, target, key)
}

import 'reflect-metadata'
import LocalizedText from './LocalizedText'
import ExtensionObject from './ExtensionObject'
import Guid from './Guid'
import NodeId from './NodeId'
import ExpandedNodeId from './ExpandedNodeId'
import DiagnosticInfo from './DiagnosticInfo'
import QualifiedName from './QualifiedName'
import Variant from './Variant'
import DataValue from './DataValue'
import { StatusCodeOK } from './StatusCode'

type NodeIdType = uint8

export const NodeIdTypeTwoByte: NodeIdType = 0
export const NodeIdTypeFourByte: NodeIdType = 1
export const NodeIdTypeNumeric: NodeIdType = 2
export const NodeIdTypeString: NodeIdType = 3
export const NodeIdTypeGuid: NodeIdType = 4
export const NodeIdTypeByteString: NodeIdType = 5

type NamingRuleType = uint32

export const NamingRuleTypeMandatory: NamingRuleType = 1
export const NamingRuleTypeOptional: NamingRuleType = 2
export const NamingRuleTypeConstraint: NamingRuleType = 3

type OpenFileMode = uint32

export const OpenFileModeRead: OpenFileMode = 1
export const OpenFileModeWrite: OpenFileMode = 2
export const OpenFileModeEraseExisting: OpenFileMode = 4
export const OpenFileModeAppend: OpenFileMode = 8

type IdentityCriteriaType = uint32

export const IdentityCriteriaTypeUserName: IdentityCriteriaType = 1
export const IdentityCriteriaTypeThumbprint: IdentityCriteriaType = 2
export const IdentityCriteriaTypeRole: IdentityCriteriaType = 3
export const IdentityCriteriaTypeGroupId: IdentityCriteriaType = 4
export const IdentityCriteriaTypeAnonymous: IdentityCriteriaType = 5
export const IdentityCriteriaTypeAuthenticatedUser: IdentityCriteriaType = 6

type TrustListMasks = uint32

export const TrustListMasksNone: TrustListMasks = 0
export const TrustListMasksTrustedCertificates: TrustListMasks = 1
export const TrustListMasksTrustedCrls: TrustListMasks = 2
export const TrustListMasksIssuerCertificates: TrustListMasks = 4
export const TrustListMasksIssuerCrls: TrustListMasks = 8
export const TrustListMasksAll: TrustListMasks = 15

type PubSubState = uint32

export const PubSubStateDisabled: PubSubState = 0
export const PubSubStatePaused: PubSubState = 1
export const PubSubStateOperational: PubSubState = 2
export const PubSubStateError: PubSubState = 3

type DataSetFieldFlags = uint16

export const DataSetFieldFlagsNone: DataSetFieldFlags = 0
export const DataSetFieldFlagsPromotedField: DataSetFieldFlags = 1

type DataSetFieldContentMask = uint32

export const DataSetFieldContentMaskNone: DataSetFieldContentMask = 0
export const DataSetFieldContentMaskStatusCode: DataSetFieldContentMask = 1
export const DataSetFieldContentMaskSourceTimestamp: DataSetFieldContentMask = 2
export const DataSetFieldContentMaskServerTimestamp: DataSetFieldContentMask = 4
export const DataSetFieldContentMaskSourcePicoSeconds: DataSetFieldContentMask = 8
export const DataSetFieldContentMaskServerPicoSeconds: DataSetFieldContentMask = 16
export const DataSetFieldContentMaskRawData: DataSetFieldContentMask = 32

type OverrideValueHandling = uint32

export const OverrideValueHandlingDisabled: OverrideValueHandling = 0
export const OverrideValueHandlingLastUsableValue: OverrideValueHandling = 1
export const OverrideValueHandlingOverrideValue: OverrideValueHandling = 2

type DataSetOrderingType = uint32

export const DataSetOrderingTypeUndefined: DataSetOrderingType = 0
export const DataSetOrderingTypeAscendingWriterId: DataSetOrderingType = 1
export const DataSetOrderingTypeAscendingWriterIdSingle: DataSetOrderingType = 2

type UadpNetworkMessageContentMask = uint32

export const UadpNetworkMessageContentMaskNone: UadpNetworkMessageContentMask = 0
export const UadpNetworkMessageContentMaskPublisherId: UadpNetworkMessageContentMask = 1
export const UadpNetworkMessageContentMaskGroupHeader: UadpNetworkMessageContentMask = 2
export const UadpNetworkMessageContentMaskWriterGroupId: UadpNetworkMessageContentMask = 4
export const UadpNetworkMessageContentMaskGroupVersion: UadpNetworkMessageContentMask = 8
export const UadpNetworkMessageContentMaskNetworkMessageNumber: UadpNetworkMessageContentMask = 16
export const UadpNetworkMessageContentMaskSequenceNumber: UadpNetworkMessageContentMask = 32
export const UadpNetworkMessageContentMaskPayloadHeader: UadpNetworkMessageContentMask = 64
export const UadpNetworkMessageContentMaskTimestamp: UadpNetworkMessageContentMask = 128
export const UadpNetworkMessageContentMaskPicoSeconds: UadpNetworkMessageContentMask = 256
export const UadpNetworkMessageContentMaskDataSetClassId: UadpNetworkMessageContentMask = 512
export const UadpNetworkMessageContentMaskPromotedFields: UadpNetworkMessageContentMask = 1024

type UadpDataSetMessageContentMask = uint32

export const UadpDataSetMessageContentMaskNone: UadpDataSetMessageContentMask = 0
export const UadpDataSetMessageContentMaskTimestamp: UadpDataSetMessageContentMask = 1
export const UadpDataSetMessageContentMaskPicoSeconds: UadpDataSetMessageContentMask = 2
export const UadpDataSetMessageContentMaskStatus: UadpDataSetMessageContentMask = 4
export const UadpDataSetMessageContentMaskMajorVersion: UadpDataSetMessageContentMask = 8
export const UadpDataSetMessageContentMaskMinorVersion: UadpDataSetMessageContentMask = 16
export const UadpDataSetMessageContentMaskSequenceNumber: UadpDataSetMessageContentMask = 32

type JsonNetworkMessageContentMask = uint32

export const JsonNetworkMessageContentMaskNone: JsonNetworkMessageContentMask = 0
export const JsonNetworkMessageContentMaskNetworkMessageHeader: JsonNetworkMessageContentMask = 1
export const JsonNetworkMessageContentMaskDataSetMessageHeader: JsonNetworkMessageContentMask = 2
export const JsonNetworkMessageContentMaskSingleDataSetMessage: JsonNetworkMessageContentMask = 4
export const JsonNetworkMessageContentMaskPublisherId: JsonNetworkMessageContentMask = 8
export const JsonNetworkMessageContentMaskDataSetClassId: JsonNetworkMessageContentMask = 16
export const JsonNetworkMessageContentMaskReplyTo: JsonNetworkMessageContentMask = 32

type JsonDataSetMessageContentMask = uint32

export const JsonDataSetMessageContentMaskNone: JsonDataSetMessageContentMask = 0
export const JsonDataSetMessageContentMaskDataSetWriterId: JsonDataSetMessageContentMask = 1
export const JsonDataSetMessageContentMaskMetaDataVersion: JsonDataSetMessageContentMask = 2
export const JsonDataSetMessageContentMaskSequenceNumber: JsonDataSetMessageContentMask = 4
export const JsonDataSetMessageContentMaskTimestamp: JsonDataSetMessageContentMask = 8
export const JsonDataSetMessageContentMaskStatus: JsonDataSetMessageContentMask = 16

type BrokerTransportQualityOfService = uint32

export const BrokerTransportQualityOfServiceNotSpecified: BrokerTransportQualityOfService = 0
export const BrokerTransportQualityOfServiceBestEffort: BrokerTransportQualityOfService = 1
export const BrokerTransportQualityOfServiceAtLeastOnce: BrokerTransportQualityOfService = 2
export const BrokerTransportQualityOfServiceAtMostOnce: BrokerTransportQualityOfService = 3
export const BrokerTransportQualityOfServiceExactlyOnce: BrokerTransportQualityOfService = 4

type DiagnosticsLevel = uint32

export const DiagnosticsLevelBasic: DiagnosticsLevel = 0
export const DiagnosticsLevelAdvanced: DiagnosticsLevel = 1
export const DiagnosticsLevelInfo: DiagnosticsLevel = 2
export const DiagnosticsLevelLog: DiagnosticsLevel = 3
export const DiagnosticsLevelDebug: DiagnosticsLevel = 4

type PubSubDiagnosticsCounterClassification = uint32

export const PubSubDiagnosticsCounterClassificationInformation: PubSubDiagnosticsCounterClassification = 0
export const PubSubDiagnosticsCounterClassificationError: PubSubDiagnosticsCounterClassification = 1

type IdType = uint32

export const IdTypeNumeric: IdType = 0
export const IdTypeString: IdType = 1
export const IdTypeGuid: IdType = 2
export const IdTypeOpaque: IdType = 3

type NodeClass = uint32

export const NodeClassUnspecified: NodeClass = 0
export const NodeClassObject: NodeClass = 1
export const NodeClassVariable: NodeClass = 2
export const NodeClassMethod: NodeClass = 4
export const NodeClassObjectType: NodeClass = 8
export const NodeClassVariableType: NodeClass = 16
export const NodeClassReferenceType: NodeClass = 32
export const NodeClassDataType: NodeClass = 64
export const NodeClassView: NodeClass = 128

type PermissionType = uint32

export const PermissionTypeNone: PermissionType = 0
export const PermissionTypeBrowse: PermissionType = 1
export const PermissionTypeReadRolePermissions: PermissionType = 2
export const PermissionTypeWriteAttribute: PermissionType = 4
export const PermissionTypeWriteRolePermissions: PermissionType = 8
export const PermissionTypeWriteHistorizing: PermissionType = 16
export const PermissionTypeRead: PermissionType = 32
export const PermissionTypeWrite: PermissionType = 64
export const PermissionTypeReadHistory: PermissionType = 128
export const PermissionTypeInsertHistory: PermissionType = 256
export const PermissionTypeModifyHistory: PermissionType = 512
export const PermissionTypeDeleteHistory: PermissionType = 1024
export const PermissionTypeReceiveEvents: PermissionType = 2048
export const PermissionTypeCall: PermissionType = 4096
export const PermissionTypeAddReference: PermissionType = 8192
export const PermissionTypeRemoveReference: PermissionType = 16384
export const PermissionTypeDeleteNode: PermissionType = 32768
export const PermissionTypeAddNode: PermissionType = 65536

type AccessLevelType = uint8

export const AccessLevelTypeNone: AccessLevelType = 0
export const AccessLevelTypeCurrentRead: AccessLevelType = 1
export const AccessLevelTypeCurrentWrite: AccessLevelType = 2
export const AccessLevelTypeHistoryRead: AccessLevelType = 4
export const AccessLevelTypeHistoryWrite: AccessLevelType = 8
export const AccessLevelTypeSemanticChange: AccessLevelType = 16
export const AccessLevelTypeStatusWrite: AccessLevelType = 32
export const AccessLevelTypeTimestampWrite: AccessLevelType = 64

type AccessLevelExType = uint32

export const AccessLevelExTypeNone: AccessLevelExType = 0
export const AccessLevelExTypeCurrentRead: AccessLevelExType = 1
export const AccessLevelExTypeCurrentWrite: AccessLevelExType = 2
export const AccessLevelExTypeHistoryRead: AccessLevelExType = 4
export const AccessLevelExTypeHistoryWrite: AccessLevelExType = 8
export const AccessLevelExTypeSemanticChange: AccessLevelExType = 16
export const AccessLevelExTypeStatusWrite: AccessLevelExType = 32
export const AccessLevelExTypeTimestampWrite: AccessLevelExType = 64
export const AccessLevelExTypeNonatomicRead: AccessLevelExType = 256
export const AccessLevelExTypeNonatomicWrite: AccessLevelExType = 512
export const AccessLevelExTypeWriteFullArrayOnly: AccessLevelExType = 1024

type EventNotifierType = uint8

export const EventNotifierTypeNone: EventNotifierType = 0
export const EventNotifierTypeSubscribeToEvents: EventNotifierType = 1
export const EventNotifierTypeHistoryRead: EventNotifierType = 4
export const EventNotifierTypeHistoryWrite: EventNotifierType = 8

type AccessRestrictionType = uint32

export const AccessRestrictionTypeNone: AccessRestrictionType = 0
export const AccessRestrictionTypeSigningRequired: AccessRestrictionType = 1
export const AccessRestrictionTypeEncryptionRequired: AccessRestrictionType = 2
export const AccessRestrictionTypeSessionRequired: AccessRestrictionType = 4

type StructureType = uint32

export const StructureTypeStructure: StructureType = 0
export const StructureTypeStructureWithOptionalFields: StructureType = 1
export const StructureTypeUnion: StructureType = 2

type ApplicationType = uint32

export const ApplicationTypeServer: ApplicationType = 0
export const ApplicationTypeClient: ApplicationType = 1
export const ApplicationTypeClientAndServer: ApplicationType = 2
export const ApplicationTypeDiscoveryServer: ApplicationType = 3

type MessageSecurityMode = uint32

export const MessageSecurityModeInvalid: MessageSecurityMode = 0
export const MessageSecurityModeNone: MessageSecurityMode = 1
export const MessageSecurityModeSign: MessageSecurityMode = 2
export const MessageSecurityModeSignAndEncrypt: MessageSecurityMode = 3

type UserTokenType = uint32

export const UserTokenTypeAnonymous: UserTokenType = 0
export const UserTokenTypeUserName: UserTokenType = 1
export const UserTokenTypeCertificate: UserTokenType = 2
export const UserTokenTypeIssuedToken: UserTokenType = 3

type SecurityTokenRequestType = uint32

export const SecurityTokenRequestTypeIssue: SecurityTokenRequestType = 0
export const SecurityTokenRequestTypeRenew: SecurityTokenRequestType = 1

type NodeAttributesMask = uint32

export const NodeAttributesMaskNone: NodeAttributesMask = 0
export const NodeAttributesMaskAccessLevel: NodeAttributesMask = 1
export const NodeAttributesMaskArrayDimensions: NodeAttributesMask = 2
export const NodeAttributesMaskBrowseName: NodeAttributesMask = 4
export const NodeAttributesMaskContainsNoLoops: NodeAttributesMask = 8
export const NodeAttributesMaskDataType: NodeAttributesMask = 16
export const NodeAttributesMaskDescription: NodeAttributesMask = 32
export const NodeAttributesMaskDisplayName: NodeAttributesMask = 64
export const NodeAttributesMaskEventNotifier: NodeAttributesMask = 128
export const NodeAttributesMaskExecutable: NodeAttributesMask = 256
export const NodeAttributesMaskHistorizing: NodeAttributesMask = 512
export const NodeAttributesMaskInverseName: NodeAttributesMask = 1024
export const NodeAttributesMaskIsAbstract: NodeAttributesMask = 2048
export const NodeAttributesMaskMinimumSamplingInterval: NodeAttributesMask = 4096
export const NodeAttributesMaskNodeClass: NodeAttributesMask = 8192
export const NodeAttributesMaskNodeId: NodeAttributesMask = 16384
export const NodeAttributesMaskSymmetric: NodeAttributesMask = 32768
export const NodeAttributesMaskUserAccessLevel: NodeAttributesMask = 65536
export const NodeAttributesMaskUserExecutable: NodeAttributesMask = 131072
export const NodeAttributesMaskUserWriteMask: NodeAttributesMask = 262144
export const NodeAttributesMaskValueRank: NodeAttributesMask = 524288
export const NodeAttributesMaskWriteMask: NodeAttributesMask = 1048576
export const NodeAttributesMaskValue: NodeAttributesMask = 2097152
export const NodeAttributesMaskDataTypeDefinition: NodeAttributesMask = 4194304
export const NodeAttributesMaskRolePermissions: NodeAttributesMask = 8388608
export const NodeAttributesMaskAccessRestrictions: NodeAttributesMask = 16777216
export const NodeAttributesMaskAll: NodeAttributesMask = 33554431
export const NodeAttributesMaskBaseNode: NodeAttributesMask = 26501220
export const NodeAttributesMaskObject: NodeAttributesMask = 26501348
export const NodeAttributesMaskObjectType: NodeAttributesMask = 26503268
export const NodeAttributesMaskVariable: NodeAttributesMask = 26571383
export const NodeAttributesMaskVariableType: NodeAttributesMask = 28600438
export const NodeAttributesMaskMethod: NodeAttributesMask = 26632548
export const NodeAttributesMaskReferenceType: NodeAttributesMask = 26537060
export const NodeAttributesMaskView: NodeAttributesMask = 26501356

type AttributeWriteMask = uint32

export const AttributeWriteMaskNone: AttributeWriteMask = 0
export const AttributeWriteMaskAccessLevel: AttributeWriteMask = 1
export const AttributeWriteMaskArrayDimensions: AttributeWriteMask = 2
export const AttributeWriteMaskBrowseName: AttributeWriteMask = 4
export const AttributeWriteMaskContainsNoLoops: AttributeWriteMask = 8
export const AttributeWriteMaskDataType: AttributeWriteMask = 16
export const AttributeWriteMaskDescription: AttributeWriteMask = 32
export const AttributeWriteMaskDisplayName: AttributeWriteMask = 64
export const AttributeWriteMaskEventNotifier: AttributeWriteMask = 128
export const AttributeWriteMaskExecutable: AttributeWriteMask = 256
export const AttributeWriteMaskHistorizing: AttributeWriteMask = 512
export const AttributeWriteMaskInverseName: AttributeWriteMask = 1024
export const AttributeWriteMaskIsAbstract: AttributeWriteMask = 2048
export const AttributeWriteMaskMinimumSamplingInterval: AttributeWriteMask = 4096
export const AttributeWriteMaskNodeClass: AttributeWriteMask = 8192
export const AttributeWriteMaskNodeId: AttributeWriteMask = 16384
export const AttributeWriteMaskSymmetric: AttributeWriteMask = 32768
export const AttributeWriteMaskUserAccessLevel: AttributeWriteMask = 65536
export const AttributeWriteMaskUserExecutable: AttributeWriteMask = 131072
export const AttributeWriteMaskUserWriteMask: AttributeWriteMask = 262144
export const AttributeWriteMaskValueRank: AttributeWriteMask = 524288
export const AttributeWriteMaskWriteMask: AttributeWriteMask = 1048576
export const AttributeWriteMaskValueForVariableType: AttributeWriteMask = 2097152
export const AttributeWriteMaskDataTypeDefinition: AttributeWriteMask = 4194304
export const AttributeWriteMaskRolePermissions: AttributeWriteMask = 8388608
export const AttributeWriteMaskAccessRestrictions: AttributeWriteMask = 16777216
export const AttributeWriteMaskAccessLevelEx: AttributeWriteMask = 33554432

type BrowseDirection = uint32

export const BrowseDirectionForward: BrowseDirection = 0
export const BrowseDirectionInverse: BrowseDirection = 1
export const BrowseDirectionBoth: BrowseDirection = 2
export const BrowseDirectionInvalid: BrowseDirection = 3

type BrowseResultMask = uint32

export const BrowseResultMaskNone: BrowseResultMask = 0
export const BrowseResultMaskReferenceTypeId: BrowseResultMask = 1
export const BrowseResultMaskIsForward: BrowseResultMask = 2
export const BrowseResultMaskNodeClass: BrowseResultMask = 4
export const BrowseResultMaskBrowseName: BrowseResultMask = 8
export const BrowseResultMaskDisplayName: BrowseResultMask = 16
export const BrowseResultMaskTypeDefinition: BrowseResultMask = 32
export const BrowseResultMaskAll: BrowseResultMask = 63
export const BrowseResultMaskReferenceTypeInfo: BrowseResultMask = 3
export const BrowseResultMaskTargetInfo: BrowseResultMask = 60

type FilterOperator = uint32

export const FilterOperatorEquals: FilterOperator = 0
export const FilterOperatorIsNull: FilterOperator = 1
export const FilterOperatorGreaterThan: FilterOperator = 2
export const FilterOperatorLessThan: FilterOperator = 3
export const FilterOperatorGreaterThanOrEqual: FilterOperator = 4
export const FilterOperatorLessThanOrEqual: FilterOperator = 5
export const FilterOperatorLike: FilterOperator = 6
export const FilterOperatorNot: FilterOperator = 7
export const FilterOperatorBetween: FilterOperator = 8
export const FilterOperatorInList: FilterOperator = 9
export const FilterOperatorAnd: FilterOperator = 10
export const FilterOperatorOr: FilterOperator = 11
export const FilterOperatorCast: FilterOperator = 12
export const FilterOperatorInView: FilterOperator = 13
export const FilterOperatorOfType: FilterOperator = 14
export const FilterOperatorRelatedTo: FilterOperator = 15
export const FilterOperatorBitwiseAnd: FilterOperator = 16
export const FilterOperatorBitwiseOr: FilterOperator = 17

type TimestampsToReturn = uint32

export const TimestampsToReturnSource: TimestampsToReturn = 0
export const TimestampsToReturnServer: TimestampsToReturn = 1
export const TimestampsToReturnBoth: TimestampsToReturn = 2
export const TimestampsToReturnNeither: TimestampsToReturn = 3
export const TimestampsToReturnInvalid: TimestampsToReturn = 4

type HistoryUpdateType = uint32

export const HistoryUpdateTypeInsert: HistoryUpdateType = 1
export const HistoryUpdateTypeReplace: HistoryUpdateType = 2
export const HistoryUpdateTypeUpdate: HistoryUpdateType = 3
export const HistoryUpdateTypeDelete: HistoryUpdateType = 4

type PerformUpdateType = uint32

export const PerformUpdateTypeInsert: PerformUpdateType = 1
export const PerformUpdateTypeReplace: PerformUpdateType = 2
export const PerformUpdateTypeUpdate: PerformUpdateType = 3
export const PerformUpdateTypeRemove: PerformUpdateType = 4

type MonitoringMode = uint32

export const MonitoringModeDisabled: MonitoringMode = 0
export const MonitoringModeSampling: MonitoringMode = 1
export const MonitoringModeReporting: MonitoringMode = 2

type DataChangeTrigger = uint32

export const DataChangeTriggerStatus: DataChangeTrigger = 0
export const DataChangeTriggerStatusValue: DataChangeTrigger = 1
export const DataChangeTriggerStatusValueTimestamp: DataChangeTrigger = 2

type DeadbandType = uint32

export const DeadbandTypeNone: DeadbandType = 0
export const DeadbandTypeAbsolute: DeadbandType = 1
export const DeadbandTypePercent: DeadbandType = 2

type RedundancySupport = uint32

export const RedundancySupportNone: RedundancySupport = 0
export const RedundancySupportCold: RedundancySupport = 1
export const RedundancySupportWarm: RedundancySupport = 2
export const RedundancySupportHot: RedundancySupport = 3
export const RedundancySupportTransparent: RedundancySupport = 4
export const RedundancySupportHotAndMirrored: RedundancySupport = 5

type ServerState = uint32

export const ServerStateRunning: ServerState = 0
export const ServerStateFailed: ServerState = 1
export const ServerStateNoConfiguration: ServerState = 2
export const ServerStateSuspended: ServerState = 3
export const ServerStateShutdown: ServerState = 4
export const ServerStateTest: ServerState = 5
export const ServerStateCommunicationFault: ServerState = 6
export const ServerStateUnknown: ServerState = 7

type ModelChangeStructureVerbMask = uint32

export const ModelChangeStructureVerbMaskNodeAdded: ModelChangeStructureVerbMask = 1
export const ModelChangeStructureVerbMaskNodeDeleted: ModelChangeStructureVerbMask = 2
export const ModelChangeStructureVerbMaskReferenceAdded: ModelChangeStructureVerbMask = 4
export const ModelChangeStructureVerbMaskReferenceDeleted: ModelChangeStructureVerbMask = 8
export const ModelChangeStructureVerbMaskDataTypeChanged: ModelChangeStructureVerbMask = 16

type AxisScaleEnumeration = uint32

export const AxisScaleEnumerationLinear: AxisScaleEnumeration = 0
export const AxisScaleEnumerationLog: AxisScaleEnumeration = 1
export const AxisScaleEnumerationLn: AxisScaleEnumeration = 2

type ExceptionDeviationFormat = uint32

export const ExceptionDeviationFormatAbsoluteValue: ExceptionDeviationFormat = 0
export const ExceptionDeviationFormatPercentOfValue: ExceptionDeviationFormat = 1
export const ExceptionDeviationFormatPercentOfRange: ExceptionDeviationFormat = 2
export const ExceptionDeviationFormatPercentOfEURange: ExceptionDeviationFormat = 3
export const ExceptionDeviationFormatUnknown: ExceptionDeviationFormat = 4

export class CurrencyUnitType {
  @Type('int16')
  public NumericCode: int16
  @Type('int8')
  public Exponent: int8
  @Type('string')
  public AlphabeticCode: string
  @Type('object')
  public Currency: LocalizedText

  constructor(options?: {
    NumericCode?: int16
    Exponent?: int8
    AlphabeticCode?: string
    Currency?: LocalizedText
  }) {
    this.NumericCode = options?.NumericCode ?? 0
    this.Exponent = options?.Exponent ?? 0
    this.AlphabeticCode = options?.AlphabeticCode ?? ''
    this.Currency = options?.Currency ?? new LocalizedText()
  }
}

export class KeyValuePair {
  @Type('object')
  public Key: QualifiedName
  @Type('object')
  public Value: Variant

  constructor(options?: { Key?: QualifiedName; Value?: Variant }) {
    this.Key = options?.Key ?? new QualifiedName()
    this.Value = options?.Value ?? new Variant()
  }
}

export class AdditionalParametersType {
  @TypeArray('KeyValuePair')
  public Parameters: KeyValuePair[] | null

  constructor(options?: { Parameters?: KeyValuePair[] | null }) {
    this.Parameters = options?.Parameters ?? null
  }
}

export class EphemeralKeyType {
  @Type('ByteString')
  public PublicKey: ByteString
  @Type('ByteString')
  public Signature: ByteString

  constructor(options?: { PublicKey?: ByteString; Signature?: ByteString }) {
    this.PublicKey = options?.PublicKey ?? new Uint8Array()
    this.Signature = options?.Signature ?? new Uint8Array()
  }
}

export class EndpointType {
  @Type('string')
  public EndpointUrl: string
  @Type('uint32')
  public SecurityMode: MessageSecurityMode
  @Type('string')
  public SecurityPolicyUri: string
  @Type('string')
  public TransportProfileUri: string

  constructor(options?: {
    EndpointUrl?: string
    SecurityMode?: MessageSecurityMode
    SecurityPolicyUri?: string
    TransportProfileUri?: string
  }) {
    this.EndpointUrl = options?.EndpointUrl ?? ''
    this.SecurityMode = options?.SecurityMode ?? MessageSecurityModeInvalid
    this.SecurityPolicyUri = options?.SecurityPolicyUri ?? ''
    this.TransportProfileUri = options?.TransportProfileUri ?? ''
  }
}

export class RationalNumber {
  @Type('int32')
  public Numerator: int32
  @Type('uint32')
  public Denominator: uint32

  constructor(options?: { Numerator?: int32; Denominator?: uint32 }) {
    this.Numerator = options?.Numerator ?? 0
    this.Denominator = options?.Denominator ?? 0
  }
}

export class IdentityMappingRuleType {
  @Type('uint32')
  public CriteriaType: IdentityCriteriaType
  @Type('string')
  public Criteria: string

  constructor(options?: {
    CriteriaType?: IdentityCriteriaType
    Criteria?: string
  }) {
    this.CriteriaType = options?.CriteriaType ?? IdentityCriteriaTypeUserName
    this.Criteria = options?.Criteria ?? ''
  }
}

export class TrustListDataType {
  @Type('uint32')
  public SpecifiedLists: uint32
  @TypeArray('ByteString')
  public TrustedCertificates: ByteString[] | null
  @TypeArray('ByteString')
  public TrustedCrls: ByteString[] | null
  @TypeArray('ByteString')
  public IssuerCertificates: ByteString[] | null
  @TypeArray('ByteString')
  public IssuerCrls: ByteString[] | null

  constructor(options?: {
    SpecifiedLists?: uint32
    TrustedCertificates?: ByteString[] | null
    TrustedCrls?: ByteString[] | null
    IssuerCertificates?: ByteString[] | null
    IssuerCrls?: ByteString[] | null
  }) {
    this.SpecifiedLists = options?.SpecifiedLists ?? 0
    this.TrustedCertificates = options?.TrustedCertificates ?? null
    this.TrustedCrls = options?.TrustedCrls ?? null
    this.IssuerCertificates = options?.IssuerCertificates ?? null
    this.IssuerCrls = options?.IssuerCrls ?? null
  }
}

export class DecimalDataType {
  @Type('int16')
  public Scale: int16
  @Type('ByteString')
  public Value: ByteString

  constructor(options?: { Scale?: int16; Value?: ByteString }) {
    this.Scale = options?.Scale ?? 0
    this.Value = options?.Value ?? new Uint8Array()
  }
}

export class StructureField {
  @Type('string')
  public Name: string
  @Type('object')
  public Description: LocalizedText
  @Type('object')
  public DataType: NodeId
  @Type('int32')
  public ValueRank: int32
  @TypeArray('uint32')
  public ArrayDimensions: Uint32Array | null
  @Type('uint32')
  public MaxStringLength: uint32
  @Type('boolean')
  public IsOptional: boolean

  constructor(options?: {
    Name?: string
    Description?: LocalizedText
    DataType?: NodeId
    ValueRank?: int32
    ArrayDimensions?: Uint32Array | null
    MaxStringLength?: uint32
    IsOptional?: boolean
  }) {
    this.Name = options?.Name ?? ''
    this.Description = options?.Description ?? new LocalizedText()
    this.DataType = options?.DataType ?? new NodeId()
    this.ValueRank = options?.ValueRank ?? 0
    this.ArrayDimensions = options?.ArrayDimensions ?? null
    this.MaxStringLength = options?.MaxStringLength ?? 0
    this.IsOptional = options?.IsOptional ?? false
  }
}

export class StructureDefinition {
  @Type('object')
  public DefaultEncodingId: NodeId
  @Type('object')
  public BaseDataType: NodeId
  @Type('uint32')
  public StructureType: StructureType
  @TypeArray('StructureField')
  public Fields: StructureField[] | null

  constructor(options?: {
    DefaultEncodingId?: NodeId
    BaseDataType?: NodeId
    StructureType?: StructureType
    Fields?: StructureField[] | null
  }) {
    this.DefaultEncodingId = options?.DefaultEncodingId ?? new NodeId()
    this.BaseDataType = options?.BaseDataType ?? new NodeId()
    this.StructureType = options?.StructureType ?? StructureTypeStructure
    this.Fields = options?.Fields ?? null
  }
}

export class StructureDescription {
  @Type('object')
  public DataTypeId: NodeId
  @Type('object')
  public Name: QualifiedName
  @Type('object')
  public StructureDefinition: StructureDefinition

  constructor(options?: {
    DataTypeId?: NodeId
    Name?: QualifiedName
    StructureDefinition?: StructureDefinition
  }) {
    this.DataTypeId = options?.DataTypeId ?? new NodeId()
    this.Name = options?.Name ?? new QualifiedName()
    this.StructureDefinition =
      options?.StructureDefinition ?? new StructureDefinition()
  }
}

export class EnumField {
  @Type('int64')
  public Value: int64
  @Type('object')
  public DisplayName: LocalizedText
  @Type('object')
  public Description: LocalizedText
  @Type('string')
  public Name: string

  constructor(options?: {
    Value?: int64
    DisplayName?: LocalizedText
    Description?: LocalizedText
    Name?: string
  }) {
    this.Value = options?.Value ?? BigInt(0)
    this.DisplayName = options?.DisplayName ?? new LocalizedText()
    this.Description = options?.Description ?? new LocalizedText()
    this.Name = options?.Name ?? ''
  }
}

export class EnumDefinition {
  @TypeArray('EnumField')
  public Fields: EnumField[] | null

  constructor(options?: { Fields?: EnumField[] | null }) {
    this.Fields = options?.Fields ?? null
  }
}

export class EnumDescription {
  @Type('object')
  public DataTypeId: NodeId
  @Type('object')
  public Name: QualifiedName
  @Type('object')
  public EnumDefinition: EnumDefinition
  @Type('uint8')
  public BuiltInType: uint8

  constructor(options?: {
    DataTypeId?: NodeId
    Name?: QualifiedName
    EnumDefinition?: EnumDefinition
    BuiltInType?: uint8
  }) {
    this.DataTypeId = options?.DataTypeId ?? new NodeId()
    this.Name = options?.Name ?? new QualifiedName()
    this.EnumDefinition = options?.EnumDefinition ?? new EnumDefinition()
    this.BuiltInType = options?.BuiltInType ?? 0
  }
}

export class SimpleTypeDescription {
  @Type('object')
  public DataTypeId: NodeId
  @Type('object')
  public Name: QualifiedName
  @Type('object')
  public BaseDataType: NodeId
  @Type('uint8')
  public BuiltInType: uint8

  constructor(options?: {
    DataTypeId?: NodeId
    Name?: QualifiedName
    BaseDataType?: NodeId
    BuiltInType?: uint8
  }) {
    this.DataTypeId = options?.DataTypeId ?? new NodeId()
    this.Name = options?.Name ?? new QualifiedName()
    this.BaseDataType = options?.BaseDataType ?? new NodeId()
    this.BuiltInType = options?.BuiltInType ?? 0
  }
}

export class DataTypeSchemaHeader {
  @TypeArray('string')
  public Namespaces: string[] | null
  @TypeArray('StructureDescription')
  public StructureDataTypes: StructureDescription[] | null
  @TypeArray('EnumDescription')
  public EnumDataTypes: EnumDescription[] | null
  @TypeArray('SimpleTypeDescription')
  public SimpleDataTypes: SimpleTypeDescription[] | null

  constructor(options?: {
    Namespaces?: string[] | null
    StructureDataTypes?: StructureDescription[] | null
    EnumDataTypes?: EnumDescription[] | null
    SimpleDataTypes?: SimpleTypeDescription[] | null
  }) {
    this.Namespaces = options?.Namespaces ?? null
    this.StructureDataTypes = options?.StructureDataTypes ?? null
    this.EnumDataTypes = options?.EnumDataTypes ?? null
    this.SimpleDataTypes = options?.SimpleDataTypes ?? null
  }
}

export class DataTypeDescription {
  @Type('object')
  public DataTypeId: NodeId
  @Type('object')
  public Name: QualifiedName

  constructor(options?: { DataTypeId?: NodeId; Name?: QualifiedName }) {
    this.DataTypeId = options?.DataTypeId ?? new NodeId()
    this.Name = options?.Name ?? new QualifiedName()
  }
}

export class UABinaryFileDataType {
  @TypeArray('string')
  public Namespaces: string[] | null
  @TypeArray('StructureDescription')
  public StructureDataTypes: StructureDescription[] | null
  @TypeArray('EnumDescription')
  public EnumDataTypes: EnumDescription[] | null
  @TypeArray('SimpleTypeDescription')
  public SimpleDataTypes: SimpleTypeDescription[] | null
  @Type('string')
  public SchemaLocation: string
  @TypeArray('KeyValuePair')
  public FileHeader: KeyValuePair[] | null
  @Type('object')
  public Body: Variant

  constructor(options?: {
    Namespaces?: string[] | null
    StructureDataTypes?: StructureDescription[] | null
    EnumDataTypes?: EnumDescription[] | null
    SimpleDataTypes?: SimpleTypeDescription[] | null
    SchemaLocation?: string
    FileHeader?: KeyValuePair[] | null
    Body?: Variant
  }) {
    this.Namespaces = options?.Namespaces ?? null
    this.StructureDataTypes = options?.StructureDataTypes ?? null
    this.EnumDataTypes = options?.EnumDataTypes ?? null
    this.SimpleDataTypes = options?.SimpleDataTypes ?? null
    this.SchemaLocation = options?.SchemaLocation ?? ''
    this.FileHeader = options?.FileHeader ?? null
    this.Body = options?.Body ?? new Variant()
  }
}

export class FieldMetaData {
  @Type('string')
  public Name: string
  @Type('object')
  public Description: LocalizedText
  @Type('uint16')
  public FieldFlags: DataSetFieldFlags
  @Type('uint8')
  public BuiltInType: uint8
  @Type('object')
  public DataType: NodeId
  @Type('int32')
  public ValueRank: int32
  @TypeArray('uint32')
  public ArrayDimensions: Uint32Array | null
  @Type('uint32')
  public MaxStringLength: uint32
  @Type('object')
  public DataSetFieldId: Guid
  @TypeArray('KeyValuePair')
  public Properties: KeyValuePair[] | null

  constructor(options?: {
    Name?: string
    Description?: LocalizedText
    FieldFlags?: DataSetFieldFlags
    BuiltInType?: uint8
    DataType?: NodeId
    ValueRank?: int32
    ArrayDimensions?: Uint32Array | null
    MaxStringLength?: uint32
    DataSetFieldId?: Guid
    Properties?: KeyValuePair[] | null
  }) {
    this.Name = options?.Name ?? ''
    this.Description = options?.Description ?? new LocalizedText()
    this.FieldFlags = options?.FieldFlags ?? DataSetFieldFlagsNone
    this.BuiltInType = options?.BuiltInType ?? 0
    this.DataType = options?.DataType ?? new NodeId()
    this.ValueRank = options?.ValueRank ?? 0
    this.ArrayDimensions = options?.ArrayDimensions ?? null
    this.MaxStringLength = options?.MaxStringLength ?? 0
    this.DataSetFieldId = options?.DataSetFieldId ?? new Guid()
    this.Properties = options?.Properties ?? null
  }
}

export class ConfigurationVersionDataType {
  @Type('uint32')
  public MajorVersion: uint32
  @Type('uint32')
  public MinorVersion: uint32

  constructor(options?: { MajorVersion?: uint32; MinorVersion?: uint32 }) {
    this.MajorVersion = options?.MajorVersion ?? 0
    this.MinorVersion = options?.MinorVersion ?? 0
  }
}

export class DataSetMetaDataType {
  @TypeArray('string')
  public Namespaces: string[] | null
  @TypeArray('StructureDescription')
  public StructureDataTypes: StructureDescription[] | null
  @TypeArray('EnumDescription')
  public EnumDataTypes: EnumDescription[] | null
  @TypeArray('SimpleTypeDescription')
  public SimpleDataTypes: SimpleTypeDescription[] | null
  @Type('string')
  public Name: string
  @Type('object')
  public Description: LocalizedText
  @TypeArray('FieldMetaData')
  public Fields: FieldMetaData[] | null
  @Type('object')
  public DataSetClassId: Guid
  @Type('object')
  public ConfigurationVersion: ConfigurationVersionDataType

  constructor(options?: {
    Namespaces?: string[] | null
    StructureDataTypes?: StructureDescription[] | null
    EnumDataTypes?: EnumDescription[] | null
    SimpleDataTypes?: SimpleTypeDescription[] | null
    Name?: string
    Description?: LocalizedText
    Fields?: FieldMetaData[] | null
    DataSetClassId?: Guid
    ConfigurationVersion?: ConfigurationVersionDataType
  }) {
    this.Namespaces = options?.Namespaces ?? null
    this.StructureDataTypes = options?.StructureDataTypes ?? null
    this.EnumDataTypes = options?.EnumDataTypes ?? null
    this.SimpleDataTypes = options?.SimpleDataTypes ?? null
    this.Name = options?.Name ?? ''
    this.Description = options?.Description ?? new LocalizedText()
    this.Fields = options?.Fields ?? null
    this.DataSetClassId = options?.DataSetClassId ?? new Guid()
    this.ConfigurationVersion =
      options?.ConfigurationVersion ?? new ConfigurationVersionDataType()
  }
}

export class PublishedDataSetDataType {
  @Type('string')
  public Name: string
  @TypeArray('string')
  public DataSetFolder: string[] | null
  @Type('object')
  public DataSetMetaData: DataSetMetaDataType
  @TypeArray('KeyValuePair')
  public ExtensionFields: KeyValuePair[] | null
  @Type('object')
  public DataSetSource: ExtensionObject

  constructor(options?: {
    Name?: string
    DataSetFolder?: string[] | null
    DataSetMetaData?: DataSetMetaDataType
    ExtensionFields?: KeyValuePair[] | null
    DataSetSource?: ExtensionObject
  }) {
    this.Name = options?.Name ?? ''
    this.DataSetFolder = options?.DataSetFolder ?? null
    this.DataSetMetaData = options?.DataSetMetaData ?? new DataSetMetaDataType()
    this.ExtensionFields = options?.ExtensionFields ?? null
    this.DataSetSource = options?.DataSetSource ?? new ExtensionObject()
  }
}

export class PublishedVariableDataType {
  @Type('object')
  public PublishedVariable: NodeId
  @Type('uint32')
  public AttributeId: uint32
  @Type('float64')
  public SamplingIntervalHint: float64
  @Type('uint32')
  public DeadbandType: uint32
  @Type('float64')
  public DeadbandValue: float64
  @Type('string')
  public IndexRange: string
  @Type('object')
  public SubstituteValue: Variant
  @TypeArray('QualifiedName')
  public MetaDataProperties: QualifiedName[] | null

  constructor(options?: {
    PublishedVariable?: NodeId
    AttributeId?: uint32
    SamplingIntervalHint?: float64
    DeadbandType?: uint32
    DeadbandValue?: float64
    IndexRange?: string
    SubstituteValue?: Variant
    MetaDataProperties?: QualifiedName[] | null
  }) {
    this.PublishedVariable = options?.PublishedVariable ?? new NodeId()
    this.AttributeId = options?.AttributeId ?? 0
    this.SamplingIntervalHint = options?.SamplingIntervalHint ?? 0
    this.DeadbandType = options?.DeadbandType ?? 0
    this.DeadbandValue = options?.DeadbandValue ?? 0
    this.IndexRange = options?.IndexRange ?? ''
    this.SubstituteValue = options?.SubstituteValue ?? new Variant()
    this.MetaDataProperties = options?.MetaDataProperties ?? null
  }
}

export class DataSetWriterDataType {
  @Type('string')
  public Name: string
  @Type('boolean')
  public Enabled: boolean
  @Type('uint16')
  public DataSetWriterId: uint16
  @Type('uint32')
  public DataSetFieldContentMask: DataSetFieldContentMask
  @Type('uint32')
  public KeyFrameCount: uint32
  @Type('string')
  public DataSetName: string
  @TypeArray('KeyValuePair')
  public DataSetWriterProperties: KeyValuePair[] | null
  @Type('object')
  public TransportSettings: ExtensionObject
  @Type('object')
  public MessageSettings: ExtensionObject

  constructor(options?: {
    Name?: string
    Enabled?: boolean
    DataSetWriterId?: uint16
    DataSetFieldContentMask?: DataSetFieldContentMask
    KeyFrameCount?: uint32
    DataSetName?: string
    DataSetWriterProperties?: KeyValuePair[] | null
    TransportSettings?: ExtensionObject
    MessageSettings?: ExtensionObject
  }) {
    this.Name = options?.Name ?? ''
    this.Enabled = options?.Enabled ?? false
    this.DataSetWriterId = options?.DataSetWriterId ?? 0
    this.DataSetFieldContentMask =
      options?.DataSetFieldContentMask ?? DataSetFieldContentMaskNone
    this.KeyFrameCount = options?.KeyFrameCount ?? 0
    this.DataSetName = options?.DataSetName ?? ''
    this.DataSetWriterProperties = options?.DataSetWriterProperties ?? null
    this.TransportSettings = options?.TransportSettings ?? new ExtensionObject()
    this.MessageSettings = options?.MessageSettings ?? new ExtensionObject()
  }
}

export class ApplicationDescription {
  @Type('string')
  public ApplicationUri: string
  @Type('string')
  public ProductUri: string
  @Type('object')
  public ApplicationName: LocalizedText
  @Type('uint32')
  public ApplicationType: ApplicationType
  @Type('string')
  public GatewayServerUri: string
  @Type('string')
  public DiscoveryProfileUri: string
  @TypeArray('string')
  public DiscoveryUrls: string[] | null

  constructor(options?: {
    ApplicationUri?: string
    ProductUri?: string
    ApplicationName?: LocalizedText
    ApplicationType?: ApplicationType
    GatewayServerUri?: string
    DiscoveryProfileUri?: string
    DiscoveryUrls?: string[] | null
  }) {
    this.ApplicationUri = options?.ApplicationUri ?? ''
    this.ProductUri = options?.ProductUri ?? ''
    this.ApplicationName = options?.ApplicationName ?? new LocalizedText()
    this.ApplicationType = options?.ApplicationType ?? ApplicationTypeServer
    this.GatewayServerUri = options?.GatewayServerUri ?? ''
    this.DiscoveryProfileUri = options?.DiscoveryProfileUri ?? ''
    this.DiscoveryUrls = options?.DiscoveryUrls ?? null
  }
}

export class UserTokenPolicy {
  @Type('string')
  public PolicyId: string
  @Type('uint32')
  public TokenType: UserTokenType
  @Type('string')
  public IssuedTokenType: string
  @Type('string')
  public IssuerEndpointUrl: string
  @Type('string')
  public SecurityPolicyUri: string

  constructor(options?: {
    PolicyId?: string
    TokenType?: UserTokenType
    IssuedTokenType?: string
    IssuerEndpointUrl?: string
    SecurityPolicyUri?: string
  }) {
    this.PolicyId = options?.PolicyId ?? ''
    this.TokenType = options?.TokenType ?? UserTokenTypeAnonymous
    this.IssuedTokenType = options?.IssuedTokenType ?? ''
    this.IssuerEndpointUrl = options?.IssuerEndpointUrl ?? ''
    this.SecurityPolicyUri = options?.SecurityPolicyUri ?? ''
  }
}

export class EndpointDescription {
  @Type('string')
  public EndpointUrl: string
  @Type('object')
  public Server: ApplicationDescription
  @Type('ByteString')
  public ServerCertificate: ByteString
  @Type('uint32')
  public SecurityMode: MessageSecurityMode
  @Type('string')
  public SecurityPolicyUri: string
  @TypeArray('UserTokenPolicy')
  public UserIdentityTokens: UserTokenPolicy[] | null
  @Type('string')
  public TransportProfileUri: string
  @Type('uint8')
  public SecurityLevel: uint8

  constructor(options?: {
    EndpointUrl?: string
    Server?: ApplicationDescription
    ServerCertificate?: ByteString
    SecurityMode?: MessageSecurityMode
    SecurityPolicyUri?: string
    UserIdentityTokens?: UserTokenPolicy[] | null
    TransportProfileUri?: string
    SecurityLevel?: uint8
  }) {
    this.EndpointUrl = options?.EndpointUrl ?? ''
    this.Server = options?.Server ?? new ApplicationDescription()
    this.ServerCertificate = options?.ServerCertificate ?? new Uint8Array()
    this.SecurityMode = options?.SecurityMode ?? MessageSecurityModeInvalid
    this.SecurityPolicyUri = options?.SecurityPolicyUri ?? ''
    this.UserIdentityTokens = options?.UserIdentityTokens ?? null
    this.TransportProfileUri = options?.TransportProfileUri ?? ''
    this.SecurityLevel = options?.SecurityLevel ?? 0
  }
}

export class PubSubGroupDataType {
  @Type('string')
  public Name: string
  @Type('boolean')
  public Enabled: boolean
  @Type('uint32')
  public SecurityMode: MessageSecurityMode
  @Type('string')
  public SecurityGroupId: string
  @TypeArray('EndpointDescription')
  public SecurityKeyServices: EndpointDescription[] | null
  @Type('uint32')
  public MaxNetworkMessageSize: uint32
  @TypeArray('KeyValuePair')
  public GroupProperties: KeyValuePair[] | null

  constructor(options?: {
    Name?: string
    Enabled?: boolean
    SecurityMode?: MessageSecurityMode
    SecurityGroupId?: string
    SecurityKeyServices?: EndpointDescription[] | null
    MaxNetworkMessageSize?: uint32
    GroupProperties?: KeyValuePair[] | null
  }) {
    this.Name = options?.Name ?? ''
    this.Enabled = options?.Enabled ?? false
    this.SecurityMode = options?.SecurityMode ?? MessageSecurityModeInvalid
    this.SecurityGroupId = options?.SecurityGroupId ?? ''
    this.SecurityKeyServices = options?.SecurityKeyServices ?? null
    this.MaxNetworkMessageSize = options?.MaxNetworkMessageSize ?? 0
    this.GroupProperties = options?.GroupProperties ?? null
  }
}

export class WriterGroupDataType {
  @Type('string')
  public Name: string
  @Type('boolean')
  public Enabled: boolean
  @Type('uint32')
  public SecurityMode: MessageSecurityMode
  @Type('string')
  public SecurityGroupId: string
  @TypeArray('EndpointDescription')
  public SecurityKeyServices: EndpointDescription[] | null
  @Type('uint32')
  public MaxNetworkMessageSize: uint32
  @TypeArray('KeyValuePair')
  public GroupProperties: KeyValuePair[] | null
  @Type('uint16')
  public WriterGroupId: uint16
  @Type('float64')
  public PublishingInterval: float64
  @Type('float64')
  public KeepAliveTime: float64
  @Type('uint8')
  public Priority: uint8
  @TypeArray('string')
  public LocaleIds: string[] | null
  @Type('string')
  public HeaderLayoutUri: string
  @Type('object')
  public TransportSettings: ExtensionObject
  @Type('object')
  public MessageSettings: ExtensionObject
  @TypeArray('DataSetWriterDataType')
  public DataSetWriters: DataSetWriterDataType[] | null

  constructor(options?: {
    Name?: string
    Enabled?: boolean
    SecurityMode?: MessageSecurityMode
    SecurityGroupId?: string
    SecurityKeyServices?: EndpointDescription[] | null
    MaxNetworkMessageSize?: uint32
    GroupProperties?: KeyValuePair[] | null
    WriterGroupId?: uint16
    PublishingInterval?: float64
    KeepAliveTime?: float64
    Priority?: uint8
    LocaleIds?: string[] | null
    HeaderLayoutUri?: string
    TransportSettings?: ExtensionObject
    MessageSettings?: ExtensionObject
    DataSetWriters?: DataSetWriterDataType[] | null
  }) {
    this.Name = options?.Name ?? ''
    this.Enabled = options?.Enabled ?? false
    this.SecurityMode = options?.SecurityMode ?? MessageSecurityModeInvalid
    this.SecurityGroupId = options?.SecurityGroupId ?? ''
    this.SecurityKeyServices = options?.SecurityKeyServices ?? null
    this.MaxNetworkMessageSize = options?.MaxNetworkMessageSize ?? 0
    this.GroupProperties = options?.GroupProperties ?? null
    this.WriterGroupId = options?.WriterGroupId ?? 0
    this.PublishingInterval = options?.PublishingInterval ?? 0
    this.KeepAliveTime = options?.KeepAliveTime ?? 0
    this.Priority = options?.Priority ?? 0
    this.LocaleIds = options?.LocaleIds ?? null
    this.HeaderLayoutUri = options?.HeaderLayoutUri ?? ''
    this.TransportSettings = options?.TransportSettings ?? new ExtensionObject()
    this.MessageSettings = options?.MessageSettings ?? new ExtensionObject()
    this.DataSetWriters = options?.DataSetWriters ?? null
  }
}

export class DataSetReaderDataType {
  @Type('string')
  public Name: string
  @Type('boolean')
  public Enabled: boolean
  @Type('object')
  public PublisherId: Variant
  @Type('uint16')
  public WriterGroupId: uint16
  @Type('uint16')
  public DataSetWriterId: uint16
  @Type('object')
  public DataSetMetaData: DataSetMetaDataType
  @Type('uint32')
  public DataSetFieldContentMask: DataSetFieldContentMask
  @Type('float64')
  public MessageReceiveTimeout: float64
  @Type('uint32')
  public KeyFrameCount: uint32
  @Type('string')
  public HeaderLayoutUri: string
  @Type('uint32')
  public SecurityMode: MessageSecurityMode
  @Type('string')
  public SecurityGroupId: string
  @TypeArray('EndpointDescription')
  public SecurityKeyServices: EndpointDescription[] | null
  @TypeArray('KeyValuePair')
  public DataSetReaderProperties: KeyValuePair[] | null
  @Type('object')
  public TransportSettings: ExtensionObject
  @Type('object')
  public MessageSettings: ExtensionObject
  @Type('object')
  public SubscribedDataSet: ExtensionObject

  constructor(options?: {
    Name?: string
    Enabled?: boolean
    PublisherId?: Variant
    WriterGroupId?: uint16
    DataSetWriterId?: uint16
    DataSetMetaData?: DataSetMetaDataType
    DataSetFieldContentMask?: DataSetFieldContentMask
    MessageReceiveTimeout?: float64
    KeyFrameCount?: uint32
    HeaderLayoutUri?: string
    SecurityMode?: MessageSecurityMode
    SecurityGroupId?: string
    SecurityKeyServices?: EndpointDescription[] | null
    DataSetReaderProperties?: KeyValuePair[] | null
    TransportSettings?: ExtensionObject
    MessageSettings?: ExtensionObject
    SubscribedDataSet?: ExtensionObject
  }) {
    this.Name = options?.Name ?? ''
    this.Enabled = options?.Enabled ?? false
    this.PublisherId = options?.PublisherId ?? new Variant()
    this.WriterGroupId = options?.WriterGroupId ?? 0
    this.DataSetWriterId = options?.DataSetWriterId ?? 0
    this.DataSetMetaData = options?.DataSetMetaData ?? new DataSetMetaDataType()
    this.DataSetFieldContentMask =
      options?.DataSetFieldContentMask ?? DataSetFieldContentMaskNone
    this.MessageReceiveTimeout = options?.MessageReceiveTimeout ?? 0
    this.KeyFrameCount = options?.KeyFrameCount ?? 0
    this.HeaderLayoutUri = options?.HeaderLayoutUri ?? ''
    this.SecurityMode = options?.SecurityMode ?? MessageSecurityModeInvalid
    this.SecurityGroupId = options?.SecurityGroupId ?? ''
    this.SecurityKeyServices = options?.SecurityKeyServices ?? null
    this.DataSetReaderProperties = options?.DataSetReaderProperties ?? null
    this.TransportSettings = options?.TransportSettings ?? new ExtensionObject()
    this.MessageSettings = options?.MessageSettings ?? new ExtensionObject()
    this.SubscribedDataSet = options?.SubscribedDataSet ?? new ExtensionObject()
  }
}

export class ReaderGroupDataType {
  @Type('string')
  public Name: string
  @Type('boolean')
  public Enabled: boolean
  @Type('uint32')
  public SecurityMode: MessageSecurityMode
  @Type('string')
  public SecurityGroupId: string
  @TypeArray('EndpointDescription')
  public SecurityKeyServices: EndpointDescription[] | null
  @Type('uint32')
  public MaxNetworkMessageSize: uint32
  @TypeArray('KeyValuePair')
  public GroupProperties: KeyValuePair[] | null
  @Type('object')
  public TransportSettings: ExtensionObject
  @Type('object')
  public MessageSettings: ExtensionObject
  @TypeArray('DataSetReaderDataType')
  public DataSetReaders: DataSetReaderDataType[] | null

  constructor(options?: {
    Name?: string
    Enabled?: boolean
    SecurityMode?: MessageSecurityMode
    SecurityGroupId?: string
    SecurityKeyServices?: EndpointDescription[] | null
    MaxNetworkMessageSize?: uint32
    GroupProperties?: KeyValuePair[] | null
    TransportSettings?: ExtensionObject
    MessageSettings?: ExtensionObject
    DataSetReaders?: DataSetReaderDataType[] | null
  }) {
    this.Name = options?.Name ?? ''
    this.Enabled = options?.Enabled ?? false
    this.SecurityMode = options?.SecurityMode ?? MessageSecurityModeInvalid
    this.SecurityGroupId = options?.SecurityGroupId ?? ''
    this.SecurityKeyServices = options?.SecurityKeyServices ?? null
    this.MaxNetworkMessageSize = options?.MaxNetworkMessageSize ?? 0
    this.GroupProperties = options?.GroupProperties ?? null
    this.TransportSettings = options?.TransportSettings ?? new ExtensionObject()
    this.MessageSettings = options?.MessageSettings ?? new ExtensionObject()
    this.DataSetReaders = options?.DataSetReaders ?? null
  }
}

export class PubSubConnectionDataType {
  @Type('string')
  public Name: string
  @Type('boolean')
  public Enabled: boolean
  @Type('object')
  public PublisherId: Variant
  @Type('string')
  public TransportProfileUri: string
  @Type('object')
  public Address: ExtensionObject
  @TypeArray('KeyValuePair')
  public ConnectionProperties: KeyValuePair[] | null
  @Type('object')
  public TransportSettings: ExtensionObject
  @TypeArray('WriterGroupDataType')
  public WriterGroups: WriterGroupDataType[] | null
  @TypeArray('ReaderGroupDataType')
  public ReaderGroups: ReaderGroupDataType[] | null

  constructor(options?: {
    Name?: string
    Enabled?: boolean
    PublisherId?: Variant
    TransportProfileUri?: string
    Address?: ExtensionObject
    ConnectionProperties?: KeyValuePair[] | null
    TransportSettings?: ExtensionObject
    WriterGroups?: WriterGroupDataType[] | null
    ReaderGroups?: ReaderGroupDataType[] | null
  }) {
    this.Name = options?.Name ?? ''
    this.Enabled = options?.Enabled ?? false
    this.PublisherId = options?.PublisherId ?? new Variant()
    this.TransportProfileUri = options?.TransportProfileUri ?? ''
    this.Address = options?.Address ?? new ExtensionObject()
    this.ConnectionProperties = options?.ConnectionProperties ?? null
    this.TransportSettings = options?.TransportSettings ?? new ExtensionObject()
    this.WriterGroups = options?.WriterGroups ?? null
    this.ReaderGroups = options?.ReaderGroups ?? null
  }
}

export class NetworkAddressDataType {
  @Type('string')
  public NetworkInterface: string

  constructor(options?: { NetworkInterface?: string }) {
    this.NetworkInterface = options?.NetworkInterface ?? ''
  }
}

export class FieldTargetDataType {
  @Type('object')
  public DataSetFieldId: Guid
  @Type('string')
  public ReceiverIndexRange: string
  @Type('object')
  public TargetNodeId: NodeId
  @Type('uint32')
  public AttributeId: uint32
  @Type('string')
  public WriteIndexRange: string
  @Type('uint32')
  public OverrideValueHandling: OverrideValueHandling
  @Type('object')
  public OverrideValue: Variant

  constructor(options?: {
    DataSetFieldId?: Guid
    ReceiverIndexRange?: string
    TargetNodeId?: NodeId
    AttributeId?: uint32
    WriteIndexRange?: string
    OverrideValueHandling?: OverrideValueHandling
    OverrideValue?: Variant
  }) {
    this.DataSetFieldId = options?.DataSetFieldId ?? new Guid()
    this.ReceiverIndexRange = options?.ReceiverIndexRange ?? ''
    this.TargetNodeId = options?.TargetNodeId ?? new NodeId()
    this.AttributeId = options?.AttributeId ?? 0
    this.WriteIndexRange = options?.WriteIndexRange ?? ''
    this.OverrideValueHandling =
      options?.OverrideValueHandling ?? OverrideValueHandlingDisabled
    this.OverrideValue = options?.OverrideValue ?? new Variant()
  }
}

export class PubSubConfigurationDataType {
  @TypeArray('PublishedDataSetDataType')
  public PublishedDataSets: PublishedDataSetDataType[] | null
  @TypeArray('PubSubConnectionDataType')
  public Connections: PubSubConnectionDataType[] | null
  @Type('boolean')
  public Enabled: boolean

  constructor(options?: {
    PublishedDataSets?: PublishedDataSetDataType[] | null
    Connections?: PubSubConnectionDataType[] | null
    Enabled?: boolean
  }) {
    this.PublishedDataSets = options?.PublishedDataSets ?? null
    this.Connections = options?.Connections ?? null
    this.Enabled = options?.Enabled ?? false
  }
}

export class AliasNameDataType {
  @Type('object')
  public AliasName: QualifiedName
  @TypeArray('ExpandedNodeId')
  public ReferencedNodes: ExpandedNodeId[] | null

  constructor(options?: {
    AliasName?: QualifiedName
    ReferencedNodes?: ExpandedNodeId[] | null
  }) {
    this.AliasName = options?.AliasName ?? new QualifiedName()
    this.ReferencedNodes = options?.ReferencedNodes ?? null
  }
}

export class RolePermissionType {
  @Type('object')
  public RoleId: NodeId
  @Type('uint32')
  public Permissions: PermissionType

  constructor(options?: { RoleId?: NodeId; Permissions?: PermissionType }) {
    this.RoleId = options?.RoleId ?? new NodeId()
    this.Permissions = options?.Permissions ?? PermissionTypeNone
  }
}

export class ReferenceNode {
  @Type('object')
  public ReferenceTypeId: NodeId
  @Type('boolean')
  public IsInverse: boolean
  @Type('object')
  public TargetId: ExpandedNodeId

  constructor(options?: {
    ReferenceTypeId?: NodeId
    IsInverse?: boolean
    TargetId?: ExpandedNodeId
  }) {
    this.ReferenceTypeId = options?.ReferenceTypeId ?? new NodeId()
    this.IsInverse = options?.IsInverse ?? false
    this.TargetId = options?.TargetId ?? new ExpandedNodeId()
  }
}

export class Node {
  @Type('object')
  public NodeId: NodeId
  @Type('uint32')
  public NodeClass: NodeClass
  @Type('object')
  public BrowseName: QualifiedName
  @Type('object')
  public DisplayName: LocalizedText
  @Type('object')
  public Description: LocalizedText
  @Type('uint32')
  public WriteMask: uint32
  @Type('uint32')
  public UserWriteMask: uint32
  @TypeArray('RolePermissionType')
  public RolePermissions: RolePermissionType[] | null
  @TypeArray('RolePermissionType')
  public UserRolePermissions: RolePermissionType[] | null
  @Type('uint16')
  public AccessRestrictions: uint16
  @TypeArray('ReferenceNode')
  public References: ReferenceNode[] | null

  constructor(options?: {
    NodeId?: NodeId
    NodeClass?: NodeClass
    BrowseName?: QualifiedName
    DisplayName?: LocalizedText
    Description?: LocalizedText
    WriteMask?: uint32
    UserWriteMask?: uint32
    RolePermissions?: RolePermissionType[] | null
    UserRolePermissions?: RolePermissionType[] | null
    AccessRestrictions?: uint16
    References?: ReferenceNode[] | null
  }) {
    this.NodeId = options?.NodeId ?? new NodeId()
    this.NodeClass = options?.NodeClass ?? NodeClassUnspecified
    this.BrowseName = options?.BrowseName ?? new QualifiedName()
    this.DisplayName = options?.DisplayName ?? new LocalizedText()
    this.Description = options?.Description ?? new LocalizedText()
    this.WriteMask = options?.WriteMask ?? 0
    this.UserWriteMask = options?.UserWriteMask ?? 0
    this.RolePermissions = options?.RolePermissions ?? null
    this.UserRolePermissions = options?.UserRolePermissions ?? null
    this.AccessRestrictions = options?.AccessRestrictions ?? 0
    this.References = options?.References ?? null
  }
}

export class Argument {
  @Type('string')
  public Name: string
  @Type('object')
  public DataType: NodeId
  @Type('int32')
  public ValueRank: int32
  @TypeArray('uint32')
  public ArrayDimensions: Uint32Array | null
  @Type('object')
  public Description: LocalizedText

  constructor(options?: {
    Name?: string
    DataType?: NodeId
    ValueRank?: int32
    ArrayDimensions?: Uint32Array | null
    Description?: LocalizedText
  }) {
    this.Name = options?.Name ?? ''
    this.DataType = options?.DataType ?? new NodeId()
    this.ValueRank = options?.ValueRank ?? 0
    this.ArrayDimensions = options?.ArrayDimensions ?? null
    this.Description = options?.Description ?? new LocalizedText()
  }
}

export class EnumValueType {
  @Type('int64')
  public Value: int64
  @Type('object')
  public DisplayName: LocalizedText
  @Type('object')
  public Description: LocalizedText

  constructor(options?: {
    Value?: int64
    DisplayName?: LocalizedText
    Description?: LocalizedText
  }) {
    this.Value = options?.Value ?? BigInt(0)
    this.DisplayName = options?.DisplayName ?? new LocalizedText()
    this.Description = options?.Description ?? new LocalizedText()
  }
}

export class OptionSet {
  @Type('ByteString')
  public Value: ByteString
  @Type('ByteString')
  public ValidBits: ByteString

  constructor(options?: { Value?: ByteString; ValidBits?: ByteString }) {
    this.Value = options?.Value ?? new Uint8Array()
    this.ValidBits = options?.ValidBits ?? new Uint8Array()
  }
}

export class TimeZoneDataType {
  @Type('int16')
  public Offset: int16
  @Type('boolean')
  public DaylightSavingInOffset: boolean

  constructor(options?: { Offset?: int16; DaylightSavingInOffset?: boolean }) {
    this.Offset = options?.Offset ?? 0
    this.DaylightSavingInOffset = options?.DaylightSavingInOffset ?? false
  }
}

export class RequestHeader {
  @Type('object')
  public AuthenticationToken: NodeId
  @Type('Date')
  public Timestamp: Date
  @Type('uint32')
  public RequestHandle: uint32
  @Type('uint32')
  public ReturnDiagnostics: uint32
  @Type('string')
  public AuditEntryId: string
  @Type('uint32')
  public TimeoutHint: uint32
  @Type('object')
  public AdditionalHeader: ExtensionObject

  constructor(options?: {
    AuthenticationToken?: NodeId
    Timestamp?: Date
    RequestHandle?: uint32
    ReturnDiagnostics?: uint32
    AuditEntryId?: string
    TimeoutHint?: uint32
    AdditionalHeader?: ExtensionObject
  }) {
    this.AuthenticationToken = options?.AuthenticationToken ?? new NodeId()
    this.Timestamp = options?.Timestamp ?? new Date()
    this.RequestHandle = options?.RequestHandle ?? 0
    this.ReturnDiagnostics = options?.ReturnDiagnostics ?? 0
    this.AuditEntryId = options?.AuditEntryId ?? ''
    this.TimeoutHint = options?.TimeoutHint ?? 0
    this.AdditionalHeader = options?.AdditionalHeader ?? new ExtensionObject()
  }
}

export class ResponseHeader {
  @Type('Date')
  public Timestamp: Date
  @Type('uint32')
  public RequestHandle: uint32
  @Type('uint32')
  public ServiceResult: StatusCode
  @Type('object')
  public ServiceDiagnostics: DiagnosticInfo
  @TypeArray('string')
  public StringTable: string[] | null
  @Type('object')
  public AdditionalHeader: ExtensionObject

  constructor(options?: {
    Timestamp?: Date
    RequestHandle?: uint32
    ServiceResult?: StatusCode
    ServiceDiagnostics?: DiagnosticInfo
    StringTable?: string[] | null
    AdditionalHeader?: ExtensionObject
  }) {
    this.Timestamp = options?.Timestamp ?? new Date()
    this.RequestHandle = options?.RequestHandle ?? 0
    this.ServiceResult = options?.ServiceResult ?? StatusCodeOK
    this.ServiceDiagnostics =
      options?.ServiceDiagnostics ?? new DiagnosticInfo()
    this.StringTable = options?.StringTable ?? null
    this.AdditionalHeader = options?.AdditionalHeader ?? new ExtensionObject()
  }
}

export class ServiceFault {
  @Type('object')
  public ResponseHeader: ResponseHeader

  constructor(options?: { ResponseHeader?: ResponseHeader }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
  }
}

export class SessionlessInvokeRequestType {
  @TypeArray('uint32')
  public UrisVersion: Uint32Array | null
  @TypeArray('string')
  public NamespaceUris: string[] | null
  @TypeArray('string')
  public ServerUris: string[] | null
  @TypeArray('string')
  public LocaleIds: string[] | null
  @Type('uint32')
  public ServiceId: uint32

  constructor(options?: {
    UrisVersion?: Uint32Array | null
    NamespaceUris?: string[] | null
    ServerUris?: string[] | null
    LocaleIds?: string[] | null
    ServiceId?: uint32
  }) {
    this.UrisVersion = options?.UrisVersion ?? null
    this.NamespaceUris = options?.NamespaceUris ?? null
    this.ServerUris = options?.ServerUris ?? null
    this.LocaleIds = options?.LocaleIds ?? null
    this.ServiceId = options?.ServiceId ?? 0
  }
}

export class SessionlessInvokeResponseType {
  @TypeArray('string')
  public NamespaceUris: string[] | null
  @TypeArray('string')
  public ServerUris: string[] | null
  @Type('uint32')
  public ServiceId: uint32

  constructor(options?: {
    NamespaceUris?: string[] | null
    ServerUris?: string[] | null
    ServiceId?: uint32
  }) {
    this.NamespaceUris = options?.NamespaceUris ?? null
    this.ServerUris = options?.ServerUris ?? null
    this.ServiceId = options?.ServiceId ?? 0
  }
}

export class FindServersRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('string')
  public EndpointUrl: string
  @TypeArray('string')
  public LocaleIds: string[] | null
  @TypeArray('string')
  public ServerUris: string[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    EndpointUrl?: string
    LocaleIds?: string[] | null
    ServerUris?: string[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.EndpointUrl = options?.EndpointUrl ?? ''
    this.LocaleIds = options?.LocaleIds ?? null
    this.ServerUris = options?.ServerUris ?? null
  }
}

export class FindServersResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('ApplicationDescription')
  public Servers: ApplicationDescription[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Servers?: ApplicationDescription[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Servers = options?.Servers ?? null
  }
}

export class ServerOnNetwork {
  @Type('uint32')
  public RecordId: uint32
  @Type('string')
  public ServerName: string
  @Type('string')
  public DiscoveryUrl: string
  @TypeArray('string')
  public ServerCapabilities: string[] | null

  constructor(options?: {
    RecordId?: uint32
    ServerName?: string
    DiscoveryUrl?: string
    ServerCapabilities?: string[] | null
  }) {
    this.RecordId = options?.RecordId ?? 0
    this.ServerName = options?.ServerName ?? ''
    this.DiscoveryUrl = options?.DiscoveryUrl ?? ''
    this.ServerCapabilities = options?.ServerCapabilities ?? null
  }
}

export class FindServersOnNetworkRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public StartingRecordId: uint32
  @Type('uint32')
  public MaxRecordsToReturn: uint32
  @TypeArray('string')
  public ServerCapabilityFilter: string[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    StartingRecordId?: uint32
    MaxRecordsToReturn?: uint32
    ServerCapabilityFilter?: string[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.StartingRecordId = options?.StartingRecordId ?? 0
    this.MaxRecordsToReturn = options?.MaxRecordsToReturn ?? 0
    this.ServerCapabilityFilter = options?.ServerCapabilityFilter ?? null
  }
}

export class FindServersOnNetworkResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('Date')
  public LastCounterResetTime: Date
  @TypeArray('ServerOnNetwork')
  public Servers: ServerOnNetwork[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    LastCounterResetTime?: Date
    Servers?: ServerOnNetwork[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.LastCounterResetTime = options?.LastCounterResetTime ?? new Date()
    this.Servers = options?.Servers ?? null
  }
}

export class GetEndpointsRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('string')
  public EndpointUrl: string
  @TypeArray('string')
  public LocaleIds: string[] | null
  @TypeArray('string')
  public ProfileUris: string[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    EndpointUrl?: string
    LocaleIds?: string[] | null
    ProfileUris?: string[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.EndpointUrl = options?.EndpointUrl ?? ''
    this.LocaleIds = options?.LocaleIds ?? null
    this.ProfileUris = options?.ProfileUris ?? null
  }
}

export class GetEndpointsResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('EndpointDescription')
  public Endpoints: EndpointDescription[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Endpoints?: EndpointDescription[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Endpoints = options?.Endpoints ?? null
  }
}

export class RegisteredServer {
  @Type('string')
  public ServerUri: string
  @Type('string')
  public ProductUri: string
  @TypeArray('LocalizedText')
  public ServerNames: LocalizedText[] | null
  @Type('uint32')
  public ServerType: ApplicationType
  @Type('string')
  public GatewayServerUri: string
  @TypeArray('string')
  public DiscoveryUrls: string[] | null
  @Type('string')
  public SemaphoreFilePath: string
  @Type('boolean')
  public IsOnline: boolean

  constructor(options?: {
    ServerUri?: string
    ProductUri?: string
    ServerNames?: LocalizedText[] | null
    ServerType?: ApplicationType
    GatewayServerUri?: string
    DiscoveryUrls?: string[] | null
    SemaphoreFilePath?: string
    IsOnline?: boolean
  }) {
    this.ServerUri = options?.ServerUri ?? ''
    this.ProductUri = options?.ProductUri ?? ''
    this.ServerNames = options?.ServerNames ?? null
    this.ServerType = options?.ServerType ?? ApplicationTypeServer
    this.GatewayServerUri = options?.GatewayServerUri ?? ''
    this.DiscoveryUrls = options?.DiscoveryUrls ?? null
    this.SemaphoreFilePath = options?.SemaphoreFilePath ?? ''
    this.IsOnline = options?.IsOnline ?? false
  }
}

export class RegisterServerRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('object')
  public Server: RegisteredServer

  constructor(options?: {
    RequestHeader?: RequestHeader
    Server?: RegisteredServer
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.Server = options?.Server ?? new RegisteredServer()
  }
}

export class RegisterServerResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader

  constructor(options?: { ResponseHeader?: ResponseHeader }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
  }
}

export class RegisterServer2Request {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('object')
  public Server: RegisteredServer
  @TypeArray('ExtensionObject')
  public DiscoveryConfiguration: ExtensionObject[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    Server?: RegisteredServer
    DiscoveryConfiguration?: ExtensionObject[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.Server = options?.Server ?? new RegisteredServer()
    this.DiscoveryConfiguration = options?.DiscoveryConfiguration ?? null
  }
}

export class RegisterServer2Response {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public ConfigurationResults: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    ConfigurationResults?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.ConfigurationResults = options?.ConfigurationResults ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class ChannelSecurityToken {
  @Type('uint32')
  public ChannelId: uint32
  @Type('uint32')
  public TokenId: uint32
  @Type('Date')
  public CreatedAt: Date
  @Type('uint32')
  public RevisedLifetime: uint32

  constructor(options?: {
    ChannelId?: uint32
    TokenId?: uint32
    CreatedAt?: Date
    RevisedLifetime?: uint32
  }) {
    this.ChannelId = options?.ChannelId ?? 0
    this.TokenId = options?.TokenId ?? 0
    this.CreatedAt = options?.CreatedAt ?? new Date()
    this.RevisedLifetime = options?.RevisedLifetime ?? 0
  }
}

export class OpenSecureChannelRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public ClientProtocolVersion: uint32
  @Type('uint32')
  public RequestType: SecurityTokenRequestType
  @Type('uint32')
  public SecurityMode: MessageSecurityMode
  @Type('ByteString')
  public ClientNonce: ByteString
  @Type('uint32')
  public RequestedLifetime: uint32

  constructor(options?: {
    RequestHeader?: RequestHeader
    ClientProtocolVersion?: uint32
    RequestType?: SecurityTokenRequestType
    SecurityMode?: MessageSecurityMode
    ClientNonce?: ByteString
    RequestedLifetime?: uint32
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.ClientProtocolVersion = options?.ClientProtocolVersion ?? 0
    this.RequestType = options?.RequestType ?? SecurityTokenRequestTypeIssue
    this.SecurityMode = options?.SecurityMode ?? MessageSecurityModeInvalid
    this.ClientNonce = options?.ClientNonce ?? new Uint8Array()
    this.RequestedLifetime = options?.RequestedLifetime ?? 0
  }
}

export class OpenSecureChannelResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('uint32')
  public ServerProtocolVersion: uint32
  @Type('object')
  public SecurityToken: ChannelSecurityToken
  @Type('ByteString')
  public ServerNonce: ByteString

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    ServerProtocolVersion?: uint32
    SecurityToken?: ChannelSecurityToken
    ServerNonce?: ByteString
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.ServerProtocolVersion = options?.ServerProtocolVersion ?? 0
    this.SecurityToken = options?.SecurityToken ?? new ChannelSecurityToken()
    this.ServerNonce = options?.ServerNonce ?? new Uint8Array()
  }
}

export class CloseSecureChannelRequest {
  @Type('object')
  public RequestHeader: RequestHeader

  constructor(options?: { RequestHeader?: RequestHeader }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
  }
}

export class CloseSecureChannelResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader

  constructor(options?: { ResponseHeader?: ResponseHeader }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
  }
}

export class SignedSoftwareCertificate {
  @Type('ByteString')
  public CertificateData: ByteString
  @Type('ByteString')
  public Signature: ByteString

  constructor(options?: {
    CertificateData?: ByteString
    Signature?: ByteString
  }) {
    this.CertificateData = options?.CertificateData ?? new Uint8Array()
    this.Signature = options?.Signature ?? new Uint8Array()
  }
}

export class SignatureData {
  @Type('string')
  public Algorithm: string
  @Type('ByteString')
  public Signature: ByteString

  constructor(options?: { Algorithm?: string; Signature?: ByteString }) {
    this.Algorithm = options?.Algorithm ?? ''
    this.Signature = options?.Signature ?? new Uint8Array()
  }
}

export class CreateSessionRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('object')
  public ClientDescription: ApplicationDescription
  @Type('string')
  public ServerUri: string
  @Type('string')
  public EndpointUrl: string
  @Type('string')
  public SessionName: string
  @Type('ByteString')
  public ClientNonce: ByteString
  @Type('ByteString')
  public ClientCertificate: ByteString
  @Type('float64')
  public RequestedSessionTimeout: float64
  @Type('uint32')
  public MaxResponseMessageSize: uint32

  constructor(options?: {
    RequestHeader?: RequestHeader
    ClientDescription?: ApplicationDescription
    ServerUri?: string
    EndpointUrl?: string
    SessionName?: string
    ClientNonce?: ByteString
    ClientCertificate?: ByteString
    RequestedSessionTimeout?: float64
    MaxResponseMessageSize?: uint32
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.ClientDescription =
      options?.ClientDescription ?? new ApplicationDescription()
    this.ServerUri = options?.ServerUri ?? ''
    this.EndpointUrl = options?.EndpointUrl ?? ''
    this.SessionName = options?.SessionName ?? ''
    this.ClientNonce = options?.ClientNonce ?? new Uint8Array()
    this.ClientCertificate = options?.ClientCertificate ?? new Uint8Array()
    this.RequestedSessionTimeout = options?.RequestedSessionTimeout ?? 0
    this.MaxResponseMessageSize = options?.MaxResponseMessageSize ?? 0
  }
}

export class CreateSessionResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('object')
  public SessionId: NodeId
  @Type('object')
  public AuthenticationToken: NodeId
  @Type('float64')
  public RevisedSessionTimeout: float64
  @Type('ByteString')
  public ServerNonce: ByteString
  @Type('ByteString')
  public ServerCertificate: ByteString
  @TypeArray('EndpointDescription')
  public ServerEndpoints: EndpointDescription[] | null
  @TypeArray('SignedSoftwareCertificate')
  public ServerSoftwareCertificates: SignedSoftwareCertificate[] | null
  @Type('object')
  public ServerSignature: SignatureData
  @Type('uint32')
  public MaxRequestMessageSize: uint32

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    SessionId?: NodeId
    AuthenticationToken?: NodeId
    RevisedSessionTimeout?: float64
    ServerNonce?: ByteString
    ServerCertificate?: ByteString
    ServerEndpoints?: EndpointDescription[] | null
    ServerSoftwareCertificates?: SignedSoftwareCertificate[] | null
    ServerSignature?: SignatureData
    MaxRequestMessageSize?: uint32
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.SessionId = options?.SessionId ?? new NodeId()
    this.AuthenticationToken = options?.AuthenticationToken ?? new NodeId()
    this.RevisedSessionTimeout = options?.RevisedSessionTimeout ?? 0
    this.ServerNonce = options?.ServerNonce ?? new Uint8Array()
    this.ServerCertificate = options?.ServerCertificate ?? new Uint8Array()
    this.ServerEndpoints = options?.ServerEndpoints ?? null
    this.ServerSoftwareCertificates =
      options?.ServerSoftwareCertificates ?? null
    this.ServerSignature = options?.ServerSignature ?? new SignatureData()
    this.MaxRequestMessageSize = options?.MaxRequestMessageSize ?? 0
  }
}

export class UserIdentityToken {
  @Type('string')
  public PolicyId: string

  constructor(options?: { PolicyId?: string }) {
    this.PolicyId = options?.PolicyId ?? ''
  }
}

export class AnonymousIdentityToken {
  @Type('string')
  public PolicyId: string

  constructor(options?: { PolicyId?: string }) {
    this.PolicyId = options?.PolicyId ?? ''
  }
}

export class UserNameIdentityToken {
  @Type('string')
  public PolicyId: string
  @Type('string')
  public UserName: string
  @Type('ByteString')
  public Password: ByteString
  @Type('string')
  public EncryptionAlgorithm: string

  constructor(options?: {
    PolicyId?: string
    UserName?: string
    Password?: ByteString
    EncryptionAlgorithm?: string
  }) {
    this.PolicyId = options?.PolicyId ?? ''
    this.UserName = options?.UserName ?? ''
    this.Password = options?.Password ?? new Uint8Array()
    this.EncryptionAlgorithm = options?.EncryptionAlgorithm ?? ''
  }
}

export class X509IdentityToken {
  @Type('string')
  public PolicyId: string
  @Type('ByteString')
  public CertificateData: ByteString

  constructor(options?: { PolicyId?: string; CertificateData?: ByteString }) {
    this.PolicyId = options?.PolicyId ?? ''
    this.CertificateData = options?.CertificateData ?? new Uint8Array()
  }
}

export class IssuedIdentityToken {
  @Type('string')
  public PolicyId: string
  @Type('ByteString')
  public TokenData: ByteString
  @Type('string')
  public EncryptionAlgorithm: string

  constructor(options?: {
    PolicyId?: string
    TokenData?: ByteString
    EncryptionAlgorithm?: string
  }) {
    this.PolicyId = options?.PolicyId ?? ''
    this.TokenData = options?.TokenData ?? new Uint8Array()
    this.EncryptionAlgorithm = options?.EncryptionAlgorithm ?? ''
  }
}

export class ActivateSessionRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('object')
  public ClientSignature: SignatureData
  @TypeArray('SignedSoftwareCertificate')
  public ClientSoftwareCertificates: SignedSoftwareCertificate[] | null
  @TypeArray('string')
  public LocaleIds: string[] | null
  @Type('object')
  public UserIdentityToken: ExtensionObject
  @Type('object')
  public UserTokenSignature: SignatureData

  constructor(options?: {
    RequestHeader?: RequestHeader
    ClientSignature?: SignatureData
    ClientSoftwareCertificates?: SignedSoftwareCertificate[] | null
    LocaleIds?: string[] | null
    UserIdentityToken?: ExtensionObject
    UserTokenSignature?: SignatureData
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.ClientSignature = options?.ClientSignature ?? new SignatureData()
    this.ClientSoftwareCertificates =
      options?.ClientSoftwareCertificates ?? null
    this.LocaleIds = options?.LocaleIds ?? null
    this.UserIdentityToken = options?.UserIdentityToken ?? new ExtensionObject()
    this.UserTokenSignature = options?.UserTokenSignature ?? new SignatureData()
  }
}

export class ActivateSessionResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('ByteString')
  public ServerNonce: ByteString
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    ServerNonce?: ByteString
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.ServerNonce = options?.ServerNonce ?? new Uint8Array()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class CloseSessionRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('boolean')
  public DeleteSubscriptions: boolean

  constructor(options?: {
    RequestHeader?: RequestHeader
    DeleteSubscriptions?: boolean
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.DeleteSubscriptions = options?.DeleteSubscriptions ?? false
  }
}

export class CloseSessionResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader

  constructor(options?: { ResponseHeader?: ResponseHeader }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
  }
}

export class CancelRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public RequestHandle: uint32

  constructor(options?: {
    RequestHeader?: RequestHeader
    RequestHandle?: uint32
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.RequestHandle = options?.RequestHandle ?? 0
  }
}

export class CancelResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('uint32')
  public CancelCount: uint32

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    CancelCount?: uint32
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.CancelCount = options?.CancelCount ?? 0
  }
}

export class NodeAttributes {
  @Type('uint32')
  public SpecifiedAttributes: uint32
  @Type('object')
  public DisplayName: LocalizedText
  @Type('object')
  public Description: LocalizedText
  @Type('uint32')
  public WriteMask: uint32
  @Type('uint32')
  public UserWriteMask: uint32

  constructor(options?: {
    SpecifiedAttributes?: uint32
    DisplayName?: LocalizedText
    Description?: LocalizedText
    WriteMask?: uint32
    UserWriteMask?: uint32
  }) {
    this.SpecifiedAttributes = options?.SpecifiedAttributes ?? 0
    this.DisplayName = options?.DisplayName ?? new LocalizedText()
    this.Description = options?.Description ?? new LocalizedText()
    this.WriteMask = options?.WriteMask ?? 0
    this.UserWriteMask = options?.UserWriteMask ?? 0
  }
}

export class GenericAttributeValue {
  @Type('uint32')
  public AttributeId: uint32
  @Type('object')
  public Value: Variant

  constructor(options?: { AttributeId?: uint32; Value?: Variant }) {
    this.AttributeId = options?.AttributeId ?? 0
    this.Value = options?.Value ?? new Variant()
  }
}

export class AddNodesItem {
  @Type('object')
  public ParentNodeId: ExpandedNodeId
  @Type('object')
  public ReferenceTypeId: NodeId
  @Type('object')
  public RequestedNewNodeId: ExpandedNodeId
  @Type('object')
  public BrowseName: QualifiedName
  @Type('uint32')
  public NodeClass: NodeClass
  @Type('object')
  public NodeAttributes: ExtensionObject
  @Type('object')
  public TypeDefinition: ExpandedNodeId

  constructor(options?: {
    ParentNodeId?: ExpandedNodeId
    ReferenceTypeId?: NodeId
    RequestedNewNodeId?: ExpandedNodeId
    BrowseName?: QualifiedName
    NodeClass?: NodeClass
    NodeAttributes?: ExtensionObject
    TypeDefinition?: ExpandedNodeId
  }) {
    this.ParentNodeId = options?.ParentNodeId ?? new ExpandedNodeId()
    this.ReferenceTypeId = options?.ReferenceTypeId ?? new NodeId()
    this.RequestedNewNodeId =
      options?.RequestedNewNodeId ?? new ExpandedNodeId()
    this.BrowseName = options?.BrowseName ?? new QualifiedName()
    this.NodeClass = options?.NodeClass ?? NodeClassUnspecified
    this.NodeAttributes = options?.NodeAttributes ?? new ExtensionObject()
    this.TypeDefinition = options?.TypeDefinition ?? new ExpandedNodeId()
  }
}

export class AddNodesResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @Type('object')
  public AddedNodeId: NodeId

  constructor(options?: { StatusCode?: StatusCode; AddedNodeId?: NodeId }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.AddedNodeId = options?.AddedNodeId ?? new NodeId()
  }
}

export class AddNodesRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('AddNodesItem')
  public NodesToAdd: AddNodesItem[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    NodesToAdd?: AddNodesItem[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.NodesToAdd = options?.NodesToAdd ?? null
  }
}

export class AddNodesResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('AddNodesResult')
  public Results: AddNodesResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: AddNodesResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class AddReferencesItem {
  @Type('object')
  public SourceNodeId: NodeId
  @Type('object')
  public ReferenceTypeId: NodeId
  @Type('boolean')
  public IsForward: boolean
  @Type('string')
  public TargetServerUri: string
  @Type('object')
  public TargetNodeId: ExpandedNodeId
  @Type('uint32')
  public TargetNodeClass: NodeClass

  constructor(options?: {
    SourceNodeId?: NodeId
    ReferenceTypeId?: NodeId
    IsForward?: boolean
    TargetServerUri?: string
    TargetNodeId?: ExpandedNodeId
    TargetNodeClass?: NodeClass
  }) {
    this.SourceNodeId = options?.SourceNodeId ?? new NodeId()
    this.ReferenceTypeId = options?.ReferenceTypeId ?? new NodeId()
    this.IsForward = options?.IsForward ?? false
    this.TargetServerUri = options?.TargetServerUri ?? ''
    this.TargetNodeId = options?.TargetNodeId ?? new ExpandedNodeId()
    this.TargetNodeClass = options?.TargetNodeClass ?? NodeClassUnspecified
  }
}

export class AddReferencesRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('AddReferencesItem')
  public ReferencesToAdd: AddReferencesItem[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    ReferencesToAdd?: AddReferencesItem[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.ReferencesToAdd = options?.ReferencesToAdd ?? null
  }
}

export class AddReferencesResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class DeleteNodesItem {
  @Type('object')
  public NodeId: NodeId
  @Type('boolean')
  public DeleteTargetReferences: boolean

  constructor(options?: { NodeId?: NodeId; DeleteTargetReferences?: boolean }) {
    this.NodeId = options?.NodeId ?? new NodeId()
    this.DeleteTargetReferences = options?.DeleteTargetReferences ?? false
  }
}

export class DeleteNodesRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('DeleteNodesItem')
  public NodesToDelete: DeleteNodesItem[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    NodesToDelete?: DeleteNodesItem[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.NodesToDelete = options?.NodesToDelete ?? null
  }
}

export class DeleteNodesResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class DeleteReferencesItem {
  @Type('object')
  public SourceNodeId: NodeId
  @Type('object')
  public ReferenceTypeId: NodeId
  @Type('boolean')
  public IsForward: boolean
  @Type('object')
  public TargetNodeId: ExpandedNodeId
  @Type('boolean')
  public DeleteBidirectional: boolean

  constructor(options?: {
    SourceNodeId?: NodeId
    ReferenceTypeId?: NodeId
    IsForward?: boolean
    TargetNodeId?: ExpandedNodeId
    DeleteBidirectional?: boolean
  }) {
    this.SourceNodeId = options?.SourceNodeId ?? new NodeId()
    this.ReferenceTypeId = options?.ReferenceTypeId ?? new NodeId()
    this.IsForward = options?.IsForward ?? false
    this.TargetNodeId = options?.TargetNodeId ?? new ExpandedNodeId()
    this.DeleteBidirectional = options?.DeleteBidirectional ?? false
  }
}

export class DeleteReferencesRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('DeleteReferencesItem')
  public ReferencesToDelete: DeleteReferencesItem[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    ReferencesToDelete?: DeleteReferencesItem[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.ReferencesToDelete = options?.ReferencesToDelete ?? null
  }
}

export class DeleteReferencesResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class ViewDescription {
  @Type('object')
  public ViewId: NodeId
  @Type('Date')
  public Timestamp: Date
  @Type('uint32')
  public ViewVersion: uint32

  constructor(options?: {
    ViewId?: NodeId
    Timestamp?: Date
    ViewVersion?: uint32
  }) {
    this.ViewId = options?.ViewId ?? new NodeId()
    this.Timestamp = options?.Timestamp ?? new Date()
    this.ViewVersion = options?.ViewVersion ?? 0
  }
}

export class BrowseDescription {
  @Type('object')
  public NodeId: NodeId
  @Type('uint32')
  public BrowseDirection: BrowseDirection
  @Type('object')
  public ReferenceTypeId: NodeId
  @Type('boolean')
  public IncludeSubtypes: boolean
  @Type('uint32')
  public NodeClassMask: uint32
  @Type('uint32')
  public ResultMask: uint32

  constructor(options?: {
    NodeId?: NodeId
    BrowseDirection?: BrowseDirection
    ReferenceTypeId?: NodeId
    IncludeSubtypes?: boolean
    NodeClassMask?: uint32
    ResultMask?: uint32
  }) {
    this.NodeId = options?.NodeId ?? new NodeId()
    this.BrowseDirection = options?.BrowseDirection ?? BrowseDirectionForward
    this.ReferenceTypeId = options?.ReferenceTypeId ?? new NodeId()
    this.IncludeSubtypes = options?.IncludeSubtypes ?? false
    this.NodeClassMask = options?.NodeClassMask ?? 0
    this.ResultMask = options?.ResultMask ?? 0
  }
}

export class ReferenceDescription {
  @Type('object')
  public ReferenceTypeId: NodeId
  @Type('boolean')
  public IsForward: boolean
  @Type('object')
  public NodeId: ExpandedNodeId
  @Type('object')
  public BrowseName: QualifiedName
  @Type('object')
  public DisplayName: LocalizedText
  @Type('uint32')
  public NodeClass: NodeClass
  @Type('object')
  public TypeDefinition: ExpandedNodeId

  constructor(options?: {
    ReferenceTypeId?: NodeId
    IsForward?: boolean
    NodeId?: ExpandedNodeId
    BrowseName?: QualifiedName
    DisplayName?: LocalizedText
    NodeClass?: NodeClass
    TypeDefinition?: ExpandedNodeId
  }) {
    this.ReferenceTypeId = options?.ReferenceTypeId ?? new NodeId()
    this.IsForward = options?.IsForward ?? false
    this.NodeId = options?.NodeId ?? new ExpandedNodeId()
    this.BrowseName = options?.BrowseName ?? new QualifiedName()
    this.DisplayName = options?.DisplayName ?? new LocalizedText()
    this.NodeClass = options?.NodeClass ?? NodeClassUnspecified
    this.TypeDefinition = options?.TypeDefinition ?? new ExpandedNodeId()
  }
}

export class BrowseResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @Type('ByteString')
  public ContinuationPoint: ByteString
  @TypeArray('ReferenceDescription')
  public References: ReferenceDescription[] | null

  constructor(options?: {
    StatusCode?: StatusCode
    ContinuationPoint?: ByteString
    References?: ReferenceDescription[] | null
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.ContinuationPoint = options?.ContinuationPoint ?? new Uint8Array()
    this.References = options?.References ?? null
  }
}

export class BrowseRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('object')
  public View: ViewDescription
  @Type('uint32')
  public RequestedMaxReferencesPerNode: uint32
  @TypeArray('BrowseDescription')
  public NodesToBrowse: BrowseDescription[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    View?: ViewDescription
    RequestedMaxReferencesPerNode?: uint32
    NodesToBrowse?: BrowseDescription[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.View = options?.View ?? new ViewDescription()
    this.RequestedMaxReferencesPerNode =
      options?.RequestedMaxReferencesPerNode ?? 0
    this.NodesToBrowse = options?.NodesToBrowse ?? null
  }
}

export class BrowseResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('BrowseResult')
  public Results: BrowseResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: BrowseResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class BrowseNextRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('boolean')
  public ReleaseContinuationPoints: boolean
  @TypeArray('ByteString')
  public ContinuationPoints: ByteString[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    ReleaseContinuationPoints?: boolean
    ContinuationPoints?: ByteString[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.ReleaseContinuationPoints = options?.ReleaseContinuationPoints ?? false
    this.ContinuationPoints = options?.ContinuationPoints ?? null
  }
}

export class BrowseNextResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('BrowseResult')
  public Results: BrowseResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: BrowseResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class RelativePathElement {
  @Type('object')
  public ReferenceTypeId: NodeId
  @Type('boolean')
  public IsInverse: boolean
  @Type('boolean')
  public IncludeSubtypes: boolean
  @Type('object')
  public TargetName: QualifiedName

  constructor(options?: {
    ReferenceTypeId?: NodeId
    IsInverse?: boolean
    IncludeSubtypes?: boolean
    TargetName?: QualifiedName
  }) {
    this.ReferenceTypeId = options?.ReferenceTypeId ?? new NodeId()
    this.IsInverse = options?.IsInverse ?? false
    this.IncludeSubtypes = options?.IncludeSubtypes ?? false
    this.TargetName = options?.TargetName ?? new QualifiedName()
  }
}

export class RelativePath {
  @TypeArray('RelativePathElement')
  public Elements: RelativePathElement[] | null

  constructor(options?: { Elements?: RelativePathElement[] | null }) {
    this.Elements = options?.Elements ?? null
  }
}

export class BrowsePath {
  @Type('object')
  public StartingNode: NodeId
  @Type('object')
  public RelativePath: RelativePath

  constructor(options?: {
    StartingNode?: NodeId
    RelativePath?: RelativePath
  }) {
    this.StartingNode = options?.StartingNode ?? new NodeId()
    this.RelativePath = options?.RelativePath ?? new RelativePath()
  }
}

export class BrowsePathTarget {
  @Type('object')
  public TargetId: ExpandedNodeId
  @Type('uint32')
  public RemainingPathIndex: uint32

  constructor(options?: {
    TargetId?: ExpandedNodeId
    RemainingPathIndex?: uint32
  }) {
    this.TargetId = options?.TargetId ?? new ExpandedNodeId()
    this.RemainingPathIndex = options?.RemainingPathIndex ?? 0
  }
}

export class BrowsePathResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @TypeArray('BrowsePathTarget')
  public Targets: BrowsePathTarget[] | null

  constructor(options?: {
    StatusCode?: StatusCode
    Targets?: BrowsePathTarget[] | null
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.Targets = options?.Targets ?? null
  }
}

export class TranslateBrowsePathsToNodeIdsRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('BrowsePath')
  public BrowsePaths: BrowsePath[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    BrowsePaths?: BrowsePath[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.BrowsePaths = options?.BrowsePaths ?? null
  }
}

export class TranslateBrowsePathsToNodeIdsResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('BrowsePathResult')
  public Results: BrowsePathResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: BrowsePathResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class RegisterNodesRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('NodeId')
  public NodesToRegister: NodeId[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    NodesToRegister?: NodeId[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.NodesToRegister = options?.NodesToRegister ?? null
  }
}

export class RegisterNodesResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('NodeId')
  public RegisteredNodeIds: NodeId[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    RegisteredNodeIds?: NodeId[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.RegisteredNodeIds = options?.RegisteredNodeIds ?? null
  }
}

export class UnregisterNodesRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('NodeId')
  public NodesToUnregister: NodeId[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    NodesToUnregister?: NodeId[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.NodesToUnregister = options?.NodesToUnregister ?? null
  }
}

export class UnregisterNodesResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader

  constructor(options?: { ResponseHeader?: ResponseHeader }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
  }
}

export class EndpointConfiguration {
  @Type('int32')
  public OperationTimeout: int32
  @Type('boolean')
  public UseBinaryEncoding: boolean
  @Type('int32')
  public MaxStringLength: int32
  @Type('int32')
  public MaxByteStringLength: int32
  @Type('int32')
  public MaxArrayLength: int32
  @Type('int32')
  public MaxMessageSize: int32
  @Type('int32')
  public MaxBufferSize: int32
  @Type('int32')
  public ChannelLifetime: int32
  @Type('int32')
  public SecurityTokenLifetime: int32

  constructor(options?: {
    OperationTimeout?: int32
    UseBinaryEncoding?: boolean
    MaxStringLength?: int32
    MaxByteStringLength?: int32
    MaxArrayLength?: int32
    MaxMessageSize?: int32
    MaxBufferSize?: int32
    ChannelLifetime?: int32
    SecurityTokenLifetime?: int32
  }) {
    this.OperationTimeout = options?.OperationTimeout ?? 0
    this.UseBinaryEncoding = options?.UseBinaryEncoding ?? false
    this.MaxStringLength = options?.MaxStringLength ?? 0
    this.MaxByteStringLength = options?.MaxByteStringLength ?? 0
    this.MaxArrayLength = options?.MaxArrayLength ?? 0
    this.MaxMessageSize = options?.MaxMessageSize ?? 0
    this.MaxBufferSize = options?.MaxBufferSize ?? 0
    this.ChannelLifetime = options?.ChannelLifetime ?? 0
    this.SecurityTokenLifetime = options?.SecurityTokenLifetime ?? 0
  }
}

export class QueryDataDescription {
  @Type('object')
  public RelativePath: RelativePath
  @Type('uint32')
  public AttributeId: uint32
  @Type('string')
  public IndexRange: string

  constructor(options?: {
    RelativePath?: RelativePath
    AttributeId?: uint32
    IndexRange?: string
  }) {
    this.RelativePath = options?.RelativePath ?? new RelativePath()
    this.AttributeId = options?.AttributeId ?? 0
    this.IndexRange = options?.IndexRange ?? ''
  }
}

export class NodeTypeDescription {
  @Type('object')
  public TypeDefinitionNode: ExpandedNodeId
  @Type('boolean')
  public IncludeSubTypes: boolean
  @TypeArray('QueryDataDescription')
  public DataToReturn: QueryDataDescription[] | null

  constructor(options?: {
    TypeDefinitionNode?: ExpandedNodeId
    IncludeSubTypes?: boolean
    DataToReturn?: QueryDataDescription[] | null
  }) {
    this.TypeDefinitionNode =
      options?.TypeDefinitionNode ?? new ExpandedNodeId()
    this.IncludeSubTypes = options?.IncludeSubTypes ?? false
    this.DataToReturn = options?.DataToReturn ?? null
  }
}

export class QueryDataSet {
  @Type('object')
  public NodeId: ExpandedNodeId
  @Type('object')
  public TypeDefinitionNode: ExpandedNodeId
  @TypeArray('Variant')
  public Values: Variant[] | null

  constructor(options?: {
    NodeId?: ExpandedNodeId
    TypeDefinitionNode?: ExpandedNodeId
    Values?: Variant[] | null
  }) {
    this.NodeId = options?.NodeId ?? new ExpandedNodeId()
    this.TypeDefinitionNode =
      options?.TypeDefinitionNode ?? new ExpandedNodeId()
    this.Values = options?.Values ?? null
  }
}

export class NodeReference {
  @Type('object')
  public NodeId: NodeId
  @Type('object')
  public ReferenceTypeId: NodeId
  @Type('boolean')
  public IsForward: boolean
  @TypeArray('NodeId')
  public ReferencedNodeIds: NodeId[] | null

  constructor(options?: {
    NodeId?: NodeId
    ReferenceTypeId?: NodeId
    IsForward?: boolean
    ReferencedNodeIds?: NodeId[] | null
  }) {
    this.NodeId = options?.NodeId ?? new NodeId()
    this.ReferenceTypeId = options?.ReferenceTypeId ?? new NodeId()
    this.IsForward = options?.IsForward ?? false
    this.ReferencedNodeIds = options?.ReferencedNodeIds ?? null
  }
}

export class ContentFilterElement {
  @Type('uint32')
  public FilterOperator: FilterOperator
  @TypeArray('ExtensionObject')
  public FilterOperands: ExtensionObject[] | null

  constructor(options?: {
    FilterOperator?: FilterOperator
    FilterOperands?: ExtensionObject[] | null
  }) {
    this.FilterOperator = options?.FilterOperator ?? FilterOperatorEquals
    this.FilterOperands = options?.FilterOperands ?? null
  }
}

export class ContentFilter {
  @TypeArray('ContentFilterElement')
  public Elements: ContentFilterElement[] | null

  constructor(options?: { Elements?: ContentFilterElement[] | null }) {
    this.Elements = options?.Elements ?? null
  }
}

export class ContentFilterElementResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @TypeArray('uint32')
  public OperandStatusCodes: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public OperandDiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    StatusCode?: StatusCode
    OperandStatusCodes?: Uint32Array | null
    OperandDiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.OperandStatusCodes = options?.OperandStatusCodes ?? null
    this.OperandDiagnosticInfos = options?.OperandDiagnosticInfos ?? null
  }
}

export class ContentFilterResult {
  @TypeArray('ContentFilterElementResult')
  public ElementResults: ContentFilterElementResult[] | null
  @TypeArray('DiagnosticInfo')
  public ElementDiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ElementResults?: ContentFilterElementResult[] | null
    ElementDiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ElementResults = options?.ElementResults ?? null
    this.ElementDiagnosticInfos = options?.ElementDiagnosticInfos ?? null
  }
}

export class ParsingResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @TypeArray('uint32')
  public DataStatusCodes: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DataDiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    StatusCode?: StatusCode
    DataStatusCodes?: Uint32Array | null
    DataDiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.DataStatusCodes = options?.DataStatusCodes ?? null
    this.DataDiagnosticInfos = options?.DataDiagnosticInfos ?? null
  }
}

export class QueryFirstRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('object')
  public View: ViewDescription
  @TypeArray('NodeTypeDescription')
  public NodeTypes: NodeTypeDescription[] | null
  @Type('object')
  public Filter: ContentFilter
  @Type('uint32')
  public MaxDataSetsToReturn: uint32
  @Type('uint32')
  public MaxReferencesToReturn: uint32

  constructor(options?: {
    RequestHeader?: RequestHeader
    View?: ViewDescription
    NodeTypes?: NodeTypeDescription[] | null
    Filter?: ContentFilter
    MaxDataSetsToReturn?: uint32
    MaxReferencesToReturn?: uint32
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.View = options?.View ?? new ViewDescription()
    this.NodeTypes = options?.NodeTypes ?? null
    this.Filter = options?.Filter ?? new ContentFilter()
    this.MaxDataSetsToReturn = options?.MaxDataSetsToReturn ?? 0
    this.MaxReferencesToReturn = options?.MaxReferencesToReturn ?? 0
  }
}

export class QueryFirstResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('QueryDataSet')
  public QueryDataSets: QueryDataSet[] | null
  @Type('ByteString')
  public ContinuationPoint: ByteString
  @TypeArray('ParsingResult')
  public ParsingResults: ParsingResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null
  @Type('object')
  public FilterResult: ContentFilterResult

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    QueryDataSets?: QueryDataSet[] | null
    ContinuationPoint?: ByteString
    ParsingResults?: ParsingResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
    FilterResult?: ContentFilterResult
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.QueryDataSets = options?.QueryDataSets ?? null
    this.ContinuationPoint = options?.ContinuationPoint ?? new Uint8Array()
    this.ParsingResults = options?.ParsingResults ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
    this.FilterResult = options?.FilterResult ?? new ContentFilterResult()
  }
}

export class QueryNextRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('boolean')
  public ReleaseContinuationPoint: boolean
  @Type('ByteString')
  public ContinuationPoint: ByteString

  constructor(options?: {
    RequestHeader?: RequestHeader
    ReleaseContinuationPoint?: boolean
    ContinuationPoint?: ByteString
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.ReleaseContinuationPoint = options?.ReleaseContinuationPoint ?? false
    this.ContinuationPoint = options?.ContinuationPoint ?? new Uint8Array()
  }
}

export class QueryNextResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('QueryDataSet')
  public QueryDataSets: QueryDataSet[] | null
  @Type('ByteString')
  public RevisedContinuationPoint: ByteString

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    QueryDataSets?: QueryDataSet[] | null
    RevisedContinuationPoint?: ByteString
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.QueryDataSets = options?.QueryDataSets ?? null
    this.RevisedContinuationPoint =
      options?.RevisedContinuationPoint ?? new Uint8Array()
  }
}

export class ReadValueId {
  @Type('object')
  public NodeId: NodeId
  @Type('uint32')
  public AttributeId: uint32
  @Type('string')
  public IndexRange: string
  @Type('object')
  public DataEncoding: QualifiedName

  constructor(options?: {
    NodeId?: NodeId
    AttributeId?: uint32
    IndexRange?: string
    DataEncoding?: QualifiedName
  }) {
    this.NodeId = options?.NodeId ?? new NodeId()
    this.AttributeId = options?.AttributeId ?? 0
    this.IndexRange = options?.IndexRange ?? ''
    this.DataEncoding = options?.DataEncoding ?? new QualifiedName()
  }
}

export class ReadRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('float64')
  public MaxAge: float64
  @Type('uint32')
  public TimestampsToReturn: TimestampsToReturn
  @TypeArray('ReadValueId')
  public NodesToRead: ReadValueId[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    MaxAge?: float64
    TimestampsToReturn?: TimestampsToReturn
    NodesToRead?: ReadValueId[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.MaxAge = options?.MaxAge ?? 0
    this.TimestampsToReturn =
      options?.TimestampsToReturn ?? TimestampsToReturnSource
    this.NodesToRead = options?.NodesToRead ?? null
  }
}

export class ReadResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('DataValue')
  public Results: DataValue[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: DataValue[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class HistoryReadValueId {
  @Type('object')
  public NodeId: NodeId
  @Type('string')
  public IndexRange: string
  @Type('object')
  public DataEncoding: QualifiedName
  @Type('ByteString')
  public ContinuationPoint: ByteString

  constructor(options?: {
    NodeId?: NodeId
    IndexRange?: string
    DataEncoding?: QualifiedName
    ContinuationPoint?: ByteString
  }) {
    this.NodeId = options?.NodeId ?? new NodeId()
    this.IndexRange = options?.IndexRange ?? ''
    this.DataEncoding = options?.DataEncoding ?? new QualifiedName()
    this.ContinuationPoint = options?.ContinuationPoint ?? new Uint8Array()
  }
}

export class HistoryReadResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @Type('ByteString')
  public ContinuationPoint: ByteString
  @Type('object')
  public HistoryData: ExtensionObject

  constructor(options?: {
    StatusCode?: StatusCode
    ContinuationPoint?: ByteString
    HistoryData?: ExtensionObject
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.ContinuationPoint = options?.ContinuationPoint ?? new Uint8Array()
    this.HistoryData = options?.HistoryData ?? new ExtensionObject()
  }
}

export class HistoryData {
  @TypeArray('DataValue')
  public DataValues: DataValue[] | null

  constructor(options?: { DataValues?: DataValue[] | null }) {
    this.DataValues = options?.DataValues ?? null
  }
}

export class ModificationInfo {
  @Type('Date')
  public ModificationTime: Date
  @Type('uint32')
  public UpdateType: HistoryUpdateType
  @Type('string')
  public UserName: string

  constructor(options?: {
    ModificationTime?: Date
    UpdateType?: HistoryUpdateType
    UserName?: string
  }) {
    this.ModificationTime = options?.ModificationTime ?? new Date()
    this.UpdateType = options?.UpdateType ?? HistoryUpdateTypeInsert
    this.UserName = options?.UserName ?? ''
  }
}

export class HistoryEventFieldList {
  @TypeArray('Variant')
  public EventFields: Variant[] | null

  constructor(options?: { EventFields?: Variant[] | null }) {
    this.EventFields = options?.EventFields ?? null
  }
}

export class HistoryEvent {
  @TypeArray('HistoryEventFieldList')
  public Events: HistoryEventFieldList[] | null

  constructor(options?: { Events?: HistoryEventFieldList[] | null }) {
    this.Events = options?.Events ?? null
  }
}

export class HistoryReadRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('object')
  public HistoryReadDetails: ExtensionObject
  @Type('uint32')
  public TimestampsToReturn: TimestampsToReturn
  @Type('boolean')
  public ReleaseContinuationPoints: boolean
  @TypeArray('HistoryReadValueId')
  public NodesToRead: HistoryReadValueId[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    HistoryReadDetails?: ExtensionObject
    TimestampsToReturn?: TimestampsToReturn
    ReleaseContinuationPoints?: boolean
    NodesToRead?: HistoryReadValueId[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.HistoryReadDetails =
      options?.HistoryReadDetails ?? new ExtensionObject()
    this.TimestampsToReturn =
      options?.TimestampsToReturn ?? TimestampsToReturnSource
    this.ReleaseContinuationPoints = options?.ReleaseContinuationPoints ?? false
    this.NodesToRead = options?.NodesToRead ?? null
  }
}

export class HistoryReadResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('HistoryReadResult')
  public Results: HistoryReadResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: HistoryReadResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class WriteValue {
  @Type('object')
  public NodeId: NodeId
  @Type('uint32')
  public AttributeId: uint32
  @Type('string')
  public IndexRange: string
  @Type('object')
  public Value: DataValue

  constructor(options?: {
    NodeId?: NodeId
    AttributeId?: uint32
    IndexRange?: string
    Value?: DataValue
  }) {
    this.NodeId = options?.NodeId ?? new NodeId()
    this.AttributeId = options?.AttributeId ?? 0
    this.IndexRange = options?.IndexRange ?? ''
    this.Value = options?.Value ?? new DataValue()
  }
}

export class WriteRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('WriteValue')
  public NodesToWrite: WriteValue[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    NodesToWrite?: WriteValue[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.NodesToWrite = options?.NodesToWrite ?? null
  }
}

export class WriteResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class HistoryUpdateDetails {
  @Type('object')
  public NodeId: NodeId

  constructor(options?: { NodeId?: NodeId }) {
    this.NodeId = options?.NodeId ?? new NodeId()
  }
}

export class HistoryUpdateResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @TypeArray('uint32')
  public OperationResults: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    StatusCode?: StatusCode
    OperationResults?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.OperationResults = options?.OperationResults ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class HistoryUpdateRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('ExtensionObject')
  public HistoryUpdateDetails: ExtensionObject[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    HistoryUpdateDetails?: ExtensionObject[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.HistoryUpdateDetails = options?.HistoryUpdateDetails ?? null
  }
}

export class HistoryUpdateResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('HistoryUpdateResult')
  public Results: HistoryUpdateResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: HistoryUpdateResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class CallMethodRequest {
  @Type('object')
  public ObjectId: NodeId
  @Type('object')
  public MethodId: NodeId
  @TypeArray('Variant')
  public InputArguments: Variant[] | null

  constructor(options?: {
    ObjectId?: NodeId
    MethodId?: NodeId
    InputArguments?: Variant[] | null
  }) {
    this.ObjectId = options?.ObjectId ?? new NodeId()
    this.MethodId = options?.MethodId ?? new NodeId()
    this.InputArguments = options?.InputArguments ?? null
  }
}

export class CallMethodResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @TypeArray('uint32')
  public InputArgumentResults: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public InputArgumentDiagnosticInfos: DiagnosticInfo[] | null
  @TypeArray('Variant')
  public OutputArguments: Variant[] | null

  constructor(options?: {
    StatusCode?: StatusCode
    InputArgumentResults?: Uint32Array | null
    InputArgumentDiagnosticInfos?: DiagnosticInfo[] | null
    OutputArguments?: Variant[] | null
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.InputArgumentResults = options?.InputArgumentResults ?? null
    this.InputArgumentDiagnosticInfos =
      options?.InputArgumentDiagnosticInfos ?? null
    this.OutputArguments = options?.OutputArguments ?? null
  }
}

export class CallRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('CallMethodRequest')
  public MethodsToCall: CallMethodRequest[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    MethodsToCall?: CallMethodRequest[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.MethodsToCall = options?.MethodsToCall ?? null
  }
}

export class CallResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('CallMethodResult')
  public Results: CallMethodResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: CallMethodResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class AggregateConfiguration {
  @Type('boolean')
  public UseServerCapabilitiesDefaults: boolean
  @Type('boolean')
  public TreatUncertainAsBad: boolean
  @Type('uint8')
  public PercentDataBad: uint8
  @Type('uint8')
  public PercentDataGood: uint8
  @Type('boolean')
  public UseSlopedExtrapolation: boolean

  constructor(options?: {
    UseServerCapabilitiesDefaults?: boolean
    TreatUncertainAsBad?: boolean
    PercentDataBad?: uint8
    PercentDataGood?: uint8
    UseSlopedExtrapolation?: boolean
  }) {
    this.UseServerCapabilitiesDefaults =
      options?.UseServerCapabilitiesDefaults ?? false
    this.TreatUncertainAsBad = options?.TreatUncertainAsBad ?? false
    this.PercentDataBad = options?.PercentDataBad ?? 0
    this.PercentDataGood = options?.PercentDataGood ?? 0
    this.UseSlopedExtrapolation = options?.UseSlopedExtrapolation ?? false
  }
}

export class MonitoringParameters {
  @Type('uint32')
  public ClientHandle: uint32
  @Type('float64')
  public SamplingInterval: float64
  @Type('object')
  public Filter: ExtensionObject
  @Type('uint32')
  public QueueSize: uint32
  @Type('boolean')
  public DiscardOldest: boolean

  constructor(options?: {
    ClientHandle?: uint32
    SamplingInterval?: float64
    Filter?: ExtensionObject
    QueueSize?: uint32
    DiscardOldest?: boolean
  }) {
    this.ClientHandle = options?.ClientHandle ?? 0
    this.SamplingInterval = options?.SamplingInterval ?? 0
    this.Filter = options?.Filter ?? new ExtensionObject()
    this.QueueSize = options?.QueueSize ?? 0
    this.DiscardOldest = options?.DiscardOldest ?? false
  }
}

export class MonitoredItemCreateRequest {
  @Type('object')
  public ItemToMonitor: ReadValueId
  @Type('uint32')
  public MonitoringMode: MonitoringMode
  @Type('object')
  public RequestedParameters: MonitoringParameters

  constructor(options?: {
    ItemToMonitor?: ReadValueId
    MonitoringMode?: MonitoringMode
    RequestedParameters?: MonitoringParameters
  }) {
    this.ItemToMonitor = options?.ItemToMonitor ?? new ReadValueId()
    this.MonitoringMode = options?.MonitoringMode ?? MonitoringModeDisabled
    this.RequestedParameters =
      options?.RequestedParameters ?? new MonitoringParameters()
  }
}

export class MonitoredItemCreateResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @Type('uint32')
  public MonitoredItemId: uint32
  @Type('float64')
  public RevisedSamplingInterval: float64
  @Type('uint32')
  public RevisedQueueSize: uint32
  @Type('object')
  public FilterResult: ExtensionObject

  constructor(options?: {
    StatusCode?: StatusCode
    MonitoredItemId?: uint32
    RevisedSamplingInterval?: float64
    RevisedQueueSize?: uint32
    FilterResult?: ExtensionObject
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.MonitoredItemId = options?.MonitoredItemId ?? 0
    this.RevisedSamplingInterval = options?.RevisedSamplingInterval ?? 0
    this.RevisedQueueSize = options?.RevisedQueueSize ?? 0
    this.FilterResult = options?.FilterResult ?? new ExtensionObject()
  }
}

export class CreateMonitoredItemsRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('uint32')
  public TimestampsToReturn: TimestampsToReturn
  @TypeArray('MonitoredItemCreateRequest')
  public ItemsToCreate: MonitoredItemCreateRequest[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionId?: uint32
    TimestampsToReturn?: TimestampsToReturn
    ItemsToCreate?: MonitoredItemCreateRequest[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.TimestampsToReturn =
      options?.TimestampsToReturn ?? TimestampsToReturnSource
    this.ItemsToCreate = options?.ItemsToCreate ?? null
  }
}

export class CreateMonitoredItemsResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('MonitoredItemCreateResult')
  public Results: MonitoredItemCreateResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: MonitoredItemCreateResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class MonitoredItemModifyRequest {
  @Type('uint32')
  public MonitoredItemId: uint32
  @Type('object')
  public RequestedParameters: MonitoringParameters

  constructor(options?: {
    MonitoredItemId?: uint32
    RequestedParameters?: MonitoringParameters
  }) {
    this.MonitoredItemId = options?.MonitoredItemId ?? 0
    this.RequestedParameters =
      options?.RequestedParameters ?? new MonitoringParameters()
  }
}

export class MonitoredItemModifyResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @Type('float64')
  public RevisedSamplingInterval: float64
  @Type('uint32')
  public RevisedQueueSize: uint32
  @Type('object')
  public FilterResult: ExtensionObject

  constructor(options?: {
    StatusCode?: StatusCode
    RevisedSamplingInterval?: float64
    RevisedQueueSize?: uint32
    FilterResult?: ExtensionObject
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.RevisedSamplingInterval = options?.RevisedSamplingInterval ?? 0
    this.RevisedQueueSize = options?.RevisedQueueSize ?? 0
    this.FilterResult = options?.FilterResult ?? new ExtensionObject()
  }
}

export class ModifyMonitoredItemsRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('uint32')
  public TimestampsToReturn: TimestampsToReturn
  @TypeArray('MonitoredItemModifyRequest')
  public ItemsToModify: MonitoredItemModifyRequest[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionId?: uint32
    TimestampsToReturn?: TimestampsToReturn
    ItemsToModify?: MonitoredItemModifyRequest[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.TimestampsToReturn =
      options?.TimestampsToReturn ?? TimestampsToReturnSource
    this.ItemsToModify = options?.ItemsToModify ?? null
  }
}

export class ModifyMonitoredItemsResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('MonitoredItemModifyResult')
  public Results: MonitoredItemModifyResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: MonitoredItemModifyResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class SetMonitoringModeRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('uint32')
  public MonitoringMode: MonitoringMode
  @TypeArray('uint32')
  public MonitoredItemIds: Uint32Array | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionId?: uint32
    MonitoringMode?: MonitoringMode
    MonitoredItemIds?: Uint32Array | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.MonitoringMode = options?.MonitoringMode ?? MonitoringModeDisabled
    this.MonitoredItemIds = options?.MonitoredItemIds ?? null
  }
}

export class SetMonitoringModeResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class SetTriggeringRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('uint32')
  public TriggeringItemId: uint32
  @TypeArray('uint32')
  public LinksToAdd: Uint32Array | null
  @TypeArray('uint32')
  public LinksToRemove: Uint32Array | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionId?: uint32
    TriggeringItemId?: uint32
    LinksToAdd?: Uint32Array | null
    LinksToRemove?: Uint32Array | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.TriggeringItemId = options?.TriggeringItemId ?? 0
    this.LinksToAdd = options?.LinksToAdd ?? null
    this.LinksToRemove = options?.LinksToRemove ?? null
  }
}

export class SetTriggeringResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public AddResults: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public AddDiagnosticInfos: DiagnosticInfo[] | null
  @TypeArray('uint32')
  public RemoveResults: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public RemoveDiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    AddResults?: Uint32Array | null
    AddDiagnosticInfos?: DiagnosticInfo[] | null
    RemoveResults?: Uint32Array | null
    RemoveDiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.AddResults = options?.AddResults ?? null
    this.AddDiagnosticInfos = options?.AddDiagnosticInfos ?? null
    this.RemoveResults = options?.RemoveResults ?? null
    this.RemoveDiagnosticInfos = options?.RemoveDiagnosticInfos ?? null
  }
}

export class DeleteMonitoredItemsRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @TypeArray('uint32')
  public MonitoredItemIds: Uint32Array | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionId?: uint32
    MonitoredItemIds?: Uint32Array | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.MonitoredItemIds = options?.MonitoredItemIds ?? null
  }
}

export class DeleteMonitoredItemsResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class CreateSubscriptionRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('float64')
  public RequestedPublishingInterval: float64
  @Type('uint32')
  public RequestedLifetimeCount: uint32
  @Type('uint32')
  public RequestedMaxKeepAliveCount: uint32
  @Type('uint32')
  public MaxNotificationsPerPublish: uint32
  @Type('boolean')
  public PublishingEnabled: boolean
  @Type('uint8')
  public Priority: uint8

  constructor(options?: {
    RequestHeader?: RequestHeader
    RequestedPublishingInterval?: float64
    RequestedLifetimeCount?: uint32
    RequestedMaxKeepAliveCount?: uint32
    MaxNotificationsPerPublish?: uint32
    PublishingEnabled?: boolean
    Priority?: uint8
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.RequestedPublishingInterval = options?.RequestedPublishingInterval ?? 0
    this.RequestedLifetimeCount = options?.RequestedLifetimeCount ?? 0
    this.RequestedMaxKeepAliveCount = options?.RequestedMaxKeepAliveCount ?? 0
    this.MaxNotificationsPerPublish = options?.MaxNotificationsPerPublish ?? 0
    this.PublishingEnabled = options?.PublishingEnabled ?? false
    this.Priority = options?.Priority ?? 0
  }
}

export class CreateSubscriptionResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('float64')
  public RevisedPublishingInterval: float64
  @Type('uint32')
  public RevisedLifetimeCount: uint32
  @Type('uint32')
  public RevisedMaxKeepAliveCount: uint32

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    SubscriptionId?: uint32
    RevisedPublishingInterval?: float64
    RevisedLifetimeCount?: uint32
    RevisedMaxKeepAliveCount?: uint32
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.RevisedPublishingInterval = options?.RevisedPublishingInterval ?? 0
    this.RevisedLifetimeCount = options?.RevisedLifetimeCount ?? 0
    this.RevisedMaxKeepAliveCount = options?.RevisedMaxKeepAliveCount ?? 0
  }
}

export class ModifySubscriptionRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('float64')
  public RequestedPublishingInterval: float64
  @Type('uint32')
  public RequestedLifetimeCount: uint32
  @Type('uint32')
  public RequestedMaxKeepAliveCount: uint32
  @Type('uint32')
  public MaxNotificationsPerPublish: uint32
  @Type('uint8')
  public Priority: uint8

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionId?: uint32
    RequestedPublishingInterval?: float64
    RequestedLifetimeCount?: uint32
    RequestedMaxKeepAliveCount?: uint32
    MaxNotificationsPerPublish?: uint32
    Priority?: uint8
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.RequestedPublishingInterval = options?.RequestedPublishingInterval ?? 0
    this.RequestedLifetimeCount = options?.RequestedLifetimeCount ?? 0
    this.RequestedMaxKeepAliveCount = options?.RequestedMaxKeepAliveCount ?? 0
    this.MaxNotificationsPerPublish = options?.MaxNotificationsPerPublish ?? 0
    this.Priority = options?.Priority ?? 0
  }
}

export class ModifySubscriptionResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('float64')
  public RevisedPublishingInterval: float64
  @Type('uint32')
  public RevisedLifetimeCount: uint32
  @Type('uint32')
  public RevisedMaxKeepAliveCount: uint32

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    RevisedPublishingInterval?: float64
    RevisedLifetimeCount?: uint32
    RevisedMaxKeepAliveCount?: uint32
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.RevisedPublishingInterval = options?.RevisedPublishingInterval ?? 0
    this.RevisedLifetimeCount = options?.RevisedLifetimeCount ?? 0
    this.RevisedMaxKeepAliveCount = options?.RevisedMaxKeepAliveCount ?? 0
  }
}

export class SetPublishingModeRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('boolean')
  public PublishingEnabled: boolean
  @TypeArray('uint32')
  public SubscriptionIds: Uint32Array | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    PublishingEnabled?: boolean
    SubscriptionIds?: Uint32Array | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.PublishingEnabled = options?.PublishingEnabled ?? false
    this.SubscriptionIds = options?.SubscriptionIds ?? null
  }
}

export class SetPublishingModeResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class NotificationMessage {
  @Type('uint32')
  public SequenceNumber: uint32
  @Type('Date')
  public PublishTime: Date
  @TypeArray('ExtensionObject')
  public NotificationData: ExtensionObject[] | null

  constructor(options?: {
    SequenceNumber?: uint32
    PublishTime?: Date
    NotificationData?: ExtensionObject[] | null
  }) {
    this.SequenceNumber = options?.SequenceNumber ?? 0
    this.PublishTime = options?.PublishTime ?? new Date()
    this.NotificationData = options?.NotificationData ?? null
  }
}

export class MonitoredItemNotification {
  @Type('uint32')
  public ClientHandle: uint32
  @Type('object')
  public Value: DataValue

  constructor(options?: { ClientHandle?: uint32; Value?: DataValue }) {
    this.ClientHandle = options?.ClientHandle ?? 0
    this.Value = options?.Value ?? new DataValue()
  }
}

export class EventFieldList {
  @Type('uint32')
  public ClientHandle: uint32
  @TypeArray('Variant')
  public EventFields: Variant[] | null

  constructor(options?: {
    ClientHandle?: uint32
    EventFields?: Variant[] | null
  }) {
    this.ClientHandle = options?.ClientHandle ?? 0
    this.EventFields = options?.EventFields ?? null
  }
}

export class SubscriptionAcknowledgement {
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('uint32')
  public SequenceNumber: uint32

  constructor(options?: { SubscriptionId?: uint32; SequenceNumber?: uint32 }) {
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.SequenceNumber = options?.SequenceNumber ?? 0
  }
}

export class PublishRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('SubscriptionAcknowledgement')
  public SubscriptionAcknowledgements: SubscriptionAcknowledgement[] | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionAcknowledgements?: SubscriptionAcknowledgement[] | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionAcknowledgements =
      options?.SubscriptionAcknowledgements ?? null
  }
}

export class PublishResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @TypeArray('uint32')
  public AvailableSequenceNumbers: Uint32Array | null
  @Type('boolean')
  public MoreNotifications: boolean
  @Type('object')
  public NotificationMessage: NotificationMessage
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    SubscriptionId?: uint32
    AvailableSequenceNumbers?: Uint32Array | null
    MoreNotifications?: boolean
    NotificationMessage?: NotificationMessage
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.AvailableSequenceNumbers = options?.AvailableSequenceNumbers ?? null
    this.MoreNotifications = options?.MoreNotifications ?? false
    this.NotificationMessage =
      options?.NotificationMessage ?? new NotificationMessage()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class RepublishRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('uint32')
  public RetransmitSequenceNumber: uint32

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionId?: uint32
    RetransmitSequenceNumber?: uint32
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.RetransmitSequenceNumber = options?.RetransmitSequenceNumber ?? 0
  }
}

export class RepublishResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @Type('object')
  public NotificationMessage: NotificationMessage

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    NotificationMessage?: NotificationMessage
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.NotificationMessage =
      options?.NotificationMessage ?? new NotificationMessage()
  }
}

export class TransferResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @TypeArray('uint32')
  public AvailableSequenceNumbers: Uint32Array | null

  constructor(options?: {
    StatusCode?: StatusCode
    AvailableSequenceNumbers?: Uint32Array | null
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.AvailableSequenceNumbers = options?.AvailableSequenceNumbers ?? null
  }
}

export class TransferSubscriptionsRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('uint32')
  public SubscriptionIds: Uint32Array | null
  @Type('boolean')
  public SendInitialValues: boolean

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionIds?: Uint32Array | null
    SendInitialValues?: boolean
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionIds = options?.SubscriptionIds ?? null
    this.SendInitialValues = options?.SendInitialValues ?? false
  }
}

export class TransferSubscriptionsResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('TransferResult')
  public Results: TransferResult[] | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: TransferResult[] | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class DeleteSubscriptionsRequest {
  @Type('object')
  public RequestHeader: RequestHeader
  @TypeArray('uint32')
  public SubscriptionIds: Uint32Array | null

  constructor(options?: {
    RequestHeader?: RequestHeader
    SubscriptionIds?: Uint32Array | null
  }) {
    this.RequestHeader = options?.RequestHeader ?? new RequestHeader()
    this.SubscriptionIds = options?.SubscriptionIds ?? null
  }
}

export class DeleteSubscriptionsResponse {
  @Type('object')
  public ResponseHeader: ResponseHeader
  @TypeArray('uint32')
  public Results: Uint32Array | null
  @TypeArray('DiagnosticInfo')
  public DiagnosticInfos: DiagnosticInfo[] | null

  constructor(options?: {
    ResponseHeader?: ResponseHeader
    Results?: Uint32Array | null
    DiagnosticInfos?: DiagnosticInfo[] | null
  }) {
    this.ResponseHeader = options?.ResponseHeader ?? new ResponseHeader()
    this.Results = options?.Results ?? null
    this.DiagnosticInfos = options?.DiagnosticInfos ?? null
  }
}

export class BuildInfo {
  @Type('string')
  public ProductUri: string
  @Type('string')
  public ManufacturerName: string
  @Type('string')
  public ProductName: string
  @Type('string')
  public SoftwareVersion: string
  @Type('string')
  public BuildNumber: string
  @Type('Date')
  public BuildDate: Date

  constructor(options?: {
    ProductUri?: string
    ManufacturerName?: string
    ProductName?: string
    SoftwareVersion?: string
    BuildNumber?: string
    BuildDate?: Date
  }) {
    this.ProductUri = options?.ProductUri ?? ''
    this.ManufacturerName = options?.ManufacturerName ?? ''
    this.ProductName = options?.ProductName ?? ''
    this.SoftwareVersion = options?.SoftwareVersion ?? ''
    this.BuildNumber = options?.BuildNumber ?? ''
    this.BuildDate = options?.BuildDate ?? new Date()
  }
}

export class RedundantServerDataType {
  @Type('string')
  public ServerId: string
  @Type('uint8')
  public ServiceLevel: uint8
  @Type('uint32')
  public ServerState: ServerState

  constructor(options?: {
    ServerId?: string
    ServiceLevel?: uint8
    ServerState?: ServerState
  }) {
    this.ServerId = options?.ServerId ?? ''
    this.ServiceLevel = options?.ServiceLevel ?? 0
    this.ServerState = options?.ServerState ?? ServerStateRunning
  }
}

export class EndpointUrlListDataType {
  @TypeArray('string')
  public EndpointUrlList: string[] | null

  constructor(options?: { EndpointUrlList?: string[] | null }) {
    this.EndpointUrlList = options?.EndpointUrlList ?? null
  }
}

export class NetworkGroupDataType {
  @Type('string')
  public ServerUri: string
  @TypeArray('EndpointUrlListDataType')
  public NetworkPaths: EndpointUrlListDataType[] | null

  constructor(options?: {
    ServerUri?: string
    NetworkPaths?: EndpointUrlListDataType[] | null
  }) {
    this.ServerUri = options?.ServerUri ?? ''
    this.NetworkPaths = options?.NetworkPaths ?? null
  }
}

export class SamplingIntervalDiagnosticsDataType {
  @Type('float64')
  public SamplingInterval: float64
  @Type('uint32')
  public MonitoredItemCount: uint32
  @Type('uint32')
  public MaxMonitoredItemCount: uint32
  @Type('uint32')
  public DisabledMonitoredItemCount: uint32

  constructor(options?: {
    SamplingInterval?: float64
    MonitoredItemCount?: uint32
    MaxMonitoredItemCount?: uint32
    DisabledMonitoredItemCount?: uint32
  }) {
    this.SamplingInterval = options?.SamplingInterval ?? 0
    this.MonitoredItemCount = options?.MonitoredItemCount ?? 0
    this.MaxMonitoredItemCount = options?.MaxMonitoredItemCount ?? 0
    this.DisabledMonitoredItemCount = options?.DisabledMonitoredItemCount ?? 0
  }
}

export class ServerDiagnosticsSummaryDataType {
  @Type('uint32')
  public ServerViewCount: uint32
  @Type('uint32')
  public CurrentSessionCount: uint32
  @Type('uint32')
  public CumulatedSessionCount: uint32
  @Type('uint32')
  public SecurityRejectedSessionCount: uint32
  @Type('uint32')
  public RejectedSessionCount: uint32
  @Type('uint32')
  public SessionTimeoutCount: uint32
  @Type('uint32')
  public SessionAbortCount: uint32
  @Type('uint32')
  public CurrentSubscriptionCount: uint32
  @Type('uint32')
  public CumulatedSubscriptionCount: uint32
  @Type('uint32')
  public PublishingIntervalCount: uint32
  @Type('uint32')
  public SecurityRejectedRequestsCount: uint32
  @Type('uint32')
  public RejectedRequestsCount: uint32

  constructor(options?: {
    ServerViewCount?: uint32
    CurrentSessionCount?: uint32
    CumulatedSessionCount?: uint32
    SecurityRejectedSessionCount?: uint32
    RejectedSessionCount?: uint32
    SessionTimeoutCount?: uint32
    SessionAbortCount?: uint32
    CurrentSubscriptionCount?: uint32
    CumulatedSubscriptionCount?: uint32
    PublishingIntervalCount?: uint32
    SecurityRejectedRequestsCount?: uint32
    RejectedRequestsCount?: uint32
  }) {
    this.ServerViewCount = options?.ServerViewCount ?? 0
    this.CurrentSessionCount = options?.CurrentSessionCount ?? 0
    this.CumulatedSessionCount = options?.CumulatedSessionCount ?? 0
    this.SecurityRejectedSessionCount =
      options?.SecurityRejectedSessionCount ?? 0
    this.RejectedSessionCount = options?.RejectedSessionCount ?? 0
    this.SessionTimeoutCount = options?.SessionTimeoutCount ?? 0
    this.SessionAbortCount = options?.SessionAbortCount ?? 0
    this.CurrentSubscriptionCount = options?.CurrentSubscriptionCount ?? 0
    this.CumulatedSubscriptionCount = options?.CumulatedSubscriptionCount ?? 0
    this.PublishingIntervalCount = options?.PublishingIntervalCount ?? 0
    this.SecurityRejectedRequestsCount =
      options?.SecurityRejectedRequestsCount ?? 0
    this.RejectedRequestsCount = options?.RejectedRequestsCount ?? 0
  }
}

export class ServerStatusDataType {
  @Type('Date')
  public StartTime: Date
  @Type('Date')
  public CurrentTime: Date
  @Type('uint32')
  public State: ServerState
  @Type('object')
  public BuildInfo: BuildInfo
  @Type('uint32')
  public SecondsTillShutdown: uint32
  @Type('object')
  public ShutdownReason: LocalizedText

  constructor(options?: {
    StartTime?: Date
    CurrentTime?: Date
    State?: ServerState
    BuildInfo?: BuildInfo
    SecondsTillShutdown?: uint32
    ShutdownReason?: LocalizedText
  }) {
    this.StartTime = options?.StartTime ?? new Date()
    this.CurrentTime = options?.CurrentTime ?? new Date()
    this.State = options?.State ?? ServerStateRunning
    this.BuildInfo = options?.BuildInfo ?? new BuildInfo()
    this.SecondsTillShutdown = options?.SecondsTillShutdown ?? 0
    this.ShutdownReason = options?.ShutdownReason ?? new LocalizedText()
  }
}

export class ServiceCounterDataType {
  @Type('uint32')
  public TotalCount: uint32
  @Type('uint32')
  public ErrorCount: uint32

  constructor(options?: { TotalCount?: uint32; ErrorCount?: uint32 }) {
    this.TotalCount = options?.TotalCount ?? 0
    this.ErrorCount = options?.ErrorCount ?? 0
  }
}

export class SessionDiagnosticsDataType {
  @Type('object')
  public SessionId: NodeId
  @Type('string')
  public SessionName: string
  @Type('object')
  public ClientDescription: ApplicationDescription
  @Type('string')
  public ServerUri: string
  @Type('string')
  public EndpointUrl: string
  @TypeArray('string')
  public LocaleIds: string[] | null
  @Type('float64')
  public ActualSessionTimeout: float64
  @Type('uint32')
  public MaxResponseMessageSize: uint32
  @Type('Date')
  public ClientConnectionTime: Date
  @Type('Date')
  public ClientLastContactTime: Date
  @Type('uint32')
  public CurrentSubscriptionsCount: uint32
  @Type('uint32')
  public CurrentMonitoredItemsCount: uint32
  @Type('uint32')
  public CurrentPublishRequestsInQueue: uint32
  @Type('object')
  public TotalRequestCount: ServiceCounterDataType
  @Type('uint32')
  public UnauthorizedRequestCount: uint32
  @Type('object')
  public ReadCount: ServiceCounterDataType
  @Type('object')
  public HistoryReadCount: ServiceCounterDataType
  @Type('object')
  public WriteCount: ServiceCounterDataType
  @Type('object')
  public HistoryUpdateCount: ServiceCounterDataType
  @Type('object')
  public CallCount: ServiceCounterDataType
  @Type('object')
  public CreateMonitoredItemsCount: ServiceCounterDataType
  @Type('object')
  public ModifyMonitoredItemsCount: ServiceCounterDataType
  @Type('object')
  public SetMonitoringModeCount: ServiceCounterDataType
  @Type('object')
  public SetTriggeringCount: ServiceCounterDataType
  @Type('object')
  public DeleteMonitoredItemsCount: ServiceCounterDataType
  @Type('object')
  public CreateSubscriptionCount: ServiceCounterDataType
  @Type('object')
  public ModifySubscriptionCount: ServiceCounterDataType
  @Type('object')
  public SetPublishingModeCount: ServiceCounterDataType
  @Type('object')
  public PublishCount: ServiceCounterDataType
  @Type('object')
  public RepublishCount: ServiceCounterDataType
  @Type('object')
  public TransferSubscriptionsCount: ServiceCounterDataType
  @Type('object')
  public DeleteSubscriptionsCount: ServiceCounterDataType
  @Type('object')
  public AddNodesCount: ServiceCounterDataType
  @Type('object')
  public AddReferencesCount: ServiceCounterDataType
  @Type('object')
  public DeleteNodesCount: ServiceCounterDataType
  @Type('object')
  public DeleteReferencesCount: ServiceCounterDataType
  @Type('object')
  public BrowseCount: ServiceCounterDataType
  @Type('object')
  public BrowseNextCount: ServiceCounterDataType
  @Type('object')
  public TranslateBrowsePathsToNodeIdsCount: ServiceCounterDataType
  @Type('object')
  public QueryFirstCount: ServiceCounterDataType
  @Type('object')
  public QueryNextCount: ServiceCounterDataType
  @Type('object')
  public RegisterNodesCount: ServiceCounterDataType
  @Type('object')
  public UnregisterNodesCount: ServiceCounterDataType

  constructor(options?: {
    SessionId?: NodeId
    SessionName?: string
    ClientDescription?: ApplicationDescription
    ServerUri?: string
    EndpointUrl?: string
    LocaleIds?: string[] | null
    ActualSessionTimeout?: float64
    MaxResponseMessageSize?: uint32
    ClientConnectionTime?: Date
    ClientLastContactTime?: Date
    CurrentSubscriptionsCount?: uint32
    CurrentMonitoredItemsCount?: uint32
    CurrentPublishRequestsInQueue?: uint32
    TotalRequestCount?: ServiceCounterDataType
    UnauthorizedRequestCount?: uint32
    ReadCount?: ServiceCounterDataType
    HistoryReadCount?: ServiceCounterDataType
    WriteCount?: ServiceCounterDataType
    HistoryUpdateCount?: ServiceCounterDataType
    CallCount?: ServiceCounterDataType
    CreateMonitoredItemsCount?: ServiceCounterDataType
    ModifyMonitoredItemsCount?: ServiceCounterDataType
    SetMonitoringModeCount?: ServiceCounterDataType
    SetTriggeringCount?: ServiceCounterDataType
    DeleteMonitoredItemsCount?: ServiceCounterDataType
    CreateSubscriptionCount?: ServiceCounterDataType
    ModifySubscriptionCount?: ServiceCounterDataType
    SetPublishingModeCount?: ServiceCounterDataType
    PublishCount?: ServiceCounterDataType
    RepublishCount?: ServiceCounterDataType
    TransferSubscriptionsCount?: ServiceCounterDataType
    DeleteSubscriptionsCount?: ServiceCounterDataType
    AddNodesCount?: ServiceCounterDataType
    AddReferencesCount?: ServiceCounterDataType
    DeleteNodesCount?: ServiceCounterDataType
    DeleteReferencesCount?: ServiceCounterDataType
    BrowseCount?: ServiceCounterDataType
    BrowseNextCount?: ServiceCounterDataType
    TranslateBrowsePathsToNodeIdsCount?: ServiceCounterDataType
    QueryFirstCount?: ServiceCounterDataType
    QueryNextCount?: ServiceCounterDataType
    RegisterNodesCount?: ServiceCounterDataType
    UnregisterNodesCount?: ServiceCounterDataType
  }) {
    this.SessionId = options?.SessionId ?? new NodeId()
    this.SessionName = options?.SessionName ?? ''
    this.ClientDescription =
      options?.ClientDescription ?? new ApplicationDescription()
    this.ServerUri = options?.ServerUri ?? ''
    this.EndpointUrl = options?.EndpointUrl ?? ''
    this.LocaleIds = options?.LocaleIds ?? null
    this.ActualSessionTimeout = options?.ActualSessionTimeout ?? 0
    this.MaxResponseMessageSize = options?.MaxResponseMessageSize ?? 0
    this.ClientConnectionTime = options?.ClientConnectionTime ?? new Date()
    this.ClientLastContactTime = options?.ClientLastContactTime ?? new Date()
    this.CurrentSubscriptionsCount = options?.CurrentSubscriptionsCount ?? 0
    this.CurrentMonitoredItemsCount = options?.CurrentMonitoredItemsCount ?? 0
    this.CurrentPublishRequestsInQueue =
      options?.CurrentPublishRequestsInQueue ?? 0
    this.TotalRequestCount =
      options?.TotalRequestCount ?? new ServiceCounterDataType()
    this.UnauthorizedRequestCount = options?.UnauthorizedRequestCount ?? 0
    this.ReadCount = options?.ReadCount ?? new ServiceCounterDataType()
    this.HistoryReadCount =
      options?.HistoryReadCount ?? new ServiceCounterDataType()
    this.WriteCount = options?.WriteCount ?? new ServiceCounterDataType()
    this.HistoryUpdateCount =
      options?.HistoryUpdateCount ?? new ServiceCounterDataType()
    this.CallCount = options?.CallCount ?? new ServiceCounterDataType()
    this.CreateMonitoredItemsCount =
      options?.CreateMonitoredItemsCount ?? new ServiceCounterDataType()
    this.ModifyMonitoredItemsCount =
      options?.ModifyMonitoredItemsCount ?? new ServiceCounterDataType()
    this.SetMonitoringModeCount =
      options?.SetMonitoringModeCount ?? new ServiceCounterDataType()
    this.SetTriggeringCount =
      options?.SetTriggeringCount ?? new ServiceCounterDataType()
    this.DeleteMonitoredItemsCount =
      options?.DeleteMonitoredItemsCount ?? new ServiceCounterDataType()
    this.CreateSubscriptionCount =
      options?.CreateSubscriptionCount ?? new ServiceCounterDataType()
    this.ModifySubscriptionCount =
      options?.ModifySubscriptionCount ?? new ServiceCounterDataType()
    this.SetPublishingModeCount =
      options?.SetPublishingModeCount ?? new ServiceCounterDataType()
    this.PublishCount = options?.PublishCount ?? new ServiceCounterDataType()
    this.RepublishCount =
      options?.RepublishCount ?? new ServiceCounterDataType()
    this.TransferSubscriptionsCount =
      options?.TransferSubscriptionsCount ?? new ServiceCounterDataType()
    this.DeleteSubscriptionsCount =
      options?.DeleteSubscriptionsCount ?? new ServiceCounterDataType()
    this.AddNodesCount = options?.AddNodesCount ?? new ServiceCounterDataType()
    this.AddReferencesCount =
      options?.AddReferencesCount ?? new ServiceCounterDataType()
    this.DeleteNodesCount =
      options?.DeleteNodesCount ?? new ServiceCounterDataType()
    this.DeleteReferencesCount =
      options?.DeleteReferencesCount ?? new ServiceCounterDataType()
    this.BrowseCount = options?.BrowseCount ?? new ServiceCounterDataType()
    this.BrowseNextCount =
      options?.BrowseNextCount ?? new ServiceCounterDataType()
    this.TranslateBrowsePathsToNodeIdsCount =
      options?.TranslateBrowsePathsToNodeIdsCount ??
      new ServiceCounterDataType()
    this.QueryFirstCount =
      options?.QueryFirstCount ?? new ServiceCounterDataType()
    this.QueryNextCount =
      options?.QueryNextCount ?? new ServiceCounterDataType()
    this.RegisterNodesCount =
      options?.RegisterNodesCount ?? new ServiceCounterDataType()
    this.UnregisterNodesCount =
      options?.UnregisterNodesCount ?? new ServiceCounterDataType()
  }
}

export class SessionSecurityDiagnosticsDataType {
  @Type('object')
  public SessionId: NodeId
  @Type('string')
  public ClientUserIdOfSession: string
  @TypeArray('string')
  public ClientUserIdHistory: string[] | null
  @Type('string')
  public AuthenticationMechanism: string
  @Type('string')
  public Encoding: string
  @Type('string')
  public TransportProtocol: string
  @Type('uint32')
  public SecurityMode: MessageSecurityMode
  @Type('string')
  public SecurityPolicyUri: string
  @Type('ByteString')
  public ClientCertificate: ByteString

  constructor(options?: {
    SessionId?: NodeId
    ClientUserIdOfSession?: string
    ClientUserIdHistory?: string[] | null
    AuthenticationMechanism?: string
    Encoding?: string
    TransportProtocol?: string
    SecurityMode?: MessageSecurityMode
    SecurityPolicyUri?: string
    ClientCertificate?: ByteString
  }) {
    this.SessionId = options?.SessionId ?? new NodeId()
    this.ClientUserIdOfSession = options?.ClientUserIdOfSession ?? ''
    this.ClientUserIdHistory = options?.ClientUserIdHistory ?? null
    this.AuthenticationMechanism = options?.AuthenticationMechanism ?? ''
    this.Encoding = options?.Encoding ?? ''
    this.TransportProtocol = options?.TransportProtocol ?? ''
    this.SecurityMode = options?.SecurityMode ?? MessageSecurityModeInvalid
    this.SecurityPolicyUri = options?.SecurityPolicyUri ?? ''
    this.ClientCertificate = options?.ClientCertificate ?? new Uint8Array()
  }
}

export class StatusResult {
  @Type('uint32')
  public StatusCode: StatusCode
  @Type('object')
  public DiagnosticInfo: DiagnosticInfo

  constructor(options?: {
    StatusCode?: StatusCode
    DiagnosticInfo?: DiagnosticInfo
  }) {
    this.StatusCode = options?.StatusCode ?? StatusCodeOK
    this.DiagnosticInfo = options?.DiagnosticInfo ?? new DiagnosticInfo()
  }
}

export class SubscriptionDiagnosticsDataType {
  @Type('object')
  public SessionId: NodeId
  @Type('uint32')
  public SubscriptionId: uint32
  @Type('uint8')
  public Priority: uint8
  @Type('float64')
  public PublishingInterval: float64
  @Type('uint32')
  public MaxKeepAliveCount: uint32
  @Type('uint32')
  public MaxLifetimeCount: uint32
  @Type('uint32')
  public MaxNotificationsPerPublish: uint32
  @Type('boolean')
  public PublishingEnabled: boolean
  @Type('uint32')
  public ModifyCount: uint32
  @Type('uint32')
  public EnableCount: uint32
  @Type('uint32')
  public DisableCount: uint32
  @Type('uint32')
  public RepublishRequestCount: uint32
  @Type('uint32')
  public RepublishMessageRequestCount: uint32
  @Type('uint32')
  public RepublishMessageCount: uint32
  @Type('uint32')
  public TransferRequestCount: uint32
  @Type('uint32')
  public TransferredToAltClientCount: uint32
  @Type('uint32')
  public TransferredToSameClientCount: uint32
  @Type('uint32')
  public PublishRequestCount: uint32
  @Type('uint32')
  public DataChangeNotificationsCount: uint32
  @Type('uint32')
  public EventNotificationsCount: uint32
  @Type('uint32')
  public NotificationsCount: uint32
  @Type('uint32')
  public LatePublishRequestCount: uint32
  @Type('uint32')
  public CurrentKeepAliveCount: uint32
  @Type('uint32')
  public CurrentLifetimeCount: uint32
  @Type('uint32')
  public UnacknowledgedMessageCount: uint32
  @Type('uint32')
  public DiscardedMessageCount: uint32
  @Type('uint32')
  public MonitoredItemCount: uint32
  @Type('uint32')
  public DisabledMonitoredItemCount: uint32
  @Type('uint32')
  public MonitoringQueueOverflowCount: uint32
  @Type('uint32')
  public NextSequenceNumber: uint32
  @Type('uint32')
  public EventQueueOverFlowCount: uint32

  constructor(options?: {
    SessionId?: NodeId
    SubscriptionId?: uint32
    Priority?: uint8
    PublishingInterval?: float64
    MaxKeepAliveCount?: uint32
    MaxLifetimeCount?: uint32
    MaxNotificationsPerPublish?: uint32
    PublishingEnabled?: boolean
    ModifyCount?: uint32
    EnableCount?: uint32
    DisableCount?: uint32
    RepublishRequestCount?: uint32
    RepublishMessageRequestCount?: uint32
    RepublishMessageCount?: uint32
    TransferRequestCount?: uint32
    TransferredToAltClientCount?: uint32
    TransferredToSameClientCount?: uint32
    PublishRequestCount?: uint32
    DataChangeNotificationsCount?: uint32
    EventNotificationsCount?: uint32
    NotificationsCount?: uint32
    LatePublishRequestCount?: uint32
    CurrentKeepAliveCount?: uint32
    CurrentLifetimeCount?: uint32
    UnacknowledgedMessageCount?: uint32
    DiscardedMessageCount?: uint32
    MonitoredItemCount?: uint32
    DisabledMonitoredItemCount?: uint32
    MonitoringQueueOverflowCount?: uint32
    NextSequenceNumber?: uint32
    EventQueueOverFlowCount?: uint32
  }) {
    this.SessionId = options?.SessionId ?? new NodeId()
    this.SubscriptionId = options?.SubscriptionId ?? 0
    this.Priority = options?.Priority ?? 0
    this.PublishingInterval = options?.PublishingInterval ?? 0
    this.MaxKeepAliveCount = options?.MaxKeepAliveCount ?? 0
    this.MaxLifetimeCount = options?.MaxLifetimeCount ?? 0
    this.MaxNotificationsPerPublish = options?.MaxNotificationsPerPublish ?? 0
    this.PublishingEnabled = options?.PublishingEnabled ?? false
    this.ModifyCount = options?.ModifyCount ?? 0
    this.EnableCount = options?.EnableCount ?? 0
    this.DisableCount = options?.DisableCount ?? 0
    this.RepublishRequestCount = options?.RepublishRequestCount ?? 0
    this.RepublishMessageRequestCount =
      options?.RepublishMessageRequestCount ?? 0
    this.RepublishMessageCount = options?.RepublishMessageCount ?? 0
    this.TransferRequestCount = options?.TransferRequestCount ?? 0
    this.TransferredToAltClientCount = options?.TransferredToAltClientCount ?? 0
    this.TransferredToSameClientCount =
      options?.TransferredToSameClientCount ?? 0
    this.PublishRequestCount = options?.PublishRequestCount ?? 0
    this.DataChangeNotificationsCount =
      options?.DataChangeNotificationsCount ?? 0
    this.EventNotificationsCount = options?.EventNotificationsCount ?? 0
    this.NotificationsCount = options?.NotificationsCount ?? 0
    this.LatePublishRequestCount = options?.LatePublishRequestCount ?? 0
    this.CurrentKeepAliveCount = options?.CurrentKeepAliveCount ?? 0
    this.CurrentLifetimeCount = options?.CurrentLifetimeCount ?? 0
    this.UnacknowledgedMessageCount = options?.UnacknowledgedMessageCount ?? 0
    this.DiscardedMessageCount = options?.DiscardedMessageCount ?? 0
    this.MonitoredItemCount = options?.MonitoredItemCount ?? 0
    this.DisabledMonitoredItemCount = options?.DisabledMonitoredItemCount ?? 0
    this.MonitoringQueueOverflowCount =
      options?.MonitoringQueueOverflowCount ?? 0
    this.NextSequenceNumber = options?.NextSequenceNumber ?? 0
    this.EventQueueOverFlowCount = options?.EventQueueOverFlowCount ?? 0
  }
}

export class ModelChangeStructureDataType {
  @Type('object')
  public Affected: NodeId
  @Type('object')
  public AffectedType: NodeId
  @Type('uint8')
  public Verb: uint8

  constructor(options?: {
    Affected?: NodeId
    AffectedType?: NodeId
    Verb?: uint8
  }) {
    this.Affected = options?.Affected ?? new NodeId()
    this.AffectedType = options?.AffectedType ?? new NodeId()
    this.Verb = options?.Verb ?? 0
  }
}

export class SemanticChangeStructureDataType {
  @Type('object')
  public Affected: NodeId
  @Type('object')
  public AffectedType: NodeId

  constructor(options?: { Affected?: NodeId; AffectedType?: NodeId }) {
    this.Affected = options?.Affected ?? new NodeId()
    this.AffectedType = options?.AffectedType ?? new NodeId()
  }
}

export class Range {
  @Type('float64')
  public Low: float64
  @Type('float64')
  public High: float64

  constructor(options?: { Low?: float64; High?: float64 }) {
    this.Low = options?.Low ?? 0
    this.High = options?.High ?? 0
  }
}

export class EUInformation {
  @Type('string')
  public NamespaceUri: string
  @Type('int32')
  public UnitId: int32
  @Type('object')
  public DisplayName: LocalizedText
  @Type('object')
  public Description: LocalizedText

  constructor(options?: {
    NamespaceUri?: string
    UnitId?: int32
    DisplayName?: LocalizedText
    Description?: LocalizedText
  }) {
    this.NamespaceUri = options?.NamespaceUri ?? ''
    this.UnitId = options?.UnitId ?? 0
    this.DisplayName = options?.DisplayName ?? new LocalizedText()
    this.Description = options?.Description ?? new LocalizedText()
  }
}

export class ComplexNumberType {
  @Type('float32')
  public Real: float32
  @Type('float32')
  public Imaginary: float32

  constructor(options?: { Real?: float32; Imaginary?: float32 }) {
    this.Real = options?.Real ?? 0
    this.Imaginary = options?.Imaginary ?? 0
  }
}

export class DoubleComplexNumberType {
  @Type('float64')
  public Real: float64
  @Type('float64')
  public Imaginary: float64

  constructor(options?: { Real?: float64; Imaginary?: float64 }) {
    this.Real = options?.Real ?? 0
    this.Imaginary = options?.Imaginary ?? 0
  }
}

export class AxisInformation {
  @Type('object')
  public EngineeringUnits: EUInformation
  @Type('object')
  public EURange: Range
  @Type('object')
  public Title: LocalizedText
  @Type('uint32')
  public AxisScaleType: AxisScaleEnumeration
  @TypeArray('float64')
  public AxisSteps: Float64Array | null

  constructor(options?: {
    EngineeringUnits?: EUInformation
    EURange?: Range
    Title?: LocalizedText
    AxisScaleType?: AxisScaleEnumeration
    AxisSteps?: Float64Array | null
  }) {
    this.EngineeringUnits = options?.EngineeringUnits ?? new EUInformation()
    this.EURange = options?.EURange ?? new Range()
    this.Title = options?.Title ?? new LocalizedText()
    this.AxisScaleType = options?.AxisScaleType ?? AxisScaleEnumerationLinear
    this.AxisSteps = options?.AxisSteps ?? null
  }
}

export class XVType {
  @Type('float64')
  public X: float64
  @Type('float32')
  public Value: float32

  constructor(options?: { X?: float64; Value?: float32 }) {
    this.X = options?.X ?? 0
    this.Value = options?.Value ?? 0
  }
}

export class ProgramDiagnosticDataType {
  @Type('object')
  public CreateSessionId: NodeId
  @Type('string')
  public CreateClientName: string
  @Type('Date')
  public InvocationCreationTime: Date
  @Type('Date')
  public LastTransitionTime: Date
  @Type('string')
  public LastMethodCall: string
  @Type('object')
  public LastMethodSessionId: NodeId
  @TypeArray('Argument')
  public LastMethodInputArguments: Argument[] | null
  @TypeArray('Argument')
  public LastMethodOutputArguments: Argument[] | null
  @Type('Date')
  public LastMethodCallTime: Date
  @Type('object')
  public LastMethodReturnStatus: StatusResult

  constructor(options?: {
    CreateSessionId?: NodeId
    CreateClientName?: string
    InvocationCreationTime?: Date
    LastTransitionTime?: Date
    LastMethodCall?: string
    LastMethodSessionId?: NodeId
    LastMethodInputArguments?: Argument[] | null
    LastMethodOutputArguments?: Argument[] | null
    LastMethodCallTime?: Date
    LastMethodReturnStatus?: StatusResult
  }) {
    this.CreateSessionId = options?.CreateSessionId ?? new NodeId()
    this.CreateClientName = options?.CreateClientName ?? ''
    this.InvocationCreationTime = options?.InvocationCreationTime ?? new Date()
    this.LastTransitionTime = options?.LastTransitionTime ?? new Date()
    this.LastMethodCall = options?.LastMethodCall ?? ''
    this.LastMethodSessionId = options?.LastMethodSessionId ?? new NodeId()
    this.LastMethodInputArguments = options?.LastMethodInputArguments ?? null
    this.LastMethodOutputArguments = options?.LastMethodOutputArguments ?? null
    this.LastMethodCallTime = options?.LastMethodCallTime ?? new Date()
    this.LastMethodReturnStatus =
      options?.LastMethodReturnStatus ?? new StatusResult()
  }
}

export class ProgramDiagnostic2DataType {
  @Type('object')
  public CreateSessionId: NodeId
  @Type('string')
  public CreateClientName: string
  @Type('Date')
  public InvocationCreationTime: Date
  @Type('Date')
  public LastTransitionTime: Date
  @Type('string')
  public LastMethodCall: string
  @Type('object')
  public LastMethodSessionId: NodeId
  @TypeArray('Argument')
  public LastMethodInputArguments: Argument[] | null
  @TypeArray('Argument')
  public LastMethodOutputArguments: Argument[] | null
  @TypeArray('Variant')
  public LastMethodInputValues: Variant[] | null
  @TypeArray('Variant')
  public LastMethodOutputValues: Variant[] | null
  @Type('Date')
  public LastMethodCallTime: Date
  @Type('object')
  public LastMethodReturnStatus: StatusResult

  constructor(options?: {
    CreateSessionId?: NodeId
    CreateClientName?: string
    InvocationCreationTime?: Date
    LastTransitionTime?: Date
    LastMethodCall?: string
    LastMethodSessionId?: NodeId
    LastMethodInputArguments?: Argument[] | null
    LastMethodOutputArguments?: Argument[] | null
    LastMethodInputValues?: Variant[] | null
    LastMethodOutputValues?: Variant[] | null
    LastMethodCallTime?: Date
    LastMethodReturnStatus?: StatusResult
  }) {
    this.CreateSessionId = options?.CreateSessionId ?? new NodeId()
    this.CreateClientName = options?.CreateClientName ?? ''
    this.InvocationCreationTime = options?.InvocationCreationTime ?? new Date()
    this.LastTransitionTime = options?.LastTransitionTime ?? new Date()
    this.LastMethodCall = options?.LastMethodCall ?? ''
    this.LastMethodSessionId = options?.LastMethodSessionId ?? new NodeId()
    this.LastMethodInputArguments = options?.LastMethodInputArguments ?? null
    this.LastMethodOutputArguments = options?.LastMethodOutputArguments ?? null
    this.LastMethodInputValues = options?.LastMethodInputValues ?? null
    this.LastMethodOutputValues = options?.LastMethodOutputValues ?? null
    this.LastMethodCallTime = options?.LastMethodCallTime ?? new Date()
    this.LastMethodReturnStatus =
      options?.LastMethodReturnStatus ?? new StatusResult()
  }
}

export class Annotation {
  @Type('string')
  public Message: string
  @Type('string')
  public UserName: string
  @Type('Date')
  public AnnotationTime: Date

  constructor(options?: {
    Message?: string
    UserName?: string
    AnnotationTime?: Date
  }) {
    this.Message = options?.Message ?? ''
    this.UserName = options?.UserName ?? ''
    this.AnnotationTime = options?.AnnotationTime ?? new Date()
  }
}
