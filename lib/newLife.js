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
    // randomizeLife(arr)
    makeBlock(arr, 5, 47, 5, 47)
    // makeBlock(arr, 5, 7, 25, 27)
    // makeBlock(arr, 12, 14, 13, 15)
    // makeBlock(arr, 12, 14, 35, 37)
    // makeBlock(arr, 25, 27, 2, 4)
    // makeBlock(arr, 25, 27, 30, 32)
    // makeBlock(arr, 37, 39, 20, 22)
    // makeBlock(arr, 37, 39, 41, 43)


    return arr
  }
  else return arr
}

const makeBlock = (arr, a, b, c, d) => {
  for (let i = a; i < b; i++) {
    for (let j = c; j < d; j++) {
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
export const newLife = (last, next, rules, raf, gen, eonPos) => {
  if ((rules === '2') && eonPos.length) {
    eonMove(last, eonPos)
  }
  eonPos = eonPos ? eonPos : [] 
  let eonTemp = []

  for (let x = 0; x < last.length; x++) {
    for (let y = 0; y < last.length; y++) {
      lifeOrDeath(last[x][y], next[x][y],
        findSur(x, y, last).reduce((a, c) => a + c.alive, 0)
      )
      ageNColor(last[x][y], next[x][y])
      if (rules) applyRules(rules, next[x][y], last[x][y], eonPos, eonTemp)
    }
  }
  if ((rules === '2') && (eonTemp.length || eonPos.length)) {
    if (eonPos.length) {
      eonPos = eonPos.filter((e) => {return e.num === e.form.length})
      // if life form has lost part of self ... do something to remnants?
    } // returns life forms that still have all of it's members
    if (eonTemp.length) id(next, eonTemp)
    eonPos = eonSort(eonTemp, eonPos, next.length)
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
const ageNColor = (last, next) => {
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
  next.id = next.alive ? last.id : 0
  next.era > 0
    ? next.color = colors1[next.age]
    : next.color = colors0[next.age]
}

const applyRules = (rules, next, last, eonPos, eonTemp) => {
  if ((rules === '1') && next.era && (next.era % 5 === 0) && !next.age) { // does this need to be more stringent
    next.alive = 2 // attempt at giving life after long survival
  }
  if ((rules === '2') && ((next.eon > 1) || next.id)) {
    let boo = false
    loop1:
      for (let i = 0; i < eonPos.length; i++) {
        for (let j = 0; j < eonPos[i].form.length; j++) {
          if (eonPos[i].form[j].key[0] === next.key[0]
           && eonPos[i].form[j].key[1] === next.key[1]) {
            boo = true
            eonPos[i].form[j] = {...next}
            eonPos[i].num++
            break loop1
          }
        }
      } 
      // if not already in eonPos, push into eonTemp
    if (!boo) eonTemp.push({...next})
  }
}

// life forms can have the same id as another, do I care?
// does ^^^ break a lifeForms ability to live on?
// does it need to be edited to account for colliding life forms?
const id = (next, eonTemp) => {
  for (let i = 0; i < eonTemp.length; i++) {

    let [x, y] = eonTemp[i].key
    let sur = findSur(x, y, next)

    for (let j = 0; j < sur.length; j++) {
      if (sur[j].id) {                        // if surround had id
        next[x][y].id = sur[j].id             // so to does current
        eonTemp[i].id = sur[j].id             // do I need both?
      } 
      else if (sur[j].eon > 0 && sur[j].eon < 2) {   // if surround is eon 1 but not yet 2
        let [r, c] = sur[j].key
        next[r][c].id = Math.floor(Math.random() * 100) // give it an id
        // next[r][c].eon = 2 // upgrade age because is a part of a life form?
        eonTemp.push(next[r][c])
        id(next, eonTemp)                     // recursion to collect all of the life form
      }
    }
    if (!next[x][y].id) {                     // no surrounding id, give me id
      next[x][y].id = Math.floor(Math.random() * 100)
      eonTemp[i].id = next[x][y].id
    }
  }
}

// according to size, determine velocity
const eonSort = (eonTemp, eonPos, max) => { // has to be a cleaner way to do all this
  if (eonTemp.length) eonTemp = eonDir(eonTemp, [])
  if (eonPos.length) eonTemp.push(...eonPos)
  let tR, lC, bR, rC, x, y, dir

  for (let i = 0; i < eonTemp.length; i++) { // still breaking at the edges?
    for (let j = 0; j < eonTemp[i].form.length; j++) {
      [x, y] = eonTemp[i].form[j].key
  
      tR = x - 1 < 0 ? (max - 1) : x - 1
      bR = (x + 1 === max) ? 0 : x + 1
      lC = y - 1 < 0 ? (max - 1) : y - 1
      rC = (y + 1 === max) ? 0 : y + 1
      
      dir = [
        [tR, lC], [tR, y], [tR, rC],
        [x, lC], [x, rC],
        [bR, lC], [bR, y], [bR, rC]
      ]
      eonTemp[i].form[j].dir = dir[eonTemp[i].dir]
    }
  }
  // eonPos.length ? eonPos.push(...eonTemp) : eonPos = eonTemp
  return eonTemp
}

const eonDir = (eonPos, arr) => {
  eonPos.sort((a, b) => {return a.id - b.id})
  let num = Math.floor(Math.random() * 7)
  let temp = {dir: num, form: [eonPos[0]], num: 0}
  for (let i = 1; i < eonPos.length; i++) {
    if (eonPos[i].id === eonPos[i - 1].id) {
      temp.form.push(eonPos[i])
    } else {
      arr.push(temp)
      num = Math.floor(Math.random() * 7)
      temp = {dir: num, form: [eonPos[i]], num: 0}
    }
  }
  arr.push(temp)
  return arr
}

const eonMove = (next, eonPos) => {
  resetLast(next, eonPos)                     // reset all cells of life forms to be moved
  for (let i = 0; i < eonPos.length; i++) {   // place all copies of the moving life forms in their new place
    for (let j = 0; j < eonPos[i].form.length; j++) {
      let [X, Y] = eonPos[i].form[j].dir
      eonPos[i].form[j].key = [X, Y]
      next[X][Y] = {...eonPos[i].form[j]}
      eonPos[i].num = 0
      // next[X][Y].id = 0                 // I don't feel like I should have to do this
    }
  }
  return next // needed?
}

const resetLast = (next, eonPos) => {
  for (let i = 0; i < eonPos.length; i++) {
    for (let j = 0; j < eonPos[i].form.length; j++) {
      let [x, y] = eonPos[i].form[j].key
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
}