const { log } = require('console');
const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const socketIO = require('socket.io');
const moment = require('moment');

const io = socketIO(server);
// __dirname = 프로젝트 경로를 통해서 src 폴더를 실행할 것이다.
// console.log(__dirname);
app.use(express.static(path.join(__dirname, 'src')));

const PORT = process.env.PORT || 3000;

// on 메소드 연결되면 소캣에 있는 내용을 가지고 다룰 것이다.- 접속되어 있는 클라이언트로부터 메시지를 수신한다.
// connection 은 socket.io의 기본 이벤트. 사용자가 접속하면 발생한다.
io.on('connection', (socket) => {
  // console.log('연결이 되었습니다.');

  // socket.on 메서드 - 클라이언트에서 메세지를 보낸다.
  // "chatting"채널 아이디, data = 클라이언트에서 받은 데이터
  socket.on('chatting', (data) => {
    // console.log(data);
    const { name, msg } = data;
    // io.emit - 서버에서 클라이언트로 메시지 전송
    io.emit('chatting', {
      name: name,
      msg: msg,
      time: moment(new Date()).format('H:MM A'),
    });
  });
});

server.listen(PORT, () => console.log(`${PORT}서버가 구동되었어요`));
