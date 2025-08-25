import { Module } from '@nestjs/common';
import { ApiFetchService } from './service/api_fetch.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [],
  providers: [ApiFetchService],
  exports: [ApiFetchService],
})
export class ApiFetchModule {}