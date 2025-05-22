# Arduino Button Tracker

Este proyecto captura los botones presionados en un LCD keypad shield conectado a un Arduino Uno, almacena los datos en MongoDB y los muestra en una interfaz web desarrollada con React.

## Estructura del Proyecto

- **frontend**: Aplicación React Vite para mostrar los botones presionados
- **backend**: Servidor Node.js para recibir datos del Arduino y almacenarlos en MongoDB
- **arduino**: Código para el Arduino que detecta los botones presionados

## Requisitos

- Node.js y npm
- MongoDB
- Arduino Uno
- LCD Keypad Shield para Arduino

## Configuración

### Backend

1. Navega a la carpeta `backend`
2. Instala las dependencias:
   \`\`\`
   npm install
   \`\`\`
3. Crea un archivo `.env` con las siguientes variables:
   \`\`\`
   MONGODB_URI=tu_uri_de_mongodb
   ARDUINO_PORT=COM3 (o el puerto donde está conectado tu Arduino)
   PORT=3001
   \`\`\`
4. Inicia el servidor:
   \`\`\`
   npm run dev
   \`\`\`

### Frontend

1. Navega a la carpeta `frontend`
2. Instala las dependencias:
   \`\`\`
   npm install
   \`\`\`
3. Inicia el servidor de desarrollo:
   \`\`\`
   npm run dev
   \`\`\`
4. Para construir para producción:
   \`\`\`
   npm run build
   \`\`\`

### Arduino

1. Abre el archivo `arduino/button_tracker/button_tracker.ino` en el IDE de Arduino
2. Sube el código a tu Arduino Uno con el LCD Keypad Shield conectado

## Despliegue en Vercel

1. Asegúrate de tener la CLI de Vercel instalada:
   \`\`\`
   npm install -g vercel
   \`\`\`
2. Construye el frontend:
   \`\`\`
   cd frontend
   npm run build
   \`\`\`
3. Despliega en Vercel:
   \`\`\`
   vercel
   \`\`\`

## Uso

- La aplicación web mostrará una interfaz con los cuatro botones (arriba, abajo, izquierda, derecha)
- Cuando presiones un botón en el LCD Keypad Shield, se registrará en la base de datos
- La interfaz web se actualizará automáticamente para mostrar los botones presionados y la hora

## Simulación sin Arduino

Si no tienes un Arduino disponible, puedes simular la pulsación de botones usando el endpoint:

\`\`\`
POST http://localhost:3001/api/simulate-button
Content-Type: application/json

{
  "button": "UP" // Puede ser "UP", "DOWN", "LEFT" o "RIGHT"
}
