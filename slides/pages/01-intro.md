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
    text: 甲專案需要 PostgreSQL 12，乙專案需要 PostgreSQL 16，兩個版本難以在同一台電腦上共存。
---

# Docker 要解決的三個問題

---
layout: statement
chapter: Ch 1 · Intro to Docker
---

# git 管理程式碼，不管理執行環境

組員以 `git clone` 取得程式碼後，仍缺少對應的 Python 版本、資料庫與環境變數。Docker 負責的正是這個部分。

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
  '',
  'Image 是靜態的材料，本身不會執行。',
  '同一個 Image 可啟動多個 Container，彼此獨立。',
  'Docker Hub 之於 Image，如同 GitHub 之於程式碼。',
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

---
layout: definition
chapter: Ch 1 · Intro to Docker
term: Container
kind: 名詞
---

由 Image 啟動的執行實體。它包含執行所需的一切，不依賴主機上已安裝的軟體，也不會影響主機或其他 Container。

::example::

以同一個 `node-base` Image 同時啟動 3 個 Container，在其中一個安裝套件，其餘 2 個不受影響。

---
layout: figure
chapter: Ch 1 · Intro to Docker
clicks: 4
takeaway: 接下來將依序實作 pull、run、stop、rm 四個階段。
---

# Container 的生命週期

<Lifecycle />

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

---
layout: quiz
chapter: Ch 1 · Intro to Docker
question: Q2．以 ubuntu Image 啟動 Container，Container 使用的 kernel 來自何處？
clicks: 1
answer: 2
options:
  - Image 內附的 Ubuntu kernel
  - Docker 另外啟動的 kernel
  - 執行 Docker 的主機的 kernel
---

Image 不含 kernel，Docker 也不會另外啟動 kernel；所有 Container 共用執行 Docker 的主機的 kernel。Ch2 將實際驗證。

