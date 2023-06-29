export const getFormatedDate = (date) => {
  const year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let newMonth = 0
  let newDay = 0
  if (month < 10) {
    newMonth = `0` + (month + 1)
  } else {
    newMonth = month + 1
  }
  if (day < 10) {
    newDay = `0` + (day + 1)
  } else {
    newDay = day + 1
  }

  return `${year}-${newMonth}-${newDay}`
}

// 2023-06-20T00:00:00.000Z

export const getDayMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}
