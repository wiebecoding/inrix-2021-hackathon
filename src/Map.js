import React , {useEffect, useState} from 'react';

import GoogleMapReact from 'google-map-react';
import SpeedPoint from "./SpeedPoint";
function Map(props){
    const [points, setPoints] = useState([]);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        async function main() {
            const params = new URLSearchParams(window.location.search);
            let mult = 5;
            mult = parseInt(params.get("scale"))
            let temp = [];
            //let arr = [[45463462, "EL CAMINO REAL", [37.34988587105891,-121.93534355137554], 34.5, 22, false]];
            //console.log(arr)
            let apiData = await getAPIData()
            let sfData = await getRAWData()
            let arr = ridofUnique(apiData[0], apiData[1], apiData[2], sfData[0], sfData[1], sfData[2])

            for (let i = 0; i < arr.length-mult; i+=mult) {
                if(!isNaN(arr[i][2][1]) && !isNaN(arr[i][2][0]) && !isNaN(arr[i][3])) {
                    let speeding = arr[i][5]
                    if(arr[i][3] <= 25)
                        speeding = true
                    temp.push({
                        lat: arr[i][2][1],
                        lng: arr[i][2][0],
                        street: arr[i][1],
                        speed: arr[i][3],
                        speeding: speeding,
                        avgSpeed: arr[i][4],
                    })
                }
            }
            console.log(temp)
            setPoints(temp)
        }
        main()
    }, []);
    
    const defaultProps = {
        center: {
            lat: 37.75,
            lng: -122.45,
        },
        zoom: 11
    };
    function subs(zoom){
        console.log(zoom)
        if(zoom > 12) {
            return (
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyDIwpNgFSik6tmPDKA2yBsT_nMYXBnA7Tc"}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    onChange={(z) => {
                        setZoom(z.zoom)
                        console.log(zoom)
                    }}>

                    {points.map(info =>
                        <SpeedPoint
                            key={info.lat + "/" + info.lng}
                            lat={info.lat}
                            lng={info.lng}
                            street={info.street}
                            speed={info.speed}
                            speeding={info.speeding}
                            avgSpeed ={info.avgSpeed}
                        />
                    )}

                </GoogleMapReact>
            )
        }else{
            return(
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyDIwpNgFSik6tmPDKA2yBsT_nMYXBnA7Tc"}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    onChange={(z) => {
                        setZoom(z.zoom)
                        console.log(zoom)
                    }}>
                </GoogleMapReact>
            )
        }
    }
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {subs(zoom)}
        </div>
    );
    async function getAPIData(){
        let array = []
        let myHeaders = new Headers()
        let token = await getAppToken();
        console.log(token)
        myHeaders.append("Authorization", token)
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        await fetch("https://api.iq.inrix.com/v1/segments/speed?box=37.858%7C-122.541,37.699%7C-122.341", requestOptions)
            .then(response => response.text())
            .then(response => {
                array = parseAPIData(response)
            })
            .catch(error => console.log('error', error))
        return array
    }

    async function getAppToken(){
        let tokenData
        let appId = "f6rmtcl05k"
        let hashToken = "ZjZybXRjbDA1a3w2YU55M3Yza2x1YW9LcFVCQWdiT1RzMXZhcFVqSXRYNjBNUVljeThm"
        let url = "https://api.iq.inrix.com/auth/v1/appToken?appId="+appId+"&hashToken="+hashToken
        tokenData = await fetchToken(url)
        let token = tokenData.result.token
        return ("Bearer " + token)
    }

    async function fetchToken(url) {
        let response = await fetch(url)
        return await response.json()
    }

    async function getRAWData(){
        let array = []
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch("https://raw.githubusercontent.com/wiebecoding/inrix-2021-hackathon/main/san_fran_segments.json", requestOptions)
            .then(response => response.text())
            .then(response => {
                array = parseRAWData(response)
            })
            .catch(error => console.log('error', error));
        return array;
    }

    async function parseRAWData(data){
        let codeRAWArray = []
        let nameRAWArray = []
        let coordRAWArray = []
        let test = JSON.parse(data)
        let json = test.result.segments
        console.log(json)
        for(let lengthCounter = 0; lengthCounter < json.length; lengthCounter++){
            codeRAWArray.push(json[lengthCounter].code)
            nameRAWArray.push(json[lengthCounter].roadInfo.name)
            coordRAWArray.push(json[lengthCounter].locationInfo.center.coordinates)
        }
        return[codeRAWArray,nameRAWArray,coordRAWArray]
    }

/*    async function main(){
        let totalArr
        let apiData = await getAPIData()
        let sfData = await getRAWData()
        console.log(apiData)
        console.log(sfData)
        totalArr = ridofUnique(apiData[0],apiData[1],apiData[2],sfData[0],sfData[1],sfData[2])
        console.log(totalArr)
    }*/

    async function parseAPIData(data){
        let codeAPIArray = []
        let currentSpeedAPIArray = []
        let averageSpeedAPIArray = []
        let test = JSON.parse(data)
        let json = test.result.segmentspeeds[0].segments
        for(let lengthCounter = 0; lengthCounter < json.length; lengthCounter++){
            currentSpeedAPIArray.push(json[lengthCounter].speed)
            averageSpeedAPIArray.push(json[lengthCounter].average)
            codeAPIArray.push(json[lengthCounter].code)
        }
        return[codeAPIArray,currentSpeedAPIArray,averageSpeedAPIArray]
    }

    function ridofUnique(apiCodeArray, currentSpeedArray, averageSpeedArray, sfCodeArray, sfNameArray, sfcoordArray){
        let overallArray = []
        let counter = 0
        let high = 0
        for(let i = 0; i < apiCodeArray.length; i++){
            for(let j = 0; j < sfCodeArray.length; j++){
                if((apiCodeArray[i] === sfCodeArray[j]) && sfNameArray[j] != null && sfcoordArray[j] != null)
                {
                    let miniArray = []
                    miniArray.push(apiCodeArray[i])
                    miniArray.push(sfNameArray[j])
                    miniArray.push(sfcoordArray[j])
                    miniArray.push(currentSpeedArray[i])
                    if(currentSpeedArray[i] > high){
                        high = currentSpeedArray[i]
                    }
                    miniArray.push(averageSpeedArray[i])
                    if(currentSpeedArray[i]>=(averageSpeedArray[i]*1.10)|| currentSpeedArray[i]>= (65*1.10)){
                        miniArray.push(true)
                        counter +=1
                    }else{
                        miniArray.push(false)
                    }
                    //console.log("Speed: "+ currentSpeedAPIArray[i] +" Average: "+ averageSpeedAPIArray[i] + " Differential: " + (currentSpeedArray[i]/averageSpeedArray[i])+ " Speeding: "+ miniArray[5])
                    overallArray.push(miniArray)
                }
            }
        }
        return overallArray
    }
}
export default Map