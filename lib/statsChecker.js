// number of new cells
// number of cells that have reached era
// number of cells that have reached eon
// number of still life formations
// coOrds of newest
// coOrds of oldest

export const statsChecker = (arr) => {
  let numBorn = 0
  let numEra = 0
  let numEon = 0
  let posNew = []
  let posOld = []

  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr.length; y++) {
     // Continue here !!! 
    let cell = arr[x][y]
    if ((cell.age === 1) && !cell.era) numBorn++ 
    if (cell.era && !cell.eon) numEra++
    if (cell.eon) numEon++
    }
  }
  return {numBorn, numEra, numEon}
}