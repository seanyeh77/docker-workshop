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
takeaway: Docker 將程式所需的執行環境一併封裝，使程式在任何電腦上都能執行。
---

# 同一份程式在不同電腦上的執行結果

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
layout: focus
chapter: Ch 1 · Intro to Docker
clicks: 2
items:
  - label: 痛點 1
    title: 環境不一致
    text: 分組作業將 Python 檔交給組員後，若對方電腦上的 Python 版本與套件不同，程式便無法執行。
  - label: 痛點 2
    title: 安裝步驟繁瑣
    text: 接手既有專案時，需要先安裝資料庫與語言環境，並設定環境變數，才能讓程式正常執行。
  - label: 痛點 3
    title: 版本衝突
    text: 甲課程需要 PostgreSQL 12，乙課程需要 PostgreSQL 16，兩個版本難以在同一台電腦上共存。
---

# Docker 要解決的三個問題

<!--
一張一張翻。每一張都問一句「有人遇過嗎？」讓大家舉手。
-->

---
layout: quiz
chapter: Ch 1 · Intro to Docker
question: Q1．將專案推上 GitHub 後，組員以 git clone 取得。下列哪一項會隨 clone 一起取得？
clicks: 1
answer: 3
options:
  - 已安裝的套件，例如 flask
  - 開發者電腦上的 Python 版本
  - 資料庫與其中的資料
  - 僅有已 commit 的程式碼與檔案
---

git 只記錄 commit 過的檔案。套件、語言版本與資料庫都屬於執行環境，不在 repository 中，這正是剛才組員出現 ModuleNotFoundError 的原因。

<!--
回收暖場的 Q1，按一下揭曉。
-->

---
layout: statement
chapter: Ch 1 · Intro to Docker
---

# git 管理程式碼，不管理執行環境

組員以 `git clone` 取得程式碼後，仍缺少對應的 Python 版本、資料庫與環境變數。Docker 負責的正是這個部分。

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
  <div v-click="1"><b>Image</b><span>封裝好的環境，包含檔案、執行檔、函式庫與設定。類比為烹飪所需的食材。</span></div>
  <div v-click="2"><b>Container</b><span>由 Image 啟動的執行實體，彼此獨立。類比為完成的料理。</span></div>
  <div v-click="3"><b>Registry</b><span>存放 Image 的雲端儲存庫，最常用的是 Docker Hub。類比為供應食材的超市。</span></div>
</div>

::note::

<Note :notes="[
  '這三個名詞會貫穿整堂課，先以類比理解即可。',
  'Image 是靜態的材料，本身不會執行。',
  '同一個 Image 可以啟動多個 Container，彼此獨立。',
  'Docker Hub 與 Image 的關係，相當於 GitHub 與程式碼的關係。',
]" />

---
layout: definition
chapter: Ch 1 · Intro to Docker
term: Image
kind: 名詞
---

一個標準化的套件，包含程式執行所需的檔案、執行檔、函式庫與設定。Image 由多個 Layer 堆疊而成，建立後即不可修改；若需變更，必須建立新的版本。

::example::

最底層為 Ubuntu，中間為 Node，最上層為應用程式。此結構與 git commit 相同：新的版本疊加在舊的版本之上，既有版本不會被修改。

<!--
Immutable 用 git commit 解釋：commit 之後不能改，只能再開一個新的 commit。
-->

---
layout: definition
chapter: Ch 1 · Intro to Docker
term: Container
kind: 名詞
---

由 Image 啟動的執行實體。它包含執行所需的一切，不依賴主機上已安裝的軟體，也不會影響主機或其他 Container。

::example::

以同一個 `node-base` Image 同時啟動 3 個 Container，在其中一個安裝套件，其餘 2 個不受影響。

<!--
四個特性：Self-contained、Isolated、Independent、Portable。
「不會影響另外兩個」這句先埋著，Ch3 會實際看到。
-->

---
layout: figure
chapter: Ch 1 · Intro to Docker
clicks: 4
takeaway: 本課程將依序實作 pull、run、stop、rm 四個階段。
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
layout: figure
chapter: Ch 1 · Intro to Docker
clicks: 3
---

# VM 與 Container 的差異

<StackCompare :captions="[
  '兩者的底層相同：一台電腦的硬體與作業系統。',
  'VM 透過 Hypervisor 模擬整台電腦，每個 VM 都需安裝並啟動自己的 Guest OS。',
  'Container 由 Docker Engine 啟動，App 直接執行於主機的作業系統之上。',
  '差異在於 Guest OS：Container 共用主機的 kernel，因此啟動較快、體積較小。',
]" />

<!--
由下往上一層一層疊，每按一下講一層。
1. 底下兩層一樣：硬體和電腦本身的作業系統。
2. VM 先裝 Hypervisor（例如 VirtualBox、VMware），在上面模擬出好幾台電腦。每台都要裝一套完整的作業系統，開機要等，一台動輒數 GB。
3. Container 只需要 Docker Engine，App 直接跑在主機的作業系統上，彼此隔離但不另外開機。
4. 重點：Container 少了 Guest OS 這一層。作業系統最核心、負責管理硬體的部分叫 kernel，Container 共用主機的 kernel，所以啟動像開一個程式，大小常見幾十到幾百 MB。
類比：VM 像獨棟住宅，水電廚房自己一套；Container 像公寓套房，各自上鎖，共用大樓水電。
講完接 Q2：Mac 和 Windows 的情況留給大家猜，Ch2 裝好 Docker 後用 uname -r 回收。
-->

---
layout: quiz
chapter: Ch 1 · Intro to Docker
question: Q2．在 Mac 或 Windows 上以 ubuntu Image 啟動 Container，Container 使用的 kernel 來自何處？
options:
  - Image 內附的 Ubuntu kernel
  - 主機的 macOS 或 Windows kernel
  - Docker Desktop 在背景啟動的 Linux VM
---

<!--
Q2，先舉手表決，答案在 Ch2 公布。
剛看完分層圖，多數人會選 B「主機的 kernel」；但 macOS 和 Windows 的 kernel 跑不了 Linux 程式。
答案在 Ch2 用 uname -r 驗證。
-->
