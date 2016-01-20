/*
Written by: Mauricio Torrejon
Date: 19/01/2016
Description: Takes a csv file with ProductId, Color and Image
	-Image field is a URL which is formatted to change the last URI component and compose a new one with "/ProductId_Color"
*/
var color = require("colors");
var fs = require("fs");
var csv = require("fast-csv");
var stream = fs.createReadStream("Images.csv");
var csvWrite = csv.format(/*{headers: true}*/),
	writableStream = fs.createWriteStream("output.csv");
csvWrite.pipe(writableStream);
//console.log(stream);
var csvStream = csv()
    .on("data", function(data){
    	if(data[2] !== undefined){
    		var index = data[2].lastIndexOf("/");
    		var newImg = data[2].substring(0, index);
    		//writes to a new file
    		if(data[1] == "")	data[1] = "default";
    		
			csvWrite.write({ProductID: data[0], Color: data[1] , Image: newImg+"/"+data[0]+"_"+data[1].split(" ").join("_")+".jpg" });
    	}
    })
    .on("end", function(){
    	csvWrite.end();
    	console.log( ("File: [output.csv] has been created from ["+stream.path+"]").green);
        console.log("Done!!!".green);
    });
stream.pipe(csvStream);
