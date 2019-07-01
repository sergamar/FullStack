import React, {useState} from 'react'
import axios from 'axios';

const Filter = (props) => {
    useState(() => {
        axios.get(`http://api.apixu.com/v1/current.json?key=bb73c289045849c1b1361318190107&q=${props.capital}`)
        .then(response => {
            props.setNewWeather(response.data.current)
        })
    }, [])
    if(props.newWeather === undefined) return null  //If the promise hasn't been fulfilled yet
    return(
        <>
        <h2>Weather in {props.capital}</h2>
        <p><b>Temperature: </b> {props.newWeather.temp_c} Celsius</p>
        <img alt={props.newWeather.condition.text} src={props.newWeather.condition.icon} />
        <p><b>Wind: </b> {props.newWeather.wind_kph} direction {props.newWeather.wind_dir}</p>
        </>
    )
}
export default Filter