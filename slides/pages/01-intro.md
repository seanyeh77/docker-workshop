---
layout: section
number: 1
chapter: Ch 1 · Intro to Docker
---

# Intro to Docker

- **1.1** 為什麼需要 Docker
- **1.2** Image、Container、Registry
- **1.3** Docker 與 VM 的差異

---
layout: figure
chapter: Ch 1 · Intro to Docker
clicks: 4
takeaway: Docker 的做法：把「能跑的那台電腦」上的環境一起打包，讓程式到哪裡都能跑。
---

# 同一份程式，換台電腦就跑不起來

<ChatBubbles :lines="[
  { who: 'left', name: '你', text: '作業寫好了，推上 GitHub，你 clone 下來跑跑看。' },
  { who: 'right', name: '組員', text: '<code>ModuleNotFoundError: No module named \'flask\'</code>' },
  { who: 'left', name: '你', text: '可是在我電腦上可以跑啊。' },
  { who: 'right', name: '組員', text: '那我把你的電腦搬回家？' },
]" />

<!--
分組作業情境，一句一句點出來。
1. 程式碼一模一樣，組員也有 clone 到。
2. 但組員電腦沒裝 flask，版本也可能不同，所以跑不起來。
3.「在我電腦上可以跑」是全世界工程師都講過的一句話。
4. 搬電腦是玩笑，但 Docker 做的真的就是這件事：把能跑的那台電腦的環境一起打包帶走。
最後帶到下方的重點句，接下一張的三個痛點。
-->

---
layout: cols
chapter: Ch 1 · Intro to Docker
reveal: true
clicks: 3
cards:
  - label: 痛點 1
    title: 環境不一致
    text: 分組作業你傳 Python 檔給組員，他的版本不同，跑不起來。
  - label: 痛點 2
    title: 安裝很繁瑣
    text: 接手學長的專案，要先裝資料庫、裝語言環境，裝一整天。
  - label: 痛點 3
    title: 版本會打架
    text: A 課要 PostgreSQL 12，B 課要 PostgreSQL 16，同一台電腦很難共存。
---

# Docker 要解決的三個問題

<!--
一張一張翻。每一張都問一句「有人遇過嗎？」讓大家舉手。
-->

---
layout: statement
chapter: Ch 1 · Intro to Docker
---

# git 管理程式碼，不管理執行環境

組員 `git clone` 下來，還是缺 Python 的版本、缺資料庫、缺環境變數。Docker 補上的就是這一塊。

<!--
你們上次學過 git，會想說「我不是已經用 git 分享程式了嗎？」
git 只管程式碼。程式要跑起來需要的語言版本、套件、資料庫，git 都不管。
-->

---
layout: textbook
chapter: Ch 1 · Intro to Docker
clicks: 3
---

# Docker 的核心元件

<div class="deflist">
  <div v-click="1"><b>Image</b><span>打包好的環境：檔案、執行檔、函式庫和設定。像做甜點的食材。</span></div>
  <div v-click="2"><b>Container</b><span>用 Image 跑起來的程式，彼此獨立。像裝盤上桌的料理。</span></div>
  <div v-click="3"><b>Registry</b><span>放 Image 的雲端倉庫，最常用的是 Docker Hub。像食材的全聯。</span></div>
</div>

::note::

<Note :notes="[
  '三個名詞今天會一直出現，先記住比喻就好。',
  'Image 是材料，本身不會動。',
  '同一份 Image 可以開很多個 Container，每個都獨立。',
  'Docker Hub 之於 Image，就像 GitHub 之於程式碼。',
]" />

---
layout: definition
chapter: Ch 1 · Intro to Docker
term: Image
kind: 名詞
---

一個標準化的套件，裝著程式執行需要的檔案、執行檔、函式庫和設定。它由一層層疊起來，而且建好之後不能改，要改就建一個新版本。

::example::

最底層是 Ubuntu，中間疊上 Node，最上層是你的程式。就像 git 的 commit：一個疊一個，舊的不會被改掉，只會多一個新的。

<!--
Immutable 用 git commit 解釋：commit 之後不能改，只能再開一個新的 commit。
-->

---
layout: definition
chapter: Ch 1 · Intro to Docker
term: Container
kind: 名詞
---

用 Image 跑起來的程式。它自己帶著需要的一切，不依賴你電腦上裝了什麼，也不會影響你的電腦或其他 Container。

::example::

同一份 `node-base` Image 可以同時開 3 個 Container，在其中一個裝東西，另外 2 個不會多出任何東西。

<!--
四個特性：Self-contained、Isolated、Independent、Portable。
「不會影響另外兩個」這句先埋著，等一下 Slido 會考。
-->

---
layout: figure
chapter: Ch 1 · Intro to Docker
clicks: 4
takeaway: 今天會把這條線從頭走到尾：pull 下來、run 起來、stop、rm。
---

# Container 的生命週期

<Lifecycle />

<!--
逐步點出：
1. pull：從 Registry 把 Image 抓到自己電腦。
2. run：用 Image 開一個 Container，開始跑。
3. stop：停下來，但還在，可以 restart。
4. rm：刪掉，Container 裡的東西跟著不見。記住這一點，Ch4 會用到。
-->

---
layout: compare
chapter: Ch 1 · Intro to Docker
left: VM
right: Container
reveal: true
clicks: 4
rows:
  - [比喻, 整棟透天厝，自己的水電和廚房, 雅房，房間各自上鎖，共用大樓水電]
  - [裝了什麼, 程式、套件，再加一整套作業系統, 程式和套件，共用電腦的 OS 核心]
  - [啟動, 像開一台新電腦，要等開機, 像開一個程式，幾乎立刻好]
  - [大小, 動輒數 GB, 常見幾十到幾百 MB]
---

# VM 與 Container 的差異

<!--
VM 也能解決環境問題，只是比較重。
雅房搬進去比蓋一棟房子快很多，這就是 Container 啟動快、吃資源少的原因。
-->

---
layout: quiz
chapter: Ch 1 · Intro to Docker
question: 用同一個 Image 開了兩個 Container A 和 B。在 A 裡面建立 hello.txt，B 裡面看得到嗎？
slido: '#docker-ws'
options:
  - 看得到，因為它們來自同一個 Image
  - 看不到
  - 要看 B 是在 A 建檔之前還是之後開的
---

<!--
Slido Q1。只投票，只看票數分布，不公布答案。
說：「等一下實作，你們會自己證明答案。」
答案在 Ch3 用 docker run node-base ls 驗證。
-->
