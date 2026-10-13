---
layout: section
number: 2
chapter: Ch 2 · Set up Docker
---

# Set up Docker

- **2.1** 確認 Docker Desktop 運作中
- **2.2** 執行第一個 Container

---
layout: textbook
chapter: Ch 2 · Set up Docker
ltag: Terminal
clicks: 2
---

# 執行第一個 Container

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker -v', o: 'Docker version 28.x.x, build xxxxxxx' },
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
layout: figure
chapter: Break
near: true
clicks: 1
---

# 休息 10 分鐘

<TerminalTyping big :start="1" :keep="2" :cmds="[
  { c: 'docker pause audience', o: 'audience' },
  { c: 'docker unpause audience', o: 'audience' },
]" />

<Countdown :minutes="10" />

<!--
休息開始時停在這張，倒數自己會跑。回來時按一下，打出 docker unpause audience。
休息時看一眼 Slido Q&A。
-->
