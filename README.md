# Blood

Aplicativo para doação de sangue com frontend (Expo/React Native) e backend (NestJS + Prisma + PostgreSQL). A proposta dele é ser uma aplicação gamificada com o intuito de dar benefécios e experiência otimizada para usuários que doem sangue de fato, assim, aumentando a quantidade de doadores e ajudando a salvar vidas.

## Estrutura do repositório

```text
frontend/   # App mobile (Expo/React Native + TypeScript)
backend/    # API (NestJS + Prisma + PostgreSQL)
```

## Tecnologias

- Frontend: Expo, React Native, React Navigation, Styled Components, TypeScript
- Backend: NestJS, Prisma ORM, Swagger

## Requisitos

- Node.js LTS (>= 18)
- npm (ou pnpm/yarn)
- PostgreSQL (local ou remoto)

## Configuração do Backend

1. Variáveis de ambiente

Crie o arquivo `backend/.env` a partir do exemplo:

```env
# backend/.env
DATABASE_URL="postgresql://user:password@localhost:5432/blood?schema=public"
JWT_SECRET="uma_chave_secreta_segura"
PORT=4000
```

2.Instalação e Prisma

```prompt de comando
cd backend
npm install
npx prisma generate
npx prisma migrate dev
```

3.Executar a API (desenvolvimento)

```prompt de comando
cd backend
npm run dev
```

- URL base: <http://localhost:4000/api>
- Swagger: <http://localhost:4000/api/docs>

### Convenções e aliases (backend)

- Prefixo global: `/api`
- Aliases TypeScript (tsconfig):
  - `@/*` → `src/*`
  - `@/domain/*`, `@/application/*`, `@/infrastructure/*`
- DTOs em `src/application/dtos/*`
- Validação global (`ValidationPipe`) já habilitada em `main.ts`

## Configuração do Frontend (Expo)

1. Instalação

```prompt de comando
cd frontend
npm install
```

1. Executar (dev)

```prompt de comando
cd frontend
npm start
# ou
npm run android
# ou
npm run ios
# ou
npm run web
```

## Licença

Este projeto é distribuído sob a licença MIT.
