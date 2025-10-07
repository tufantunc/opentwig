module.exports = function(link) {
    return `
        <a href="${link.url}">${link.title}</a>
    `;
}