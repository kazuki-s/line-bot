// send.js
const axios = require('axios');

const ACCESS_TOKEN = 'ここにチャネルアクセストークン';
const USER_ID = 'ここに送る相手のユーザーID';

axios.post('https://api.line.me/v2/bot/message/push',
  {
    to: USER_ID,
    messages: [
      {
        type: 'text',
        text: 'チャトちゃんtestメッセージ！'
      }
    ]
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    }
  }
).then(() => {
  console.log('送信完了');
}).catch((err) => {
  console.error(err.response.data);
});
