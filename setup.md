# Brief — Setup del Proyecto

Su tarea es dejar corriendo un monolito con frontend y backend en un solo repositorio. Investiguen cómo hacer cada parte; abajo está lo que deben lograr, no el paso a paso.

---

## Notas — división del trabajo

Este setup lo hacen dos devs: **Danny** y **Nicole**.

- **Fase 1 (juntos):** Danny y Nicole arrancan el setup en conjunto — inicialización del repo, npm workspaces, estructura de carpetas — hasta dejar configurados **Prettier y ESLint** compartidos en la raíz.
- **Fase 2 (en paralelo):** una vez listo lint/format, se dividen:
  - **Danny** → configura el **frontend** (`client/`): Vite + React + TypeScript + Tailwind v4 y el proxy de `/api`.
  - **Nicole** → configura el **backend** (`server/`): Express + TypeScript, conexión a PostgreSQL y endpoints bajo `/api`.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite + TypeScript + Tailwind CSS (v4) |
| Backend | Express + TypeScript |
| Base de datos | PostgreSQL (driver `pg`) |
| Calidad de código | ESLint (v9, flat config) + Prettier |
| Organización del repositorio | npm workspaces (monorepo) |

---

## Estructura de carpetas

```
myapp/
├── package.json            ← raíz: workspaces, scripts y herramientas del repo
├── eslint.config.mjs       ← ESLint compartido para client y server
├── .prettierrc.json
├── .prettierignore
├── .gitignore
├── client/                 ← FRONTEND
│   ├── vite.config.ts
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       └── index.css
└── server/                 ← BACKEND
    ├── tsconfig.json
    ├── .env                ← credenciales (NO se sube a git)
    ├── .env.example
    └── src/
        ├── index.ts        ← servidor Express
        └── db.ts           ← conexión a Postgres
```

---

## Qué debe lograr cada parte

**Raíz (workspaces)**
Configurar npm workspaces para que `client` y `server` vivan en el mismo repo y se instalen juntos con un solo `npm install`. Los scripts de la raíz deben poder levantar ambos a la vez, compilar todo y correr lint/format.

**Frontend (`client/`)**
Proyecto de Vite con React y TypeScript. Integrar Tailwind v4 (ojo: v4 cambió el método de instalación, ya no usa `tailwind.config.js` ni PostCSS). En desarrollo, Vite debe hacer *proxy* de `/api` hacia el backend para evitar CORS.

**Backend (`server/`)**
Servidor Express en TypeScript. Debe exponer sus rutas bajo `/api`, conectarse a PostgreSQL con un pool de conexiones, y leer su configuración desde variables de entorno. En producción debe servir el build del frontend.

**Base de datos**
Conexión a Postgres vía la variable `DATABASE_URL`. Dejar un endpoint de prueba que confirme que la conexión funciona.

**Calidad de código**
Una sola configuración de ESLint + Prettier compartida en la raíz, que aplique reglas correctas según la carpeta (navegador en `client`, Node en `server`). Prettier se encarga del formato; ESLint de los errores.

---

## Criterios de aceptación

El setup está terminado cuando:

- Un solo `npm run dev` levanta frontend y backend juntos.
- El frontend carga con estilos de Tailwind aplicados.
- El frontend consume un endpoint del backend (bajo `/api`) y muestra la respuesta.
- Existe un endpoint que confirma la conexión a Postgres.
- `npm run lint` pasa sin errores y `npm run format` deja todo formateado.
- El `.env` real está en `.gitignore` y existe un `.env.example` con las variables necesarias.

---

## Reglas del equipo

- Todo endpoint del backend va bajo `/api`.
- Nunca subir el `.env` real; mantener `.env.example` actualizado.
- Instalar cada dependencia en su workspace correcto (`--workspace=client` o `--workspace=server`).
- Antes de cada commit: `npm run format` y `npm run lint`.

---

## Pistas

- Tailwind v4 se integra con Vite mediante un plugin oficial; busquen la doc **actual** (los tutoriales viejos con `npx tailwindcss init` ya no aplican).
- ESLint 9 usa "flat config" (`eslint.config.mjs`), no `.eslintrc`.
- Para correr TypeScript en el backend sin compilar durante el desarrollo, investiguen `tsx`.
- Para levantar dos procesos con un solo comando de forma que funcione en cualquier sistema operativo, miren `concurrently`.

---

## Tarea pendiente — estructura de la base de datos

Una vez terminado el setup, **Danny y Nicole en conjunto** diseñan la **estructura de la base de datos**. No es implementar SQL todavía, sino dejar un **diagrama o documento** que muestre cómo se va a estructurar la base:

- Definir las tablas/entidades, sus campos y las relaciones entre ellas (uno a muchos, muchos a muchos, etc.).
- Plasmarlo en una **imagen o documento** (por ejemplo, un diagrama entidad-relación) que sirva como referencia visual del modelo.
- Guardar ese archivo en el repo para que todo el equipo lo pueda consultar.
