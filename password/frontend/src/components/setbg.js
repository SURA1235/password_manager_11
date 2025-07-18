 function setBodyColor({ backgroundColor, textColor }) {
    document.documentElement.style.setProperty('--bodyColor', backgroundColor)
    document.documentElement.style.setProperty('--textColor', textColor)

}

export default  setBodyColor