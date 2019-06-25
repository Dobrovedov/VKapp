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
  city: city ? city.title : null,
  country: country ? country.title : null,
  gender: sex,
  timezone: timezone,
})

export default prepareUser
