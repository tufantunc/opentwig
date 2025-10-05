const fs = require('fs');
const path = require('path');
const renderTemplate = require('./theme/default/index');

const html = renderTemplate({
  title: 'Tom & Jerry <Best Show>',
  content: `O'Reilly's "Guide" & More`,
  url: 'https://example.com',
  name: 'Test User',
  avatar: '',
  links: [],
  footerLinks: [],
  share: {}
});

const outPath = path.resolve(__dirname, 'test-output.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('HTML written to', outPath);

// Basic checks
function assert(condition, msg) {
  if (!condition) {
    console.error('Assertion failed:', msg);
    process.exitCode = 1;
    throw new Error(msg);
  }
}

assert(html.includes('<title>Tom &amp; Jerry &lt;Best Show&gt;</title>'), 'title not escaped as expected');
assert(html.includes('<meta name="description" content="O&#39;Reilly&#39;s &quot;Guide&quot; &amp; More">'), 'description not escaped as expected');
assert(html.includes('<meta property="og:title" content="Tom &amp; Jerry &lt;Best Show&gt;"'), 'og:title not escaped as expected');
assert(html.includes('<meta property="og:description" content="O&#39;Reilly&#39;s &quot;Guide&quot; &amp; More"'), 'og:description not escaped as expected');
assert(html.includes('<div class="tagline">O&#39;Reilly&#39;s &quot;Guide&quot; &amp; More</div>'), 'tagline not escaped as expected');

console.log('All checks passed.');
