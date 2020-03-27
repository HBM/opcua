import run from '../ua/run'
import SecureConversationMessageHeader from '../../dist/uasc/SecureConversationMessageHeader'

describe('Header', () => {
  run([
    {
      name: 'normal',
      instance: new SecureConversationMessageHeader({
        MessageType: 'OPN',
        IsFinal: 'F',
        MessageSize: 132,
        SecureChannelId: 0,
      }),
      // prettier-ignore
      bytes: new Uint8Array([
        0x4f, 0x50, 0x4e, 0x46, 0x84, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ])
    },
  ])
})
