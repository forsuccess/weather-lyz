var apiName = "http://api.jirengu.com/weather.php";
var http = require("http");


http.get(apiName, (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  var error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`);
  }

  res.setEncoding('utf8');
  var rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      var parsedData = JSON.parse(rawData);
      var weatherInfo=parsedData["results"][0];
      var weatherDate=weatherInfo["weather_data"][0];
      var weatherIndex=weatherInfo["index"][0];

      console.log("�����ǣ�",parsedData["date"]);
      console.log("�����ڵĳ��У�",weatherInfo["currentCity"]);
      console.log("������",weatherDate["weather"]+weatherDate["wind"]+weatherDate["temperature"]);
      console.log("���½��飺",weatherIndex["des"]);
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});