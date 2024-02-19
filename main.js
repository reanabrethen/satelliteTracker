//return info as a template literal into the second URL
//make call there and display information 
//will need response from first API to request for the second call


let city        //use to replace city/address location on location URL
let satelliteCode //use to replace satellite code in the satellite URL

const satelliteCodeObj = {
    25544 : 'International Space Station',
    20580 : 'Hubble Space Telescope',
    46920: 'SpaceX Dragon'
}

 
const searchButton = document.querySelector('#search')  //to wire up information inputed to output location of satellite

searchButton.addEventListener('click', ()=>{
    console.log('click works')
    const cityLocation = document.querySelector('#location').value
    const satelliteChoice = document.querySelector('#norad').value
    const city = encodeURI(cityLocation)
    const satelliteCode = encodeURI(satelliteChoice)
    const locationURL = `https://geocode.maps.co/search?q=${city}&api_key=${apiKey}`

fetch(locationURL)
    .then((response)=>{
        console.log('functionality')
        return response.json()
    })
    .then((data)=>{
        console.log(data)
        //target first index of list 
        let latitude = data[0].lat
        let longitude = data[0].lon
       
        const satelliteURL = `https://satellites.fly.dev/passes/${satelliteCode}?lat=${latitude}&lon=${longitude}&limit=1`

        //use info from first element of list and insert it into the next URL we fetch from
        return fetch(satelliteURL)
    })
    .then((response)=>{
        console.log('response info here')
        return response.json()
    })
    .then((obj)=>{
        console.log(obj)
        
        if(obj[0]){     //target array due to multiple options of addresses w/in city
            document.querySelector('#output-data').innerHTML = `${satelliteCodeObj[satelliteCode]} rises over the horizon ${obj[0].rise.utc_datetime}. 
            It will reach its highest point in the sky at ${obj[0].culmination.utc_datetime}
            and will set on the horizon at ${obj[0].set.utc_datetime}.`
        } 
        //reset everything
        document.querySelector('#location').value = ''
        document.querySelector('#norad').value = ''
    })
    .catch((error) => console.log(error))

})