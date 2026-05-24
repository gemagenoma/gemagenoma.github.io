// Terminal Command Handler

class Terminal {
    constructor(outputElement, inputElement) {
        this.outputElement = outputElement;
        this.inputElement = inputElement;
        this.commandHistory = [];
        this.historyIndex = -1;

        this.commands = {
            'ayuda': this.help.bind(this),
            'help': this.help.bind(this),
            'ls': this.listContents.bind(this),
            'list': this.listContents.bind(this),
            'cd': this.changeDirectory.bind(this),
            'cat': this.viewFile.bind(this),
            'clear': this.clear.bind(this),
            'pwd': this.printWorkingDirectory.bind(this),
            'info': this.systemInfo.bind(this),
            'whoami': this.whoami.bind(this),
            'date': this.getDate.bind(this),
            'tree': this.tree.bind(this),
            'find': this.find.bind(this),
            'search': this.find.bind(this),
            'mkdir': this.mkdir.bind(this),
            'echo': this.echo.bind(this)
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = this.inputElement.value.trim();
                if (command) {
                    this.executeCommand(command);
                    this.commandHistory.push(command);
                    this.historyIndex = this.commandHistory.length;
                    this.inputElement.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.inputElement.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.inputElement.value = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    this.inputElement.value = '';
                }
            }
        });
    }

    executeCommand(command) {
        this.printLine(`<span class="terminal-prompt">gema@workspace:${fsManager.getPathDisplay()}$</span> ${command}`, 'command');

        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.printLine(`Comando no encontrado: ${cmd}. Escribe 'ayuda' para ver comandos disponibles.`, 'error');
        }
    }

    printLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        this.outputElement.appendChild(line);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    help() {
        const helpText = `
╔════════════════════════════════════════════╗
║        COMANDOS DISPONIBLES                ║
╚════════════════════════════════════════════╝

Navegación:
  ls, list              - Listar contenido de carpeta
  cd [carpeta]          - Cambiar a carpeta
  pwd                   - Mostrar directorio actual
  cd ..                 - Ir a carpeta anterior

Visualización:
  cat [archivo]         - Ver contenido de archivo
  tree                  - Mostrar árbol de directorios
  find [término]        - Buscar archivos

Sistema:
  info                  - Información del sistema
  whoami                - Mostrar usuario actual
  date                  - Mostrar fecha y hora
  echo [texto]          - Mostrar texto

Utilidades:
  clear                 - Limpiar pantalla
  ayuda, help           - Mostrar esta ayuda

Ejemplos:
  cd projects           - Entrar en carpeta projects
  ls                    - Listar archivos actuales
  cat README.md         - Ver archivo README
  find genome           - Buscar "genome"
        `;
        this.printLine(helpText, 'success');
    }

    listContents() {
        const contents = fsManager.getPathContents();
        
        if (!contents) {
            this.printLine('Directorio vacío o archivo sin contenido.', 'error');
            return;
        }

        let listing = '<div style="margin: 5px 0;">';
        const items = Object.entries(contents).sort();
        
        for (const [name, item] of items) {
            const icon = item.type === 'folder' ? '📁' : '📄';
            const size = item.type === 'file' ? ` (${Math.floor(Math.random() * 50 + 5)}KB)` : '';
            const style = item.type === 'folder' ? 'color: #64b5f6; font-weight: bold;' : 'color: #42a5f5;';
            listing += `<div style="${style}">${icon} ${name}${size}</div>`;
        }
        
        listing += '</div>';
        this.printLine(listing, 'success');
    }

    changeDirectory(args) {
        if (args.length === 0) {
            this.printLine('Uso: cd [carpeta] o cd ..', 'error');
            return;
        }

        const target = args[0];

        if (fsManager.navigateTo(target)) {
            this.printLine(`Directorio cambiado a: ${fsManager.getPathDisplay()}`, 'success');
        } else {
            this.printLine(`Carpeta no encontrada: ${target}`, 'error');
        }
    }

    viewFile(args) {
        if (args.length === 0) {
            this.printLine('Uso: cat [archivo]', 'error');
            return;
        }

        const filename = args.join(' ');
        const file = fsManager.getFile(filename);

        if (!file) {
            this.printLine(`Archivo no encontrado: ${filename}`, 'error');
            return;
        }

        if (file.type === 'folder') {
            this.printLine(`${filename} es una carpeta, no un archivo.`, 'error');
            return;
        }

        this.printLine(`─── ${filename} ───`, 'success');
        const lines = file.content.split('\n');
        lines.forEach((line, index) => {
            this.printLine(`${String(index + 1).padStart(3, ' ')} | ${line}`);
        });
        this.printLine(`─── Fin de archivo ───`, 'success');
    }

    clear() {
        this.outputElement.innerHTML = '';
    }

    printWorkingDirectory() {
        this.printLine(fsManager.getPathDisplay(), 'success');
    }

    systemInfo() {
        const infoText = `
╔════════════════════════════════════════════╗
║     INFORMACIÓN DEL SISTEMA                ║
╚════════════════════════════════════════════╝

Sistema Operativo: Linux Genome Workstation
Kernel: 5.10.0-21-generic
Procesador: Intel Xeon W-2295 (36 cores)
RAM Total: 512 GB
Almacenamiento: 50 TB RAID SSD
Estado: OPERACIONAL ✓

Herramientas Científicas:
  ✓ GATK v4.2.6
  ✓ BWA v0.7.17
  ✓ SAMtools v1.15
  ✓ BLAST v2.12
  ✓ RStudio v2024.04
  ✓ Python 3.11 + BioPython

Usuario: gema
Laboratorio: Genómica Científica
Ubicación: Directorio de investigación
        `;
        this.printLine(infoText, 'success');
    }

    whoami() {
        this.printLine('Gema R. - Genetista Investigadora', 'success');
    }

    getDate() {
        const now = new Date();
        const dateStr = now.toLocaleString('es-ES');
        this.printLine(dateStr, 'success');
    }

    tree(args) {
        const depth = parseInt(args[0]) || 3;
        let tree = '';
        
        const buildTree = (node, prefix = '', level = 0) => {
            if (level > depth) return '';
            
            if (node.children) {
                const items = Object.entries(node.children);
                let result = '';
                
                items.forEach((item, index) => {
                    const [name, child] = item;
                    const isLast = index === items.length - 1;
                    const icon = child.type === 'folder' ? '📁' : '📄';
                    const connector = isLast ? '└── ' : '├── ';
                    const newPrefix = prefix + (isLast ? '    ' : '│   ');
                    
                    result += `${prefix}${connector}${icon} ${name}\n`;
                    
                    if (child.type === 'folder' && level < depth) {
                        result += buildTree(child, newPrefix, level + 1);
                    }
                });
                
                return result;
            }
            return '';
        };

        const current = fsManager.getCurrentFolder();
        if (current && current.type === 'folder') {
            tree = buildTree(current);
            this.printLine(`<pre>${fsManager.getPathDisplay()}\n${tree}</pre>`, 'success');
        } else {
            this.printLine('No es un directorio válido.', 'error');
        }
    }

    find(args) {
        if (args.length === 0) {
            this.printLine('Uso: find [término]', 'error');
            return;
        }

        const searchTerm = args.join(' ').toLowerCase();
        const results = [];

        const searchInFolder = (node, currentPath = '') => {
            if (node.children) {
                for (const [name, item] of Object.entries(node.children)) {
                    const fullPath = currentPath ? `${currentPath}/${name}` : name;
                    
                    if (name.toLowerCase().includes(searchTerm)) {
                        const icon = item.type === 'folder' ? '📁' : '📄';
                        results.push(`${icon} ${fullPath}`);
                    }

                    if (item.type === 'folder') {
                        searchInFolder(item, fullPath);
                    }
                }
            }
        };

        const workspace = fileSystem['/home/gema/workspace'];
        searchInFolder(workspace);

        if (results.length > 0) {
            this.printLine(`Resultados de búsqueda para: "${searchTerm}" (${results.length} encontrados)`, 'success');
            results.forEach(result => {
                this.printLine(result);
            });
        } else {
            this.printLine(`No se encontraron resultados para: "${searchTerm}"`, 'error');
        }
    }

    mkdir(args) {
        this.printLine('Función mkdir no disponible en sistema de demostración.', 'error');
    }

    echo(args) {
        if (args.length === 0) {
            this.printLine('', 'success');
        } else {
            const text = args.join(' ');
            this.printLine(text, 'success');
        }
    }
}

// Crear instancia global del terminal
let terminal = null;
