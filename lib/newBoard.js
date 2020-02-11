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
  editFirstGen(arr)
  return arr
}

const editFirstGen = (arr) => {
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (i === 1 && j === 2) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      else if (i === 2 && j === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      else if (i === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
    }
  }
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
  let surArr = createSurArr(x, y, arr)
  let surrounds = surArr.filter(s => {return s.alive}).length
  return lifeOrDeath(x, y, surrounds, arr)
}

const createSurArr = (x, y, arr) => { // find a better way
  let max = arr.length - 1
  if (x < 1 && y < 1) return [arr[x][y + 1], arr[x + 1][y], arr[x + 1][y + 1]] // tLC
  else if (x < 1 && y < max) {
    return [arr[x][y - 1], arr[x][y + 1], arr[x + 1][y - 1], arr[x + 1][y], arr[x + 1][y + 1]] // top
  } else if (x < 1 && y === max) {
    return [arr[x][y - 1], arr[x + 1][y - 1], arr[x + 1][y]] // tRC
  } else if ((x > 0 && x < max) && y < 1) {
    return [arr[x - 1][y], arr[x - 1][y + 1], arr[x][y + 1], arr[x + 1][y], arr[x + 1][y + 1]] // lft
  } else if ((x > 0 && x < max) && y === max) {
    return [arr[x - 1][y - 1], arr[x - 1][y], arr[x][y - 1], arr[x + 1][y - 1], arr[x + 1][y]] // rgt
  } else if (x === max && y < 1) {
    return [arr[x - 1][y], arr[x - 1][y + 1], arr[x][y + 1]] // bLC
  } else if (x === max && y < max) {
    return [arr[x - 1][y - 1], arr[x - 1][y], arr[x - 1][y + 1], arr[x][y - 1], arr[x][y + 1]] // btm
  } else if (x === max && y === max) {
    return [arr[x - 1][y - 1], arr[x - 1][y], arr[x][y - 1]] // bRC
  } else {
    return [ // not edge or corner 
      arr[x - 1][y - 1], arr[x - 1][y], arr[x - 1][y + 1],
      arr[x][y - 1], arr[x][y + 1],
      arr[x + 1][y - 1], arr[x + 1][y], arr[x + 1][y + 1]
    ]
  }
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
