module.exports = function({avatar}) {
    // If no avatar is defined or avatar path is not provided, return empty string
    if (!avatar || !avatar.path) {
        return '';
    }
    
    // Get the original file extension from the avatar path
    const path = require('path');
    const originalExtension = path.extname(avatar.path);
    const avatarFileName = `avatar${originalExtension}`;
    
    return `
        <div class="avatar">
            <img src="./${avatarFileName}" alt="Avatar" />
        </div>
    `;
}