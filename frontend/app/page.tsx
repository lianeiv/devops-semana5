"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; // Ajuste o caminho se necessário para onde inicializou o firebase/firestore

interface Item {
  id: string;
  titulo: string;
  ordem: number;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const fetchedItems: Item[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedItems.push({
            id: doc.id,
            titulo: data.titulo,
            ordem: data.ordem,
          });
        });
        // Ordena por ordem crescente se desejar
        fetchedItems.sort((a, b) => a.ordem - b.ordem);
        setItems(fetchedItems);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-8">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-16 px-8 bg-white dark:bg-black sm:items-start border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full my-8">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Painel Semana 5 - Itens do Firestore
          </h1>

          {error && (
            <p className="text-red-500 font-medium" role="alert">Erro ao carregar: {error}</p>
          )}

          {loading && <p className="text-zinc-600 dark:text-zinc-400">Carregando...</p>}

          {!loading && !error && (
            <ul className="list-disc pl-5 flex flex-col gap-2 text-lg text-zinc-700 dark:text-zinc-300">
              {items.map((item) => (
                <li key={item.id}>
                  <strong className="text-black dark:text-white">{item.ordem}.</strong> {item.titulo}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}