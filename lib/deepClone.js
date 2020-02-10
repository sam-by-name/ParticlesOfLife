export const deepClone = (o) => { //
  let newO, i

  if (typeof o !== 'object') return o
  if (!o) return o

  if (Object.prototype.toString.apply(o) === '[object Array]') {
    newO = []
    for (i = 0; i < o.length; i += 1) {
      newO[i] = deepClone(o[i])
    }
    return newO
  }

  newO = {}
  for (i in o) {
    if (o.hasOwnProperty(i)) {
      newO[i] = deepClone(o[i])
    }
  }
  return newO
}