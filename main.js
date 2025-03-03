document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal');
  
  // Terminal content
  const terminalContent = [
    {
      prompt: '[doganay@lab~]$',
      command: ' whoami',
      output: 'doganay'
    },
    {
      prompt: '[doganay@lab~]$',
      command: " echo 'Welcome to doganay lab'",
      output: 'Welcome to doganay lab'
    },
    {
      prompt: '[doganay@lab~]$',
      command: ' ls links/',
      output: `<div class="link" onclick="window.open('https://github.com/doganayurgupluoglu', '_blank')">
                <i class="fab fa-github"></i> github.com/doganay- Git repository
               </div>
               <div class="link" onclick="window.open('https://addons.mozilla.org/en-US/firefox/addon/doganaylab-gemini-translator/', '_blank')">
                <i class="fab fa-firefox-browser"></i> Firefox Extensions- Browser add-ons
               </div>`
    }
  ];

  // Function to scroll to bottom of terminal
  function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Function to simulate typing
  function simulateTyping(index = 0) {
    if (index >= terminalContent.length) {
      // Add blinking cursor at the end
      const finalPromptDiv = document.createElement('div');
      finalPromptDiv.className = 'command-line';
      
      const finalPromptSpan = document.createElement('span');
      finalPromptSpan.className = 'prompt';
      finalPromptSpan.textContent = '[doganay@lab~]$';
      
      const cursorSpan = document.createElement('span');
      cursorSpan.className = 'cursor';
      
      finalPromptDiv.appendChild(finalPromptSpan);
      finalPromptDiv.appendChild(cursorSpan);
      
      terminal.appendChild(finalPromptDiv);
      scrollToBottom();
      return;
    }
    
    const item = terminalContent[index];
    
    // Add command with typing effect
    const commandLineDiv = document.createElement('div');
    commandLineDiv.className = 'command-line';
    
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = item.prompt;
    
    const commandSpan = document.createElement('span');
    commandSpan.className = 'command';
    
    commandLineDiv.appendChild(promptSpan);
    commandLineDiv.appendChild(commandSpan);
    
    terminal.appendChild(commandLineDiv);
    scrollToBottom();
    
    // Simulate typing for command
    let i = 0;
    const typeCommand = () => {
      if (i < item.command.length) {
        commandSpan.textContent += item.command.charAt(i);
        i++;
        scrollToBottom();
        setTimeout(typeCommand, 50 + Math.random() * 50);
      } else {
        // After typing command, show output
        setTimeout(() => {
          const outputDiv = document.createElement('div');
          outputDiv.className = 'output';
          outputDiv.innerHTML = item.output;
          terminal.appendChild(outputDiv);
          scrollToBottom();
          
          // Move to next command after a delay
          setTimeout(() => simulateTyping(index + 1), 500);
        }, 300);
      }
    };
    
    // Start typing after a short delay
    setTimeout(typeCommand, 300);
  }

  // Add old terminal boot sequence
  function bootSequence() {
    const bootMessages = [
        "BIOS Versiyon 1.0.5 (c) 1985-1995",
        "Bellek Testi: 640K TAMAM",
        "Sistem başlatılıyor...",
        "Çekirdek modülleri yükleniyor...",
        "Doganay lab servisleri başlatılıyor...",
        "Dosya sistemleri bağlanıyor...",
        "Bağlantı kuruluyor..."
    ];
    
    let delay = 0;
    bootMessages.forEach((message, index) => {
      delay += 300;
      setTimeout(() => {
        const bootDiv = document.createElement('div');
        bootDiv.className = 'output';
        bootDiv.textContent = message;
        terminal.appendChild(bootDiv);
        scrollToBottom();
        
        // Start the typing simulation after boot sequence
        if (index === bootMessages.length - 1) {
          setTimeout(() => {
            const loginDiv = document.createElement('div');
            loginDiv.className = 'output';
            loginDiv.textContent = "Giriş başarılı!. Welcome to Doganay Lab Terminal.";
            terminal.appendChild(loginDiv);
            scrollToBottom();
            
            setTimeout(() => simulateTyping(), 500);
          }, 400);
        }
      }, delay);
    });
  }

  // Clear any existing content
  terminal.innerHTML = '';
  
  // Start with boot sequence
  bootSequence();

  // Make links clickable
  window.openLink = function(url) {
    window.open(url, '_blank');
  };
});