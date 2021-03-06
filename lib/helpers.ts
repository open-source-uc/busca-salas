export function unsplash(str: TemplateStringsArray) {
  return `https://source.unsplash.com/${str[0]}/400x300`
}

type Mapper<V, R> = (key: string, value: V) => R

export function objMap<V, R>(obj: Record<string, V>, fn: Mapper<V, R>): R[] {
  return Object.entries(obj).map(([k, v]) => fn(k, v))
}
