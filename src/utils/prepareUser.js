import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

const prepareUser = ({
  city,
  country,
  first_name,
  last_name,
  id,
  sex,
  timezone,
  bdate,
}) => {
  const date1 = dayjs()
  const date2 = dayjs(bdate, "DD.MM.YYYY")

  const age = date1.diff(date2, "year")
  console.log(age)

  return {
    vkId: id,
    firstName: first_name,
    lastName: last_name,
    city: city && city.title,
    country: country && country.title,
    gender: sex,
    timezone: timezone,
    bdate,
    age,
  }
}

export default prepareUser
