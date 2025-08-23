    const input = document.getElementById("userInput");
    const output = document.getElementById("output");
    let clueStage = 0;
    const introLines = [
      "Welcome..",
      "booting retro-cyber shell...",
      "loading neon modules [ok]",
      "applying glitch shaders [ok]",
      "type 'help' to see available commands"
    ];
    
    async function typeLine(text){
      return new Promise(resolve => {
        const line = document.createElement('div');
        line.className = 'line';
        output.appendChild(line);
        let i = 0;
        const id = setInterval(() => {
          line.textContent = text.slice(0, i++);
          output.parentElement.scrollTop = output.parentElement.scrollHeight;
          if (i > text.length){ clearInterval(id); resolve(); }
        }, 24);
      });
    }

    (async function boot(){
      for (const l of introLines){ await typeLine(l); }
    })();
    input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        const command = input.value.trim().toLowerCase();
        processCommand(command);
        input.value = "";
      }
    });

    function processCommand(cmd) {
      let response = "";
      if (cmd === "help") {
        response = "Available commands: help, about, clue";
      } else if (cmd === "about") {
        response = "This is a retro-cyber styled terminal built with HTML, CSS, and JS.";
      } 
      else if (cmd == "clue"){
         if (clueStage === 0) {
             response = "CLUE #1: I glow in the dark, I am bright like a sign. What am I?";
             clueStage = 1;
        } else {
        response = "You already unlocked the first clue. Try answering it!";
            }   
        }
      else if (clueStage === 1 && cmd !== "neon"){
             response = "Look Closely...";
      }
    else if (clueStage === 1 && cmd === "neon") {
      response = "Correct! CLUE #2: A story where reality isn't real, but everyone thinks it is.. Which movie?";
      clueStage = 2;
    } 
    else if (clueStage === 2 && cmd !== "matrix"){
             response = "WoW u have found the secret key <a class = 'hidden-key' href = 'notfound.html'>{CYBER-ACCESS}</a>";
    }
    else if (clueStage === 2 && cmd === "matrix") {
      response = "Ok You win here you go → <a class='hidden-key' href='https://youtu.be/xvFZjo5PgG0?feature=shared'>{CYBER-ACCESS}</a>";
      clueStage = 3;
    }
    else 
    {
        response = "Unknown command: " + cmd + " type 'help' to see available commands";
    }
      output.innerHTML += "<div class = 'command_line'>@gdg-user >> " + cmd + "</div><div class = 'command_line'>" + response + "</div>";
      output.scrollTop = output.scrollHeight;
    }