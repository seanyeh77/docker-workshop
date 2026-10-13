---
layout: section
number: 3
chapter: Ch 3 · Building Images
---

# Building Images

- **3.1** 以 commit 建立 Image
- **3.2** 驗證 Slido Q1
- **3.3** 以 Dockerfile 建立 Image
- **3.4** build 與 tag

---
layout: focus
chapter: Ch 3 · Building Images
clicks: 1
items:
  - label: 做法 1
    title: 以 commit 建立
    text: 在 Container 中安裝所需套件，再以 <code>docker container commit</code> 將當下狀態儲存為 Image。
  - label: 做法 2
    title: 以 Dockerfile 建立
    text: 將建立步驟寫成 <code>Dockerfile</code>，由 <code>docker build</code> 依序執行，每次都能產生相同的 Image。
---

# 建立 Image 的兩種方式

<!--
先用手做，體會 Image 是怎麼一層層長出來的；再換成 Dockerfile，看為什麼大家都用食譜。
-->

---
layout: focus
chapter: Ch 3 · Building Images
numbered: true
clicks: 3
items:
  - title: 進入 Container
    code: docker run -it ubuntu
    text: 以 ubuntu Image 啟動一個 Container，並進入其 Terminal。
  - title: 安裝 Node
    code: apt update && apt install -y nodejs
    text: 先以 <code>apt update</code> 取得套件清單，再安裝 Node；ubuntu Image 預設不含套件清單，直接安裝會出現 Unable to locate package。
  - title: 離開 Container
    code: exit
    text: 返回主機，提示字元由 <code>root@...#</code> 恢復為原本的格式。
  - title: 儲存為 Image
    code: docker container commit
    text: 將已安裝 Node 的 Container 儲存為新的 Image，命名為 <code>node-base</code>。
---

# 以 commit 建立 Image 的流程

<!--
這是等一下實作的四個步驟，先看全貌。
-->

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 5
---

<script setup>
const root = 'root@d8c5ca119fcd:/# '
const cmds = [
  { c: 'docker run --name=base-container -it ubuntu', o: '', after: root },
  { p: root, c: 'apt update && apt install -y nodejs', o: '...\nSetting up nodejs ...' },
  { p: root, c: `node -e 'console.log("Hello world!")'`, o: 'Hello world!' },
  { p: root, c: 'exit', o: '', after: '$ ' },
  { c: 'docker container commit -m "Add node" base-container node-base', o: 'sha256:067b2614e69d...' },
]
</script>

# 實作：建立 node-base

<TerminalTyping :cmds="cmds" :keep="3" />

::note::

<Note :notes="[
  '指令皆已放在共用連結，可直接複製使用。',
  '-it 用於進入 Container 操作。提示字元變為 root@ 開頭，代表已位於 Container 內。',
  '此 Container 僅包含基本的 Ubuntu，需自行安裝 Node。',
  '輸出 Hello world! 代表 Node 安裝完成。',
  'exit 返回主機，提示字元恢復原狀。',
  'commit 將此 Container 的狀態儲存為新的 Image，名稱為 node-base。',
]" />

<!--
最常見的錯：還在 Container 裡就打 docker 指令，會出現 command not found。先看提示字元。
-->

---
layout: compare
chapter: Ch 3 · Building Images
left: Docker
right: git
reveal: true
clicks: 4
rows:
  - [存檔, '<code>docker container commit -m "Add node"</code>', '<code>git commit -m "Add node"</code>']
  - [查看歷史, '<code>docker image history</code>', '<code>git log</code>']
  - [命名, '<code>docker image tag</code>', '<code>git tag</code>']
  - [儲存內容, 整個 Container 的檔案狀態, 僅包含 add 過的檔案]
---

# Docker 與 git 的對應

<!--
一列一列翻。最後一列要講清楚：docker commit 不用先 add，它會把整個 Container 的檔案狀態存起來。
-->

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
---

<script setup>
const docker = [
  { c: 'docker image history node-base', o: 'IMAGE          CREATED          SIZE     COMMENT\n067b2614e69d   13 seconds ago   155MB    Add node\nbbdabce66f1b   13 days ago      0B\n&lt;missing&gt;      13 days ago      78.1MB' },
]
const git = [
  { c: 'git log --oneline', o: 'a1b2c3d Add login page\n9f8e7d6 Fix typo in README\n1234567 Initial commit' },
]
</script>

# Image 歷史與 git log

<div class="pair">
  <TerminalTyping all :cmds="docker" />
  <TerminalTyping all :cmds="git" />
</div>

<!--
最上面那一層就是剛剛 commit 的 Add node，大小 155MB，是裝 Node 多出來的。
下面幾層是 ubuntu 原本就有的。Image 就是這樣一層層疊起來的。
-->

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 6
---

<script setup>
const root = 'root@4f2a91c0b7e3:/# '
const cmds = [
  { c: 'docker run --name=app-container -it node-base', o: '', after: root },
  { p: root, c: `echo 'console.log("Hello from an app")' > app.js`, o: '' },
  { p: root, c: 'node app.js', o: 'Hello from an app' },
  { p: root, c: 'exit', o: '', after: '$ ' },
  { c: 'docker container commit -c "CMD node app.js" -m "Add app" app-container sample-app', o: 'sha256:d7f9fd6abcf2...' },
  { c: 'docker run sample-app', o: 'Hello from an app' },
]
</script>

# 實作：建立 sample-app

<TerminalTyping :cmds="cmds" :keep="3" />

::note::

<Note :notes="[
  '以剛建立的 node-base 啟動 Container，其中已包含 Node。',
  '進入 Container。',
  '將一行程式寫入 app.js。',
  '先在 Container 內執行一次確認結果。',
  '離開 Container。',
  '儲存為 sample-app，並以 -c 指定啟動時執行的指令。',
  '無須進入 Container，執行後即直接輸出結果。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
clicks: 4
---

# commit 指令的參數

<AnnotatedCommand :size="32" :parts="[
  { t: 'docker' },
  { t: 'container' },
  { t: 'commit' },
  { t: '-c' },
  { t: '&quot;CMD node app.js&quot;', label: '啟動時執行的指令', h: 40 },
  { t: '-m' },
  { t: '&quot;Add app&quot;', label: '此版本的說明', h: 110 },
  { t: 'app-container', label: '來源 Container', h: 40 },
  { t: 'sample-app', label: '新 Image 的名稱', h: 110 },
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 1
---

# 驗證 Q1：Container 之間的隔離

<TerminalTyping :cmds="[
  { c: 'docker run node-base ls', o: 'bin   boot  dev  etc  home  lib  media  mnt  opt\nproc  root  run  sbin  srv  sys  tmp  usr  var' },
]" />

::note::

<Note :notes="[
  'app-container 由 node-base 啟動，其中包含 app.js。',
  '以同一個 node-base 啟動新的 Container 並列出檔案，其中沒有 app.js。',
]" />

---
layout: quiz
chapter: Ch 3 · Building Images
question: 用同一個 Image 開了兩個 Container A 和 B。在 A 裡面建立 hello.txt，B 裡面看得到嗎？
clicks: 1
answer: 1
options:
  - 看得到，因為它們來自同一個 Image
  - 看不到
  - 要看 B 是在 A 建檔之前還是之後開的
---

看不到。每個 Container 各自獨立，在 A 中的操作不會影響 B，剛才的 `docker run node-base ls` 已驗證此結果。

<!--
回頭公布 Ch1 那題的票數，再按一下揭曉。
-->

---
layout: figure
chapter: Ch 3 · Building Images
clicks: 2
---

# 同一 Image 的獨立 Container

<ContainerStory :from="0" :to="2" :captions="[
  '一個 Image，尚未啟動任何 Container。',
  '以同一個 Image 啟動 A 與 B 兩個 Container。',
  '在 A 中建立 hello.txt，B 仍為空：每個 Container 各自獨立。',
]" />

<!--
這張圖 Ch4 會再出現，接著往下演。
-->

---
layout: statement
chapter: Ch 3 · Building Images
---

# commit 無法記錄建立過程

commit 只保存最終狀態，無法得知過程中執行了哪些步驟。將建立步驟寫成文件交由 Docker 執行，這份文件即為 `Dockerfile`。

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 3
---

# 實作：下載範例專案

<TerminalTyping :keep="3" :cmds="[
  { c: 'git clone -b build-image-from-scratch https://github.com/docker/getting-started-todo-app', o: 'Cloning into \'getting-started-todo-app\'...' },
  { c: 'cd getting-started-todo-app/app', o: '' },
  { c: 'rm Dockerfile', o: '' },
]" />

<!--
用上次學的 git clone，-b 直接切到 build-image-from-scratch 這個 branch。
app 資料夾裡原本有一份 Dockerfile，先刪掉，我們自己從頭寫。
刪掉後用任何文字編輯器新增一個叫 Dockerfile 的檔案，沒有副檔名。
-->

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Dockerfile
---

# 撰寫 Dockerfile

````md magic-move {lines: false}
```dockerfile
FROM node:22-alpine
```

```dockerfile
FROM node:22-alpine
WORKDIR /app
```

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
```

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
```

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "./src/index.js"]
```
````

::note::

<Note :notes="[
  '先前手動建立的 node-base，在此只需一行 FROM。',
  '設定後續指令的執行目錄。',
  '將主機上的專案檔案複製到 Image 中。',
  '建立 Image 時安裝套件。',
  'Container 啟動時執行的指令。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Dockerfile
---

# Dockerfile 逐行說明

```dockerfile {all|1|2|3|4|5}
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "./src/index.js"]
```

::note::

<Note :notes="[
  '共五行，每一行由一個指令與其參數組成。',
  'FROM：基底 Image。node:22-alpine 為官方提供的 Node 22，底層為輕量的 Alpine Linux。',
  'WORKDIR：後續指令皆在 /app 中執行，相當於 cd 至該目錄。',
  'COPY . .：第一個點為主機上的目前目錄，第二個點為 Image 中的 /app。',
  'RUN：僅在 build 時執行一次，此處以 yarn 安裝套件。',
  'CMD：每次 Container 啟動時執行，以中括號分隔指令與參數。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
clicks: 5
---

# Dockerfile 與 Image Layer

<LayerDiagram
  code="FROM node:22-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD [&quot;node&quot;, &quot;./src/index.js&quot;]"
  :layers="[
    { name: 'node:22-alpine', size: 'base' },
    { name: 'WORKDIR /app', size: '0 B' },
    { name: 'COPY . .', size: '4.59 MB' },
    { name: 'RUN yarn install', size: '88.5 MB' },
    { name: 'CMD node ...', size: '0 B' },
  ]"
/>

<!--
和手做時一樣，Image 是一層層疊起來的。
RUN yarn install 那層最大，因為套件都裝在這層。
WORKDIR 和 CMD 只改設定，不佔空間。
-->

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 3
---

<script setup>
const up = '~/getting-started-todo-app$ '
const inApp = '~/getting-started-todo-app/app$ '
const cmds = [
  { p: up, c: 'docker build .', o: 'ERROR: failed to solve: failed to read dockerfile:\nopen Dockerfile: no such file or directory' },
  { p: up, c: 'cd app', o: '', after: inApp },
  { p: inApp, c: 'docker build .', o: ' => [4/4] RUN yarn install --production    15.0s\n => => writing image sha256:8f6fed8c4a12...' },
]
</script>

# 常見錯誤：找不到 Dockerfile

<TerminalTyping :cmds="cmds" :keep="3" prompt="" />

::note::

<Note :notes="[
  '這是初學者最常遇到的錯誤，先認識錯誤訊息的格式。',
  'docker build . 的點代表目前目錄，此目錄中沒有 Dockerfile。',
  '從提示字元確認目前位置，再 cd 至 app。',
  '於正確的目錄中執行即可 build 成功。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 2
---

# 以 Tag 命名 Image

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker build -t my-username/my-image .', o: ' => => naming to docker.io/my-username/my-image' },
  { c: 'docker image ls', o: 'REPOSITORY             TAG      IMAGE ID       CREATED          SIZE\nmy-username/my-image   latest   746c7e06537f   24 seconds ago   354MB' },
]" />

::note::

<Note :notes="[
  'build 完成後僅產生一串 sha256，難以辨識。',
  '-t 在 build 時同時指定名稱，作用如同 git tag。',
  'docker image ls 列出所有 Image；未指定版本時，TAG 預設為 latest。',
]" />

---
layout: figure
chapter: Ch 3 · Building Images
takeaway: 列表中出現 my-username/my-image 即代表成功；提前完成者可修改 app.js 後重新 build，觀察哪些 Layer 顯示 CACHED。
---

# 檢查點：Image 建立完成

<TerminalTyping all :cmds="[
  { c: 'docker image ls', o: 'REPOSITORY             TAG      IMAGE ID       CREATED          SIZE\nmy-username/my-image   latest   746c7e06537f   24 seconds ago   354MB' },
]" />

---
layout: bento
chapter: Ch 3 · Building Images
---

# Building Images 重點整理

<Tile variant="hero" label="本章重點" value="Image 由多個 Layer 堆疊而成">每個步驟新增一個 Layer，既有 Layer 不會被修改</Tile>
<Tile label="手動建立" value="commit" mono>在 Container 中安裝後儲存</Tile>
<Tile variant="accent" label="建立步驟" value="Dockerfile" mono>將步驟寫成文件後 build</Tile>
<Tile label="命名" value="build -t" mono>作用如同 git tag，無須記憶 sha256</Tile>
<Tile label="查看歷史" value="image history" mono>作用如同 git log，列出每個 Layer</Tile>
