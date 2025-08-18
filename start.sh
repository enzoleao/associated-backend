#!/bin/bash
# Rodar as migrations
npx prisma migrate deploy

# Rodar os seeders
npx prisma db seed

# Iniciar o servidor
npm run start:prod