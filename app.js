// Main Application Logic

// Countdown Timer
class CountdownTimer {
    constructor(elementId, targetHour = 20, targetMinute = 27) {
        this.element = document.getElementById(elementId);
        this.targetHour = targetHour;
        this.targetMinute = targetMinute;
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        let target = new Date();
        target.setHours(this.targetHour, this.targetMinute, 0, 0);

        // Si ya pasó la hora, calcular para el siguiente día
        if (now > target) {
            target.setDate(target.getDate() + 1);
        }

        const difference = target - now;
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        this.element.textContent = timeString;
    }
}

// File Explorer UI
class FileExplorer {
    constructor(contentElement, pathDisplay) {
        this.contentElement = contentElement;
        this.pathDisplay = pathDisplay;
        this.selectedItem = null;
        this.render();
    }

    render() {
        // Actualizar path display
        this.pathDisplay.textContent = fsManager.getPathDisplay();

        // Limpiar contenido
        this.contentElement.innerHTML = '';

        // Obtener contenidos
        const contents = fsManager.getPathContents();

        if (!contents) {
            this.contentElement.innerHTML = '<div class="loading">Este no es un directorio válido.</div>';
            return;
        }

        // Crear lista de items
        const items = Object.entries(contents);

        if (items.length === 0) {
            this.contentElement.innerHTML = '<div class="loading">Directorio vacío</div>';
            return;
        }

        // Agregar opción de ir atrás (si no estamos en el directorio raíz)
        const currentPath = fsManager.getPathDisplay();
        if (currentPath !== '/home/gema/workspace') {
            const backItem = document.createElement('div');
            backItem.className = 'file-item folder-item';
            backItem.innerHTML = '<span class="file-item-icon">📁</span><span class="file-item-name">.. (carpeta anterior)</span>';
            backItem.addEventListener('click', () => this.navigateBack());
            this.contentElement.appendChild(backItem);
        }

        // Agregar items
        items.sort((a, b) => {
            // Carpetas primero
            if (a[1].type !== b[1].type) {
                return a[1].type === 'folder' ? -1 : 1;
            }
            return a[0].localeCompare(b[0]);
        }).forEach(([name, item]) => {
            const itemElement = this.createItemElement(name, item);
            this.contentElement.appendChild(itemElement);
        });
    }

    createItemElement(name, item) {
        const element = document.createElement('div');
        element.className = `file-item ${item.type === 'folder' ? 'folder-item' : ''}`;

        const icon = item.type === 'folder' ? '📁' : '📄';
        const size = item.type === 'file' ? `${Math.floor(Math.random() * 50 + 5)}KB` : '';

        element.innerHTML = `
            <span class="file-item-icon">${icon}</span>
            <span class="file-item-name">${name}</span>
            ${size ? `<span class="file-item-size">${size}</span>` : ''}
        `;

        element.addEventListener('click', () => {
            this.selectItem(element, name, item);
        });

        element.addEventListener('dblclick', () => {
            this.openItem(name, item);
        });

        return element;
    }

    selectItem(element, name, item) {
        // Remover selección anterior
        const previousSelected = this.contentElement.querySelector('.file-item.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        // Marcar como seleccionado
        element.classList.add('selected');
        this.selectedItem = { name, item };
    }

    openItem(name, item) {
        if (item.type === 'folder') {
            fsManager.navigateTo(name);
            explorer.render();
        } else {
            // Mostrar archivo en terminal
            terminal.executeCommand(`cat ${name}`);
            document.getElementById('terminalInput').focus();
        }
    }

    navigateBack() {
        fsManager.navigateTo('..');
        this.render();
    }
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar contador
    const countdown = new CountdownTimer('countdown');

    // Inicializar explorador de archivos
    const explorerContent = document.getElementById('explorerContent');
    const pathDisplay = document.querySelector('.path-display');
    window.explorer = new FileExplorer(explorerContent, pathDisplay);

    // Inicializar terminal
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const terminal = new Terminal(terminalOutput, terminalInput);
    window.terminal = terminal;

    // Mensaje de bienvenida
    terminal.printLine('╔═══════════════════════════════════════╗', 'success');
    terminal.printLine('║  Espacio de Trabajo de Gema R.       ║', 'success');
    terminal.printLine('║  Laboratorio de Genómica Científica   ║', 'success');
    terminal.printLine('╚═══════════════════════════════════════╝', 'success');
    terminal.printLine('');
    terminal.printLine('Bienvenido al sistema. Escribe "ayuda" para ver los comandos disponibles.', 'success');

    // Focus en input del terminal
    terminalInput.focus();

    // Permitir click en items del explorador
    explorerContent.addEventListener('click', () => {
        terminalInput.focus();
    });
});

// Permitir navegación con doble click en archivo
document.addEventListener('dblclick', (e) => {
    if (e.target.closest('.file-item')) {
        // Ya manejado por el click handler
    }
});

// Estilos para animación de carga
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .file-item {
        animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
