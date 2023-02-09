import { customAlphabet } from 'nanoid'

/**
 * @param {number} digits
 * @returns {number}
 */
export const genRandomNumber = digits => +customAlphabet('0123456789')(digits)

export const genGameData = () => {
    return {
        roomId: genRandomNumber(8),
        gameData: {
            /** @type {null[]} */
            cells: Array(9).fill(null),
            playersCount: 0,
            playerTurn: (genRandomNumber(1) % 2) + 1,
            winner: null,
            /** @type {[]} */
            winningCells: [],
            /** @type {[]} */
            players: [],
            winningType: null,
            gameStatus: 'waiting-for-opponent',
            playerRestarting: null,
        },
    }
}

/**
 * @param {any[]} arr
 * @param {number} batchLength
 * @returns {any[][]}
 */
export const batchesOf = (arr, batchLength) => {
    return arr.reduce(
        (acc, item) => {
            if (acc[acc.length - 1].length === batchLength) acc.push([item])
            else acc[acc.length - 1].push(item)

            return acc
        },
        [[]]
    )
}
