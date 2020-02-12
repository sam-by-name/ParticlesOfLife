export const createBoard = (xy) => {
  let arr = []
  
  for (let i = 0; i < xy; i++) {
    let temp = []
    for (let j = 0; j < xy; j++) {
      temp.push({
        alive: 0,
        color: 'black',
        key: `${i}${j}`
      })
    }
    arr.push(temp)
  }
  arr = randomizeGen(arr)
  return arr
}

export const randomizeGen = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      // if (i === 1 && j === 2) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      // else if (i === 2 && j === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      // else if (i === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      arr[i][j].alive = Math.random() > 0.85
      arr[i][j].color = arr[i][j].alive ? 'white' : 'black'
    }
  }
  return arr
}


export const newBoard = (arr) => {
  let newArr = []
  for (let x = 0; x < arr.length; x++) {
    let row = []
    for (let y = 0; y < arr.length; y++) {
      row.push(countSurrounds(x, y, arr))
    }
    newArr.push(row)
  }
  return newArr
}

const countSurrounds = (x, y, arr) => {
  let surrounds = findSur(x, y, arr)
  return lifeOrDeath(x, y, surrounds, arr)
}

const findSur = (x, y, arr) => {
  let max = arr.length

  let tR = x - 1 < 0 ? (max - 1) : x -1
  let bR = (x + 1 === max) ? 0 : x + 1
  let lC = y - 1 < 0 ? (max - 1) : y - 1
  let rC = (y + 1 === max) ? 0 : y + 1

  return [
    arr[tR][lC].alive, arr[tR][y].alive, arr[tR][rC].alive,
    arr[x][lC].alive, arr[x][rC].alive,
    arr[bR][lC].alive, arr[bR][y].alive, arr[bR][rC].alive
  ].reduce((acc, cur) => acc + cur)
}

const lifeOrDeath = (x, y, surrounds, arr) => {
  let cell = arr[x][y].alive
  let alive = 0
  if (cell) {
    if (surrounds < 2 || surrounds > 3) alive = 0
    else alive = 1
  } 
  if (!cell) {
    if (surrounds === 3) alive = 1
    else alive = 0
  }
  return {alive: alive, color: alive ? 'white' : 'black', key: `${x}${y}`}
}
