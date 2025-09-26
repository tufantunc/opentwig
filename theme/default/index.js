const avatarComponent = require('./components/avatar');
const linkComponent = require('./components/link');
const footerLinkComponent = require('./components/footer-link');
const shareButtonComponent = require('./components/share-button');
const qrComponent = require('./components/qr');
const dialogComponent = require('./components/dialog');

module.exports = function({title, url, name, content, avatar, links, footerLinks, share}) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <meta name="description" content="${content}">
      <link rel="stylesheet" href="./style.css">
      <meta property="og:title" content="tufantunc | Twitter | Linktree"/>
      <meta property="og:description" content="Merhaba."/>
      <meta property="og:url" content="${url}"/>
      <meta property="og:image" content="${url}/og-image.jpg"/>
    </head>
    <body>
      <div class="app-bg">
        <div class="card">
          <div class="top-actions">
            ${shareButtonComponent({share})}
          </div>

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
        ${qrComponent()}
      </div>
    </body>
  </html>`;
};
