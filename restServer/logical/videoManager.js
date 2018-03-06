/*var send = require('koa-send');
var Koa = require('koa');
var app = new Koa();*/
var sleep = require('sleep');
var http = require('http');
var fs = require('fs');

function video()
{

	this.postTele = function(req,res,err)
	{		
		var video = req.body.video;
		var fileSize;
		statm = '/home/pi/goldeneye/restServer/records/'+video+'.mp4';
		var _server = null;
		console.log(statm);
		var exec = require('child_process').exec;
		var cmd = exec('sudo avconv -r 30 -i /home/pi/goldeneye/restServer/records/'+video+'.h264 -vcodec copy  /home/pi/goldeneye/restServer/records/'+video+'.mp4',function listen() {
  		
			_server = http.createServer(function(request, response){
				if(request.method === "GET"){
				var rStream = fs.createReadStream(statm);
				rStream.pipe(response);
				rStream.on('end',function exit(){
  					console.log('port 3001 close');
					console.log(fileSize);
					_server.close();
				});
				rStream.on('error',function (err){
  					console.log('err');
					_server.close();
				});
				}
			});
			_server.listen(3001);
			console.log('listening on port 3001 '+ video+'.mp4');
			if(err){console.log('erreur dans VideoManager.postTele '+err);
				res.send({status: 1, message:'video not ready to be downloaded'+ err});
			}
			else{
				getFileSize();
				console.log(' size: '+fileSize+' statm: '+statm);
				res.send({status: 0, size: fileSize, message:'video ready to be downloaded'});
			}
			});
			function getFileSize(){
					var stats = fs.statSync(statm);
					var fileSizeInBytes = stats["size"];
					var fileSizeInMegaBytes = fileSizeInBytes/1000000;
					fileSize = fileSizeInMegaBytes
					console.log('fileSize: '+fileSize);
				}
			//var listenApp = setTimeout(listen,10000);
			//var timeout = setTimeout(exit,30000);

			//function onEnd(){if(req.method === "GET"){req.on('end', console.log('hello onEnd'););}}
			
			/*function listen() {
  			app.use(function *(){
			yield send(this,this.path,{root: statm}, onEnd());
			console.log('statm: '+statm);
			});
			_server = app.listen(3001);
			console.log('listening on port 3001 '+ video+'.mp4');
			if(err){console.log('erreur dans VideoManager.postTele '+err);
				res.send({status: 1, message:'video not ready to be downloaded'+ err});
			}
			else{
				getFileSize();
				console.log(' size: '+fileSize+' statm: '+statm);
				res.send({status: 0, message:'video ready to be downloaded'});
			}
			});*/
			
    };

/**
     * delete video from raspberry;
     * @params user req.body from android
     * @params res response
     */
this.deleteVideo = function(user,res,err)
	{
			console.log(user.video);
			var exec = require('child_process').exec;
			var cmd = exec('rm /home/pi/goldeneye/restServer/records/'+user.video+'.h264 /home/pi/goldeneye/restServer/records/'+user.video+'.mp4');
			if(err){console.log('erreur dans VideoManager.deleteVideo '+err);}

    };
/**
     * stop recording video;
     * @params res response
     */
 
	this.stoprec = function(res, err)
	{
			var exec = require('child_process').exec;
			var cmd = exec('pkill raspivid');
			if(err){console.log(err.stack);
				res.send({status: 1, message: 'stopRec failed'});
				}else{
			res.send({status: 0, message: 'rec killed'});
			}
	};

}
module.exports = new video();	
		