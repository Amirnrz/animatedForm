export function validateEmail(email) {
  const pattern = /\S+@\S+\.\S+/
  return pattern.test(email)
}

export function validatePhone(phone) {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return pattern.test(phone)
}

