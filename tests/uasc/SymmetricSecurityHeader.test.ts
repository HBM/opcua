import run from '../ua/run'
import SymmetricSecurityHeader from '../../dist/uasc/SymmetricSecurityHeader'

describe('SymmetricSecurityHeader', () => {
  run([
    {
      name: 'normal',
      instance: new SymmetricSecurityHeader({
        TokenId: 0x11223344
      }),
      bytes: new Uint8Array([0x44, 0x33, 0x22, 0x11])
    }
  ])
})
