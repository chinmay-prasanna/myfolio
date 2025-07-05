class TerminalPortfolio {
    constructor() {
        this.commandInput = document.getElementById('commandInput');
        this.commandHistory = document.getElementById('commandHistory');
        this.commandHistoryIndex = -1;
        this.commandHistoryList = [];
        
        this.portfolioData = {
            about: {
                name: "Chinmay Prasanna",
                role: "Backend Engineer / Team Lead",
                location: "Bangalore, India",
                experience: "3+ years",
                description: "Backend engineer with experience leading teams and building scalable, event-driven microservices, cloud infrastructure, and real-time systems. Passionate about distributed systems, automation, and developer productivity.",
                interests: [
                    "Distributed Systems",
                    "Cloud Infrastructure",
                    "Authentication & Security",
                    "DevOps",
                    "AI/ML Integration"
                ]
            },
            skills: {
                languages: ["Python", "JavaScript", "SQL", "Bash"],
                frameworks: ["Django", "FastAPI", "Flask", "React", "Eel"],
                databases: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "Event Store"],
                cloud: ["AWS", "GCP", "Docker", "Kubernetes", "VMs"],
                tools: [
                    "Git", "Linux", "FFmpeg", "Pytorch", "SMTP", "GraphQL", "Microservices"
                ],
                technical: [
                    "Cloud services", "Distributed Systems", "Authentication",
                    "Virtual Machines", "Backend development", "Database Design"
                ]
            },
            experience: [
                {
                    company: "Viga Entertainment",
                    position: "Backend Team Lead",
                    duration: "2023 - Present",
                    technologies: [
                        "Python", "Django", "PostgreSQL", "Redis", "Event Store", "Docker", "AWS"
                    ],
                    achievements: [
                        "Enhanced and optimized microservices for project management and production tracking, improving performance by 25% and reducing latency by 30%",
                        "Designed and integrated an event-driven database using Event Store for real-time analytics",
                        "Developed deployment strategies reducing deployment time by 6x",
                        "Managed core backend infrastructure and created APIs for ML/AI services",
                        "Established SSO-based user management and dynamic pricing/licensing models"
                    ]
                },
                {
                    company: "Viga Entertainment",
                    position: "Backend Engineer",
                    duration: "2022 - 2023",
                    technologies: [
                        "Python", "Django", "PostgreSQL", "Redis", "Docker", "AWS"
                    ],
                    achievements: [
                        "Implemented robust role-based access control across microservices",
                        "Developed and deployed microservices for AI improvements, SMTP server, and video transcoding with ffmpeg"
                    ]
                }
            ],
            projects: [
                {
                    name: "Remote File Manager",
                    description: "Host server for secure file transfers using SFTP protocol. Python backend and React frontend.",
                    technologies: ["Python", "React", "SFTP"],
                    github: "https://github.com/chinmay-prasanna/remote-file-manager/tree/feature",
                    features: [
                        "Secure file transfer",
                        "Host server spin-up",
                        "Modern UI"
                    ]
                },
                {
                    name: "Multi-SSH Client",
                    description: "Manage multiple SSH sessions concurrently. Python backend, Eel frontend, PostgreSQL for secure storage.",
                    technologies: ["Python", "Eel", "PostgreSQL"],
                    github: "https://github.com/chinmay-prasanna/easySSH/tree/master",
                    features: [
                        "Concurrent SSH management",
                        "Secure credential storage",
                        "User-friendly interface"
                    ]
                },
                {
                    name: "Self Hosted Music Server",
                    description: "Personal music streaming server with chunk-based file upload for efficient streaming. Python backend, React frontend.",
                    technologies: ["Python", "React"],
                    github: "https://github.com/chinmay-prasanna/binks-sake/tree/master",
                    features: [
                        "Music library management",
                        "Chunk-based upload/streaming",
                        "Low-latency playback"
                    ]
                },
                {
                    name: "Torrent Client",
                    description: "Python-based torrent client for streaming audio and video using the torrent protocol.",
                    technologies: ["Python"],
                    github: "https://github.com/chinmay-prasanna/easy-movie/tree/master",
                    features: [
                        "Torrent streaming",
                        "Audio/video support"
                    ]
                }
            ],
            education: {
                degree: "Bachelor of Technology",
                university: "PES University",
                graduation: "2022",
                gpa: null,
                relevant_courses: [
                    "Cloud Computing",
                    "Distributed Systems",
                    "Database Systems",
                    "Software Engineering",
                    "Computer Networks"
                ],
                schools: [
                    { name: "PES University", year: "2022" },
                    { name: "Deeksha Centre for Learning", year: "2018" },
                    { name: "National Public School", year: "2016" }
                ]
            },
            contact: {
                email: "chinmaypk2503@gmail.com",
                linkedin: "https://linkedin.com/in/chinmay-prasanna",
                github: "https://github.com/chinmay-prasanna",
                phone: "+91-99724-38640",
                location: "Bangalore, India"
            }
        };
        
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            skills: this.showSkills.bind(this),
            experience: this.showExperience.bind(this),
            projects: this.showProjects.bind(this),
            education: this.showEducation.bind(this),
            contact: this.showContact.bind(this),
            clear: this.clearTerminal.bind(this),
            ls: this.listCommands.bind(this),
            get: this.getProjectRepo.bind(this),
            curl: this.curlCommand.bind(this) // Add curl command
        };
        
        this.init();
    }
    
    init() {
        this.commandInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.commandInput.addEventListener('input', this.updateCursorPosition.bind(this));
        this.commandInput.addEventListener('click', this.updateCursorPosition.bind(this));
        this.commandInput.addEventListener('keyup', this.updateCursorPosition.bind(this));
        this.commandInput.focus();
        
        // Auto-focus on input when clicking anywhere in terminal
        document.querySelector('.terminal-body').addEventListener('click', () => {
            this.commandInput.focus();
        });
        
        // Initial cursor position
        this.updateCursorPosition();
        
        this.commandInput.addEventListener('blur', () => {
            document.querySelector('.cursor').style.visibility = 'hidden';
        });
        this.commandInput.addEventListener('focus', () => {
            document.querySelector('.cursor').style.visibility = 'visible';
        });
        
        document.addEventListener('click', (e) => {
            const terminal = document.querySelector('.terminal-container');
            if (!terminal.contains(e.target)) {
                this.commandInput.blur();
            }
        });
    }
    
    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.executeCommand();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.navigateHistory('up');
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.navigateHistory('down');
        }
    }
    
    navigateHistory(direction) {
        if (direction === 'up' && this.commandHistoryIndex < this.commandHistoryList.length - 1) {
            this.commandHistoryIndex++;
        } else if (direction === 'down' && this.commandHistoryIndex > 0) {
            this.commandHistoryIndex--;
        } else if (direction === 'down' && this.commandHistoryIndex === 0) {
            this.commandHistoryIndex = -1;
            this.commandInput.value = '';
            return;
        }
        
        if (this.commandHistoryIndex >= 0) {
            this.commandInput.value = this.commandHistoryList[this.commandHistoryIndex];
        }
    }
    
    executeCommand() {
        const command = this.commandInput.value.trim().toLowerCase();
        
        if (command === '') return;
        
        // Add to history
        this.commandHistoryList.unshift(command);
        this.commandHistoryIndex = -1;
        
        // Display command
        this.displayCommand(command);
        
        // Execute command
        const [cmd, ...args] = command.split(' ');
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.displayError(`Command not found: ${cmd}. Type 'help' for available commands.`);
        }
        
        // Clear input
        this.commandInput.value = '';
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    displayCommand(command) {
        const commandEntry = document.createElement('div');
        commandEntry.className = 'command-entry';
        
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line-display';
        
        const prompt = document.createElement('span');
        prompt.className = 'prompt-display';
        prompt.textContent = 'chinmay@portfolio:~$';
        
        const commandText = document.createElement('span');
        commandText.className = 'command-display';
        commandText.textContent = command;
        
        commandLine.appendChild(prompt);
        commandLine.appendChild(commandText);
        commandEntry.appendChild(commandLine);
        
        this.commandHistory.appendChild(commandEntry);
    }
    
    displayOutput(content, type = 'normal') {
        const output = document.createElement('div');
        output.className = `command-output ${type === 'json' ? 'json-output' : ''} ${type === 'error' ? 'error-output' : ''}`;
        output.textContent = content;
        
        const lastEntry = this.commandHistory.lastElementChild;
        if (lastEntry) {
            lastEntry.appendChild(output);
        }
    }
    
    displayError(message) {
        this.displayOutput(message, 'error');
    }
    
    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    updateCursorPosition() {
        const input = this.commandInput;
        const cursor = document.querySelector('.cursor');
        
        // Create a temporary span to measure text width
        const tempSpan = document.createElement('span');
        tempSpan.style.cssText = `
            position: absolute;
            visibility: hidden;
            white-space: pre;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            letter-spacing: 0.5px;
        `;
        tempSpan.textContent = input.value;
        
        // Add to DOM temporarily
        input.parentNode.appendChild(tempSpan);
        
        // Get the width of the text
        const textWidth = tempSpan.offsetWidth;
        
        // Remove temporary span
        input.parentNode.removeChild(tempSpan);
        
        // Position cursor at the end of text with minimal spacing
        cursor.style.left = (textWidth + 2) + 'px';
    }
    
    // Command implementations
    showHelp() {
        const helpText = `Available Commands:

help            - Show this help message
about           - Display personal information
skills          - Show technical skills
experience      - Display work experience
projects        - Show portfolio projects
projects get id - Open the GitHub repo of a project by ID
education       - Display educational background
contact         - Show contact information
clear           - Clear terminal
ls              - List available commands
curl resume     - Download resume PDF`;
        this.displayOutput(helpText);
    }
    
    showAbout() {
        const about = this.portfolioData.about;
        const jsonOutput = JSON.stringify(about, null, 2);
        this.displayOutput(jsonOutput, 'json');
    }
    
    showSkills() {
        const skills = this.portfolioData.skills;
        const jsonOutput = JSON.stringify(skills, null, 2);
        this.displayOutput(jsonOutput, 'json');
    }
    
    showExperience() {
        const experience = this.portfolioData.experience;
        const jsonOutput = JSON.stringify(experience, null, 2);
        this.displayOutput(jsonOutput, 'json');
    }
    
    showProjects(args = []) {
        // If subcommand is 'get', delegate to getProjectRepo
        if (args.length > 0 && args[0] === 'get') {
            this.getProjectRepo(args.slice(1));
            return;
        }
        // Enumerate projects with IDs
        const projects = this.portfolioData.projects.map((p, idx) => ({
            id: idx + 1,
            name: p.name,
            description: p.description,
            technologies: p.technologies,
            features: p.features
        }));
        const jsonOutput = JSON.stringify(projects, null, 2);
        this.displayOutput(jsonOutput, 'json');
    }
    
    getProjectRepo(args) {
        if (!args || args.length === 0) {
            this.displayError("Usage: projects get [project_id]");
            return;
        }
        const id = parseInt(args[0], 10);
        if (isNaN(id) || id < 1 || id > this.portfolioData.projects.length) {
            this.displayError(`Project not found: ${args[0]}`);
            return;
        }
        const project = this.portfolioData.projects[id - 1];
        if (project && project.github) {
            window.open(project.github, '_blank');
            this.displayOutput(`Opening GitHub repository for "${project.name}"...`);
        } else {
            this.displayError(`GitHub repository not found for project: ${project.name}`);
        }
    }
    
    showEducation() {
        const education = this.portfolioData.education;
        const jsonOutput = JSON.stringify(education, null, 2);
        this.displayOutput(jsonOutput, 'json');
    }
    
    showContact() {
        const contact = this.portfolioData.contact;
        const jsonOutput = JSON.stringify(contact, null, 2);
        this.displayOutput(jsonOutput, 'json');
    }
    
    clearTerminal() {
        this.commandHistory.innerHTML = '';
    }
    
    listCommands() {
        // Only show the commands listed in help
        const commands = [
            'help', 'about', 'skills', 'experience', 'projects', 'education',
            'contact', 'clear', 'ls', 'get', 'curl'
        ].join('  ');
        this.displayOutput(commands);
    }
    
    curlCommand(args) {
        if (args.length === 1 && args[0] === 'resume') {
            // Trigger download of the resume PDF
            const link = document.createElement('a');
            link.href = './Chinmay P (4).pdf';
            link.download = 'Chinmay_Prasanna_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.displayOutput('Downloading resume...');
        } else {
            this.displayError("Usage: curl resume");
        }
    }
}


// Initialize the terminal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TerminalPortfolio();
});