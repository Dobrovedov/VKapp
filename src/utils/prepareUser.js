const prepareUser = ({
  city,
  country,
  first_name,
  last_name,
  id,
  sex,
  timezone,
  bdate,
}) => ({
  vkId: id,
  firstName: first_name,
  lastName: last_name,
  city: city && city.title,
  country: country && country.title,
  gender: sex,
  timezone: timezone,
  bdate,
})

export default prepareUser
