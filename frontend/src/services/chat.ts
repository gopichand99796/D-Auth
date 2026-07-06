export interface ChatMessage {
  username: string;
  message: string;
  timestamp: string;
}

class ChatService {
  private ws: WebSocket | null = null;
  private url: string;
  private videoId: string = '';
  private listeners: ((message: ChatMessage) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  constructor() {
    const baseUrl = import.meta.env.VITE_API_URL
      ? String(import.meta.env.VITE_API_URL).replace(/\/api$/, '')
      : 'http://localhost:5001';
    this.url = baseUrl.replace(/^http/, 'ws');
  }

  connect(videoId: string, token: string | null): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      this.videoId = videoId;
      try {
        this.ws = new WebSocket(
          `${this.url}/ws?videoId=${videoId}${token ? `&token=${token}` : ''}`
        );

        this.ws.onopen = () => {
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data) as ChatMessage;
            this.notifyListeners(message);
          } catch (err) {
            console.error('Error parsing chat message:', err);
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          this.attemptReconnect(token);
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  private attemptReconnect(token: string | null) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        this.connect(this.videoId, token).catch(() => {
          console.log('Reconnection attempt failed');
        });
      }, this.reconnectDelay);
    }
  }

  send(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
        })
      );
    }
  }

  subscribe(listener: (message: ChatMessage) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(message: ChatMessage): void {
    this.listeners.forEach((listener) => listener(message));
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners = [];
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export const chatService = new ChatService();
