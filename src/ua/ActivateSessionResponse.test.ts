import { ActivateSessionResponse } from './generated'
import run from './run'
import {
  NewNullResponseHeader,
  NullResponseHeaderBytes
} from './ResponseHeader.test'

describe('ActivateSessionResponse', () => {
  run([
    {
      name: 'nothing',
      instance: new ActivateSessionResponse({
        ResponseHeader: NewNullResponseHeader()
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        ...NullResponseHeaderBytes,
					0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
					0xff, 0xff, 0xff, 0xff,
      ])
    },
    {
      name: 'with nonce',
      instance: new ActivateSessionResponse({
        ResponseHeader: NewNullResponseHeader(),
        ServerNonce: new Uint8Array([0xde, 0xad, 0xbe, 0xef])
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        ...NullResponseHeaderBytes,
					0x04, 0x00, 0x00, 0x00, 0xde, 0xad, 0xbe, 0xef,
					0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      ])
    }
  ])
})
