export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const events = req.body.events;

  if (!events || events.length === 0) {
    return res.status(200).send('No event');
  }

  const event = events[0];

  // 👇 userId をログに表示
  console.log('UserID:', event.source.userId);

  // ✅ 実際のチャネルアクセストークンをここに貼る（長期アクセストークン）
  const ACCESS_TOKEN = '6c45e3bp/k09w2kFPxH5FgUm3EwmWPZO6BnEz9cWacES1UWDOKMOvNi0ZYtpSuF/WYZexpcee7ay1FKdFCQR/2XYT0WU/M6DzfpBpig6QQr2sm2EPkORA38t8Iia4v6z6NCdjjqS7w9Lu+t/SEqWYwdB04t89/1O/w1cDnyilFU=';

  const replyToken = event.replyToken;

  const message = {
    type: 'text',
    text: 'チャトちゃんtestメッセージ！'
  };

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/reply', {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LINE API Error:', errorText);
      return res.status(response.status).send('LINE API Error');
    }

    return res.status(200).send('OK');
  } catch (error) {
    console.error('Unexpected Error:', error);
    return res.status(500).send('Internal Server Error');
  }
}
