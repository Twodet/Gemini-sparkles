import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your chatbot. Type 'quit' to end the chat." }
  ]);
  const [userInput, setUserInput] = useState('');
  const endOfChatRef = useRef(null);

  const pairs = [
    [/(hi|hey|hello|hola|good\s(morning|afternoon|evening))/i, [
      "Hi, how can I help you today?",
      "Hello there, how can I assist you?"
    ]],
    [/(.*)diamonds|tanzanite(.*)/i, [
      "We have several diamond bracelets, rings and watches too at relative prices depending on the diamond size."
    ]],
    [/(.*)Rose Gold bracelets(.*)/i, ["We offer 18ct bracelets with diamonds and lapiz."]],
    [/(.*)Gold facet bands and chains(.*)/i, ["We offer 18ct facet bands with zircons and chains, with or without stones—your choice!"]]
    // Add other patterns and responses as before
  ];

  const getResponse = (input) => {
    for (const [pattern, responses] of pairs) {
      if (pattern.test(input)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    const fallbackResponses = [
      "Sorry, I didn't get that.",
      "Please clarify.",
      "Pardon me?"
    ];
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const newMessages = [...messages, { sender: 'user', text: trimmedInput }];
    if (trimmedInput.toLowerCase() === 'quit') {
      newMessages.push({ sender: 'bot', text: "Goodbye! Talk to you later." });
    } else {
      const response = getResponse(trimmedInput);
      newMessages.push({ sender: 'bot', text: response });
    }

    setMessages(newMessages);
    setUserInput('');
  };

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, rgb(7, 7, 7), rgb(249, 104, 26) 40%, rgb(15, 15, 15) 60%, rgb(250, 93, 21))",
      paddingTop: "50px",
      paddingBottom: "50px"
    }}>
      <div className="container py-5">
        <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: '600px' }}>
          <div
                className="card-header text-white rounded-top-4"
                style={{
                  background: "linear-gradient(135deg, #0f0f0f, #ff5722)"
                }}
              >
                <h4 className="text-center mb-0 py-2 fw-bold">Gemini Sparkels Chatbot</h4>
              </div>
          <div
            className="card-body bg-light"
            style={{ height: '400px', overflowY: 'auto', padding: '20px' }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-pill shadow-sm text-white ${
                    msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                  }`}
                  style={{ maxWidth: '75%' }}
                >
                  <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                </div>
              </div>
            ))}
            <div ref={endOfChatRef} />
          </div>
          <form onSubmit={handleSubmit} className="card-footer d-flex gap-2 p-3 bg-white">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="form-control form-control-lg rounded-start-pill shadow-sm"
            />
            <button
              className="btn btn-lg w-100 rounded-pill fw-bold shadow-sm text-white"
              style={{
                background: "linear-gradient(135deg, #5625e9, #f56e0d)",
                border: "none"
              }}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
