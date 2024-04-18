export const formatFromISO8601 = (iso8601: string): string => {
  const date = new Date(iso8601)
  const yyyy = date.getFullYear().toString()
  const mo = (date.getMonth() + 1).toString().padStart(2, "0")
  const dd = date.getDate().toString().padStart(2, "0")
  let hours = date.getHours()
  const ap = hours >= 12 ? "PM" : "AM"
  hours = hours % 12
  const hh = hours ? hours.toString().padStart(2, "0") : "12"
  const mi = date.getMinutes().toString().padStart(2, "0")
  return `${mo}/${dd}/${yyyy}-${hh}:${mi} ${ap}`
}
