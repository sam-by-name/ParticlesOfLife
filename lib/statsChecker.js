// number of still life formations
// coOrds of newest
// coOrds of oldest

export const statsChecker = obj => {
  let {lifeA, eonPos, gen} = obj
  let numBorn = 0
  let numEra = 0
  let numEon = 0
  gen = gen || 0
  gen++

  for (let x = 0; x < lifeA.length; x++) {
    for (let y = 0; y < lifeA.length; y++) {
      let cell = lifeA[x][y]
      if ((cell.age === 1) && !cell.era) numBorn++ 
      if (cell.era && !cell.eon) numEra++
      if (cell.eon) numEon++
    }
  }
  return {numBorn, numEra, numEon, eonPos, gen}
}