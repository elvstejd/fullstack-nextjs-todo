<div align="center">

# ToDo App

</div>

Aplicación de lista de tareas para prueba fullstack Nelmix:

- CRUD de tareas
- Usuarios permanentes y temporales

## How to run

1. Clona el proyecto e instala las dependencias
```bash
  git clone https://github.com/elvstejd/fullstack-nextjs-todo-nelmix.git
  cd fullstack-nextjs-todo-nelmix
  yarn install
```
2. Crea un archivo `.env` y configura las variables de entorno
```.env
  # Prisma
  DATABASE_URL="" # postgresql://[user]:[password]@[host]:[port]/[db]

  # Next Auth
  NEXTAUTH_SECRET="" # use long string with special characters
  NEXTAUTH_URL="" # use http://localhost:3000 for development 
```

3. Aplica las migraciones existentes a la base de datos
```bash
  npx prisma migrate dev
```

4. Ejecuta el proyecto
```bash
  yarn run dev
```

## Tecnologías

**Cliente:** NextJS, Mantine

**Servidor:** NextJS API routes, NextAuth.js, Zod Schema Validation
