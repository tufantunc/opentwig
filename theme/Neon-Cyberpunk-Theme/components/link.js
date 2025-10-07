module.exports = function({link}) {
    return `
        <a class="link-item" href="${link.url}" target="_blank" rel="noopener">
            <span>${link.title}</span>
        </a>
    `;
}