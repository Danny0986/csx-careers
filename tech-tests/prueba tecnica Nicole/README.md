# Frontend - CSX Careers

Archivo README.md con instrucciones para ejecutar el proyecto, dentro de una carpeta en el repositorio compartido.

## Descripcion

Frontend desarrollado con React y Vite para una aplicacion de lista de tareas.

La aplicacion permite:

- Agregar nuevas tareas.
- Evitar agregar tareas vacias mostrando un mensaje de error.
- Marcar tareas como completadas.
- Eliminar tareas.
- Cargar usuarios desde una API publica con `fetch`.
- Mostrar estado de carga y mensajes de error si la peticion falla.

Tambien incluye una interfaz visual con colores pastel, tarjetas para tareas y usuarios, y una imagen decorativa ubicada en `src/assets/chica.jpg`.

## Requisitos

- Node.js instalado.
- npm instalado.

## Instalacion

Desde la raiz del repositorio, ingresa a la carpeta del frontend:

```bash
cd frontend
```

Instala las dependencias del proyecto:

```bash
npm install
```

## Ejecucion en desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego abre en el navegador la URL que muestra la terminal. 

```text
http://localhost:5173
```

## Build de produccion

Para generar los archivos de produccion:

```bash
npm run build
```

## Vista previa del build

Para revisar localmente la version generada:

```bash
npm run preview
```
