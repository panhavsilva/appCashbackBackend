export function unsafe <T> (value:unknown): T {
  return value as any
}
