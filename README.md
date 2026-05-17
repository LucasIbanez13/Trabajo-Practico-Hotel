# 🏨 Trabajo Práctico Hotel

Sistema de gestión de reservas de hotel desarrollado como trabajo práctico universitario.

## 👥 Integrantes

| Nombre | Apellido |
|--------|----------|
|        |          |
|        |          |
|        |          |
|        |          |
|        |          |

---

## 📋 Descripción

Sistema CRUD para la gestión de reservas de un hotel. Permite registrar, visualizar, editar y eliminar reservas de huéspedes, con información como nombre, DNI, habitación, fechas de ingreso y salida, entre otros datos.

---

## 🛠️ Tecnologías utilizadas

**Backend**
- Node.js
- Express
- Prisma ORM
- MySQL

**Frontend**
- HTML
- CSS
- JavaScript Vanilla

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/LucasIbanez13/Trabajo-Practico-Hotel.git
cd Trabajo-Practico-Hotel
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido, reemplazando los datos con los de tu entorno:

```env
DATABASE_URL="mysql://USUARIO:CONTRASEÑA@localhost:3306/NOMBRE_BASE_DE_DATOS"
```

Ejemplo:

```env
DATABASE_URL="mysql://root:admin123@localhost:3306/hotel_db"
```

### 4. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 5. Ejecutar las migraciones

```bash
npx prisma migrate dev --name init
```

---

## 🚀 Ejecución

### Levantar el servidor

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

### Abrir Prisma Studio (panel visual de la base de datos)

```bash
npx prisma studio
```

Disponible en: `http://localhost:5555`

---