---
layout: section
number: 2
chapter: Ch 2 · Set up Docker
---

# Set up Docker

- **2.1** 連線至主機並確認 Docker 運作中
- **2.2** 執行第一個 Container
- **2.3** 驗證 Q2：Container 使用的 kernel

---
layout: textbook
chapter: Ch 2 · Set up Docker
ltag: Terminal
clicks: 3
---

# 執行第一個 Container

<TerminalTyping :keep="3" :cmds="[
  { c: 'ssh -p &lt;port&gt; -L 3000:localhost:3000 &lt;user&gt;@&lt;host&gt;', o: '' },
  { c: 'docker -v', o: 'Docker version 29.x.x, build xxxxxxx' },
  { c: 'docker run --rm hello-world', o: '\nHello from Docker!\nThis message shows that your installation appears to be working correctly.' },
]" />

::note::

<Note :notes="[
  '指令清單：seanyeh77.github.io/<wbr>docker-workshop/<wbr>commands.html',
  '-L 3000:localhost:3000：讓瀏覽器能開啟 localhost:3000。',
  '',
  '出現 Hello from Docker! 即可使用。',
]" />

---
layout: textbook
chapter: Ch 2 · Set up Docker
ltag: Terminal
clicks: 3
---

<script setup>
const cmds = [
  { c: 'uname -r', o: '6.12.107+deb13-cloud-amd64' },
  { c: 'docker run --rm ubuntu uname -r', o: "6.12.107+deb13-cloud-amd64" },
  { c: 'docker run --rm alpine uname -r', o: "6.12.107+deb13-cloud-amd64" },
]
</script>

# 驗證 Q2：Container 使用的 kernel

<TerminalTyping :cmds="cmds" :keep="3" />

::note::

<Note :notes="[
  '',
  '',
  'Ubuntu 的 Container 印出相同的版本。',
  'Image 不含 kernel，Container 共用主機的 kernel。',
]" />

