// Build public/commands.html: every command typed on a Terminal slide,
// grouped by chapter and slide, each with a copy button. Run before
// `slidev build` so the page ships with the deck.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const order = [...readFileSync(join(root, 'slides.md'), 'utf8').matchAll(/src: \.\/pages\/(\S+)/g)].map((m) => m[1])

// Demo-only slides students should not type along with.
const skip = (t) => /^常見錯誤|^名稱已被使用/.test(t)
const skipChapter = (c) => /^Break/.test(c)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const decode = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
const unquote = (s) => s.replace(/\\(.)/g, '$1')

const chapters = []
let chapter = null
let dockerfile = ''
let compose = ''

for (const file of order) {
  const text = readFileSync(join(root, 'pages', file), 'utf8')
  // Split into [frontmatter, body] pairs.
  const parts = text.split(/^---\n((?:[\w-]+:.*\n|\s+.*\n)*)---\n/m)
  for (let i = 1; i < parts.length; i += 2) {
    const fm = parts[i]
    const body = parts[i + 1] || ''
    const ch = fm.match(/^chapter:\s*(.+)$/m)?.[1]?.trim()
    if (ch && ch !== chapter?.name) {
      chapter = { name: ch, slides: [] }
      chapters.push(chapter)
    }
    const title = body.match(/^# (.+)$/m)?.[1]?.trim()
    const blocks = [...body.matchAll(/```dockerfile\n([\s\S]*?)```/g)]
    if (blocks.length) dockerfile = blocks.at(-1)[1]
    const yaml = [...body.matchAll(/```yaml\n([\s\S]*?)```/g)]
    if (yaml.length && /services:/.test(yaml.at(-1)[1])) compose = yaml.at(-1)[1]
    if (!title || skip(title) || !chapter || skipChapter(chapter.name)) continue
    const cmds = []
    for (const m of body.matchAll(/\{([^{}]*?)\bc:\s*(['"`])((?:\\.|(?!\2).)*)\2/g)) {
      cmds.push({ c: decode(unquote(m[3])), inner: /\bp\s*[:,]/.test(m[1]) })
    }
    if (cmds.length) chapter.slides.push({ title, cmds })
  }
}

const ICON_COPY = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12"/><path d="M5 15V3h12"/></svg>'
const ICON_DONE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12l5 5L20 6"/></svg>'
const btn = (c) => `<button type="button" aria-label="Copy" data-copy="${esc(c)}">${ICON_COPY}</button>`

const row = (c, inner) => `
      <div class="cmd${inner ? ' inner' : ''}">
        <code>${esc(c)}</code>
        ${inner ? '<span class="tag">Container 內</span>' : ''}
        ${btn(c)}
      </div>`

const fileBlock = (name, content) => `
    <section>
      <h3>${name}</h3>
      <div class="file">
        <pre>${esc(content)}</pre>
        ${btn(content)}
      </div>
    </section>`

const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Docker Workshop 指令</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Literata:opsz,wght@7..72,600&family=Noto+Sans+TC:wght@400;600&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
<style>
  :root { --ink:#20262e; --mut:#66707c; --teal:#0f766e; --rule:#e2e5e9; --code:#f5f8f8; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #fff; color: var(--ink); font-family: "Source Sans 3", "Noto Sans TC", sans-serif; font-size: 17px; line-height: 1.6; }
  .bar { height: 5px; background: var(--teal); }
  main { max-width: 920px; margin: 0 auto; padding: 32px 16px 80px; }
  h1 { font-family: Literata, "Noto Sans TC", serif; font-weight: 600; font-size: 34px; margin: 0 0 4px; }
  .lead { color: var(--mut); margin: 0 0 28px; }
  nav { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-bottom: 28px; font-size: 15px; }
  nav a { color: var(--teal); text-decoration: none; }
  h2 { font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: var(--teal); margin: 40px 0 8px; padding-top: 8px; border-top: 1.5px solid var(--rule); }
  h3 { font-family: Literata, "Noto Sans TC", serif; font-weight: 600; font-size: 20px; margin: 22px 0 8px; }
  .cmd { display: flex; align-items: center; gap: 10px; background: var(--code); border: 1.5px solid var(--rule); padding: 8px 10px 8px 14px; margin: 6px 0; }
  .cmd code, .file pre { font-family: "IBM Plex Mono", "Noto Sans TC", monospace; font-size: 15px; }
  .cmd code { flex: 1; min-width: 0; white-space: pre-wrap; word-break: break-all; }
  .cmd.inner { border-left: 4px solid var(--teal); }
  .tag { flex: none; font-size: 12px; color: var(--teal); border: 1px solid var(--teal); padding: 0 6px; }
  button { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; padding: 0; color: var(--teal); background: #fff; border: 1.5px solid var(--rule); cursor: pointer; }
  button:hover { border-color: var(--teal); }
  button.done { background: var(--teal); color: #fff; }
  .file { position: relative; background: var(--code); border: 1.5px solid var(--rule); }
  .file pre { margin: 0; padding: 14px 16px; overflow-x: auto; }
  .file button { position: absolute; top: 10px; right: 10px; }
</style>
</head>
<body>
<div class="bar"></div>
<main>
  <h1>Docker Workshop 指令</h1>
  <p class="lead">依投影片順序列出所有指令，按右側的複製圖示後貼到 Terminal 執行。標示「Container 內」的指令需在進入 Container 後執行。</p>
  <nav>${chapters.filter((c) => c.slides.length).map((c, i) => `<a href="#ch${i}">${esc(c.name)}</a>`).join('')}<a href="#files">檔案</a></nav>
${chapters.filter((c) => c.slides.length).map((c, i) => `
  <h2 id="ch${i}">${esc(c.name)}</h2>
${c.slides.map((s) => `    <section>
      <h3>${esc(s.title)}</h3>${s.cmds.map((x) => row(x.c, x.inner)).join('')}
    </section>`).join('\n')}`).join('\n')}

  <h2 id="files">檔案</h2>
${fileBlock('Dockerfile', dockerfile)}
${fileBlock('compose.yaml', compose)}
</main>
<script>
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('button[data-copy]')
    if (!b) return
    const text = b.dataset.copy
    try { await navigator.clipboard.writeText(text) } catch {
      const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove()
    }
    b.innerHTML = ${JSON.stringify(ICON_DONE)}; b.classList.add('done')
    setTimeout(() => { b.innerHTML = ${JSON.stringify(ICON_COPY)}; b.classList.remove('done') }, 1200)
  })
</script>
</body>
</html>
`

mkdirSync(join(root, 'public'), { recursive: true })
writeFileSync(join(root, 'public', 'commands.html'), html)
console.log(`commands.html: ${chapters.reduce((n, c) => n + c.slides.reduce((m, s) => m + s.cmds.length, 0), 0)} commands`)
