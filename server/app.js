var application_root = __dirname,
    express = require("express"),
    path = require("path"); 
  //  mongoose = require('mongoose');

var app = express();

var position = {
    coordinatesX: [],
    coordinatesY: [],
    coordinatesZ: [],
    setCoord: function(name, X, Y, Z){
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

    }    
}
// Database

//mongoose.connect('mongodb://localhost/ecomm_database');

// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
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
  //employees.keys(req.params).forEach(function (key) { target[key]; })
  position.setCoord(req.params.name, req.params.x, req.params.y, req.params.z);        
  //console.log(req.params);
  return res.send(position.getCoord(req.params.name));
  //return;
});

// Launch server

app.listen(4242);