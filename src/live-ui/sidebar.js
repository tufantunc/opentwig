const renderConfigForm = (config) => {
    const formContainer = document.getElementById('configForm');
    formContainer.innerHTML = '';
    
    renderThemeSection(formContainer, config);
    renderProfileSection(formContainer, config);
    renderLinksSection(formContainer, config);
    renderFooterLinksSection(formContainer, config);
    renderShareSection(formContainer, config);
    renderAdvancedSection(formContainer, config);
};

const renderThemeSection = (container, config) => {
    const section = document.createElement('div');
    section.className = 'section';
    
    const title = document.createElement('h3');
    title.className = 'section-title';
    title.textContent = 'Theme';
    
    const themeGrid = document.createElement('div');
    themeGrid.className = 'theme-grid';
    
    const themes = ['default', 'dark', 'minimal', 'colorful'];
    
    themes.forEach(theme => {
        const card = document.createElement('div');
        card.className = `theme-card ${config.theme === theme ? 'active' : ''}`;
        
        const name = document.createElement('div');
        name.className = 'theme-card-name';
        name.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        
        card.appendChild(name);
        card.addEventListener('click', () => {
            config.theme = theme;
            window.configEditor.updateConfig(config);
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            window.configEditor.autoSave(config);
        });
        
        themeGrid.appendChild(card);
    });
    
    section.appendChild(title);
    section.appendChild(themeGrid);
    container.appendChild(section);
};

const renderProfileSection = (container, config) => {
    const section = document.createElement('div');
    section.className = 'section';
    
    const title = document.createElement('h3');
    title.className = 'section-title';
    title.textContent = 'Profile';
    
    const avatarUpload = document.createElement('div');
    avatarUpload.className = 'avatar-upload';
    
    const avatarPreview = document.createElement('img');
    avatarPreview.className = 'avatar-preview';
    avatarPreview.src = config.avatar && config.avatar.path ? `/${config.avatar.path}` : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="%23e5e5e5"/><text x="24" y="30" font-size="24" text-anchor="middle" fill="%23999">👤</text></svg>';
    
    const avatarText = document.createElement('div');
    avatarText.className = 'avatar-upload-text';
    avatarText.textContent = config.avatar && config.avatar.path ? 'Click to change avatar' : 'Click to upload avatar';
    
    const avatarInput = document.createElement('input');
    avatarInput.type = 'file';
    avatarInput.accept = 'image/*';
    avatarInput.style.display = 'none';
    
    avatarUpload.addEventListener('click', () => {
        avatarInput.click();
    });
    
    avatarInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            
            try {
                const response = await fetch('/api/avatar', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    config.avatar = { path: result.path };
                    window.configEditor.updateConfig(config);
                    avatarPreview.src = `/${result.path}`;
                    avatarText.textContent = 'Click to change avatar';
                    window.configEditor.autoSave(config);
                    window.configEditor.showNotification('Avatar uploaded', 'success');
                } else {
                    window.configEditor.showNotification('Failed to upload avatar', 'error');
                }
            } catch (error) {
                console.error('Error uploading avatar:', error);
                window.configEditor.showNotification('Failed to upload avatar', 'error');
            }
        }
    });
    
    const removeAvatarBtn = document.createElement('button');
    removeAvatarBtn.className = 'btn btn-secondary';
    removeAvatarBtn.style.width = '100%';
    removeAvatarBtn.style.marginTop = '8px';
    removeAvatarBtn.textContent = 'Remove Avatar';
    removeAvatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        config.avatar = null;
        window.configEditor.updateConfig(config);
        avatarPreview.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="%23e5e5e5"/><text x="24" y="30" font-size="24" text-anchor="middle" fill="%23999">👤</text></svg>';
        avatarText.textContent = 'Click to upload avatar';
        window.configEditor.autoSave(config);
        window.configEditor.showNotification('Avatar removed', 'success');
    });
    
    avatarUpload.appendChild(avatarPreview);
    avatarUpload.appendChild(avatarText);
    avatarUpload.appendChild(avatarInput);
    
    const urlGroup = createFormGroup('URL', 'url', config.url, 'text', (value) => {
        const errors = window.configEditor.validateField('url', value);
        if (errors.length === 0) {
            config.url = value;
            window.configEditor.updateConfig(config);
            window.configEditor.autoSave(config);
        }
        return errors;
    });
    
    const nameGroup = createFormGroup('Name', 'name', config.name, 'text', (value) => {
        const errors = window.configEditor.validateField('name', value);
        if (errors.length === 0) {
            config.name = value;
            window.configEditor.updateConfig(config);
            window.configEditor.autoSave(config);
        }
        return errors;
    });
    
    const contentGroup = createFormGroup('Bio', 'content', config.content, 'textarea', (value) => {
        config.content = value;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    section.appendChild(title);
    section.appendChild(avatarUpload);
    section.appendChild(removeAvatarBtn);
    section.appendChild(urlGroup);
    section.appendChild(nameGroup);
    section.appendChild(contentGroup);
    container.appendChild(section);
};

const renderLinksSection = (container, config) => {
    const section = document.createElement('div');
    section.className = 'section';
    
    const title = document.createElement('h3');
    title.className = 'section-title';
    title.textContent = 'Links';
    
    const linksContainer = document.createElement('div');
    linksContainer.id = 'linksContainer';
    
    const addLinkBtn = document.createElement('button');
    addLinkBtn.className = 'add-link-btn';
    addLinkBtn.textContent = '+ Add Link';
    addLinkBtn.addEventListener('click', () => {
        config.links.push({ title: '', url: '' });
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        renderLinksSection(container, config);
    });
    
    section.appendChild(title);
    section.appendChild(linksContainer);
    section.appendChild(addLinkBtn);
    container.appendChild(section);
    
    config.links.forEach((link, index) => {
        renderLinkItem(linksContainer, config, link, index);
    });
};

const renderLinkItem = (container, config, link, index) => {
    const item = document.createElement('div');
    item.className = 'link-item';
    
    const header = document.createElement('div');
    header.className = 'link-item-header';
    
    const title = document.createElement('span');
    title.className = 'link-item-title';
    title.textContent = link.title || link.url || `Link ${index + 1}`;
    
    const actions = document.createElement('div');
    actions.className = 'link-item-actions';
    
    const moveUpBtn = document.createElement('button');
    moveUpBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    moveUpBtn.disabled = index === 0;
    moveUpBtn.addEventListener('click', () => {
        if (index > 0) {
            const temp = config.links[index];
            config.links[index] = config.links[index - 1];
            config.links[index - 1] = temp;
            window.configEditor.updateConfig(config);
            window.configEditor.autoSave(config);
            renderLinksSection(document.getElementById('linksContainer').parentElement, config);
        }
    });
    
    const moveDownBtn = document.createElement('button');
    moveDownBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
    moveDownBtn.disabled = index === config.links.length - 1;
    moveDownBtn.addEventListener('click', () => {
        if (index < config.links.length - 1) {
            const temp = config.links[index];
            config.links[index] = config.links[index + 1];
            config.links[index + 1] = temp;
            window.configEditor.updateConfig(config);
            window.configEditor.autoSave(config);
            renderLinksSection(document.getElementById('linksContainer').parentElement, config);
        }
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
    deleteBtn.addEventListener('click', () => {
        config.links.splice(index, 1);
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        renderLinksSection(document.getElementById('linksContainer').parentElement, config);
    });
    
    actions.appendChild(moveUpBtn);
    actions.appendChild(moveDownBtn);
    actions.appendChild(deleteBtn);
    
    header.appendChild(title);
    header.appendChild(actions);
    
    const titleInput = createFormGroup('Title', '', link.title, 'text', (value) => {
        link.title = value;
        title.textContent = value || link.url || `Link ${index + 1}`;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    const urlInput = createFormGroup('URL', '', link.url, 'text', (value) => {
        const errors = window.configEditor.validateField('url', value);
        if (errors.length === 0) {
            link.url = value;
            title.textContent = link.title || value || `Link ${index + 1}`;
            window.configEditor.updateConfig(config);
            window.configEditor.autoSave(config);
        }
        return errors;
    });
    
    item.appendChild(header);
    item.appendChild(titleInput);
    item.appendChild(urlInput);
    container.appendChild(item);
};

const renderFooterLinksSection = (container, config) => {
    const section = document.createElement('div');
    section.className = 'section';
    
    const title = document.createElement('h3');
    title.className = 'section-title';
    title.textContent = 'Footer Links';
    
    const footerLinksContainer = document.createElement('div');
    footerLinksContainer.id = 'footerLinksContainer';
    
    const addFooterLinkBtn = document.createElement('button');
    addFooterLinkBtn.className = 'add-link-btn';
    addFooterLinkBtn.textContent = '+ Add Footer Link';
    addFooterLinkBtn.addEventListener('click', () => {
        config.footerLinks.push({ title: '', url: '' });
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        renderFooterLinksSection(container, config);
    });
    
    section.appendChild(title);
    section.appendChild(footerLinksContainer);
    section.appendChild(addFooterLinkBtn);
    container.appendChild(section);
    
    config.footerLinks.forEach((link, index) => {
        renderFooterLinkItem(footerLinksContainer, config, link, index);
    });
};

const renderFooterLinkItem = (container, config, link, index) => {
    const item = document.createElement('div');
    item.className = 'link-item';
    
    const header = document.createElement('div');
    header.className = 'link-item-header';
    
    const title = document.createElement('span');
    title.className = 'link-item-title';
    title.textContent = link.title || link.content || `Footer Link ${index + 1}`;
    
    const actions = document.createElement('div');
    actions.className = 'link-item-actions';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
    deleteBtn.addEventListener('click', () => {
        config.footerLinks.splice(index, 1);
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        renderFooterLinksSection(document.getElementById('footerLinksContainer').parentElement, config);
    });
    
    actions.appendChild(deleteBtn);
    
    header.appendChild(title);
    header.appendChild(actions);
    
    const titleInput = createFormGroup('Title', '', link.title, 'text', (value) => {
        link.title = value;
        title.textContent = value || link.content || `Footer Link ${index + 1}`;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    const urlInput = createFormGroup('URL', '', link.url, 'text', (value) => {
        link.url = value;
        delete link.content;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    const contentInput = createFormGroup('Content (Modal)', '', link.content, 'textarea', (value) => {
        link.content = value;
        delete link.url;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    item.appendChild(header);
    item.appendChild(titleInput);
    item.appendChild(urlInput);
    item.appendChild(contentInput);
    container.appendChild(item);
};

const renderShareSection = (container, config) => {
    const section = document.createElement('div');
    section.className = 'section';
    
    const title = document.createElement('h3');
    title.className = 'section-title';
    title.textContent = 'Share Settings';
    
    const shareTitleGroup = createFormGroup('Share Title', '', config.share.title, 'text', (value) => {
        config.share.title = value;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    const shareUrlGroup = createFormGroup('Share URL', '', config.share.url, 'text', (value) => {
        config.share.url = value;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    const shareTextGroup = createFormGroup('Share Button Text', '', config.share.text, 'text', (value) => {
        config.share.text = value;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    section.appendChild(title);
    section.appendChild(shareTitleGroup);
    section.appendChild(shareUrlGroup);
    section.appendChild(shareTextGroup);
    container.appendChild(section);
};

const renderAdvancedSection = (container, config) => {
    const section = document.createElement('div');
    section.className = 'section';
    
    const title = document.createElement('h3');
    title.className = 'section-title';
    title.textContent = 'Advanced';
    
    const pageTitleGroup = createFormGroup('Page Title', '', config.title, 'text', (value) => {
        config.title = value;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
        return [];
    });
    
    const minifyGroup = document.createElement('div');
    minifyGroup.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = 'Minify CSS';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = config.minify;
    checkbox.addEventListener('change', (e) => {
        config.minify = e.target.checked;
        window.configEditor.updateConfig(config);
        window.configEditor.autoSave(config);
    });
    
    minifyGroup.appendChild(label);
    minifyGroup.appendChild(checkbox);
    
    section.appendChild(title);
    section.appendChild(pageTitleGroup);
    section.appendChild(minifyGroup);
    container.appendChild(section);
};

const createFormGroup = (label, name, value, type, onChange) => {
    const group = document.createElement('div');
    group.className = 'form-group';
    
    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    
    let input;
    
    if (type === 'textarea') {
        input = document.createElement('textarea');
        input.value = value || '';
        input.addEventListener('input', (e) => {
            const errors = onChange(e.target.value);
            if (errors.length > 0) {
                input.style.borderColor = '#f5222d';
                showErrors(input, errors);
            } else {
                input.style.borderColor = '';
                clearErrors(input);
            }
        });
    } else {
        input = document.createElement('input');
        input.type = type;
        input.value = value || '';
        input.addEventListener('input', (e) => {
            const errors = onChange(e.target.value);
            if (errors.length > 0) {
                input.style.borderColor = '#f5222d';
                showErrors(input, errors);
            } else {
                input.style.borderColor = '';
                clearErrors(input);
            }
        });
    }
    
    group.appendChild(labelElement);
    group.appendChild(input);
    
    return group;
};

const showErrors = (input, errors) => {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#f5222d';
    errorDiv.style.fontSize = '11px';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = errors[0];
    
    input.parentNode.appendChild(errorDiv);
};

const clearErrors = (input) => {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
};

const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
};

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleSidebar');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }
});

window.renderConfigForm = renderConfigForm;
