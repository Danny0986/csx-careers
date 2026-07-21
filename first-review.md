# First Review — Setup del monolito (`myapp/`)

> Revisión inicial del setup entregado por **Danny** y **Nicole**.
> Fecha: 2026-07-21 · Estado general: **la app levanta y funciona**, pero hay puntos que corregir.
>
> Este documento solo señala **qué** hay que revisar. El **cómo** resolverlo queda para que Danny y Nicole lo investiguen.
>
> Cómo se probó: se levantó Postgres en un contenedor Docker y se corrió `npm run dev`.
> Resultado: frontend en `:5173`, backend en `:3000`, `/api/health` OK y `/api/db-health` OK (conexión a Postgres confirmada).

---

## ✅ Lo que está bien

- [x] `npm run dev` levanta frontend + backend juntos (concurrently).
- [x] El frontend consume `/api/health` a través del proxy de Vite (sin CORS).
- [x] Existe `/api/db-health` que confirma la conexión a Postgres.
- [x] **Prettier** está centralizado en la raíz (`.prettierrc.json` + `.prettierignore`), sin copias por workspace.
- [x] `server/.env` **NO** está trackeado en git; solo se subió `.env.example`. 👍
- [x] Los `dist/` no están trackeados.

---

## 🔴 Crítico

### 1. `node_modules/` está commiteado al repo

- **Qué:** hay **5968 archivos de `node_modules/` trackeados** (≈99% de los 6035 archivos del repo).
- **Síntoma:** el `git status` aparece lleno de cambios raros (symlinks de `.bin/`, archivos `.cmd`/`.ps1` de Windows marcados como borrados, cambios de tipo `T`). Es ruido, no cambios reales.
- **A investigar:** por qué el `.gitignore` no lo está excluyendo, y cómo dejar de trackearlo sin borrar la carpeta local.

---

## 🟡 Consolidación / limpieza

### 2. `.gitignore` disperso — falta unificar

- **Qué:** hay dos `.gitignore` dentro de la app con reglas solapadas:
  - `myapp/.gitignore` (node_modules, dist, `server/.env`, `.DS_Store`)
  - `myapp/client/.gitignore` (logs, node_modules, dist, editor, `.DS_Store`…)
- **Objetivo:** un único `.gitignore` a nivel de la app (`myapp/`) que cubra todo el proyecto.
- **Nota:** `tech-tests/.../.gitignore` es de otra carpeta ajena a la app; no tocar.

---

## 🟢 Menores / decisión de equipo

### 3. Config de ESLint — bloque muerto en la raíz

- **Contexto:** se decidió mantener un `eslint.config.js` por workspace (válido: evita meter reglas de React al server).
- **Pero:** el `myapp/eslint.config.mjs` de la raíz todavía tiene un bloque `files: ['client/**']` que **nunca se aplica** (el client usa su propio config). Es código muerto que confunde.
- **A decidir:** dejar la raíz coherente con lo que realmente lintea, sin bloques que no se usan.

---

## 🐳 Entorno / base de datos

### 4. Levantar Postgres con Docker (no instalación local)

- **Decisión de equipo:** la base de datos se levanta en un **contenedor Docker**, no instalando PostgreSQL directamente en cada máquina.
- **A hacer:** dejar configurado Docker dentro del proyecto (lado `server`) para que la DB corra en un contenedor, apuntando a las mismas credenciales de `server/.env` (`DATABASE_URL`). Que quede parte del setup, no un paso manual aparte.
- **Por qué es mejor que un Postgres sin Docker:**
  - **No ensucia el equipo:** el motor vive aislado en el contenedor; no hay que instalar Postgres en el SO ni queda rastro al borrarlo.
  - **Mismo entorno para todos:** todos corren exactamente la misma versión de Postgres definida en la config → se acaba el “en mi máquina funciona”.
  - **Onboarding de un solo comando:** un dev nuevo levanta la DB sin seguir una guía de instalación paso a paso.
  - **Reproducible y versionado:** la config de la DB queda en el repo (infraestructura como código); se puede resetear o recrear en segundos.
  - **Sin conflictos:** no choca con otros Postgres ya instalados, ni con datos o puertos de otros proyectos; cada proyecto su contenedor.

---

## ⏳ Pendiente del brief (aún no hecho)

### 5. Estructura de la base de datos

- La base `myapp` levanta pero está **vacía (sin tablas)**.
- Falta la tarea conjunta de Danny + Nicole: diagrama entidad-relación (tablas, campos, relaciones) guardado en el repo como referencia.

---

## Checklist

- [ ] 1. `node_modules/` deja de estar trackeado y el `git status` queda limpio
- [ ] 2. Un solo `.gitignore` para la app
- [ ] 3. ESLint de la raíz coherente (sin bloque muerto)
- [ ] 4. Postgres corriendo en Docker, configurado dentro del proyecto
- [ ] 5. Esquema de la base de datos diseñado y documentado (ERD)
