// npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Module({
  providers: [SocketGateway],
})
export class SocketModule {}