var connection = require('../connectionDB');
var mysql = require('mysql');


 
function Camera() 
{

    var currTime;

     /**
     * Get ALL videos from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from CAMERA', function(err, result) 
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

  
    /**
     * Delete a specific video
     * @params id video's id
     * @params res response
     */
    this.delete = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {	
            con.query('delete from CAMERA where idCAMERA = ?', id.idCamera, function(err, result) 
            {
                con.release();
                if(err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete'});
                } 
                else 
                {    
		    res.send({status: 0, message: 'Deleted successfully idCamera '+id.idCamera});
                }
            });
        });
    };

     /**
     * start recording video and insert name into DBB
     * @params camera req.body from android
     * @params res response
     */
     this.rec = function(camera, res) 
     {
	var date = new Date();
	currTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"_"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();	
	var encoding = "h264";
	var Filename = "/home/pi/goldeneye/restServer/records/" + currTime + "." + encoding;
	console.log(currTime);
	var statm = "insert into CAMERA (video, datetime) VALUES ('"+currTime+"', NOW())";
	
        connection.acquire(function(err, con) 
        {	
            con.query(statm, function(err) 
            {
                con.release();
                if(err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'insert into CAMERA failed: rec stopped!'});
                } 
                else
		{
		// trop lent pour lancer raspivid d'ici    
		//var exec = require('child_process').exec;
		//var cmd = exec('raspivid -o '+Filename+' -t '+camera.time*1000);
	    
		res.send({status: 0, message: 'insert into CAMERA successful: rec ok!'});
		}
            });
        });
	var exec = require('child_process').exec;
	var cmd = exec('raspivid -o '+Filename+' -t '+camera.time*1000);
	
    };
    
}

module.exports = new Camera();
