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
  // this.props.updateXy(this.state.xy)
  // this.props.updateBoard(arr)
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
  // let gens = 100 // make num of generations dynamic
  // for (let i = 0; i < gens; i++) {
    // console.log(`Gen ${props.gen}`)
    for (let x = 0; x < arr.length; x++) {
      let row = []
      for (let y = 0; y < arr.length; y++) {
        row.push(countSurrounds(x, y, arr))
      }
      newArr.push(row)
    }
    return newArr
    // props.updateBoard(newArr)
    // props.updateGen(props.gen + 1)
    // setInterval(() => { // find another way
    //   if (props.gen < 1000) scanner(props)
    // }, 50)
  // } 
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
  if (cell) {
    if (surrounds < 2 || surrounds > 3) return {alive: 0, color: 'black', key: `${x}${y}`}
    else return {alive: 1, color: 'white', key: `${x}${y}`}
  } 
  if (!cell && surrounds === 3) return {alive: 1, color: 'white', key: `${x}${y}`}
  else return {alive: 0, color: 'black', key: `${x}${y}`}
}
