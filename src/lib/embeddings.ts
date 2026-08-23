// Lightweight client-side embeddings using transformers.js (Xenova)
// Model: all-MiniLM-L6-v2
// Note: Lazy-import to avoid initial bundle bloat

export type EmbeddingVector = Float32Array | number[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let embedder: any | null = null

export async function loadEmbedder() {
  if (embedder) return embedder
  // Dynamic import to keep initial load small
  const { pipeline } = await import('@xenova/transformers')
  embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
    quantized: true,
  })
  return embedder
}

export async function computeEmbedding(text: string): Promise<number[]> {
  const model = await loadEmbedder()
  const output = await model(text, { pooling: 'mean', normalize: true })
  // output.data is a TypedArray; convert to number[] for portability
  return Array.from(output.data as Float32Array)
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0
  let na = 0
  let nb = 0
  const len = Math.min(a.length, b.length)
  for (let i = 0; i < len; i++) {
    const x = a[i]
    const y = b[i]
    dot += x * y
    na += x * x
    nb += y * y
  }
  if (na === 0 || nb === 0) return 0
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

export async function rankBySimilarity(
  query: string,
  docs: { id: string; title: string; url?: string; text: string; embedding?: number[] }[],
  topK = 4
) {
  const q = await computeEmbedding(query)

  // Ensure docs have embeddings (compute on first use and cache in-memory)
  for (const d of docs) {
    if (!d.embedding) {
      d.embedding = await computeEmbedding(d.text)
    }
  }

  const scored = docs.map((d) => ({ ...d, score: cosineSimilarity(q, d.embedding!) }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK)
}

