const request=require('request')
const geocode=(address,callback)=>{
    const url=`https://api.openweathermap.org/geo/1.0/direct?q=${address}&appid=c743d3bdc66c523fb167a48cf147b3a3`

    console.log(url)
    request({ url,json:true },(error,{ body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else{
            console.log('from geocode...'+JSON.stringify(body[0]))
            callback(undefined,{
                address:body[0].name,
                latitude:body[0].lat,
                longitude:body[0].lon
            })
        }
    })
}

module.exports=geocode