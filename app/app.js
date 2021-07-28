// Webサーバーを作成
// httpモジュールの読み込み、サーバーのリクエストがあった時にhandlerを実行
let app = require('http').createServer(handler);
// Socket.IOの読み込み、webサーバーとの紐付け
let io = require('socket.io')(app);
// ファイルの読み込み
let fs = require('fs');
// サーバーの待ち受け
app.listen(3000);
// サーバーにリクエストが来た時に実行
function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    // エラーの場合、500エラー
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    // 成功時はdataを表示
    res.writeHead(200);
    res.write(data);
    res.end();
  })
}
// イベントを受ける：connectionイベントで受ける
io.sockets.on('connection', function(socket){
  socket.on('emit_from_client', function(data){
    // チャット機能
    // console.log(data);
    // サーバーからemit(発信) -> socket.emit -> 接続しているソケットのみ
    // socket.emit('emit_from_server', 'hello from server ' + data);
    // socket.broadcast.emit -> 接続しているソケット以外全部
    // socket.broadcast.emit('emit_from_server',  'hello from server ' + data);
    // 名前のセット
    // socket.client_name = data.name;
    // 接続しているソケット全部
    // io.sockets.emit('emit_from_server',  '[' + socket.client_name + ']' + data.msg);

    // ルーム機能
    // ルームの名前をソケットに割り当て
    socket.join(data.room);
    // 自分がどこのルームか表示
    socket.emit('emit_from_server', 'in ' + data.room);
    // 自分がいるルームにブロードキャスト
    io.sockets.to(data.room).emit('emit_from_server', data.msg);

  });
});