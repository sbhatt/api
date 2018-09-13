const fs = require('fs');

var DIR_TO_COLLATE = ['./bookmark/youtube'];

function isValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function collateJSON(dir){
  var errorFiles = [];
  var data = [];
  var files = fs.readdirSync(dir);

  for(var i=0; i<files.length; i++){
    var fileName = files[i];

    //Exclude index and template file
    if(fileName == "index.json" || fileName == "template.json" || fileName == "error.json"){
      continue;
    }

    var fileContent = fs.readFileSync(dir+"/"+fileName);
    if(!isValidJSONString(fileContent)){
      errorFiles.push(filePath);
      continue;
    }
    data.push(JSON.parse(fileContent));
  }

  fs.writeFileSync(dir+'/index.json',JSON.stringify(data));
  fs.writeFileSync(dir+'/error.json',JSON.stringify(errorFiles));
}


collateJSON(DIR_TO_COLLATE[0]);
