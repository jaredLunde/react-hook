import {lru} from './lru'

describe('lru()', () => {
  it('should write element', () => {
    const cache = lru(3)

    cache.write('foo', 'bar')
    expect(cache.size).toBe(1)
    expect(cache.head.key).toBe('foo')
    expect(cache.head.next.key).toBe('foo')
    expect(cache.head.prev.key).toBe('foo')
  })

  it('should write new elements to the head', () => {
    const cache = lru<string>(3)
    cache.write('foo', 'bar')
    expect(cache.size).toBe(1)

    cache.write('bar', 'baz')
    expect(cache.size).toBe(2)
    expect(cache.head.key).toBe('bar')
    expect(cache.head.next.key).toBe('foo')
    expect(cache.head.prev.key).toBe('foo')

    cache.write('baz', 'boz')
    expect(cache.size).toBe(3)
    expect(cache.head.key).toBe('baz')
    expect(cache.head.next.key).toBe('bar')
    expect(cache.head.next.next.key).toBe('foo')
    expect(cache.head.next.prev.key).toBe('baz')
    expect(cache.head.prev.key).toBe('foo')
    expect(cache.head.prev.next.key).toBe('baz')
    expect(cache.head.prev.prev.key).toBe('bar')
  })

  it('should overwrite elements and move them to the head', () => {
    const cache = lru<string>(3)
    cache.write('baz', 'buz')
    cache.write('foo', 'bar')
    cache.write('bar', 'baz')

    cache.write('baz', 'boz')
    expect(cache.size).toBe(3)
    expect(cache.head.key).toBe('baz')
    expect(cache.head.next.key).toBe('bar')
    expect(cache.head.next.next.key).toBe('foo')
    expect(cache.head.next.prev.key).toBe('baz')
    expect(cache.head.prev.key).toBe('foo')
    expect(cache.head.prev.next.key).toBe('baz')
    expect(cache.head.prev.prev.key).toBe('bar')
  })

  it('should read element by key', () => {
    const cache = lru(3)

    cache.write('foo', 'bar')
    expect(cache.size).toBe(1)
    expect(cache.read('foo')).toBe('bar')
  })

  it('should move element to head when read is called', () => {
    const cache = lru(3)

    cache.write('foo', 'bar')
    cache.write('bar', 'baz')
    cache.write('baz', 'boz')
    expect(cache.head.key).toBe('baz')

    cache.read('foo')
    expect(cache.head.key).toBe('foo')
    expect(cache.head.next.key).toBe('baz')
    expect(cache.head.prev.key).toBe('bar')
    expect(cache.head.prev.next.key).toBe('foo')
    expect(cache.head.next.prev.key).toBe('foo')
  })

  it('should return undefined if key is not found', () => {
    const cache = lru(3)
    expect(cache.read('bar')).toBe(undefined)

    cache.write('foo', 'bar')
    expect(cache.read('bar')).toBe(undefined)

    cache.write('baz', 'boz')
    expect(cache.read('bar')).toBe(undefined)

    cache.write('boz', 'buz')
    expect(cache.read('bar')).toBe(undefined)
  })

  it('should find in fwd pointer', () => {
    const cache = lru(5)

    cache.write('0', 0)
    cache.write('1', 1)
    cache.write('2', 2)
    cache.write('3', 3)
    cache.write('4', 4)

    expect(cache.read('3')).toBe(3)
    expect(cache.read('2')).toBe(2)
  })

  it('should find in middle element', () => {
    const cache = lru(5)

    cache.write('0', 0)
    cache.write('1', 1)
    cache.write('2', 2)
    cache.write('3', 3)
    cache.write('4', 4)

    expect(cache.read('2')).toBe(2)
  })

  it('should find in bwd pointer', () => {
    const cache = lru(6)

    cache.write('0', 0)
    cache.write('1', 1)
    cache.write('2', 2)
    cache.write('3', 3)
    cache.write('4', 4)
    cache.write('5', 5)

    expect(cache.read('2')).toBe(2)
  })

  it('should respect cache size', () => {
    const cache = lru(2)

    cache.write('foo', 'bar')
    expect(cache.size).toBe(1)

    cache.write('bar', 'baz')
    expect(cache.size).toBe(2)

    cache.write('baz', 'boz')
    expect(cache.size).toBe(2)
    expect(cache.read('foo')).toBe(undefined)
    expect(cache.head.key).toBe('baz')
    expect(cache.head.next.key).toBe('bar')
    expect(cache.head.prev.key).toBe('bar')
    expect(cache.head.next.next.key).toBe('baz')
    expect(cache.head.prev.prev.key).toBe('baz')
  })

  it('should pop last element', () => {
    const cache = lru<string, string>(Infinity)
    cache.write('foo', 'bar')
    cache.write('bar', 'baz')

    const foo = cache.pop()
    expect(foo).toBe('bar')
    expect(cache.size).toBe(1)

    const bar = cache.pop()
    expect(bar).toBe('baz')
    expect(cache.size).toBe(0)
  })

  it('should delete by key', () => {
    const cache = lru<string, string>(Infinity)
    cache.write('foo', 'bar')
    cache.write('bar', 'baz')
    cache.write('baz', 'boz')

    const foo = cache.delete('foo')
    expect(foo).toBe('bar')
    expect(cache.size).toBe(2)
  })

  it('should not delete keys that do not exist', () => {
    const cache = lru<string, string>(Infinity)
    cache.write('foo', 'bar')

    const foo = cache.delete('bar')
    expect(foo).toBeUndefined()
    expect(cache.size).toBe(1)
  })

  it('should not pop when the size is 0', () => {
    const cache = lru<string, string>(Infinity)
    const foo = cache.pop()
    expect(foo).toBeUndefined()
    expect(cache.size).toBe(0)
  })

  it('should iterate the cache', () => {
    const cache = lru<string, string>(Infinity)
    cache.write('foo', 'bar')
    cache.write('bar', 'baz')
    cache.write('baz', 'boz')

    const results: string[] = []
    cache.forEach((value) => results.push(value))
    expect(results).toEqual(['baz', 'bar', 'foo'])
  })
})
