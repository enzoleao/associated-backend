import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CountryStatessSeeder {
  async seed() {
    const countryStates = [
      { "initials": "AC", "name": "Acre" },
      { "initials": "AL", "name": "Alagoas" },
      { "initials": "AM", "name": "Amazonas" },
      { "initials": "AP", "name": "Amapá" },
      { "initials": "BA", "name": "Bahia" },
      { "initials": "CE", "name": "Ceará" },
      { "initials": "DF", "name": "Distrito Federal" },
      { "initials": "ES", "name": "Espírito Santo" },
      { "initials": "GO", "name": "Goiás" },
      { "initials": "MA", "name": "Maranhão" },
      { "initials": "MG", "name": "Minas Gerais" },
      { "initials": "MS", "name": "Mato Grosso do Sul" },
      { "initials": "MT", "name": "Mato Grosso" },
      { "initials": "PA", "name": "Pará" },
      { "initials": "PB", "name": "Paraíba" },
      { "initials": "PE", "name": "Pernambuco" },
      { "initials": "PI", "name": "Piauí" },
      { "initials": "PR", "name": "Paraná" },
      { "initials": "RJ", "name": "Rio de Janeiro" },
      { "initials": "RN", "name": "Rio Grande do Norte" },
      { "initials": "RO", "name": "Rondônia" },
      { "initials": "RR", "name": "Roraima" },
      { "initials": "RS", "name": "Rio Grande do Sul" },
      { "initials": "SC", "name": "Santa Catarina" },
      { "initials": "SE", "name": "Sergipe" },
      { "initials": "SP", "name": "São Paulo" },
      { "initials": "TO", "name": "Tocantins" }
    ]

    for (const countryState of countryStates) {
      try {
        await prisma.countryState.upsert({
          where: { initials: countryState.initials },
          update: {},
          create: { name: countryState.name, initials: countryState.initials },
        });
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Country state "${countryState.name}" seeded successfully.`,
        );
      } catch (error) {
        console.error(
          '\x1b[31m%s\x1b[0m',
          `Error seeding country state "${countryState.name}":`,
          error,
        );
      }
    }
  }
}
