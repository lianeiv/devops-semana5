"use client";
import { useEffect, useState } from "react";
import { getData } from "../lib/dataSource";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData()
      .then(setData)
      .catch(() => setError(true));
  }, []);

  return (
    <main>
      <h1 style={{ color: "#ec4899" }}>Painel Semana 6 - Versão B</h1>
      {error && (
        <p role="alert">Dados indisponíveis no momento. Tente novamente mais tarde.</p>
      )}
      {!error && !data && <p>Carregando...</p>}
      {data && (
        <>
          <h2>Status: {data.status}</h2>
          <ul>
            {[...data.items].reverse().map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
