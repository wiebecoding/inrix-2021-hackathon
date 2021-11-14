var data;
    async function getAPIData(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImtubWs5dXhxemgiLCJ0b2tlbiI6eyJpdiI6ImE2NzEwNzcyN2FhZGU3OTM3NWNjMTIwZDIxYjg0NTFiIiwiY29udGVudCI6ImRhMDZiMGFiOGUyNmM3NDc4NmZlMWZkNmFhOGIwNTdhY2E2ZDM2OTdiNGEzMjQwODcwYmQxMGUxMDAxMmRiODAxZTNmMjQxN2FlODU3OGJiZDQyOGRkNTMwZDg1Y2NhNTZhOGI1MzMyYTkyNDc0MDE5ZmVjZDZkYjhlZTBlYzUyMmJiMDViZGY2MWMwODgyMWZiNmI4ODJkN2M0YjNiZWM4OTY1MjgzMzJlNDI5MTU0ZTUyZGQwYTczYTIyOGI2ZWQ3MmNmNmE1NGM5YjYyODM3NDcwMmU4Yzg5OWJhNDgwNWViMDc1ZTJiNzM0NzkxZWI4N2NkMzRjZmQyOTE0MGRlNmUxMzg3NDA1YzAwODA5ZWIzMjNiN2EyZGZhYmFjMGFlNDA2ZmI5MzY5YTc4YzE3ZjdiMzAwZjU1NzRlMTBhMzE5ZDRlZTFhMzZlNzYxMDE3MDk4NTEzY2RkZDliMGNkYTdiMTk4M2RlMGUzYjNiOGM0ODBhMjZkOWE1ZTU0ZTFkYTM3NDNmYzRiYzZjYTgwZDFkY2RjMDU1Yzg0ZDMwMTgzYTRkMmU3YTgzYmI4MmFlNTExMTU3NWU0ZWQ0ZGQ5ZmUzYTMzMTA5MDU2M2UzODIwMTcxY2IxOTJlZjkyMWUxODRmNWUzOTBlOGU2ZWExYzE5MDVhOWM0MTc3YjkzMDgwN2Q2M2YwZTU2ODJkODE3YWJlYjE1ZDEwNzQyN2UwZGZlMWY1N2QxY2JkNzZjNTQ0YzA5OGQyMmQ1Mzc3NjVjYTY2ZTk4YzdkMzc4NzhkYTdmZjRiYjk1ZmM3Njc5OTVkYjk4MzUzNjU3MWQ5ZTU4NWMyMzYxMGM0NTRiNGVmZTFkNGVmYTRlYmFkMzY3NWExZDNkIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJhNjcxMDc3MjdhYWRlNzkzNzVjYzEyMGQyMWI4NDUxYiIsImNvbnRlbnQiOiI4NjNlOTg5NWI1MmFmMzQ5OThkMDA2ZDJiYjlkMzYyY2QyNjgxN2IwOTBmNDFjNWE3ZmNjMTM4ZTEwMmQ5Y2Y1MTE1NjI1MTdjNThjMzFiYjhhM2ZmNjZkIn0sImp0aSI6ImE5ZTdhNDAxLTBlOGUtNGQwYi05MzQ1LWNiNjI2N2JlZWQ5MCIsImlhdCI6MTYzNjg1NTM0OSwiZXhwIjoxNjM2ODU4OTQ5fQ.LXHPjocuJvomLbX6k4OVf1qGzeROQbkhe7drK-sCSLc");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://api.iq.inrix.com/v1/segments/speed?box=37.858%7C-122.541,37.699%7C-122.341", requestOptions)
        .then(response => response.text())
        .then(result => parseAPIData(result))
        .catch(error => console.log('error', error));
    }
    getAPIData();

    async function getAppToken(){
        var tokenData;
        var appId = "f6rmtcl05k"
        var hashToken = "ZjZybXRjbDA1a3w2YU55M3Yza2x1YW9LcFVCQWdiT1RzMXZhcFVqSXRYNjBNUVljeThm";
        var url = "https://api.iq.inrix.com/auth/v1/appToken?appId="+appId+"&hashToken="+hashToken;
        tokenData = await fetchToken(url);
        var token = tokenData.result.token;
        return token;
    }

    async function fetchToken(url) {
        let response = await fetch(url);
        return await response.json();
    }

    var length = 0;

    async function getRAWData(url){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", url, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    parseRAWData(allText);
                }
            }
        }
        rawFile.send(null);
    }
    var codeRAWArray = [];
    var nameRAWArray = [];
    var coordRAWArray = [];
    var lengthRAW = 0;
    async function parseRAWData(data){
        var test = JSON.parse(data);
        var json = test.result.segments;
        lengthRAW = json.length;
        for(var lengthCounter = 0; lengthCounter < json.length; lengthCounter++){
            codeRAWArray.push(json[lengthCounter].code);
            nameRAWArray.push(json[lengthCounter].roadInfo.name);
            coordRAWArray.push(json[lengthCounter].locationInfo.center.coordinates);
        }
    }
    getRAWData("/san_fran_segments.json");

    var codeAPIArray = [];
    var currentSpeedAPIArray = [];
    var averageSpeedAPIArray = [];
    var lengthAPI = 0;
    async function parseAPIData(data){
        var test = JSON.parse(data);
        var json = test.result.segmentspeeds[0].segments;
        lengthAPI = json.length;
        for(var lengthCounter = 0; lengthCounter < json.length; lengthCounter++){
            currentSpeedAPIArray.push(json[lengthCounter].speed);
            averageSpeedAPIArray.push(json[lengthCounter].average);
            codeAPIArray.push(json[lengthCounter].code);
        }
        ridofUnique(codeAPIArray,currentSpeedAPIArray,averageSpeedAPIArray,codeRAWArray,nameRAWArray,coordRAWArray);
    }
    function strcmp(a, b) {
        if (a.toString() < b.toString()) return -1;
        if (a.toString() > b.toString()) return 1;
        return 0;
    }
    var overallArray = [];
    function ridofUnique(apiCodeArray, currentSpeedArray, averageSpeedArray, sfCodeArray, sfNameArray, sfcoordArray){
        var counter = 0;
        var high = 0;
        for(var i = 0; i < apiCodeArray.length; i++){
            for(var j = 0; j < sfCodeArray.length; j++){
                if((apiCodeArray[i] == sfCodeArray[j]) && sfNameArray[j] != null && sfcoordArray[j] != null)
                {
                    var miniArray = [];
                    miniArray.push(apiCodeArray[i]);
                    miniArray.push(sfNameArray[j]);
                    miniArray.push(sfcoordArray[j]);
                    miniArray.push(currentSpeedAPIArray[i]);
                    if(currentSpeedAPIArray[i] > high){
                        high = currentSpeedAPIArray[i];
                    }
                    miniArray.push(averageSpeedAPIArray[i]);
                    if(currentSpeedArray[i]>=(averageSpeedArray[i]*1.10)|| currentSpeedArray[i]>= (65*1.10)){
                        miniArray.push(true);
                        counter +=1;
                    }else{
                        miniArray.push(false);
                    }
                    console.log("Speed: "+ currentSpeedAPIArray[i] +" Average: "+ averageSpeedAPIArray[i] + " Differential: " + (currentSpeedArray[i]/averageSpeedArray[i])+ " Speeding: "+ miniArray[5]);
                    overallArray.push(miniArray);
                }
            }
        }
        return overallArray
    }
