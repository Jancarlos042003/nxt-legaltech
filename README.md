# Frontend - Sistema de Gestión de Casos (Expedientes)

Sistema frontend desarrollado en Next.js para la gestión de casos jurídicos (expedientes), con autenticación JWT y operaciones CRUD completas.

## 🚀 Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño responsive
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP para consumo de API

## 💾 Backend API

El backend está desarrollado en FastAPI y se encuentra en:
**[https://github.com/Jancarlos042003/nxt-api](https://github.com/Jancarlos042003/nxt-api)**

## 🔐 Autenticación

El sistema implementa un flujo de autenticación basado en JWT:

### Flujo de inicio de sesión

1. **Formulario de login**: Captura credenciales (usuario y contraseña)
2. **Validación**: Validación de campos en el frontend con React Hook Form y Zod
3. **Envío a API**: Petición POST al backend FastAPI
4. **Generación de JWT**: El backend genera un token JWT firmado
5. **Almacenamiento**: El token se guarda en cookies HTTP-only para mayor seguridad
6. **Redirección**: Usuario redirigido al dashboard de expedientes

## 🛡️ Protección de Rutas

Implementación de middleware en Next.js para proteger rutas privadas:

### Middleware de Autenticación

```typescript
// middleware.ts
- Intercepta todas las solicitudes a rutas protegidas
- Verifica la existencia y validez del token JWT en cookies
- Redirige a /login si no hay token o ha expirado
- Permite acceso a rutas públicas sin restricción
```

### Rutas Protegidas

- `/dashboard` - Dashboard principal

### Rutas Públicas

- `/login` - Página de inicio de sesión
- `/` - Landing page

## 🚀 Instalación y Ejecución Local

### Requisitos Previos

- Node.js 18+
- npm o yarn
- Backend API ejecutándose (ver repositorio del backend)

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Jancarlos042003/nxt-legaltech.git
cd nxt-legaltech

# 2. Instalar dependencias
npm install
# o
yarn install

# 3. Configurar variables de entorno
cp .env.example .env.local
```

### Ejecutar en Desarrollo

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`
