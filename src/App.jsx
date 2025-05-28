import { useEffect, useState } from "react";

function App() {
  const [buttonData, setButtonData] = useState([]);

  useEffect(() => {
    const handleKeyDown = async (event) => {
      let button = null;

      if (event.key === "ArrowUp") button = "UP";
      else if (event.key === "ArrowDown") button = "DOWN";
      else if (event.key === "ArrowLeft") button = "LEFT";
      else if (event.key === "ArrowRight") button = "RIGHT";

      if (button) {
        try {
          // Enviar botón al backend
          await fetch("http://localhost:3001/api/simulate-button", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ button }),
          });

          // Obtener datos actualizados
          const response = await fetch("http://localhost:3001/api/button-presses");
          const data = await response.json();
          setButtonData(data);
        } catch (error) {
          console.error("Error al enviar o recibir datos:", error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <h1>Simulador de botones</h1>
      <h2>Datos de botones presionados:</h2>
      <ul>
        {buttonData.map((item, index) => (
          <li key={index}>{item.button} - {new Date(item.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
