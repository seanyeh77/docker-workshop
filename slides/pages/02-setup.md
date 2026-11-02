---
layout: section
number: 2
chapter: Ch 2 · Set up Docker
---

# Set up Docker

- **2.1** 確認 Docker Desktop 運作中
- **2.2** 執行第一個 Container
- **2.3** 驗證 Q2：Container 使用的 kernel

---
layout: textbook
chapter: Ch 2 · Set up Docker
ltag: Terminal
clicks: 2
---

# 執行第一個 Container

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker -v', o: 'Docker version 29.x.x, build xxxxxxx' },
  { c: 'docker run --rm hello-world', o: 'Unable to find image \'hello-world:latest\' locally\nlatest: Pulling from library/hello-world\n\nHello from Docker!\nThis message shows that your installation appears to be working correctly.' },
]" />

::note::

<Note :notes="[
  '先開啟 Docker Desktop，確認左下角顯示正在執行。',
  'docker -v 僅確認指令已安裝，即使 Docker Desktop 未開啟也會顯示版本。',
  'hello-world 會實際 pull 一個 Image 並執行；--rm 讓 Container 執行完就自動刪除。出現 Hello from Docker! 即代表安裝完成；若未出現，請舉手由 TA 協助。',
]" />

<!--
課前作業已經請大家裝好。這裡只做驗證，TA 下去巡。
版本號每個人不一樣，沒關係。
最後一步就是檢查點：看到 Hello from Docker! 就成功，沒看到的舉手。
常見狀況：
- Cannot connect to the Docker daemon：Docker Desktop 沒開。
- Windows 還沒重開機：WSL2 沒啟用。
講師這段時間把 Ch3 的指令貼到共用連結。
-->

---
layout: textbook
chapter: Ch 2 · Set up Docker
ltag: Terminal
clicks: 2
---

<script setup>
const cmds = [
  { c: 'docker run --rm ubuntu uname -r', o: "Unable to find image 'ubuntu:latest' locally\n...\n6.x.x-linuxkit" },
  { c: 'docker run --rm alpine uname -r', o: "Unable to find image 'alpine:latest' locally\n...\n6.x.x-linuxkit" },
]
</script>

# 驗證 Q2：Container 使用的 kernel

<TerminalTyping :cmds="cmds" :keep="2" />

::note::

<Note :notes="[
  'uname -r 顯示 kernel 版本。分別以 ubuntu 與 alpine 兩個 Image 啟動 Container。',
  'Ubuntu 的 Container 印出 linuxkit 的 kernel。',
  'Alpine 的 Container 印出相同的 kernel：Image 不含 kernel，所有 Container 共用 Docker Desktop 背後那台 Linux VM 的 kernel。',
]" />

<!--
驗證 Q2 的答案。先問大家：如果 Image 內附 kernel，ubuntu 與 alpine 印出的 kernel 版本應該一樣嗎？
ubuntu 和 alpine 是兩套不同的 Linux 發行版，若 Image 自帶 kernel，版本應該不同。
Alpine 是很輕量的 Linux 發行版，整個 Image 不到 10MB，Ch3 會用它來做 node-base。
--rm 前面 hello-world 已經用過：Container 執行完就自動刪除，不會留下來。
Mac 和 Windows 上印出來的是 Linux kernel（結尾 linuxkit），因為 Docker Desktop 在背後開了一台小型 Linux VM，所有 Container 都跑在裡面。這也回答了「Windows 怎麼能跑 Linux Container」。
Linux 電腦上直接跑 uname -r，會和 Container 裡印出的一樣。
版本號每台電腦不同，重點是兩行相同。
-->
