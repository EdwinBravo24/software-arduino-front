"use client"

import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [buttonPresses, setButtonPresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchButtonPresses = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/button-presses")
        if (!response.ok) {
          throw new Error("Error al obtener datos")
        }
        const data = await response.json()
        setButtonPresses(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchButtonPresses()

    // Configurar actualización en tiempo real
    const interval = setInterval(fetchButtonPresses, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  if (loading) {
    return <div className="loading">Cargando datos...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="container">
      <h1>Registro de Botones Arduino</h1>

      <div className="button-grid">
        <div className="button-cell left">
          <button className="button-display">←</button>
          <p>Izquierda</p>
        </div>
        <div className="button-cell up">
          <button className="button-display">↑</button>
          <p>Arriba</p>
        </div>
        <div className="button-cell down">
          <button className="button-display">↓</button>
          <p>Abajo</p>
        </div>
        <div className="button-cell right">
          <button className="button-display">→</button>
          <p>Derecha</p>
        </div>
      </div>

      <div className="table-container">
        <h2>Historial de Botones Presionados</h2>
        <table>
          <thead>
            <tr>
              <th>Botón</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {buttonPresses.length > 0 ? (
              buttonPresses.map((press, index) => (
                <tr key={index} className={`button-${press.button.toLowerCase()}`}>
                  <td className="button-cell">
                    <span className="button-name">{press.button}</span>
                  </td>
                  <td>{formatDateTime(press.timestamp)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No hay registros de botones presionados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
