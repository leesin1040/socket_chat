'use strict';
// console.log('hello This is chat.js');
// 호출하면 소켓에 클라이언트 소켓 io가 담긴다
const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendBtn = document.querySelector('.send-btn');
const logBtn = document.querySelector('.log-btn');
const displayContainer = document.querySelector('.display-container');

function login(nickname) {
  socket.emit('set nickname', nickname);
  socket.emit('');
}

function send() {
  const param = {
    name: nickname.value,
    msg: chatInput.value,
  };
  chatInput.value = '';
  socket.emit('chatting', param);
}

chatInput.addEventListener('keypress', (event) => {
  // event.keyCode===13 -> 엔터이면
  if (event.keyCode === 13) {
    send();
  }
});
sendBtn.addEventListener('click', send);

// "chatting"은 채널의 이름, 확인용 메시지 - app.js에서 잘 받고 있다면 터미널에서 확인 가능
//소켓 호출 정상적인지 클라이언트에서 확인
// - app.js에서 담은 console.log가 터미널에 나올 것임.
// socket.emit('chatting', 'from front');
// 서버에서 보낸 채팅 아이디 "chatting", 서버에서 받은 data
socket.on('chatting', (data) => {
  // console.log(data);
  const { name, msg, time } = data;
  const item = new messageModel(name, msg, time);
  item.makeMsg();
  // 스크롤 가장 아래로 (최신 메시지 보기)
  displayContainer.scrollTop = displayContainer.scrollHeight;
});

function messageModel(name, msg, time) {
  // 서버에서 받는 데이터들
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeMsg = () => {
    const li = document.createElement('li');
    li.classList.add(nickname.value === this.name ? 'sent' : 'received');

    const dom = `<span class="profile">
    <i class="fa-solid fa-cat fa-xs"></i>
    <span class="user"> ${this.name} </span>
    <span class="message card">${this.msg}</span>
    <span class="time">${this.time}</span>
  </span>
    `;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}

console.log(socket);
