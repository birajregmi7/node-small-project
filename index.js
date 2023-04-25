const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname,'support.html'));
});

io.on('connection', (socket) => {
  socket.emit('message', 'Hi, how can I help you?');

  socket.on('reply', (msg) => {
    const randomAnswers = [
      'Hello I will help you.',
      'I am here to assist you.',
      'Let me check that for you.',
      'Can you please provide more information?'
    ];

    const randomIndex = Math.floor(Math.random() * randomAnswers.length);
    const reply = randomAnswers[randomIndex];
    socket.emit('message', reply);
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
