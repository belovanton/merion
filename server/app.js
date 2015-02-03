var object = {
    name: '',
    X: '',
    Y: '',
    Z: '',
    type: ''
};

//// Database
//
////mongoose.connect('mongodb://localhost/ecomm_database');
//
//// Config
//


var asteroid = {name: 'asteroid-x73z', X: '146', Y: '211', Z: '131', type: 'asteroid'};
var asteroid2 = {name: 'asteroid-x73z', X: '178', Y: '221', Z: '112', type: 'asteroid'};
var asteroid3 = {name: 'asteroid-x73z', X: '193', Y: '217', Z: '102', type: 'asteroid'};

var objects = [asteroid, asteroid2, asteroid3];
// Подключаем модуль и ставим на прослушивание 8080-порта - 80й обычно занят под http-сервер
var io = require('socket.io').listen(8080);
console.log('start socket');
// Отключаем вывод полного лога - пригодится в production'е
//io.set('log level', 100);
// Навешиваем обработчик на подключение нового клиента
io.sockets.on('connection', function (socket) {
    // Т.к. чат простой - в качестве ников пока используем первые 5 символов от ID сокета
    newObject = object;
    newObject.name = (socket.id).toString().substr(0, 5);
    objects.push(newObject);
    console.log(newObject.name);

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
            console.log(objects);
            io.sockets.json.send(objects);

        setTimeout(function(){
            heartbeat.emit('beat');
        }, 10);
    });
    heartbeat.emit('beat');
})();

