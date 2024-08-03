import React from 'react';
import { MdArrowForward, MdOutlineAttachFile, MdMenu, MdOutlineAccountCircle, MdChatBubbleOutline } from "react-icons/md";

import './assets/global.css';

type Agent = 'Usuário' | 'Chatbot';

type Message = {
  agent: Agent;
  message: string;
}

function App() {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<Message[]>([]);

  const UserAvatar: string = require('./assets/media/profile.jpg');
  const ChatbotAvatar: string = require('./assets/media/chatbot.png');

  const isMessageEmpty: boolean = message.trim().length === 0;

  React.useEffect(() => {
    const welcomeMessage: Message = {
      agent: 'Chatbot',
      message: 'Olá! como posso ajudar?'
    };

    setMessages([welcomeMessage]);
  }, []);

  function handleSendMessage(content: string): void {
    const message: Message = {
      agent: 'Usuário',
      message: content.trim()
    };

    setMessages((messages) => [...messages, message]);

    setTimeout(() => {
      const message: Message = {
        agent: 'Chatbot',
        message: `Resposta referente à pergunta "${content}"`
      };

      setMessages((messages) => [...messages, message]);
    }, 1000);

    setMessage('');
  }

  function toggleSidebar(): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');

    if (sidebar?.style.display === 'block') {
      sidebar.setAttribute('style', 'display: none');
    } else {
      sidebar?.setAttribute('style', 'display: block');
    }
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="chat" id="new-chat">
          <MdArrowForward color="white" size={20} />
          <span>Nova conversa</span>
        </div>

        {[0, 0, 0, 0, 0].map((_, index) => (
          <div className="chat">
            <MdChatBubbleOutline color="#aaa" size={20} />
            <span>Conversa {index + 1}</span>
          </div>
        ))}
      </div>

      <header>
        <button type="button">
          <MdMenu color="black" size={20} onClick={toggleSidebar} />
        </button>

        <button type="button">
          <MdOutlineAccountCircle color="black" size={20} onClick={toggleSidebar} />
        </button>
      </header>

      <div className="input-container">
        <div className="input-content">
          <button type="button">
            <MdOutlineAttachFile size={20} />
          </button>
          <input type="text" placeholder="Escreva sua mensagem" value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSendMessage(message)} />
          <button disabled={isMessageEmpty} type="button" onClick={() => handleSendMessage(message)}>
            <MdArrowForward size={20} />
          </button>
        </div>
      </div>

      <div className="content">
        {
          messages.map((message, index) => {
            const isUser: boolean = message.agent === 'Usuário';

            return (
              <div key={index} className="message">
                <img src={isUser ? UserAvatar : ChatbotAvatar} alt={message.agent} />
                <div>
                  <span>{message.agent}</span>
                  <p>{message.message}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
