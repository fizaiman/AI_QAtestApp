const http = require('http');
const https = require('https');

const PORT = 3001;
const API_KEY = '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';
const MODEL = 'openai/gpt-oss-120b:free';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method !== 'POST' || req.url !== '/ai') {
    res.writeHead(404); res.end('Not found'); return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    let parsed;
    try { parsed = JSON.parse(body); }
    catch { res.writeHead(400); res.end(JSON.stringify({ error: 'Invalid JSON' })); return; }

    const payload = JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: parsed.system },
        { role: 'user', content: parsed.user }
      ],
      max_tokens: 1000,
      temperature: 0.3
    });

    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const apiReq = https.request(options, apiRes => {
      let data = '';
      apiRes.on('data', chunk => data += chunk);
      apiRes.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: json.error.message }));
            return;
          }
          const result = json.choices?.[0]?.message?.content?.trim() || '';
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ result }));
        } catch {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to parse response' }));
        }
      });
    });

    apiReq.on('error', err => {
      res.writeHead(502);
      res.end(JSON.stringify({ error: 'Could not reach API: ' + err.message }));
    });

    apiReq.write(payload);
    apiReq.end();
  });
});

server.listen(PORT, () => {
  console.log(`✅  Server running at http://localhost:${PORT}`);
  console.log(`🤖  Using ${MODEL} via OpenRouter (Free!)`);
  console.log(`📄  Open test_case_generator.html in your browser`);
});
