// api/line.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const events = req.body.events;

  if (!events || events.length === 0) {
    return res.status(200).send('No event');
  }

  const event = events[0];

  const ACCESS_TOKEN = 'チャネルアクセストークン';
  const replyToken = event.replyToken;

  // ここでは受け取ったメッセージをそのまま返す
  const message = {
    type: 'text',
    text: 'チャトちゃんtestメッセージ！'
  };

  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      replyToken,
      messages: [message]
    })
  });

  return res.status(200).send('OK');
}
