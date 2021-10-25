//To get HTML elements
const username = document.getElementById('name').value;
const roomname = document.getElementById('private').value;
const output = document.getElementById('output');
const message = document.getElementById('message');
const send = document.getElementById('send');
const feedback = document.getElementById('feedback');
const users = document.querySelector('.private-accordion');

//Socket server URL
const socket = io.connect('http://localhost:3000');

//Emitting username and roomname of newly joined user to server
socket.emit('joined-user', {
    username: username,
    roomname: roomname
})

//Sending data when user clicks send
send.addEventListener('click', () =>{
    socket.emit('chat', {
        username: username,
        message: message.value,
        roomname: roomname
    })
    message.value = '';
})

//Sending username if the user is typing
message.addEventListener('keypress', () => {
    socket.emit('typing', {username: username, roomname: roomname})
})

//Displaying the message sent from user
socket.on('chat', (data) => {
    output.innerHTML += '<p class="msg-username">' + data.username + '<br>' + '<span class="bubble">' + data.message + '</span>' + '</p>';
    feedback.innerHTML = '';
    document.querySelector('.msg-disp').scrollTop = document.querySelector('.msg-disp').scrollHeight;
})

//Displaying if a user is typing
socket.on('typing', (user) => {
    feedback.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})

//Displaying online users
socket.on('online-users', (data) =>{
    users.innerHTML = ''
    data.forEach(user => {
      users.innerHTML += '<div class="name-contain">' + '<div class="private-online-circle"><span>Online</span></div>' + `<p class="private-online-name">${user}</p>` + '</div>'
    });
})