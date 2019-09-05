import React from 'react'

const CustomInput = ({type, value, onChange, reset}) => {
    return(<div><input type={type} value={value} onChange={onChange} />
        <button type="button" onClick={reset}>reset</button>
        </div>)
}

export default CustomInput