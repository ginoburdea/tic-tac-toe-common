import { customAlphabet } from 'nanoid'

/**
 * @param {number} digits
 * @returns {number}
 */
export const genRandomNumber = digits => +customAlphabet('0123456789')(digits)
