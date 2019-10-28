const fs = require('fs').promises

module.exports = (filename) => {
  return new Promise(res => {
    fs.readFile(`./csv/${filename}.csv`, 'utf8')
      .then(data => {
        const splited = data.split(/\r?\n/)
        const props = splited[0].split(',')
        const type = splited[1].split(',')
        res(splited.slice(2, splited.length - 1)
          .map(val => {
            let res = {}
            val.split(',')
              .forEach((x, i) => {
                if (x != '') {
                  switch(type[i]) {
                    case 'arr':
                      res[props[i]] = x.split('|')
                      break
                    case 'int':
                      res[props[i]] = parseInt(x)
                      break
                    case 'float':
                      res[props[i]] = parseFloat(x)
                      break
                    case 'boolean':
                      res[props[i]] = x == 'true'
                      break
                    default:
                      if (/\{.*\}/.test(x)) {
                        const key = type[i].substring(1,type[i].length-1)
                          .split('|')
                        res[props[i]] = {}
                        x.substring(1, x.length - 1)
                          .split('|')
                          .forEach((y, j) => res[props[i]][key[j]] = y)

                      } else {
                        res[props[i]] = x
                      }
                      break
                  }
                }
              })
            return res
          }))
      })
  })
}
