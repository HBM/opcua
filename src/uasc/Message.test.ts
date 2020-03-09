// import run from '../ua/run'
// import OpenSecureChannelRequest from '../ua/OpenSecureChannelRequest'
// import RequestHeader from '../ua/RequestHeader'
// import { SecurityTokenRequestTypeIssue } from '../ua/SecurityTokenRequestType'
// import { MessageSecurityModeNone } from '../ua/MessageSecurityMode'
// import { NewTwoByteNodeId } from '../ua/NodeId'

describe('Message', () => {
  test('foo', () => {
    expect(1).toBe(1)
  })
  //   const request = new OpenSecureChannelRequest({
  //     RequestHeader: new RequestHeader({
  //       AuthenticationToken: NewTwoByteNodeId(0),
  //       Timestamp: new Date(Date.UTC(2018, 7, 10, 23, 0, 0, 0)),
  //       RequestHandle: 1,
  //       ReturnDiagnostics: 0x03ff
  //       // AdditionalHeader:    NewExtensionObject(nil),
  //     }),
  //     ClientProtocolVersion: 0,
  //     RequestType: SecurityTokenRequestTypeIssue,
  //     SecurityMode: MessageSecurityModeNone,
  //     RequestedLifetime: 6000000
  //   })

  //   run([
  //     {
  //       name: 'OPN',
  //       instance: (function() {
  //         // const s = &SecureChannel{
  //         // 	cfg: &Config{
  //         // 		SecurityPolicyURI: "http://gopcua.example/OPCUA/SecurityPolicy#Foo",
  //         // 	},
  //         // 	requestID:       1,
  //         // 	sequenceNumber:  1,
  //         // 	securityTokenID: 0,
  //         // }
  //       })(),
  //       bytes: new Uint8Array([])
  //     }
  //   ])
})
