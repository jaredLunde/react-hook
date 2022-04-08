export const lru = <Key = string, Value = any>(
  maxSize: number
): LRUCache<Key, Value> => ({
  head: undefined,
  size: 0,

  forEach(fn) {
    if (this.size === 0 || !this.head) return
    fn(this.head.key, this.head.value)
    let node: LRUNode<Key, Value> = this.head.next

    while (node !== this.head) {
      fn(node.key, node.value)
      node = node.next
    }
  },

  search(key) {
    // Bail out if there aren't any elements
    if (this.size === 0 || !this.head) return
    // Loop-free bail out if the key matches the head
    if (this.head.key === key) return this.head
    //  Loop-free bail out if the key matches the tail
    if (this.head.prev.key === key) return this.head.prev

    let fwdPtr: LRUNode<Key, Value> = this.head.next
    let bwdPtr: LRUNode<Key, Value> = this.head.prev.prev
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (fwdPtr.key === key) {
        return fwdPtr
      } else if (bwdPtr.key === key) {
        return bwdPtr
      }
      // We've met in the middle so bail
      if (fwdPtr === bwdPtr || fwdPtr.next === bwdPtr) return

      fwdPtr = fwdPtr.next
      bwdPtr = bwdPtr.prev
    }
  },

  read(key) {
    const node = this.search(key)

    if (!node) return
    // Each time we read we move the node that was found to the head of the list
    this._insertHead(node)

    return node.value
  },

  write(key, value) {
    // Searches for existing node
    const node = this.search(key)

    if (!node) {
      // Creates a new node if none was found
      const newNode = {next: this.head, prev: this.head?.prev, key, value}
      // Writes new nodes to the head
      this._insertHead(newNode as LRUNode<Key, Value>)
      this.size++
    } else {
      // Moves existing node to head and updates value
      node.value = value
      this._insertHead(node)
    }

    // Removes the last element in the list if our max size is exceeded
    if (this.size > maxSize) this.pop()
    return value
  },

  delete(key) {
    const node = this.search(key)
    if (!node) return
    this._deleteNode(node)
    return node.value
  },

  pop() {
    const node = this.head?.prev
    if (!node) return
    this._deleteNode(node)
    return node.value
  },

  _insertHead(node) {
    if (!this.head) {
      // Creates a new head
      this.head = node
      node.next = node
      node.prev = node
    } else if (this.head !== node) {
      // Changes head to current node
      node.prev.next = node.next
      node.next.prev = node.prev
      node.next = this.head
      node.prev = this.head.prev
      this.head.prev.next = node
      this.head.prev = node
      this.head = node
    }
  },

  _deleteNode(node) {
    if (this.size === 1) {
      this.head = undefined
    } else {
      if (node === this.head) {
        this.head = node.prev
      }
      node.prev.next = node.next
      node.next.prev = node.prev
    }

    this.size--
  },
})

export type LRUCache<Key = string, Value = any> = {
  head: LRUNode<Key, Value> | undefined
  size: number
  forEach(fn: (key: Key, value: Value) => void): void
  search(key: Key): LRUNode<Key, Value> | undefined
  read(key: Key): Value | undefined
  write(key: Key, value: Value): Value
  delete(key: Key): Value | undefined
  pop(): Value | undefined
  _insertHead(node: LRUNode<Key, Value>): void
  _deleteNode(node: LRUNode<Key, Value>): void
}

type LRUNode<Key = string, Value = any> = {
  next: LRUNode<Key, Value>
  prev: LRUNode<Key, Value>
  key: Key
  value: Value
}
