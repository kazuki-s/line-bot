// api/line.js

export const config = {
  api: {
    bodyParser: false,
  },
};

import { Readable } from 'stream';

async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf-8');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const rawBody = await getRawBody(req);
  const body = JSON.parse(rawBody);
  const events = body.events;

  if (!events || events.length === 0) {
    return res.status(200).send('No event');
  }

  const event = events[0];

  const ACCESS_TOKEN = 'jzcN59ozbLmEoRNvZLDqqKR5F5knZfYJshH1WIWzS0/J1Qq3KFNrPAOj38fQSrbBWYZexpcee7ay1FKdFCQR/2XYT0WU/M6DzfpBpig6QQqW/wDya8A/HUutZ6ostNExr74OE+5xGyyEwezl3xH5LAdB04t89/1O/w1cDnyilFU='; // ←ココ実際のものに！
  const replyToken = event.replyToken;

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
