import { useState, useEffect, useRef } from 'react';
import { chatService, type ChatMessage } from '../services/chat';
import { useAuth } from '../hooks/useAuth';

interface ChatWindowProps {
  videoId: string;
}

export default function ChatWindow({ videoId }: ChatWindowProps) {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatService
      .connect(videoId, token)
      .then(() => {
        setConnected(true);
        setError('');
      })
      .catch((err) => {
        setError('Failed to connect to chat');
        console.error(err);
      });

    const unsubscribe = chatService.subscribe((message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      unsubscribe();
      chatService.disconnect();
    };
  }, [videoId, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSendMessage() {
    if (!newMessage.trim()) return;
    if (!connected) {
      setError('Not connected to chat');
      return;
    }

    chatService.send(newMessage);
    setNewMessage('');
  }

  return (
    <div className="flex flex-col h-96 border border-gray-300 rounded bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b font-semibold text-sm">
        Live Chat {connected && <span className="text-green-600">(Connected)</span>}
        {!connected && <span className="text-red-600">(Disconnected)</span>}
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-100 text-red-700 text-xs border-b">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">
            No messages yet. Start chatting!
          </p>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className="text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-blue-600">{msg.username}</span>
              <span className="text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-800 break-words">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {user ? (
        <div className="px-4 py-2 border-t flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            disabled={!connected}
          />
          <button
            onClick={handleSendMessage}
            disabled={!connected || !newMessage.trim()}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
          >
            Send
          </button>
        </div>
      ) : (
        <div className="px-4 py-2 border-t text-center text-sm text-gray-500">
          Login to chat
        </div>
      )}
    </div>
  );
}
