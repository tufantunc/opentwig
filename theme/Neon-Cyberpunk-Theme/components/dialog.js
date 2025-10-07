module.exports = function(link, index) {
    return `
        <a href="#" onclick="event.preventDefault(); document.getElementById('dialog${index}').showModal(); return false;">${link.title}</a>
        <dialog id="dialog${index}" class="modal-dialog">
            <div class="modal-content" onclick="event.stopPropagation();">
                <div class="modal-header">
                    <h3>${link.title}</h3>
                    <button class="modal-close" onclick="document.getElementById('dialog${index}').close(); return false;" aria-label="Close dialog">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${link.content}</p>
                </div>
            </div>
        </dialog>
    `;
}