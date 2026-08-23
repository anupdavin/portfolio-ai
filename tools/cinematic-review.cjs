const { spawn } = require('node:child_process')
const { mkdirSync } = require('node:fs')
const { resolve } = require('node:path')
const puppeteer = require('puppeteer')

const root = resolve(__dirname, '..')
const outputDir = resolve(root, '.cinematic-review')
const port = 4173
const url = `http://127.0.0.1:${port}/portfolio-ai/`

const checkpoints = [
  ['origin', 0.02],
  ['identity', 0.14],
  ['workflow', 0.3],
  ['codebase', 0.5],
  ['production', 0.68],
  ['evidence', 0.84],
  ['human', 0.98],
]

const sleep = (ms) => new Promise((resolveWait) => setTimeout(resolveWait, ms))

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {}
    await sleep(250)
  }
  throw new Error(`Preview server did not become ready at ${url}`)
}

async function captureSet(browser, name, viewport, reducedMotion = false) {
  const page = await browser.newPage()
  const pageErrors = []

  await page.setViewport(viewport)
  if (reducedMotion) {
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  }

  page.on('pageerror', (error) => pageErrors.push(error.message))
  await page.goto(url, { waitUntil: 'networkidle2' })

  for (const [label, progress] of checkpoints) {
    await page.evaluate((p) => {
      const human = document.getElementById('human')
      const end = human ? human.offsetTop : document.documentElement.scrollHeight
      window.scrollTo({ top: end * p, behavior: 'instant' })
    }, progress)
    await sleep(reducedMotion ? 80 : 550)
    await page.screenshot({
      path: resolve(outputDir, `${name}-${label}.png`),
      fullPage: false,
    })
  }

  await page.close()
  if (pageErrors.length) throw new Error(`${name} page errors:\n${pageErrors.join('\n')}`)
}

async function main() {
  mkdirSync(outputDir, { recursive: true })

  const preview = spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)],
    { cwd: root, stdio: 'inherit' },
  )

  try {
    await waitForServer()
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    try {
      await captureSet(browser, 'desktop', { width: 1440, height: 960, deviceScaleFactor: 1 })
      await captureSet(browser, 'mobile', { width: 390, height: 844, deviceScaleFactor: 1 })
      await captureSet(browser, 'reduced-motion', { width: 1440, height: 960, deviceScaleFactor: 1 }, true)
    } finally {
      await browser.close()
    }

    console.log(`Cinematic review captures written to ${outputDir}`)
  } finally {
    preview.kill('SIGTERM')
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
