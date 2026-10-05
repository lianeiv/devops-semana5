"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/health/")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  return (
    <main>
      <h1>Painel Semana 5</h1>
      {error && (
        <p role="alert">Dados indisponíveis no momento. Tente novamente mais tarde.</p>
      )}
      {!error && !data && <p>Carregando...</p>}
      {data && (
        <>
          <h2>Status: {data.status}</h2>
          <ul>
            {data.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}