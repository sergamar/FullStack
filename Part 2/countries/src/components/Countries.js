import React from 'react'
import Weather from './Weather'

const Countries = (props) => {
    if(props.newShow !== undefined){
        let country = props.countries.filter( (country) => country.name === props.newShow)[0]

        return (<>
            <h1>{country.name}</h1>
            <li>capital {country.capital}</li>
            <li>population {country.population}</li>
            <h2>Languages</h2>
            <ul>
            {country.languages.map( (lang) => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt={country.name} />
            <Weather capital={country.capital} setNewWeather={props.setNewWeather} newWeather={props.newWeather}/>
            <p><button type="button" onClick={props.hideHandler}>Go back</button></p>
            </>
        )
    }
    let filtered = props.countries.filter( (country) => country.name.includes(props.newFilter))
    if(filtered.length === 1){
        props.changeShow(filtered[0])
    }
    if(filtered.length <= 10){
        return filtered.map( (country) => <li key={country.name}>{country.name} <button type="button" id={country.name} onClick={props.showHandler}>show</button></li>)
    }
    else{
        return <>Too many matches, specify another filter</>
    }
}


export default Countries