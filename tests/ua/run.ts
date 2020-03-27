import { encode } from '../../dist/ua/encode'
import decode from '../../dist/ua/decode'
import factory from '../../dist/ua/factory'

interface Case {
  name: string
  instance: unknown
  bytes: Uint8Array
}

const run = (cases: Case[]): void => {
  for (const c of cases) {
    describe(c.name, () => {
      test('encode', () => {
        const result = new Uint8Array(encode({ instance: c.instance }))
        for (let index = 0; index < c.bytes.byteLength; index++) {
          expect(result[index]).toBe(c.bytes[index])
        }
      })

      test('decode', () => {
        const name = (c.instance as object).constructor.name
        const instance = factory(name)
        decode({
          bytes: c.bytes.buffer,
          instance,
        })
        expect(instance).toEqual(c.instance)
      })
    })
  }
}

export default run
