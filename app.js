const express=require('express')
const geocode=require('./geocode')
const axios=require('axios')

const app=express()

app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('inputDemo')
})

app.get('/weather',(req,res)=>{
    let city=req.query.city
    console.log(city)
    geocode(city,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        console.log('latitude.....:'+latitude)
        console.log('longitude....:'+longitude)
        var url='https://api.openweathermap.org/data/2.5/weather?'+`lat=${latitude}&lon=${longitude}&units=metric&appid=c743d3bdc66c523fb167a48cf147b3a3`
        axios({
            method:'get',
            url:url
        }).then((response)=>{
            const wheatherData= response.data;
            console.log(wheatherData)
            
            
            const temperature=wheatherData.main.temp;
            const tempMin = wheatherData.main.temp_min;
            const tempMax = wheatherData.main.temp_max;
            const humidity=wheatherData.main.humidity;
            const windSpeed=wheatherData.wind.speed;

            
            console.log(`Tempetature: ${temperature}°C`);
            console.log(`Min Temperature: ${tempMin}°C`);
            console.log(`Max Temperature: ${tempMax}°C`);
            console.log(`Humidity: ${humidity} %`);
            console.log(`Wind Speed: ${windSpeed} kph`);

            res.render('weatherResult', {temperature,tempMin, tempMax, humidity, windSpeed,location});

        });
    });
});
 
app.listen(3000,()=>{
    console.log('server is listning on port 3000')
})