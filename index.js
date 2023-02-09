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

/**
 * @param {(number|null)[]} cells
 * @param {number} playerId
 */
export const getWinningInfo = (cells, playerId) => {
    const turnIntoValueAndIndex = (cellValue, originalIndex) => ({
        cellValue,
        originalIndex,
    })
    const returnOriginalIndexes = ({ originalIndex }) => originalIndex
    const cellValuesEqualPlayerId = ({ cellValue }) => cellValue === playerId

    const horizontalRows = batchesOf(cells.map(turnIntoValueAndIndex), 3)
    for (const row of horizontalRows) {
        if (row.every(cellValuesEqualPlayerId))
            return {
                winningCells: row.map(returnOriginalIndexes),
                winningType: 'horizontal',
            }
    }

    for (let i = 3 - 1; i >= 0; i--) {
        const verticalRow = cells
            .map(turnIntoValueAndIndex)
            .filter(({ originalIndex }) => originalIndex % 3 === i)

        if (verticalRow.every(cellValuesEqualPlayerId))
            return {
                winningCells: verticalRow.map(returnOriginalIndexes),
                winningType: 'vertical',
            }
    }

    const majorDiagonalRow = []
    for (let i = 0; i < 3; i++) {
        const index = i * 3 + i

        majorDiagonalRow.push({
            cellValue: cells[index],
            originalIndex: index,
        })
    }

    if (majorDiagonalRow.every(cellValuesEqualPlayerId)) {
        return {
            winningCells: majorDiagonalRow.map(returnOriginalIndexes),
            winningType: 'majorDiagonal',
        }
    }

    const minorDiagonalRow = []
    for (let i = 1; i <= 3; i++) {
        const index = i * 3 - i

        minorDiagonalRow.push({
            cellValue: cells[index],
            originalIndex: index,
        })
    }

    if (minorDiagonalRow.every(cellValuesEqualPlayerId)) {
        return {
            winningCells: minorDiagonalRow.map(returnOriginalIndexes),
            winningType: 'minorDiagonal',
        }
    }

    if (cells.filter(cell => cell).length === 9) {
        return {
            /** @type {[]} */
            winningCells: [],
            winningType: 'tie',
        }
    }

    return {
        /** @type {[]} */
        winningCells: [],
        /** @type {null} */
        winningType: null,
    }
}
