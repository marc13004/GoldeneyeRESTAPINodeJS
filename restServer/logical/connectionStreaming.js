
function ConnectionStreaming() 
{

    //fonction de démarrage de mjpg-streamer

    this.init = function(res,err) 
    {
	var exec = require('child_process').exec;
	var cmd = exec('/home/pi/goldeneye/mjpg-streamer/mjpg_streamer -i "/home/pi/goldeneye/mjpg-streamer/input_uvc.so" -o "/home/pi/goldeneye/mjpg-streamer/output_http.so -p 8090 -w /home/pi/goldeneye/mjpg-streamer/www"');
	if(err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'streaming failed'});
                } 
                else 
                {    
		    res.send({status: 0, message: 'streaming ok'});
                }
    };


    //fonction d'arrêt de mjpg-streamer

    this.stop = function(res, err) 
    {
        var exec = require('child_process').exec;
	var cmd = exec('pkill mjpg_streamer');
	if(err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'stop stream failed'});
                } 
                else 
                {    
		    res.send({status: 0, message: 'streaming stopped'});
                }
    };

    
}

module.exports = new ConnectionStreaming();