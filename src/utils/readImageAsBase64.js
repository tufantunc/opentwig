const path = require('path');
const fs = require('fs');
const cwd = process.cwd();

module.exports = function(filePath) {
	if (!filePath || typeof filePath !== 'string') {
		return '';
	}

	const absolutePath = path.join(cwd, filePath);
	if (!fs.existsSync(absolutePath)) {
		console.warn(`Avatar file not found: ${absolutePath}. Continuing without avatar.`);
		return '';
	}

	const extension = path.extname(absolutePath).toLowerCase();

	// Validate image extensions
	const allowedExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);
	if (!allowedExtensions.has(extension)) {
		console.error(`Unsupported file type: ${extension}. Allowed image types are: ${Array.from(allowedExtensions).join(', ')}`);
		process.exit(1);
	}

	// Map extensions to MIME types and return a data URI
	const mimeByExt = {
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg',
		'.gif': 'image/gif',
		'.webp': 'image/webp',
		'.svg': 'image/svg+xml'
	};
	const mime = mimeByExt[extension];
	const base64 = fs.readFileSync(absolutePath, 'base64');
	return `data:${mime};base64,${base64}`;
}
