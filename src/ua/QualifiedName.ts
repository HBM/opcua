import { Type } from './generated'
import { uint16 } from '../types'

export default class QualifiedName {
  @Type('uint16')
  public NamespaceIndex: uint16

  @Type('string')
  public Name: string

  constructor(options?: { NamespaceIndex?: uint16; Name?: string }) {
    this.NamespaceIndex = options?.NamespaceIndex ?? 0
    this.Name = options?.Name ?? ''
  }
}
