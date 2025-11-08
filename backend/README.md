# Blood Donation API

Backend da aplicação de doação de sangue.

## Como executar

### 1. Subir o banco de dados

```bash
docker-compose up -d
```

### 2. Executar as migrations

```bash
npx prisma migrate dev
```

### 3. Iniciar o servidor

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:4000`

## 🗄️ Banco de Dados

- **PostgreSQL 16**
- **Porta**: 5432
- **Database**: blood_donation
- **User**: postgres
- **Password**: postgres

## Comandos

```bash
# Parar o banco de dados
docker-compose down

# Ver logs do banco
docker-compose logs -f postgres

# Resetar banco de dados
docker-compose down -v
docker-compose up -d
npx prisma migrate dev

# Abrir Prisma Studio
npx prisma studio
```

## Estrutura

```
src/
├── domain/           # Entidades e interfaces
├── infrastructure/   # Implementações (Prisma, etc)
├── application/      # DTOs e casos de uso
├── auth/            # Autenticação
├── users/           # Módulo de usuários
├── donation/        # Módulo de doações
└── badges/          # Módulo de badges
```
