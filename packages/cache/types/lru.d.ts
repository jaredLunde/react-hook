export declare const lru: <Key = string, Value = any>(
  maxSize: number
) => LRUCache<Key, Value>
export declare type LRUCache<Key = string, Value = any> = {
  head: LRUNode<Key, Value> | undefined
  size: number
  insertHead(node: LRUNode<Key, Value>): void
  forEach(fn: (key: Key, value: Value) => void): void
  search(key: Key): LRUNode<Key, Value>
  read(key: Key): Value
  write(key: Key, value: Value): Value
  deleteNode(node: LRUNode<Key, Value>): void
  delete(key: Key): Value
  pop(): Value | undefined
}
declare type LRUNode<Key = string, Value = any> = {
  next: LRUNode<Key, Value>
  prev: LRUNode<Key, Value>
  key: Key
  value: Value
}
export {}
