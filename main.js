function createLink(){
    var url = "https://segment-api.inrix.com/v1/segments/speed?"
    //var appToken = getAppToken();
    var boxData = "[37.858,-122.541], [37.858,-122.341], [37.699,-122.341], [37.699,-122.541]";
    
    return url;
}

var data;
var token;
function getAppToken(){
    var appId = "f6rmtcl05k"
    var appKey = "6aNy3v3kluaoKpUBAgbOTs1vapUjItX60MQYcy8f";
    var hashToken = "ZjZybXRjbDA1a3w2YU55M3Yza2x1YW9LcFVCQWdiT1RzMXZhcFVqSXRYNjBNUVljeThm";
    var url = "https://api.iq.inrix.com/auth/v1/appToken?appId="+appId+"&hashToken="+hashToken;
    data = fetchData(url);
    setTimeout(function(){token = data.result.token},500);
    return token;
}

async function fetchData(url) {
    let response = await fetch(url);
    data = await response.json();
    return data;
}

