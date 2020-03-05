// import {deepClone} from './deepClone'

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

export const createLife = (xy, boo) => {
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
  if (boo) return randomizeLife(arr)
  else return arr
}

const makeBlock = (arr) => {
  for (let i = 5; i < 45; i++) {
    for (let j = 5; j < 45; j++) {
      arr[i][j].alive = 1
      arr[i][j].color = colors0[1]
      arr[i][j].age = 1
    }
  }
  return arr
}

export const randomizeLife = arr => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      // if (i === 1 && j === 2) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')      // glider
      // else if (i === 2 && j === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white') // glider
      // else if (i === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')            // glider
      arr[i][j].alive = Math.random() > 0.85
      arr[i][j].color = colors0[arr[i][j].age]
      arr[i][j].age = arr[i][j].alive ? 1 : 0
    }
  }
  return arr
}

// consider just rotating between 2 boards, maybe more performant?
// and fix var names (everywhere)
export const newLife = (arr, rules, raf, gen) => {
  let eonPos = []
  let newArr = []

  for (let x = 0; x < arr.length; x++) {
    let row = []
    for (let y = 0; y < arr.length; y++) {
      let cell = arr[x][y]

      let sur = countSurrounds(x, y, arr)
      let alive = lifeOrDeath(sur, cell)
      let {age, era, eon, color, li} = colorNAge(alive, cell, 0, 0, 0, rules)
      if ((eon > 1) && (rules === '2')) eonPos.push({xy: cell.key, id: cell.eonId, eon: eon})
      let eonId = li ? cell.eonId : 0 // is there a better way?
      row.push({alive: li, color, key: `${x} ${y}`, age, era, eon, eonId})
    }
    newArr.push(row)
  }
  if ((rules === '2') && eonPos.length) {
    eonId(newArr, eonPos)
    eonPos = eonSort(eonPos, newArr.length)
    eonMove(newArr, eonPos) // should happen before board/gen edit, and not move every gen
  }

  return {newArr, eonPos, raf, gen}
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

  let tR = x - 1 < 0 ? (max - 1) : x - 1
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


// life forms can have the same id as another, do I care?
// if rules'2' and newArr contains particle that has reached 2 eons
// Find a way to improve / make more efficient
// Can I rework to remove eonId from newArr
const eonId = (newArr, eonPos) => {
  for (let i = 0; i < eonPos.length; i++) {

      let [x, y] = eonPos[i].xy.split(' ').map(Number)
      let sur = findSur(x, y, newArr)

      for (let j = 0; j < sur.length; j++) {
        if (sur[j].eonId) {
          newArr[x][y].eonId = sur[j].eonId
          eonPos[i].id = sur[j].eonId
        } 
        else if (sur[j].eon === 1) {
          let [r, c] = sur[j].key.split(' ').map(Number)
          newArr[r][c].eonId = Math.floor(Math.random() * 100)
          eonPos.push({xy: newArr[r][c].key, id: newArr[r][c].eonId, eon: newArr[r][c].eon})
          eonId(newArr, eonPos)
        }
      }
      if (!newArr[x][y].eonId) { // no surrounds, give me id
        newArr[x][y].eonId = Math.floor(Math.random() * 100)
        eonPos[i].id = newArr[x][y].eonId
      }
  }
}


const eonMove = (newArr, eonPos) => {
  // blinkers will die as of now
  for (let i = 0; i < eonPos.length; i++) {
    let [x, y] = eonPos[i].xy.split(' ').map(Number)

    let X = eonPos[i].dir[0]
    let Y = eonPos[i].dir[1]

    newArr[X][Y] = {...newArr[x][y]}
    newArr[X][Y].key = `${X} ${Y}`

    newArr[x][y] = {
      alive: 0,
      color: colors0[0],
      key: `${x} ${y}`,
      age : 0,
      era: 0,
      eon: 0,
      eonId: 0
    }

      eonPos[i].xy = `${X}${Y}`
  }
  return newArr
}

// create function to separate by id 
// then assign a direction to each formation / group
// then sort order according to direction, so as to not override parts of themselves
// according to size, determine velocity
// Then edit eonMove
const eonSort = (eonPos, max) => { // has to be a cleaner way to do all this
  let tR, lC, bR, rC
  let num = 0

  eonPos.sort((a, b) => {return a.id - b.id})
  let arr = []
  let [x, y] = eonPos[0].xy.split(' ').map(Number)
  x = x - 1 < 0 ? (max - 1) : x - 1
  y = y - 1 < 0 ? (max - 1) : y - 1
  let temp = [eonPos[0]]
  temp[0].dir = [x, y]
  
  for (let i = 1; i < eonPos.length; i++) { // still breaking at the edges?
    [x, y] = eonPos[i].xy.split(' ').map(Number)

    tR = x - 1 < 0 ? (max - 1) : x - 1
    bR = (x + 1 === max) ? 0 : x + 1
    lC = y - 1 < 0 ? (max - 1) : y - 1
    rC = (y + 1 === max) ? 0 : y + 1
    
    let dir = [
      [tR, lC], [tR, y], [tR, rC],
      [x, lC], [x, rC],
      [bR, lC], [bR, y], [bR, rC]
    ]
    if (eonPos[i].id === eonPos[i - 1].id) {
      eonPos[i].dir = dir[num] // re-use id to store direction because id no longer needed?
      temp.push(eonPos[i])
    }
    else {

      sortTemp(temp, num) // try's to sort by order needed to be moved without overwriting self

      arr.push(...temp)   // flatten
      if (num < 7) num++
      else num = 0
      eonPos[i].dir = dir[num]
      temp = [eonPos[i]]
    }
  }
  sortTemp(temp, num)
  arr.push(...temp)       // flatten
  return arr
}

const sortTemp = (temp, num) => {
  if (num < 3) temp.sort((a, b) => {return a.dir[0] - b.dir[0]})      // topRow   first to be moved
  else if (num < 4) temp.sort((a, b) => {return a.dir[1] - b.dir[1]}) // leftCol  first to move
  else if (num < 5) temp.sort((a, b) => {return b.dir[1] - a.dir[1]}) // rightCol first to move
  else temp.sort((a, b) => {return a.dir[0] + b.dir[0]})              // botRow   first to move
}