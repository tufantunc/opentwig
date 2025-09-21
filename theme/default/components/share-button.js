module.exports = function({share}) {
    if (!share) {
        return '';
    }

    return `
        <button class="icon-btn" aria-label="Share" onclick="() => navigator.share({ url: location.href, title:'${share.title}', text:'${share.text}' })">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </button>
    `;
}