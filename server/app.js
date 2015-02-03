var position = {
    names: [],
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
        return {'names': Object.keys(this.coordinatesX)};
    }
}
//// Database
//
////mongoose.connect('mongodb://localhost/ecomm_database');
//
//// Config
//

// Подключаем модуль и ставим на прослушивание 8080-порта - 80й обычно занят под http-сервер
var io = require('socket.io').listen(8080);
console.log('start socket');
// Отключаем вывод полного лога - пригодится в production'е
//io.set('log level', 100);
// Навешиваем обработчик на подключение нового клиента
io.sockets.on('connection', function (socket) {
    // Т.к. чат простой - в качестве ников пока используем первые 5 символов от ID сокета
    var ID = (socket.id).toString().substr(0, 5);
    console.log(ID);
    var time = (new Date).toLocaleTimeString();
    // Посылаем клиенту сообщение о том, что он успешно подключился и его имя
    socket.json.send({'event': 'connected', 'name': ID, 'time': time});

    // Посылаем всем остальным пользователям, что подключился новый клиент и его имя
    socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});
    // Навешиваем обработчик на входящее сообщение
    socket.on('message', function (msg) {
        console.log(msg);
        // Уведомляем клиента, что его сообщение успешно дошло до сервера
        socket.json.send(position);
        // Отсылаем сообщение остальным участникам чата

    });
    // При отключении клиента - уведомляем остальных
    socket.on('disconnect', function() {
        var time = (new Date).toLocaleTimeString();
        io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
    });
});



var sys = require("sys");
var events = require("events");

(function(){
    var heartbeat = new events.EventEmitter();
    heartbeat.addListener('beat', function() {

            console.log(position);
            io.sockets.json.send(position);

        setTimeout(function(){
            heartbeat.emit('beat');
        }, 10);
    });
    heartbeat.emit('beat');
})();

