import { describe, expect, it } from 'vitest'
import { longestCommonPrefix } from '~/utils/string'

describe('string utils', () => {
  describe('longestCommonPrefix', () => {
    it('should return null if there is zero values', () => {
      expect(longestCommonPrefix([])).toBeNull()
    })

    it('should return the first item if there is  one values', () => {
      expect(longestCommonPrefix(['abc'])).toEqual('abc')
      expect(longestCommonPrefix(['356'])).toEqual('356')
    })

    it('should return the longest common prefixe', () => {
      expect(longestCommonPrefix(['abc123', 'abc456', 'abc789'])).toEqual('abc')
      expect(longestCommonPrefix(['xyz', 'xyz198'])).toEqual('xyz')
      expect(longestCommonPrefix(['abc123', 'abc456', 'ab789'])).toEqual('ab')
    })
  })
})
