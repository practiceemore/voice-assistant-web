class VoiceAssistant {
    constructor() {
        this.voiceButton = document.getElementById('voiceButton');
        this.resultText = document.getElementById('resultText');
        this.game1Card = document.getElementById('game1Card');
        this.game2Card = document.getElementById('game2Card');
        this.recognition = null;
        this.checkSecurityContext();
        this.checkMicrophonePermission();
        this.setupSpeechRecognition();
        this.setupEventListeners();
    }

    checkSecurityContext() {
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            this.voiceButton.style.display = 'none';
            this.resultText.innerHTML = `
                <strong>Atenção:</strong> O reconhecimento de voz requer HTTPS.<br>
                Por favor, acesse o site através do GitHub Pages:<br>
                <a href="https://practiceemore.github.io/voice-assistant-web" target="_blank">
                    https://practiceemore.github.io/voice-assistant-web
                </a>
            `;
        }
    }

    async checkMicrophonePermission() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.resultText.textContent = 'Microfone detectado e funcionando!';
            stream.getTracks().forEach(track => track.stop());
        } catch (err) {
            console.error('Erro ao acessar microfone:', err);
            this.resultText.textContent = 'Erro ao acessar microfone. Verifique as permissões do navegador.';
            this.voiceButton.style.display = 'none';
        }
    }

    setupSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'pt-BR';

            this.recognition.onstart = () => {
                this.voiceButton.classList.add('listening');
                this.resultText.textContent = 'Ouvindo... (Fale agora)';
            };

            this.recognition.onend = () => {
                this.voiceButton.classList.remove('listening');
                this.resultText.textContent = 'Clique no botão para falar novamente';
            };

            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processCommand(command);
            };

            this.recognition.onerror = (event) => {
                console.error('Erro no reconhecimento de voz:', event.error);
                let errorMessage = 'Erro no reconhecimento de voz: ';
                switch(event.error) {
                    case 'no-speech':
                        errorMessage += 'Nenhuma fala detectada';
                        break;
                    case 'audio-capture':
                        errorMessage += 'Não foi possível capturar áudio';
                        break;
                    case 'not-allowed':
                        errorMessage += 'Permissão de microfone negada';
                        break;
                    default:
                        errorMessage += event.error;
                }
                this.resultText.textContent = errorMessage;
                this.voiceButton.classList.remove('listening');
            };
        } else {
            this.voiceButton.style.display = 'none';
            this.resultText.textContent = 'Seu navegador não suporta reconhecimento de voz. Use o Chrome.';
        }
    }

    setupEventListeners() {
        this.voiceButton.addEventListener('click', () => {
            if (this.recognition) {
                this.recognition.start();
            }
        });

        this.game1Card.addEventListener('click', () => {
            this.openGame(1);
        });

        this.game2Card.addEventListener('click', () => {
            this.openGame(2);
        });
    }

    processCommand(command) {
        this.resultText.textContent = `Comando reconhecido: ${command}`;
        
        if (command.includes('abrir jogo 1') || command.includes('jogo 1')) {
            this.openGame(1);
        } else if (command.includes('abrir jogo 2') || command.includes('jogo 2')) {
            this.openGame(2);
        } else if (command.includes('abrir')) {
            this.showMessage('Qual jogo você quer abrir?');
        } else if (command.includes('fechar')) {
            this.showMessage('Fechando...');
        }
    }

    openGame(gameNumber) {
        // Aqui você pode implementar a lógica para abrir os jogos
        this.showMessage(`Abrindo Jogo ${gameNumber}...`);
        // Por enquanto, apenas mostra uma mensagem
    }

    showMessage(message) {
        this.resultText.textContent = message;
    }
}

// Inicializa o assistente de voz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new VoiceAssistant();
}); 