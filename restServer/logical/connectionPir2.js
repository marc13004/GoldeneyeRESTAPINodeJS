const player = require('play-sound')();
var mysql = require('mysql');
var RaspiCam = require("raspicam");
var sleep = require('sleep');
var nodemailer = require('nodemailer');
var Gpio = require('onoff').Gpio;
var connection = require('../connectionDB');
var pir;

 
function ConnectionPir() 
{
	
    //fonction d'activation de la détection de présence

    this.init = function() 
    {
	
	//fonction d'arrêt du serveur en cas d'erreur
	function exit() {
	  	pir.unexport();
		};
	function restart(){
		var delai = setTimeout(function(){pirWatch();}, 20000)
	}
	function pirWatch(){
		//Instanciation du pir grâce au module onoff 
	pir = new Gpio(17, 'in', 'both');
	
	//Récupération de la valeur 0 ou 1 renvoyé par le capteur
 	pir.watch(function(err, value) {
		console.log('watch!!!');
		if (err) exit();
       
		sleep.sleep(3);        
		 
		//Si détection
 		if(value == 1) { 
			console.log('value =1!!!');
			//Déclenchement du son grâce au module play-sound
			player.play('/home/pi/goldeneye/restServer/audio/modern.mp3');	
		
			console.log('Detection!!!');

			
			//Alerte mail
			var transporter = nodemailer.createTransport('smtps://pi.alert30%40gmail.com:21111988@smtp.gmail.com');

			var mailOptions = {
			    from: '"pi.alert30" <pi.alert30@gmail.com>', 
			    to: 'audric.lespagnol@gmail.com',
			    subject: 'Alerte Detection', 
			    text: 'Detection!', 
			    html: '<b>Detection!</b>' 
			};

			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			});
		

			//Enregistrement d'une video

			var date = new Date();
			var currTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"_"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();			
			var encoding = "h264";
			var Filename = "/home/pi/goldeneye/restServer/records/" + currTime + "." + encoding;

			var delai = setTimeout(function() {
				connection.acquire(function(err,con)
		{
        		if(err)console.log(err);
			else{con.query("insert into CAMERA (video, datetime) VALUES ('"+currTime+"', NOW())", function(err, result)				
				{
				con.release();
				if(err) 
                		{
                    			console.log(err);
                		}else  {}
          			});}
		});
			}, 15000);

			//Instanciation de la camera grâce au module raspicam		
			var camera = new RaspiCam({ mode:"video", output:Filename, w:800, h:600, bitrate:10000000, framerate:15, t:20000 });
		
			camera.start();
			
			var decompte = setTimeout(function() {
				camera.stop();
			}, 25000);
			
			
			//listen for the "start" event triggered when the start method has been successfully initiated
			camera.on("start", function(){
				console.log("camera on");
			});
			
			//listen for the "read" event triggered when each new photo/video is saved
			camera.on("read", function(err, timestamp, filename){
				console.log("camera read");
			});
			
			//listen for the process to exit when the timeout has been reached
			camera.on("exit", function(){
				console.log("camera off");
			});
		
			sleep.sleep(30);
			exit();
		}

		else{
			console.log('yapersonne');
		} 

	});

 	

	//fonction d'arrêt du serveur en cas d'erreur
	function exit() {
	  	pir.unexport();
		};

	}

}
    
    //fonction d'arrêt de la détection de présence    

    this.stop = function() 
    {
 	
	exit();
	
	console.log('pir stopped!');

	function exit() {

  		pir.unexport();

	}

    };

    
}

module.exports = new ConnectionPir();
