const electron = require("electron");
const {app, BrowserWindow, dialog} = electron;
const path = require("path");
const url = require("url");
const isDev = () => process.env.NODE_ENV === 'development';
process.env['APP_PATH'] = app.getAppPath();
const directory = isDev()?process.cwd().concat('/app'):process.env.APP_PATH;

const ElectronOnline = require('electron-online')
const connection = new ElectronOnline();

var server = require('./server/app');
var Constants = require("./server/helpers/Constants.js");
var Helper = require("./server/helpers/helper");
var app_config = app.getAppPath()+'/server/app.json';

global.APP_PATH = app.getAppPath();
let win
let ready = false;

function createWindow(options,callback){

	options = options || {};
	var config = {
		icon:path.join(directory,'/assests/icon.png'),
		width:options.width || 1366,
		height:options.height || 768
	};
	for(var key in options){
		if(!(key in config)){
			config[key] = options[key];
		}
	}
	win = new BrowserWindow(config);

	/*win.loadURL(url.format({
		pathname:path.join(directory,options.url),
		protocol:'file',
		slashes:true
	}));*/
	win.loadURL('http://localhost:3000/'+(options.url || ''));
	
	//Open devtools
	win.webContents.openDevTools();

	win.on("closed",()=>{
		win = null;
		app.quit();
	})
	const ses = win.webContents.session;

	win.once('ready-to-show', () => {
	 	win.show();
	});

	if(callback!=undefined){
		callback(win);
	}
	return win;
}

app.on("ready",function(){

	Helper.readFile(app_config)
	.then(function(config){

		server(config)
		.then(function(){

			console.log("\t-->",Helper.isEmpty(config))
			if(!Helper.isEmpty(config)){
				createWindow({
					url:'public/js/index.html#login'
				},function(){
					ready = true;
				});
			}else{
				console.log("La Aplicación está lista para ser Instalada.");
				
				connection.on('online', () => {
				  console.log('App is online!')
				  console.log("La Aplicación está lista para ser Instalada.");
				})
				 
				connection.on('offline', () => {
				  	console.log('App is offline!');
				  	if(!ready){
					  	createWindow({url:'public/js/index.html#offline'});
					}
				});
			  	if(!ready){
					createWindow({url:'public/js/index.html#wizard'},function(win){
					  	ready=true;
				  	});
			    }
			}
			console.log("Aplicación Iniciada.",config)

		},function(err){
			
		});


	},function(err){
	    if(err){
	    	createWindow({
	    		url:'public/error.html',
	    		backgroundColor:"#f85662"
	    	},function(){
				dialog.showMessageBox(win,{
					title:'Error al leer archivo',
					message:app_config
				});
	    	});
	    }
	});
});
app.on("window-all-closed",()=>{
	if(process.platform !== 'drawin'){
		app.quit()
	}
})
app.on("active",()=>{
	if(win===null){
		//createWindow()
	}
})
exports.directory = directory;
exports.Msg = function(config){
	dialog.showMessageBox(win,config);
};
