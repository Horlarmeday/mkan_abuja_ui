

export function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (error) {
      throw new Error(error)
    }
}

export function calculateAge(birthday) {
  const dateOfBirth = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const month = today.getMonth() - dateOfBirth.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  return age;
}
