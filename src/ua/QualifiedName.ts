import { Type } from './generated'

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
