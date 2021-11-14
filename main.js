async function getAPIData(){
    let array 
    let myHeaders = new Headers() 
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImtubWs5dXhxemgiLCJ0b2tlbiI6eyJpdiI6IjU2NWMxZWNkOTRjMGVhNGQwNDgwYTBmYjI5ZWFkYjg5IiwiY29udGVudCI6IjQ4MDIyMzllMzhlZDhlYTBmNmEyYjE1ZDFjYTQ5ZmNmZDQ5MDZiNGRlZmNlOTkwNGRjNDJkZTYyMGM3ZGExOWYyOTg1YTcyM2M2NWU2YWQyNTg3NGY0ZTM0NjE2YjNmNjllOTU0YjBiNDA5M2JlZmVkZDRlZGQzZjEyMWNmMGJkYzYzNTdmNmYyOGUwNDJmNWU4MjUxOWI5NWZiMTFhOGNmOTEzYWM1YmJkOTgwNWIwYTNmMjdlNGJmOGI5Y2JmNzM5NjNiMmI0MDI5ZjdkZTkyMWIxNWI0ZTA1MWM3MTJiYmE4NGVjYjQ2NjA5Y2FkYWYyM2MxNDRhMTVjNzRhZDRiYWZkMzg5OTgwZjM5NGFmODJiY2RlOWIxMDdjZjQ0NjcwNWVjMDZmNWE1MDQ2OTM0MWQwZDU4MjBmMTJiMzQ3MjNkZDdlOTVhYWRkOWFkZjkzZGFmMzBmMWI2ZTczMzY1ZjZiMjU4MzFjZTYzZGNhMDAzY2I4MGFhNmE1MGVlYzE5NGRiOGJhNjJhZjQ2MzQwZTQxNjI2M2Q0N2QzNGQ0Yjk0NDZhMTFhYjI4NzcyOTRkOTA3NWFmZDdmNTc2N2JkOTE3Njc2YjI5MzIyZWZjYmNkYzlmNjNjNzFlNTEwZDdlMTg5N2MxYWUxOTViZjA2ODg3Mzc2MmVmZmUwMjBjMmU0NDUxNTUwODU0MWYzY2E1M2U0ZGY0N2EyYzM5NTk3MGVjNDdmMGE1ODMwMjVlNTIzOTg0YjkxYzYxYmI3NTRjZmQ0ZDc1YzNhNmZiOTkwZWRlOTFjMmRjYjhhZWY1YWJhMDE5ZDM2YWM1Yzg2YTIyNzVkZjYxNTRiZDNhZDkxNTcxYTE0ZmRkZmY5YjljZGJlMGEyIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI1NjVjMWVjZDk0YzBlYTRkMDQ4MGEwZmIyOWVhZGI4OSIsImNvbnRlbnQiOiI1ODE0NWFiZjY4Zjk4MGYwODhmZWIzNWMyN2E4YTBjNmYwYmUxMDdkZDZlMmIyNWFmMjRlZGY2ZDdkNjY4NWFiM2E5NGQ5N2I4MTZjNjJmYzAwM2RmNWRkIn0sImp0aSI6IjlkMmM2NmVjLTkzY2QtNDE5NS1hMjMzLWFiNjg2YjFkODUzOCIsImlhdCI6MTYzNjg2NDI3MiwiZXhwIjoxNjM2ODY3ODcyfQ.qj_k_d6a85rfOjkeYoLVtNVeBhF2SpvAZFBuqB9wp7c") 
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
    return token 
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

async function main(){
    let totalArr 
    let apiData = await getAPIData() 
    let sfData = await getRAWData() 
    console.log(apiData)
    console.log(sfData)
    totalArr = ridofUnique(apiData[0],apiData[1],apiData[2],sfData[0],sfData[1],sfData[2])
    console.log(totalArr)
}

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
            if((apiCodeArray[i] == sfCodeArray[j]) && sfNameArray[j] != null && sfcoordArray[j] != null)
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