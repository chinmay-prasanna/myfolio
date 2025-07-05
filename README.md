# Terminal Portfolio - Backend Developer

A terminal-style portfolio website for backend developers, built with HTML, CSS, and JavaScript.

## Features

- **Terminal Interface**: Authentic terminal experience with command-line navigation
- **JSON Responses**: All portfolio data is displayed in JSON format, perfect for backend developers
- **Command History**: Navigate through previous commands using arrow keys
- **Responsive Design**: Works on desktop and mobile devices
- **Real Terminal Commands**: Includes familiar commands like `ls`, `cat`, `pwd`, `date`, etc.

## Available Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Display personal information |
| `skills` | Show technical skills and technologies |
| `experience` | Display work experience |
| `projects` | Show portfolio projects |
| `education` | Display educational background |
| `contact` | Show contact information |
| `clear` | Clear terminal screen |
| `ls` | List available commands |
| `whoami` | Show current user info |
| `pwd` | Show current directory |
| `date` | Show current date and time |
| `echo [text]` | Echo the provided text |
| `cat [file]` | Display file contents (about, skills, etc.) |

## Usage

1. Open `index.html` in your web browser
2. Type `help` to see all available commands
3. Use arrow keys (↑↓) to navigate through command history
4. All portfolio data is displayed in JSON format

## Customization

### Personal Information
Edit the `portfolioData` object in `script.js` to customize your information:

```javascript
this.portfolioData = {
    about: {
        name: "Your Name",
        role: "Your Role",
        // ... other fields
    },
    skills: {
        languages: ["Your", "Programming", "Languages"],
        // ... other skill categories
    },
    // ... other sections
};
```

### Styling
Modify `styles.css` to change colors, fonts, and layout:

- Terminal colors: Modify the color variables in the CSS
- Font: Change the `font-family` property
- Layout: Adjust the terminal container dimensions

### Adding New Commands
To add new commands, extend the `commands` object in `script.js`:

```javascript
this.commands = {
    // ... existing commands
    newcommand: this.newCommandFunction.bind(this)
};
```

Then implement the command function:

```javascript
newCommandFunction(args) {
    // Your command logic here
    this.displayOutput("Command output");
}
```

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## File Structure

```
myfolio/
├── index.html      # Main HTML file
├── styles.css      # Terminal styling
├── script.js       # Terminal functionality
└── README.md       # This file
```

## Features for Backend Developers

- **JSON Format**: All data is displayed in JSON format, familiar to backend developers
- **API-like Structure**: Portfolio data is organized like a REST API response
- **Terminal Commands**: Real terminal commands like `cat`, `ls`, `pwd`
- **Command History**: Similar to bash history functionality
- **Error Handling**: Proper error messages for invalid commands

## License

This project is open source and available under the MIT License. 