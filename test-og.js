const fs = require('fs');
const path = require('path');

const render = require('./theme/default');

const sample = {
  title: 'A <Title> & Test "Quote"',
  url: 'https://example.com/page?arg=1&other=<bad>',
  name: "O'Connor & Co <dev>",
  content: 'This is a description with <tags> & special "characters" and \'quotes\'.',
  avatar: null,
  links: [],
  footerLinks: [],
  share: {}
};

const out = render(sample);
const outPath = path.join(__dirname, 'test-output.html');
fs.writeFileSync(outPath, out);
console.log('Wrote', outPath);

// Basic assertions
function assertContainsEscaped(haystack, raw, escaped) {
  if (haystack.includes(raw)) {
    throw new Error(`Found unescaped string: ${raw}`);
  }
  if (!haystack.includes(escaped)) {
    throw new Error(`Did not find escaped string: ${escaped}`);
  }
}

// Check several values
assertContainsEscaped(out, '<Title>', '&lt;Title&gt;');
// URL should have ampersand escaped and angle brackets escaped
assertContainsEscaped(out, '&other=<bad>', '&amp;other=&lt;bad&gt;');
assertContainsEscaped(out, "O'Connor", "O&#39;Connor");
assertContainsEscaped(out, '"Quote"', '&quot;Quote&quot;');
assertContainsEscaped(out, "<tags>", '&lt;tags&gt;');

console.log('All assertions passed.');
