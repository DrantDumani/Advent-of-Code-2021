const fs = require('fs')
const raw = fs.readFileSync("bingoBoards.txt", "utf8")

let data = raw.replace(/\r/g, "").split(/\n{1,2}/g)

const nums = data[0].split(',')
const rawBoardData = data.slice(1)


function boardBuilder(input, size = 5){
  const boards = []
  for (let i = 0; i < input.length; i += 5){
    const board = []
    for (let j = i; j < i+5; j++){
      board.push(input[j].trim().split(/\s{1,}/))
    }
    boards.push(board)
  }
  return boards
}

const boards = boardBuilder(rawBoardData)

function loseBingo(nums, boards){
  for (let i = 0; i < nums.length; i++){
    let num = nums[i]
    let remaining = boards
    for (let b = 0; b < boards.length; b++){
      let indices = findNum(num, boards[b], i)
      if (i >= 5 && indices){
        if (checkColVictory(boards[b], indices) || checkRowVictory(boards[b], indices)){
          if (boards.length > 1){
            let winner = boards[b]
            remaining = remaining.filter(board => board !== winner)
          }
          else {
            let loser = boards[b].flat(Infinity).reduce((acc, el) => el !== "m" ? acc + Number(el) : acc, 0) * num
            return loser
          }
        }
      }
    }
    boards = remaining
  }
  return boards
}

function checkRowVictory(board, indices){
  let [row, col] = indices
  for (let c = 0; c < 5; c++){
    if (c === col) continue
    if (board[row][c] !== "m") return false
  }
  return true
}

function checkColVictory(board, indices){
  let [row, col] = indices
  for (let r = 0; r < 5; r++){
    if (r === row) continue
    if (board[r][col] !== "m") return false
  }
  return true
}

function findNum(num, board){
  for (let i = 0; i < 5; i++){
    for (let j = 0; j < 5; j++){
      if (board[i][j] === num) {
        board[i][j] = "m"
        return [i,j]
      }
    }
  }
  return false
}

console.log(loseBingo(nums,boards))