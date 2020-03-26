import {findSur} from './newLife.js'

export const arr = (tltArr) => {
  let arr = []
  for (let i = 0; i < tltArr.length; i++) {
    let row = []
    for (let j = 0; j < tltArr[i].length; j++) {
      row.push({alive: 0, color: color[0]})
    }
    arr.push(row)
  }
  return arr
}

export const color = [
  'black', 'white'
]

const genLife = (arr, indx, min, max, num, tltArr) => {
  if (indx >= min && indx <= max) {
    if (tltArr[min][indx - min]) {
      arr[min][indx - min].alive = num
      arr[min][indx - min].color = color[num]
    } else if (!num) {
      arr[min][indx - min].bG = false
    }
  }
  return arr
}

export const appear = (arr, indx, min, max, tltArr) => {
  arr = genLife(arr, indx, min, max, 1, tltArr)
  min++
  max++
  if (min < tltArr.length) appear(arr, indx, min, max, tltArr)
  return arr
}

export const disappear = (arr, indx, min, max, tltArr) => {
  arr = genLife(arr, indx, min, max, 0, tltArr)
  min--
  max--
  if (min >= 0) disappear(arr, indx, min, max, tltArr)
  return arr
}


export const curveAppear = (arr, indx, min, max) => {
  arr = genCurve(arr, indx, min, max)
  min--
  max--
  if (min >= 0) curveAppear(arr, indx, min, max)
  return arr
}

const genCurve = (arr, indx, min, max) => {
  if (indx >= min && indx <= max) {
    arr = curve(arr, min, indx - min)
  }
  return arr
}

export const curve = (next, x, y) => {
  let tl, tr, br, bl, bg
  let s = findSur(x, y, next)
  if (next[x][y].alive) {
    if (!s[3].alive && !s[0].alive && !s[1].alive) tl = 50
    else tl = 0
    if (!s[1].alive && !s[2].alive && !s[4].alive) tr = 50
    else tr = 0
    if (!s[4].alive && !s[7].alive && !s[6].alive) br = 50
    else br = 0
    if (!s[3].alive && !s[5].alive && !s[6].alive) bl = 50
    else bl = 0
  }
  else {
    if (s[3].alive && s[1].alive) (tl = 50) && (bg = s[3].color)
    else tl = 0
    if (s[1].alive && s[4].alive) (tr = 50) && (bg = s[1].color)
    else tr = 0
    if (s[4].alive && s[6].alive) (br = 50) && (bg = s[4].color)
    else br = 0
    if (s[3].alive && s[6].alive) (bl = 50) && (bg = s[3].color)
    else bl = 0
  }
  next[x][y].bG = bg ? bg : false
  next[x][y].radius = `${tl}% ${tr}% ${br}% ${bl}%`
  return next
}

// export const flicker = (x, j, o) => {
//   if (j <= 74) {
//     if (title[0][j]) {
//       x[0][j].alive = 1
//       x[0][j].color = color[1]
//     }
//   }
//   if (j > 0 && j <= 75) {
//     if (title[1][j - 1]) {
//       x[1][j - 1].alive = 1
//       x[1][j - 1].color = color[1]
//     }
//   }
//   if (j > 1 && j <= 76) {
//     if (title[2][j - 2]) {
//       x[2][j - 2].alive = 1
//       x[2][j - 2].color = color[1]
//     }
//   }

//   //
//   if (o > 6) {
//     if (title[14][o - 7]) {
//       x[14][o - 7].alive = 1
//       x[14][o - 7].color = color[1]
//     }
//   }
//   if (o > 5 && o <= 80) {
//     if (title[13][o - 6]) {
//       x[13][o - 6].alive = 1
//       x[13][o - 6].color = color[1]
//     }
//   }
//   if (o > 4 && o <= 79) {
//     if (title[12][o - 5]) {
//       x[12][o - 5].alive = 1
//       x[12][o - 5].color = color[1]
//     }
//   }
//   return x
// }
