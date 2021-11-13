function getData(){
    var url = "https://segment-api.inrix.com/v1/segments/speed?"
    var appToken = getAppToken();
    var boxData = "37.858|-122.541,37.699|-122.341";
    var url = "https://segment-api.inrix.com/v1/segments/speed?appToken=" + appToken + "&box=" + boxData; 
    var data = fetchData(url);
    return data;
}

function getAppToken(){
    var tokenData;
    var appId = "f6rmtcl05k"
    var appKey = "6aNy3v3kluaoKpUBAgbOTs1vapUjItX60MQYcy8f";
    var hashToken = "ZjZybXRjbDA1a3w2YU55M3Yza2x1YW9LcFVCQWdiT1RzMXZhcFVqSXRYNjBNUVljeThm";
    var url = "https://api.iq.inrix.com/auth/v1/appToken?appId="+appId+"&hashToken="+hashToken;
    tokenData = fetchData(url);
    setTimeout(function(){token = tokenData.result.token},500);
    return token;
}

async function fetchData(url) {
    let response = await fetch(url);
    var data = await response.json();
    return data;
}

