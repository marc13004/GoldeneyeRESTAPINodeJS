var connection = require('../connectionDB');

var RaspiSensors = require('raspi-sensors');

 
function bmp() 
{
    /**
     * Get ALL bmp values from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from bmp180', function(err, result) 
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


    this.getNow = function(res)
    {

	var BMP180 = new RaspiSensors.Sensor({

    	type    : "BMP180",

    	address : 0X77

	},"GoldenEye"); 

	var temp;
	var press;

	BMP180.fetch(function(err, data) {

    if(err) {

        console.error("An error occured!");

        console.error(err.cause);

	res.send({status: 1, message: 'Please check bmp sensor (bmp.js)'});

        return;

    }
	
	if(data.type === 'Temperature')
            temp = data.value.toFixed(1);
        if(data.type === 'Pressure')
            press = (data.value / 100).toFixed(2);
	
	
	if(press!=undefined && !err)
	res.send({ status: 0, temperature: temp, pressure: press });


    });
	
    };


}

module.exports = new bmp();