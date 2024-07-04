import React from 'react'
import { useState } from 'react'

export const WheaterApp = () => {

    const urlBase_La_Lo = 'http://api.openweathermap.org/geo/1.0/direct'
    const API_KEY = 'd55f51d9af0373386f9d104d034c73a6'
    const limit = '1'
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const difKelvin = 273.15
    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (event) => {
        setCiudad(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase_La_Lo}?q=${ciudad}&limit=${limit}&appid=${API_KEY}`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0]; 
                console.log(lon, 'hola');
                const response2 = await fetch(`${urlBase}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                const data2 = await response2.json()
                setDataClima(data2); 
            } else {
                console.error('No se encontró la ciudad');
            }
        } catch (error) {
            console.error('ocurrio algo:', error);
        }
    };

    return (
        <div className='container'>
            <h1> Aplicacion del Clima</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit"> Buscar</button>
            </form>

            {dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                    <p>Condicion Meteorologica {dataClima.weather[0].description}</p>
                    <img  src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )}

        </div>
    )
}
