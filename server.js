import express from 'express'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const dist = resolve(__dirname, 'dist')
const port = process.env.PORT || 4173

const app = express()

app.use('/assets', express.static(join(dist, 'assets'), {
  maxAge: '1y',
  immutable: true,
}))

app.use(express.static(dist, { maxAge: 0, etag: false }))

app.get('*', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.sendFile(join(dist, 'index.html'))
})

app.listen(port, () => console.log(`Margarida Nails a servir na porta ${port}`))
