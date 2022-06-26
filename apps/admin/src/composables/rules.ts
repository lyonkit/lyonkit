import { once } from 'lodash-es'

function required(fieldName: string, feminine = false) {
  return (value: string) => !!value || `${fieldName} est ${!feminine ? 'requis' : 'requise'}`
}

const emailRegExp = once(() => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
function email(fieldName = 'L\'adresse e-mail') {
  return (email: string) => emailRegExp().test(email) || `${fieldName} doit être valide`
}

function length(fieldName: string, min: number, max: number) {
  return (value: string) => (value.length >= min && value.length <= max) || `${fieldName} doit contenir entre ${min} et ${max} caractères`
}

function minLength(fieldName: string, min: number) {
  return (value: string) => value.length >= min || `${fieldName} doit contenir au moins ${min} caractères`
}

function maxLength(fieldName: string, max: number) {
  return (value: string) => value.length <= max || `${fieldName} doit contenir au plus ${max} caractères`
}

const uriRegExp = once(() => /^\/(?:[a-z0-9-]+\/)*[a-z0-9-]+$/)
function uri(fieldName: string) {
  return (value: string) => uriRegExp().test(value) || `${fieldName} doit être une URI valide (ex: /mon-article)`
}

export function useRules() {
  return { email, required, length, minLength, maxLength, uri }
}
