export const getDateTime = (dv: DataView, offset: number): Date => {
  const value = dv.getBigInt64(offset, true)
  const d = new Date(Number(value - BigInt(116444736000000000)) / 1e4)
  return new Date(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
    d.getUTCMilliseconds()
  )
}
