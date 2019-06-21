import React from "react"
import "../components/ErrorPic.css"
import PropTypes from "prop-types"

const randomPic = () => {
  let rand = 0.5 + Math.random() * 7
  rand = Math.round(rand)
  return "../img/errorPics/" + rand + ".png"
}

const ErrorPic = ({ alt }) => {
  return <img class="Error" src={randomPic()} alt={alt} />
}

ErrorPic.propTypes = {
  alt: PropTypes.string.isRequired,
}

export default ErrorPic
