import React, { useEffect, useState } from "react";
import axios from "axios"; // Add the 'from' keyword here
import "./style.css";

function Home() {
    const [data, setData] = useState({
        celcius:10,
        name:'London',
        humidity:10,
        speed:2,
        image:'/img/clouds.png'
        })
    const [name, setName] = useState('')
    const [error, setError] = useState('')
 
  
   const handleClick = ()=>{
    if(name !== ""){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a6be145309dea23ebbb7df4ee6964ddb&units=metric`
        axios.get(apiUrl) // Use the variable name 'apiUrl' here
        .then(res => {
            let imagePath = '';
            if(res.data.weather[0].main === "Clouds"){
                imagePath = "/img/clouds.png"
            }else if(res.data.weather[0].main === "Clear"){
                imagePath = "/img/clear.png"
            
            }else if(res.data.weather[0].main === "Rain"){
                imagePath = "/img/rain.png"
            
            }else if(res.data.weather[0].main ==="Drizzle"){
                imagePath = "/img/drizzle.png"
            
            }else if(res.data.weather[0].main === "Mist"){
                imagePath = "/img/mist.png"
            }else{
                imagePath = "/img/clear.png"
            }
            console.log(res.data);
            setData({...data,
                celcius: res.data.main.temp,
                name: res.data.name,
                humidity: res.data.main.humidity,
                speed: res.data.wind.speed,
                image:imagePath
            });
            setError('')
        })
        .catch(err =>{ 
            if(err.response.status===404){
                setError("Invalid city name")
            }else{
                setError('')
            }
            
            console.log(err)}
    );
    }
    
   }


    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Enter city name"  onChange={e=> setName(e.target.value)} />
                    <button>
                        <img src="/img/search.png" alt="" onClick={handleClick}/>
                    </button>
                </div>
                <div className="error"><p>{error}</p></div>
                <div className="winfo">
                    <img src={data.image} alt=""/>
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="/img/humidity.png" alt="" />
                            <div className="humidity">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="/img/wind.png" alt="" />
                            <div className="wind">
                                <p>{Math.round(data.speed)}km/h</p>
                                <p>Wind</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
