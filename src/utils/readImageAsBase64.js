const path = require('path');
const fs = require('fs');
const cwd = process.cwd();

/**
 * Read an image and return either a data URI (for raster images) or the raw SVG markup (for SVG files).
 * Returns an object: { isSvg: boolean, content: string }
 */
module.exports = function(filePath) {
	if (!filePath || typeof filePath !== 'string') {
		return { isSvg: false, content: '' };
	}

	const absolutePath = path.join(cwd, filePath);
	if (!fs.existsSync(absolutePath)) {
		console.warn(`Avatar file not found: ${absolutePath}. Continuing without avatar.`);
		return { isSvg: false, content: '' };
	}

	const extension = path.extname(absolutePath).toLowerCase();

	// Validate image extensions
	const allowedExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);
	if (!allowedExtensions.has(extension)) {
		console.error(`Unsupported file type: ${extension}. Allowed image types are: ${Array.from(allowedExtensions).join(', ')}`);
		process.exit(1);
	}

	// Map extensions to MIME types
	const mimeByExt = {
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg',
		'.gif': 'image/gif',
		'.webp': 'image/webp',
		'.svg': 'image/svg+xml'
	};

	if (extension === '.svg') {
		// Return raw SVG markup (strip XML prolog if present)
		let raw = fs.readFileSync(absolutePath, 'utf8');
		raw = raw.replace(/^\s*<\?xml[^>]*>\s*/i, '');
		return { isSvg: true, content: raw };
	}

	const mime = mimeByExt[extension];
	const base64 = fs.readFileSync(absolutePath, 'base64');
	return { isSvg: false, content: `data:${mime};base64,${base64}` };
}
