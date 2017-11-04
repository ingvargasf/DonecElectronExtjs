const remote = require("electron").remote;
const main = remote.require('./main.js');
var path = require("path");
var Helper = remote.require("./server/helpers/helper.js");
var Constants = remote.require("./server/helpers/Constants.js");

global.BASE_PATH = 'http://localhost:3000';
global.APP_PATH = main.directory;

var app_config = path.join(global.APP_PATH,'server','app.json');
//Esta funcion incializa el proceso de renderización del Cliente, se utiliza en: /public/app/index.html
function __init(){
	console.log("..index:>\t",app_config)
	Helper.readFile(app_config)
	.then(function(config){

		if(!Helper.isEmpty(config)){
			global.config = config;
			global.instaled = true;
		}else{
			global.instaled = false;
		}

		//Conectarse al Socket que controla el proceso del Cliente.
		let socket = io.connect(global.BASE_PATH,{'forceNew':true});
		//#Variable Global para uso del Lado Cliente que administra la comunicación con el Serividor Socket.
	    global.socket = socket;
		socket.on("start",function(config){
		    console.log("Socket started",config);
		    if(!("user" in config)){
		    	console.info("Sesión reiniciada.");
				localStorage.clear();
		    }
		});
		
		socket.on("message",function(msg){
			Msg.info(msg);
		});
		
		var sync;
		socket.on('online', (msg,status) => {
			sync = global.sync || false;
			
			console.log(msg);
			console.log("sync: ",sync);
			socket.emit("onsync",sync);
			
		  	Msg.info('Donec is online!')
		});
		socket.on('offline', (msg,status) => {
			sync = global.sync || false;
			console.log("sync: ",sync);
			socket.emit("onsync",sync);
			Msg.info('Donec is offline!')
		});
		socket.on('sync', (msg,status) => {
			Msg.info(msg);
		});
		console.log("Donec",global.instaled);

	},function(err){
		alert(err);
		global.instaled = false;
	});
}