# depi_tracking

Backend de tracking.

## Requisitos

- Node.js `>= 24.20.0`
- Acceso a MariaDB existente

## Arranque

```bash
cp .env.example .env
```

Completa `DB_HOST_MYSQL`, `DB_USER_MYSQL`, `DB_PASS_MYSQL`, `DB_NAME_MYSQL` y `DEPI_TRACK_AUTOGES_API_KEY`.

```bash
npm install
npm run dev
```

Al iniciar:

1. valida el entorno;
2. autentica contra MariaDB;
3. si `DATABASE_SYNC_ALTER=true`, ejecuta `sequelize.sync({ alter: true })` y registra el SQL;
4. escucha HTTP.

`GET /api/health` comprueba que el proceso está vivo; no consulta la base.

`POST /api/autogestion/interactions` registra un toque de autogestión. Requiere header `x-api-key`.

## Scripts

| Script | Uso |
|---|---|
| `npm run dev` | desarrollo con watch |
| `npm run build` | compile a `dist/` |
| `npm start` | ejecuta el build |
| `npm run typecheck` | `tsc --noEmit` |
