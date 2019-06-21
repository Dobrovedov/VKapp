import React from "react"
import "../components/ErrorPic.css"
import PicPath1 from "../img/1.png"
import PicPath2 from "../img/2.png"
import PicPath3 from "../img/3.png"
import PicPath4 from "../img/4.png"
import PicPath5 from "../img/5.png"
import PicPath6 from "../img/6.png"
import PicPath7 from "../img/7.png"
import PropTypes from "prop-types"

const randomPic = () => {
  let array = [
    PicPath1,
    PicPath2,
    PicPath3,
    PicPath4,
    PicPath5,
    PicPath6,
    PicPath7,
  ]

  let rand = 0.5 + Math.random() * (array.length + 1)
  rand = Math.round(rand)
  return array[rand]
}

const ErrorPic = ({ alt }) => {
  return <img class="Error" src={randomPic()} alt={alt} />
}

ErrorPic.propTypes = {
  alt: PropTypes.string.isRequired,
}

export default ErrorPic
