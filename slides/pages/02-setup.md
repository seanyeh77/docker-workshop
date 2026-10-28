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
  { c: 'docker run hello-world', o: 'Unable to find image \'hello-world:latest\' locally\nlatest: Pulling from library/hello-world\n\nHello from Docker!\nThis message shows that your installation appears to be working correctly.' },
]" />

::note::

<Note :notes="[
  '先開啟 Docker Desktop，確認左下角顯示正在執行。',
  'docker -v 僅確認指令已安裝，即使 Docker Desktop 未開啟也會顯示版本。',
  'hello-world 會實際 pull 一個 Image 並執行，成功即代表安裝完成。',
]" />

<!--
課前作業已經請大家裝好。這裡只做驗證，TA 下去巡。
版本號每個人不一樣，沒關係。
-->

---
layout: figure
chapter: Ch 2 · Set up Docker
takeaway: 出現 Hello from Docker! 即代表安裝成功；若未出現，請舉手由 TA 協助。
---

# 檢查點：Docker 安裝完成

<TerminalTyping all :cmds="[
  { c: 'docker run hello-world', o: '\nHello from Docker!\nThis message shows that your installation appears to be working correctly.' },
]" />

<!--
常見狀況：
- Cannot connect to the Docker daemon：Docker Desktop 沒開。
- Windows 還沒重開機：WSL2 沒啟用。
講師這段時間把 Ch3 的指令貼到共用連結。
-->

---
layout: textbook
chapter: Ch 2 · Set up Docker
ltag: Terminal
clicks: 4
---

<script setup>
const cmds = [
  { c: 'docker run --rm ubuntu grep -w NAME /etc/os-release', o: "Unable to find image 'ubuntu:latest' locally\n...\nNAME=\"Ubuntu\"" },
  { c: 'docker run --rm alpine grep -w NAME /etc/os-release', o: "Unable to find image 'alpine:latest' locally\n...\nNAME=\"Alpine Linux\"" },
  { c: 'docker run --rm ubuntu uname -r', o: '6.x.x-linuxkit' },
  { c: 'docker run --rm alpine uname -r', o: '6.x.x-linuxkit' },
]
</script>

# 驗證 Q2：Container 使用的 kernel

<TerminalTyping :cmds="cmds" :keep="4" />

::note::

<Note :notes="[
  '回到 Q2：Container 使用的 kernel 來自何處。以下實際驗證。',
  '/etc/os-release 記錄作業系統名稱，此 Container 為 Ubuntu。',
  '換成 alpine，作業系統名稱變為 Alpine Linux。',
  'uname -r 顯示 kernel 版本。',
  '兩者的 kernel 版本相同：Image 只包含作業系統的檔案與工具，kernel 一律使用主機的。',
]" />

<!--
驗證 Q2 的答案。先問大家：如果 Image 內附 kernel，ubuntu 與 alpine 印出的 kernel 版本應該一樣嗎？
開場說明：以 ubuntu 與 alpine 兩個 Image 各啟動 Container，比較作業系統與 kernel。
--rm 讓 Container 執行完就自動刪除，之後 Ch4 會再講。
Mac 和 Windows 上印出來的是 Linux kernel（結尾 linuxkit），因為 Docker Desktop 在背後開了一台小型 Linux VM，所有 Container 都跑在裡面。這也回答了「Windows 怎麼能跑 Linux Container」。
Linux 電腦上直接跑 uname -r，會和 Container 裡印出的一樣。
版本號每台電腦不同，重點是兩行相同。
-->

---
layout: quiz
chapter: Ch 2 · Set up Docker
question: Q3．將安裝好 Node 的 Container commit 成 node-base 後，以原本的 ubuntu Image 啟動的 Container 有 Node 嗎？
clicks: 1
answer: 1
options:
  - 有，commit 會一併更新 ubuntu Image
  - 沒有，Node 只存在於 node-base
  - 只在原本的 Container 執行時才有
---


commit 產生一個新的 Image，原本的 ubuntu Image 不會被修改。Ch3 將實際建立 node-base 並驗證。

<!--
先舉手表決，再按一下公布答案。這題預告 Ch3 的 commit。
Ch3 做完 node-base 後用 which node 驗證。
-->
