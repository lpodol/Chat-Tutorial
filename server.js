var fs = require("fs");
var http = require("http");
var server = http.createServer(function(request, response){
  var path = request.url;
  var last3Chars = path.slice(path.length-3,path.length);
  var last4Chars = path.slice(path.length-4,path.length);
  var pathSplit = path.split("/"); //path split by the slash
  if(last4Chars === "html" || last4Chars === ".css" || last3Chars === ".js"){ //if last 3 or 4 chars are html of portfolio then
    //console.log(pathSplit);
    if (pathSplit.length > 2){ // if the split path is for portfolio (greater then 2 ex: index/project) ***MEMO*** pathSplit("/") <<< this has a empty space at index[0]
      var readPathFile = pathSplit.splice(1, pathSplit.length); //array of pathsplit[1] and pathsplit[2]
      //console.log(readPathFile);
      var readProjPath = readPathFile[0] + "/" + readPathFile[1]; //takes the index of previous and joins
      fs.readFile(readProjPath, function(err, data){
        response.end(data);
      });
    }
    //if the path does not have portfolio projects
    else if (pathSplit.length <= 2){
      var readProjPath = pathSplit.splice(1,1);
      console.log(readProjPath);
      fs.readFile(readProjPath.join(), function(err, data){
        response.end(data);
      });
    }
  }
  else if (path === "/"){
    fs.readFile("intro.html", function(err, data){
      response.end(data);
    });
  }
  else if (path.slice(path.length-4,path.length) === ".png"){
    var readPng = path.split("/").splice(2, 1).join();
    //console.log(readPng);
    fs.readFile("images/"+readPng, function(err, data){
      response.end(data);
    });
  }
});
server.listen(2000);
