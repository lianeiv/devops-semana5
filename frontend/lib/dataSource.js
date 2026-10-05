const SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE || "api";

async function fromApi() {
  const res = await fetch("/api/health/");
  if (!res.ok) throw new Error(`API respondeu ${res.status}`);
  return res.json();
}

async function fromFirestore() {
  const { getItemsFromFirestore } = await import("./firestore");
  return getItemsFromFirestore();
}

export async function getData() {
  return SOURCE === "firestore" ? fromFirestore() : fromApi();
}