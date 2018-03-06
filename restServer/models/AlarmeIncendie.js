var nodemailer = require('nodemailer');
const player = require('play-sound')();
var connection = require('../connectionDB');
var RaspiSensors = require('raspi-sensors');
var schedule = require('node-schedule');

function AlarmeIncendie(){

this.alarmeFeu = function(err)
{
var rule05 = new schedule.RecurrenceRule();
rule05.minute = 05;

var rule25 = new schedule.RecurrenceRule();
rule25.minute = 25;

var rule45 = new schedule.RecurrenceRule();
rule45.minute = 45;


schedule.scheduleJob(rule05, function(){
AlarmeFeu();
if(err){console.log(err);}
});
schedule.scheduleJob(rule25, function(){
AlarmeFeu();
if(err){console.log(err);}
});
schedule.scheduleJob(rule45, function(){
AlarmeFeu();
if(err){console.log(err);}
});

function AlarmeFeu(){

	var DHT11 = new RaspiSensors.Sensor({

    	type    : "DHT11",

    	pin : 0X7

	},"GoldenEye"); 
	
	
	var tempDht;
	var hum;

	DHT11.fetch(function(err, data) {

    if(err) {

        console.error("An error occured!");

        console.error(err.cause);

        return;

    }
	
	if(data.type === 'Temperature')
            tempDht= data.value.toFixed(1);
        if(data.type === 'Humidity')
            hum = data.value.toFixed(1);
	

	
	
	if(tempDht!=undefined)

	{

		if(tempDht>60){
						
			
		console.log('Alarm is on');
		player.play('./audio/smoke.mp3');
		//Alerte mail
			var transporter = nodemailer.createTransport('smtps://pi.alert30@gmail.com:21111988@smtp.gmail.com');

			var mailOptions = {
			    from: '"pi.alert30" <pi.alert30@gmail.com>', 
			    to: 'audric.lespagnol@gmail.com',
			    subject: 'Alerte Incendie', 
			    text: 'Au feu, temperature > 60°C!', 
			    html: '<b>Detection Incendie!</b>' 
			};

			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			});

		}
		
	}
    });
}
}
}
module.exports = new AlarmeIncendie();