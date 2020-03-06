import {colors0, colors1} from './colors'

export const createLife = (xy, boo) => {
  let arr = []
  for (let i = 0; i < xy; i++) {
    let temp = []
    for (let j = 0; j < xy; j++) {
      temp.push({
        alive: 0,
        color: colors0[0],
        key: [i, j],
        age: 0,
        era: 0,
        eon: 0,
        id: 0
      })
    }
    arr.push(temp)
  }
  if (boo) {
    randomizeLife(arr)
    // makeBlock(arr, 5, 7)  
    return arr
  }
  else return arr
}

const makeBlock = (arr, a, b) => {
  for (let i = a; i < b; i++) {
    for (let j = a; j < b; j++) {
      arr[i][j].alive = 1
      arr[i][j].color = colors0[1]
      arr[i][j].age = 1
      arr[i][j].era = 8
      arr[i][j].eon = 1
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
      arr[i][j].alive =  Math.random() > 0.85 // (Math.random()>0.5) ? 1 : 0 
      arr[i][j].color = colors0[arr[i][j].age]
      arr[i][j].age = arr[i][j].alive ? 1 : 0
    }
  }
  return arr
}

// and fix var names (everywhere)
export const newLife = (last, next, rules, raf, gen) => {
  let eonPos = []
  for (let x = 0; x < last.length; x++) {
    for (let y = 0; y < last.length; y++) {
      lifeOrDeath(last[x][y], next[x][y],
        findSur(x, y, last).reduce((a, c) => a + c.alive, 0)
      )
      ageNColor(last[x][y], next[x][y], rules)
      if (rules) applyRules(rules, next[x][y], last[x][y], eonPos)
    }
  }
  if ((rules === '2') && eonPos.length) {
    id(next, eonPos)
    eonPos = eonSort(eonPos, next.length)
    eonMove(next, eonPos) // should happen before board/gen edit, and not move every gen
  }

  return {lifeA: next, lifeB: last, eonPos, raf, gen}
}

const findSur = (x, y, last) => {
  let max = last.length

  let tR = x - 1 < 0 ? (max - 1) : x - 1
  let bR = (x + 1 === max) ? 0 : x + 1
  let lC = y - 1 < 0 ? (max - 1) : y - 1
  let rC = (y + 1 === max) ? 0 : y + 1

  return [
    last[tR][lC], last[tR][y], last[tR][rC],
    last[x][lC], last[x][rC],
    last[bR][lC], last[bR][y], last[bR][rC]
  ]
}

const lifeOrDeath = (last, next, sur) => {
  if (last.alive) {
    if (sur < 2 || sur > 3) next.alive = 0
    else next.alive = 1
  } 
  if (!last.alive) {
    if (sur === 3) next.alive = 1
    else next.alive = 0
  }
}

//       Main functions above       //

//      Custom functions below      //

// eon = 5 era = 80 age/gen ... for now
const ageNColor = (last, next, rules) => {
  if (next.alive) {
    if (last.age < colors0.length - 1) {
      next.age = last.age + 1
      next.era = last.era
    } else {
      next.age = 0
      next.era = last.era + 1
    }
    // Era above, Eon below
    if (next.era && (next.era % 5 === 0) && !next.age) {
      next.eon = last.eon + 1
    } else {
      next.eon = last.eon
    }
  } else {
    next.age = 0
    next.era = 0
    next.eon = 0
  }
  next.era > 0
    ? next.color = colors1[next.age]
    : next.color = colors0[next.age]
}

const applyRules = (rules, next, last, eonPos) => {
  if ((rules === '1') && next.era && (next.era % 5 === 0) && !next.age) { // does this need to be more stringent
    next.alive = 2 // attempt at giving life after long survival
  }
  if ((rules === '2') && (next.eon > 1)) {
    next.id = next.alive ? last.id : 0
    eonPos.push({...next}) // {xy: next.key, id: next.id, dir: [], obj: next}
  }
}

// life forms can have the same id as another, do I care?
// if rules'2' and newArr contains particle that has reached 2 eons
// Find a way to improve / make more efficient
// Can I rework to remove id from newArr
const id = (next, eonPos) => {
  for (let i = 0; i < eonPos.length; i++) {

    let [x, y] = eonPos[i].key
    let sur = findSur(x, y, next)

    for (let j = 0; j < sur.length; j++) {
      if (sur[j].id) {                               // if surround had id
        next[x][y].id = sur[j].id                    // so to does current
        eonPos[i].id = sur[j].id                     // do I need both?
      } 
      else if (sur[j].eon > 0) {                         // if surround is eon 1 but not yet 2
        let [r, c] = sur[j].key
        next[r][c].id = Math.floor(Math.random() * 100) // give it an id
        eonPos.push(next[r][c]) // {xy: [r, c], id: next[r][c].id, eon: next[r][c].eon}
        id(next, eonPos)                                // recursion to collect all of the life form
      }
    }
    if (!next[x][y].id) { // no surrounding id, give me id
      next[x][y].id = Math.floor(Math.random() * 100)
      eonPos[i].id = next[x][y].id
    }
  }
}

const eonMove = (next, eonPos) => {
  resetLast(next, eonPos)                     // reset all cells of life forms to be moved
  for (let i = 0; i < eonPos.length; i++) {   // place all copies of the moving life forms in their new place
    let [X, Y] = eonPos[i].dir
    eonPos[i].key = [X, Y]
    next[X][Y] = eonPos[i]
    next[X][Y].id = 0 // don't feel like I should have to do this
  }
  return next
}

const resetLast = (next, eonPos) => {
  for (let i = 0; i < eonPos.length; i++) {
    let [x, y] = eonPos[i].key
    next[x][y] = {
      alive: 0,
      color: colors0[0],
      key: [x, y],
      age : 0,
      era: 0,
      eon: 0,
      id: 0
    }
  }
}

// create function to separate by id 
// then assign a direction to each formation / group
// then sort order according to direction, so as to not override parts of themselves
// according to size, determine velocity
// Then edit eonMove
const eonSort = (eonPos, max) => { // has to be a cleaner way to do all this
  let tR, lC, bR, rC
  let num = 0
  let arr = []
  eonPos.sort((a, b) => {return a.id - b.id})
  
  let [x, y] = eonPos[0].key
  x = x - 1 < 0 ? (max - 1) : x - 1
  y = y - 1 < 0 ? (max - 1) : y - 1
  let temp = [eonPos[0]]
  temp[0].dir = [x, y]
  
  for (let i = 1; i < eonPos.length; i++) { // still breaking at the edges?
    [x, y] = eonPos[i].key

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
    } else {
      arr.push(...temp)   // flatten

      num < 7 ? num++ : num = 0

      eonPos[i].dir = dir[num]
      temp = [eonPos[i]]
    }
  }
  arr.push(...temp)       // flatten

  return arr
}