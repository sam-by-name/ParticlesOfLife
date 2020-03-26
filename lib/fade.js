export const fade = (last, next, boo, rules, func) => {
  let max = 0, a, b
  for (let i = 1; i < next.length; i++) {
    for (let j = 1; j < next[0].length; j++) {
      if (boo && (last[i][j].alive || last[i][j].bG)) {
        a = Math.random() + .5
        b = Math.random() + .5
        next[i][j].alive = last[i][j].alive ? 1 : 0
        next[i][j].age = last[i][j].age
        next[i][j].color = last[i][j].color
        next[i][j].opacity = 1
        next[i][j].transition = `opacity ${a}s ${b}s`
        if (rules === '3')  {
          next[i][j].bG = last[i][j].bG ? true : false
          next[i][j].radius = last[i][j].radius
        }
        if (max < (a + b)) max = a + b
      }
    }
  }
  func(Math.floor(max * 1000))
  return {lifeA: next, lifeB: last}
}

// export const cleanFade = (last, next) => { // do I need to remove these?
//   for (let i = 1; i < next.length; i++) {
//     for (let j = 1; j < next[0].length; j++) {
//       if (last[i][j].alive) {
//         delete last[i][j].opacity
//         delete last[i][j].transition
//         delete next[i][j].opacity
//         delete next[i][j].transition
//       }
//     }
//   }
//   return {lifeA: next, lifeB: last}
// }