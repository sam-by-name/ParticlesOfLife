// number of still life formations
// coOrds of newest
// coOrds of oldest

export const statsChecker = arr => {
  let {newArr, eonPos, gen} = arr
  let numBorn = 0
  let numEra = 0
  let numEon = 0
  gen = gen || 0
  // let posNew = []
  // let posOld = []
  // let eonPos = []
  gen++

  for (let x = 0; x < newArr.length; x++) {
    for (let y = 0; y < newArr.length; y++) {
      let cell = newArr[x][y]
      if ((cell.age === 1) && !cell.era) numBorn++ 
      if (cell.era && !cell.eon) numEra++
      if (cell.eon) {
        numEon++
        // if (cell.eon > 1) eonPos.push({xy: cell.key, id: cell.eonId})
      }
    }
  }
  // if (eonPos.length) eonPos.sort((a, b) => {return a.id - b.id})
  return {numBorn, numEra, numEon, eonPos, gen} //, eonPos}
}