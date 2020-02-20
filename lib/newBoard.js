// '#00001a', '#000033', '#00004d', '#000066', '#000080', 1-5

const colors0 = [
  '#000000',  '#000099', '#0000b3', '#0000cc', '#0000e6',
  '#0000ff', '#1a1aff', '#3333ff', '#4d4dff', '#6666ff',
  '#8080ff', '#9999ff', '#b3b3ff', '#ccccff', '#e6e6ff', '#ffffff'
]

const colors1 = [
  '#f2e6ff', '#e6ccff', '#d9b3ff', '#cc99ff', '#bf80ff', '#b366ff', '#a64dff',
  '#9933ff', // middle
  '#a64dff', '#b366ff', '#bf80ff', '#cc99ff', '#d9b3ff', '#e6ccff', '#f2e6ff',
  '#ffffff' // last is 
]

export const createBoard = (xy, boo) => {
  let arr = []
  
  for (let i = 0; i < xy; i++) {
    let temp = []
    for (let j = 0; j < xy; j++) {
      temp.push({
        alive: 0,
        color: colors0[0],
        key: `${i} ${j}`,
        age: 0,
        era: 0,
        eon: 0,
        eonId: 0
      })
    }
    arr.push(temp)
  }
  if (boo) return randomizeBoard(arr)
  else return arr
}

export const randomizeBoard = arr => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      // if (i === 1 && j === 2) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      // else if (i === 2 && j === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      // else if (i === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      arr[i][j].alive = Math.random() > 0.85
      arr[i][j].color = colors0[arr[i][j].age]
      arr[i][j].age = arr[i][j].alive ? 1 : 0
    }
  }
  return arr
}

// consider just rotating between 2 boards, maybe more performant?
// also refactor how args are handed down !!!
// and fix var names (everywhere)
export const newBoard = (arr, rules) => {
  let eonPos = []
  let newArr = []

  for (let x = 0; x < arr.length; x++) {
    let row = []
    for (let y = 0; y < arr.length; y++) {
      let cell = arr[x][y]

      let sur = countSurrounds(x, y, arr)
      let alive = lifeOrDeath(sur, cell)
      let {age, era, eon, color, li} = colorNAge(alive, cell, 0, 0, 0, rules)
      if ((eon > 1) && (rules === '2')) eonPos.push({xy: cell.key, id: cell.eonId})

      row.push({alive: li, color, key: `${x} ${y}`, age, era, eon, eonId: cell.eonId})
    }
    newArr.push(row)
  }
  if ((rules === '2') && eonPos.length) eonId(newArr, eonPos)

  return {newArr, eonPos}
}

const countSurrounds = (x, y, arr) => {
  let sur = findSur(x, y, arr)
  let tot = 0
  for (let i = 0; i < sur.length; i++) {
    tot += sur[i].alive
  }

  return tot
}

const findSur = (x, y, arr) => {
  let max = arr.length

  let tR = x - 1 < 0 ? (max - 1) : x -1
  let bR = (x + 1 === max) ? 0 : x + 1
  let lC = y - 1 < 0 ? (max - 1) : y - 1
  let rC = (y + 1 === max) ? 0 : y + 1

  return [
    arr[tR][lC], arr[tR][y], arr[tR][rC],
    arr[x][lC], arr[x][rC],
    arr[bR][lC], arr[bR][y], arr[bR][rC]
  ]
}

const lifeOrDeath = (sur, cell) => {
  let alive = 0

  if (cell.alive) {
    if (sur < 2 || sur > 3) alive = 0
    else alive = 1
  } 
  if (!cell.alive) {
    if (sur === 3) alive = 1
    else alive = 0
  }
  return alive
}


const colorNAge = (alive, cell, age, era, eon, rules) => {
 // eon = 5 era = 80 age/gen ... for now
  if (alive > 0) {
    if (cell.age < colors0.length - 1) {
      (age = cell.age + 1) && (era = cell.era)
    } else if (cell.age === colors0.length - 1) {
      era = cell.era + 1
    }
    // Era above, Eon below
    if ((era > 0) && (era % 5 === 0) && age === 0) {
      eon = cell.eon + 1
      if (rules === '1') alive = 2 // attempt at giving life after long survival
    } else {
      eon = cell.eon
    }
  }
  let color = era > 0
    ? colors1[age]
    : colors0[age]

  let li = alive
  return {age, era, eon, color, li}
}


// sometimes does not find all particles of the same form ... fix
// life forms can have the same id as another, do I care?
const eonId = (newArr, eonPos) => {
  // if rules'2' and newArr contains particle that has reached 2 eons
  for (let i = 0; i < eonPos.length; i++) {
    if (!eonPos[i].id){
      // let eonId = 0
      let xy = eonPos[i].xy.split(' ').map(Number) // eww
      let cellId = newArr[xy[0]][xy[1]].eonId // hmmm *
      let sur = findSur(xy[0], xy[1], newArr)
      for (let j = 0; j < sur.length; j++) {
        if (sur[j].eonId && !cellId) {
          cellId = sur[j].eonId
          eonPos[i].id = sur[j].eonId
        }
      }
      if (!cellId) {
        cellId = Math.floor(Math.random() * 100) // if this id is not already in use?
        eonPos[i].id = cellId
      }
      newArr[xy[0]][xy[1]].eonId = cellId // hmmm *
    }
    eonPos.sort((a, b) => {return a.id - b.id})
  }
}