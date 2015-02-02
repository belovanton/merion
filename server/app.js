var application_root = __dirname,
    express = require("express"),
    path = require("path"); 
  //  mongoose = require('mongoose');

var app = express();
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var position = {
    names: [],
    coordinatesX: [],
    coordinatesY: [],
    coordinatesZ: [],
    setCoord: function(name, X, Y, Z){
        this.names.push(name);
        this.coordinatesX[name]=X;
        this.coordinatesY[name]=Y;
        this.coordinatesZ[name]=Z;
    },
    getCoord: function(name){
        return {'name': name, 
                'X': this.coordinatesX[name],
                'Y': this.coordinatesY[name],
                'Z': this.coordinatesZ[name]
            };
    },
    getAllNames: function(){
        return {'names': this.names};
    }    
}
// Database

//mongoose.connect('mongodb://localhost/ecomm_database');

// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(allowCrossDomain);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});
app.get('/api/getmyposition/:name', function (req, res){
  return res.send(position.getCoord(req.params.name));
});

app.get('/api/setmyposition/:name/:x/:y/:z', function (req, res){  
  position.setCoord(req.params.name, req.params.x, req.params.y, req.params.z);        
  return res.send(position.getCoord(req.params.name));
});

app.get('/api/getallnames', function (req, res){  
  return res.send(position.getAllNames());
});
// Launch server

app.listen(4242);