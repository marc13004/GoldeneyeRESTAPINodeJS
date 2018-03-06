var player = require('play-sound')();

function alarmes()
{

   this.getalarme = function(id, res)
   {
	var erreur = false;

	switch(id){

	    case '1':
	    player.play('/home/pi/goldeneye/restServer/audio/policesiren.mp3', (err) => {
	    	if(err) erreur = true;
	    });
	    break;

	    case '2':
	    player.play('/home/pi/goldeneye/restServer/audio/smoke.mp3', (err) => {
	    	if(err) erreur = true;
	    });
	    break;

	    case '3':
	    player.play('/home/pi/goldeneye/restServer/audio/modern.mp3', (err) => {
	    	if(err) erreur = true;
	    });
	    break;

	    case '4':
	    player.play('/home/pi/goldeneye/restServer/audio/nuclear.mp3', (err) => {
	    	if(err) erreur = true;
	    });
	    break;

	    case '5':
	    player.play('/home/pi/goldeneye/restServer/audio/sw.mp3', (err) => {
	    	if(err) erreur = true;
	    });
	    break;

	    case '6':
	    player.play('/home/pi/goldeneye/restServer/audio/007.mp3', (err) => {
	    	if(err) erreur = true;
	    });
	    break;

	    case '7':
	    player.play('/home/pi/goldeneye/restServer/audio/gbu.mp3', (err) => {
	    	if(err) erreur = true;
	    });
	    break;

	    case '8':
	    player.play('/home/pi/goldeneye/restServer/audio/dogOut.mp3', (err) => {
	    	if(err) erreur = true;
	    });
	    break;

	    default: 
	    player.play('/home/pi/goldeneye/restServer/audio/modern.mp3', (err) => {
	    	if(err) erreur = true;
	    });

	}

	if(erreur==true){
	    res.send({status: 1, message: 'probleme lecture audio'});
	}
	else{
	    res.send({status: 0, message: 'alarme ok'});
	}

   }

}

module.exports = new alarmes();