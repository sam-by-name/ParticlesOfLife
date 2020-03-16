import {findSur} from './newLife.js'

export const title = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], 
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0], 
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0], 
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0], 
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]


// export const title1 = [
//   [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], 
//   [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], 
//   [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], 
//   [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0], 
//   [1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], 
//   [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1], 
//   [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0], 
//   [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1] 
// ]

// export const arr = () => {
//   let arr = []
//   for (let i = 0; i < title.length; i++) {
//     let row = []
//     for (let j = 0; j < title[i].length; j++) {
//       row.push(0)
//     }
//     arr.push(row)
//   }
//   return arr
// }

export const arr = () => {
  let arr = []
  for (let i = 0; i < title.length; i++) {
    let row = []
    for (let j = 0; j < title[i].length; j++) {
      row.push({alive: 0, color: color[0]})
    }
    arr.push(row)
  }
  return arr
}


// export const flicker = (x, count) => {
//   for (let i = 0; i < x.length; i++) {
//     for (let j = 0; j < x[i].length; j++) {
//       let num = i + j
//       if (count > (title.length * title[0].length) / 4) {
//         if ((num % Math.floor(Math.random() * 20) === 0) && (x[i][j] < 2)) {
//           x[i][j] = Math.round(Math.random())
//         }
//       //   // else x[i][j] = Math.round(Math.random())
//       //   // make j skip some
//       //   //j = j + Math.floor(Math.random() * 5)
//       } else if (count < (title.length * title[0].length) / 4) {        
//         if (title[i][j] === 1) {
//           if (num % Math.floor(Math.random() * 50) === 0) {
//             x[i][j] = 1
//           }
//         } else if (num % Math.floor(Math.random() * 50) === 0) x[i][j] = 0
//       }
//     }
//   }
//   return x
// }

// export const flicker = (x) => {
//   loop1:
//     for (let i = 0; i < x.length; i++) {
//       for (let j = 0; j < x[i].length; j++) {
//         if (title[i][j] && !x[i][j]) {
//           x[i][j] = 1
//           break loop1
//         }
//       }
//     }
//   loop2:
//     for (let i = x.length - 1; i >= 0; i--) {
//       for (let j = x[0].length - 1; j >= 0; j--) {
//         if (title[i][j] && !x[i][j]) {
//           x[i][j] = 1
//           break loop2
//         }
//       }
//     }
//   return x
// }

export const color = [
  'black', 'white'
]


// export const flicker = (x) => {
//   loop1:
//     for (let i = 0; i < x.length; i++) {
//       for (let j = 0; j < x[i].length; j++) {
//         // if (i > 0) {
//         //   if (findSur(i - 1, j, x).reduce((a, c) => a + c.alive, 0) && !x[i - 1][j].hasOwnProperty('radius')) {
//         //     curve(x, i - 1, j)
//         //   }
//         // }
//         if (title[i][j] && !x[i][j].alive) {
//           x[i][j].alive = 1
//           x[i][j].color = color[1]
//           if ((j > 0) && title[i + 1][j - 1] && !x[i + 1][j - 1].alive) {
//             x[i + 1][j - 1].alive = 1
//             x[i + 1][j - 1].color = color[1]
//           }
//           break loop1
//         }
//       }
//     }
//   loop2:
//     for (let i = x.length - 1; i >= 0; i--) {
//       for (let j = x[0].length - 1; j >= 0; j--) {
//         // if (i < x.length - 1) {
//         //   if (findSur(i + 1, j, x).reduce((a, c) => a + c.alive, 0) && !x[i + 1][j].hasOwnProperty('radius')) {
//         //     curve(x, i + 1, j)
//         //   }
//         // }
//         if (title[i][j] && !x[i][j].alive) {
//           x[i][j].alive = 1
//           x[i][j].color = color[1]
//           if ((j < x[0].length -2) && title[i - 1][j + 1] && !x[i - 1][j + 1].alive) {
//             x[i - 1][j + 1].alive = 1
//             x[i - 1][j + 1].color = color[1]
//           }
//           break loop2
//         }
//       }
//     }

//   return x
// }
const genLife = (arr, indx, min, max, num) => {
  if (indx >= min && indx <= max) {
    if (title[min][indx - min]) {
      arr[min][indx - min].alive = num
      arr[min][indx - min].color = color[num]
    } else if (!num) {
      arr[min][indx - min].bG = false
    }
  }
  return arr
}

export const appear = (arr, indx, min, max) => {
  arr = genLife(arr, indx, min, max, 1)
  min++
  max++
  if (min < title.length) appear(arr, indx, min, max)
  return arr
}

export const disappear = (arr, indx, min, max) => {
  arr = genLife(arr, indx, min, max, 0)
  min--
  max--
  if (min >= 0) disappear(arr, indx, min, max)
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
    // if (title[min][indx - min]) {
      arr = curve(arr, min, indx - min)
    // }
  }
  return arr
}

const curve = (next, x, y) => {
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
//   if (o > 3 && o <= 78) {
//     if (title[11][o - 4]) {
//       x[11][o - 4].alive = 1
//       x[11][o - 4].color = color[1]
//     }
//   }
//   if (o > 2 && o <= 77) {
//     if (title[10][o - 3]) {
//       x[10][o - 3].alive = 1
//       x[10][o - 3].color = color[1]
//     }
//   }
//   if (o > 1 && o <= 76) {
//     if (title[9][o - 2]) {
//       x[9][o - 2].alive = 1
//       x[9][o - 2].color = color[1]
//     }
//   }
//   if (o > 0 && o <= 75) {
//     if (title[8][o - 1]) {
//       x[8][o - 1].alive = 1
//       x[8][o - 1].color = color[1]
//     }
//   }
//   return x
// }

export const border = (x) => {
  loop1:
  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x[i].length; j++) {
        // if (!x[i][j].hasOwnProperty('radius')) {
          if (findSur(i, j, x).reduce((a, c) => a + c.alive, 0) && !x[i][j].hasOwnProperty('radius')) {
          curve(x, i, j)
          break loop1
        }
      }
    }
  loop2:
  for (let i = x.length - 1; i >= 0; i--) {
    for (let j = x[0].length - 1; j >= 0; j--) {
        // if (!x[i][j].hasOwnProperty('radius') && title[i][j]) {
          if (findSur(i, j, x).reduce((a, c) => a + c.alive, 0) && !x[i][j].hasOwnProperty('radius')) {
          curve(x, i, j)
          break loop2
        }
      }
    }
    // console.log(x[0].length * x.length)
  return x
}
