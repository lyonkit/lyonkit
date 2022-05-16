import { reduce } from 'lodash-es'

export interface Dictionnary {
  [k: string]: string | Array<string | Dictionnary> | Dictionnary
}

export function flattenDictionnary(obj: Dictionnary): Record<string, string> {
  return reduce<Dictionnary, Record<string, string>>(obj, (res, value, key) => {
    if (typeof value === 'string') {
      res[key] = value
      return res
    }
    if (Array.isArray(value)) {
      for (const i in value) {
        const nestedValue = value[i]
        if (typeof nestedValue === 'string') {
          res[`${key}[${i}]`] = nestedValue
        }
        else {
          const flatValue = flattenDictionnary(nestedValue)

          for (const nestedKey in flatValue)
            res[`${key}[${i}].${nestedKey}`] = flatValue[nestedKey]
        }
      }
      return res
    }
    const flatValue = flattenDictionnary(value)
    for (const nestedKey in flatValue)
      res[`${key}.${nestedKey}`] = flatValue[nestedKey]

    return res
  }, {})
}
