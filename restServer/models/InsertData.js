
var connection = require('../connectionDB');
var RaspiSensors = require('raspi-sensors');
var schedule = require('node-schedule');

function InsertData(){

this.insert = function(err)
{
var ruleMatin = new schedule.RecurrenceRule();
ruleMatin.dayOfWeek = [0, new schedule.Range(1,7)];
ruleMatin.hour = 08;
ruleMatin.minute = 00;

var ruleMidi = new schedule.RecurrenceRule();
ruleMidi.dayOfWeek = [0, new schedule.Range(1,7)];

ruleMidi.hour = 12;
ruleMidi.minute = 00;


var ruleSoir = new schedule.RecurrenceRule();
ruleSoir.dayOfWeek = [0, new schedule.Range(1,7)];

ruleSoir.hour = 19;
ruleSoir.minute = 00;


schedule.scheduleJob(ruleMatin, function(){
insertDht();
insertBmp();
deleteAfter7Days();
if(err){console.log(err);}
});

schedule.scheduleJob(ruleMidi, function(){
insertDht();
insertBmp();
deleteAfter7Days();
if(err){console.log(err);}
});

schedule.scheduleJob(ruleSoir, function(){
insertDht();
insertBmp();
deleteAfter7Days();
if(err){console.log(err);}
});

function deleteAfter7Days(){
	connection.acquire(function(err,con)
		{
        		con.query("delete from DHT11 where datetime < ((now()) - interval 8 day)", function(err, result) 
							
				{
   				con.release();
				if(err) 
                		{
                    			console.log(err);
                		}else  {}
          			});
		});
}

function insertDht(){
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

		connection.acquire(function(err,con)
		{
        		con.query("insert into DHT11 (temperature, humidity, datetime) VALUES ("+tempDht+","+hum+", NOW())", function(err, result) 
          			{
   				con.release();
				if(err) 
                {
                    console.log(err);
                    
                }else{console.log('insert into DHT11 ok');}
          			});
		});
	}
    });
}

function insertBmp(){
	
	
	
	var BMP180 = new RaspiSensors.Sensor({

    	type    : "BMP180",

    	address : 0X77

	},"GoldenEye"); 

	var tempBmp;
	var press;
	
	BMP180.fetch(function(err, data) {

    if(err) {

        console.error("An error occured!");

        console.error(err.cause);

        return;

    }
	
	if(data.type === 'Temperature')
            tempBmp = data.value.toFixed(1);
        if(data.type === 'Pressure')
            press = (data.value / 100).toFixed(2);
	

	
	if(press!=undefined)
	{
		connection.acquire(function(err,con)
		{
        		con.query("insert into BMP180 (pression,temperature, datetime) VALUES ("+press+","+tempBmp+",NOW())", function(err, result) 
          			{
   				con.release();
				if(err) 
                {
                    console.log(err);
                    
                }else{console.log('insert into BMP180 ok');}
          			});
		});
	}
    });
}
}
}

module.exports = new InsertData();