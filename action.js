function setupAudioCommands() {
    if (annyang) {
        const commands = {
        'hello': () => alert('Hello World'),
        'change the color to *color': function(color) {
            document.body.style.backgroundColor = color.toLowerCase();
        },
        'navigate to *page': function(page) {
            const validPages = ['home', 'stocks', 'dogs'];
            if (validPages.includes(page.toLowerCase())) {
            window.location.href = `${page.toLowerCase()}.html`;
            }
        }
        };
        
        annyang.addCommands(commands);
        
        document.getElementById('turnOnAudio')?.addEventListener('click', () => {
        annyang.start();
        alert('Audio commands activated');
        });
        
        document.getElementById('turnOffAudio')?.addEventListener('click', () => {
        annyang.abort();
        alert('Audio commands deactivated');
        });
    }
    }
document.addEventListener('DOMContentLoaded', function() {
    setupAudioCommands();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});