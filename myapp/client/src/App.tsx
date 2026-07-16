import { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('Cargando...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setMensaje(data.message))
      .catch(() => setMensaje('No se pudo conectar al backend'));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-4xl font-bold text-blue-600">Frontend + Backend</h1>

      <p className="mt-6 text-xl">{mensaje}</p>
    </div>
  );
}

export default App;
