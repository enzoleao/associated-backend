import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapBoxService {
  private readonly logger = new Logger(MapBoxService.name);
  private readonly baseUrl: string;
  private readonly accessToken: string;

  constructor() {
    this.baseUrl = process.env.MAPBOX_BASE_URL as string;
    this.accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;
  }

  /**
   * Calcula distância e tempo entre dois pontos
   * @param origin [longitude, latitude]
   * @param destination [longitude, latitude]
   * @param profile perfil de navegação: 'driving', 'walking', 'cycling'
   */
  async findDistancePoints({ 
    origin,
    destination,
    profile = 'driving'
  }:{
    origin: [number, number],
    destination: [number, number],
    profile?: 'driving' | 'walking' | 'cycling' 
  }): Promise<{ distanceKm: number; durationMin: number }> {
    try {
      if (origin.some(coord => isNaN(coord)) || destination.some(coord => isNaN(coord))) {
        throw new Error('Coordenadas inválidas. Devem ser números.');
      }

      const url = `${this.baseUrl}/${profile}/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?access_token=${this.accessToken}&geometries=geojson`;

      this.logger.log(`Requisição MapBox: ${url}`);

      const response = await axios.get(url);

      const route = response.data.routes[0];
      if (!route) {
        throw new Error('Nenhuma rota encontrada');
      }

      const distanceKm = route.distance / 1000;
      const durationMin = route.duration / 60;

      return { distanceKm, durationMin };
    } catch (error: any) {
      this.logger.error('Erro ao buscar rota no MapBox', error.message);
      throw new Error('Não foi possível calcular a rota');
    }
  }
}
