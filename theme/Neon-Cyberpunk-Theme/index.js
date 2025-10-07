const avatarComponent = require('./components/avatar.js');
const linkComponent = require('./components/link.js');
const footerLinkComponent = require('./components/footer-link.js');
const shareButtonComponent = require('./components/share-button.js');
const qrComponent = require('./components/qr.js');
const dialogComponent = require('./components/dialog.js');

module.exports = function({title, url, name, content, avatar, links, footerLinks, share}) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <meta name="description" content="${content}">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="./style.css">
      <meta property="og:title" content="${title}"/>
      <meta property="og:description" content="${content}"/>
      <meta property="og:url" content="${url}"/>
      <meta property="og:image" content="${url}/og-image.jpg"/>
    </head>
    <body>
      <div class="neon-theme-wrapper">
        <div class="bg-particles">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
        </div>

        <div class="card">
          <div class="profile">
            ${avatarComponent({avatar})}
            <div class="name">${name}</div>
            <div class="tagline">${content}</div>
          </div>
          <div class="links">
            ${links.map(link => linkComponent({link})).join('')}
          </div>
          <div class="footer-links">
            ${footerLinks.map((link, index) => {
              if(link.hasOwnProperty('content')) {
                return dialogComponent(link, index);
              } else {
                return footerLinkComponent(link);
              }
            }).join('<span class="dot">•</span>')}
          </div>
        </div>

        <div class="side-panel">
            <div class="qr-box">
                ${qrComponent()}
            </div>
            <div class="share-box">
                <h3>Share This Page</h3>
                ${shareButtonComponent({share})}
            </div>
        </div>

      </div>
    </body>
  </html>`;
};