import { Injectable } from "@nestjs/common";
import { IFindAuthData } from "../../interfaces/find-auth-data.interface";
import { PlataformRepository } from "../../repositories/implementation/plataform.repositories";

@Injectable()
export class FindAuthDataUseCase {
  constructor(
    private readonly plataformRepository: PlataformRepository,
  ) {}

  async execute({ provider, provider_service }: IFindAuthData) {
    const plataformAuthData = this.plataformRepository.findAuthData({ provider, provider_service});

    return plataformAuthData
  }
}
