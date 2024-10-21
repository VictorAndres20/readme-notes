// npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

import { 
    WebSocketGateway, 
    WebSocketServer, 
    SubscribeMessage, 
    MessageBody,
    OnGatewayConnection 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })  // Enable CORS if required
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  // Listening for an event called 'message'
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, client: Socket): void {
    console.log('Message received:', message);
    // Broadcast message to all clients
    this.server.emit('message', message);
  }

  // Trigger when a client connects
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  // Trigger when a client disconnects
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
}