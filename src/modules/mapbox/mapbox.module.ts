import { Module } from '@nestjs/common';
import { MapBoxService } from './services/mapbox.service';

@Module({
  controllers: [],
  providers: [MapBoxService],
  exports: [MapBoxService]
})
export class MapboxModule {}
