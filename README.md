# Assistente de Voz Web

Este é um projeto de assistente de voz web que permite controlar jogos através de comandos de voz. O projeto foi convertido de uma aplicação Android para uma aplicação web pura, utilizando apenas tecnologias frontend.

## Funcionalidades

- Reconhecimento de voz em português brasileiro
- Interface inspirada no Material Design
- Controle de jogos por comandos de voz
- Interface responsiva

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Web Speech API
- Material Icons

## Como Usar

1. Abra o arquivo `index.html` em um navegador moderno (Chrome recomendado)
2. Clique no botão de microfone para iniciar o reconhecimento de voz
3. Fale um dos seguintes comandos:
   - "abrir jogo 1" ou "jogo 1"
   - "abrir jogo 2" ou "jogo 2"
   - "abrir" (para ver a lista de jogos)
   - "fechar" (para fechar)

## Requisitos

- Navegador moderno com suporte à Web Speech API
- Permissão para usar o microfone
- Conexão com a internet (para carregar as fontes e ícones)

## Estrutura do Projeto

```
web-voice-assistant/
├── index.html          # Estrutura principal da página
├── styles.css          # Estilos da aplicação
├── app.js             # Lógica do assistente de voz
└── README.md          # Documentação do projeto
```

## Limitações

- Requer HTTPS para funcionar em produção (devido às restrições de segurança do navegador)
- O reconhecimento de voz pode variar dependendo do navegador e do ambiente
- Alguns navegadores podem não suportar a Web Speech API

## Próximos Passos

- Implementar os jogos
- Adicionar mais comandos de voz
- Melhorar o feedback visual
- Adicionar suporte a mais idiomas 