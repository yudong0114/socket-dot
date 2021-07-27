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
    console.log(data);
  })
})