import React, {
  memo,
  useEffect,
  useState
} from "react"

const RangeSlider = memo(({onChange, value, ...sliderProps}) => {
  const [sliderVal, setSliderVal] = useState(0)
  const [mouseState, setMouseState] = useState(null)

  useEffect(() => {
    setSliderVal(value)
  }, [value])

  const changeCallback = e => {
    setSliderVal(e.target.value)
    onChange(sliderVal)
    console.log(sliderVal) //gets called twice. worth investigating?
  }

  useEffect (() => {
    if (mouseState === "down") {
      onChange(sliderVal)
    }
  }, [mouseState])
  
  useEffect (() => {
    if (mouseState === "up") {
      onChange(sliderVal)
    }
  }, [mouseState])

  return (
    <div className="range-slider-div">
      <input
        type="range"
        value={sliderVal}
        {...sliderProps}
        className={'slider'}
        onChange={changeCallback}
        onMouseDown={() => setMouseState("down")}
        onMouseUp={() => setMouseState("up")}
      />
    </div>
  )
})

export default RangeSlider