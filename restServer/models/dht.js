var connection = require('../connectionDB');

var RaspiSensors = require('raspi-sensors');
 
function dht() 
{
    /**
     * Get ALL dht values from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from DHT11', function(err, result) 
            {
                con.release();
		if(err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'select * from DHT11 failed'});
                } 
                else 
                {
                    res.send(result);
                }
            });
        });
    };

	
this.getLastDays = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from DHT11 where datetime between ((now()) - interval 8 day) and now()', function(err, result) 
            {
                con.release();
		if(err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to find'});
                } 
                else 
                {
                    res.send(result);
                }
            });
        });
    };


    this.getNow = function(res)
    {

	var DHT11 = new RaspiSensors.Sensor({

    	type    : "DHT11",

    	pin : 0X7

	},"GoldenEye"); 

	var temp;
	var hum;

	DHT11.fetch(function(err, data) {

	    if(err) {
	
	        console.error("An error occured!");
	
	        console.error(err.cause);

		res.send({status: 1, message: 'Please check dht sensor (dht.js)'});
	
	        return;
	
    	    }
	
	if(data.type === 'Temperature')
	    temp = data.value.toFixed(1);
	if(data.type === 'Humidity')
            hum = data.value.toFixed(1);
	
	
	if(temp!=undefined && !err)
	res.send({status: 0, temp: temp, humidity: hum });

        });
	
    };

}

module.exports = new dht();