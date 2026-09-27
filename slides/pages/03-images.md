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
layout: cols
chapter: Ch 3 · Building Images
reveal: true
clicks: 2
cards:
  - label: 做法 1
    title: 手做後拍照存檔
    text: 進到 Container 裡把東西裝好，再用 <code>commit</code> 存成 Image。
  - label: 做法 2
    title: 照食譜做
    text: 把步驟寫進 <code>Dockerfile</code>，交給 <code>docker build</code> 照著做。
---

# 建立 Image 的兩種方式

<!--
先用手做，體會 Image 是怎麼一層層長出來的；再換成 Dockerfile，看為什麼大家都用食譜。
-->

---
layout: steps
chapter: Ch 3 · Building Images
clicks: 3
steps:
  - title: 進去
    code: docker run -it ubuntu
    text: 開一個 Container，直接進到它的 Terminal。
  - title: 安裝
    code: apt install -y nodejs
    text: 在 Container 裡裝 Node。
  - title: 離開
    code: exit
    text: 回到自己的電腦。
  - title: 存檔
    code: docker container commit
    text: 把這個 Container 存成新的 Image。
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
  '指令都在共用連結，直接複製貼上。',
  '-it 讓你進到 Container 裡操作。提示字元變成 root@ 開頭，代表你已經在裡面了。',
  '這台 Container 是乾淨的 Ubuntu，沒有 Node，要自己裝。',
  '印出 Hello world! 就代表 Node 裝好了。',
  'exit 回到自己的電腦，提示字元變回來。',
  'commit 把這個 Container 的狀態存成新的 Image，名字叫 node-base。',
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
  - [看歷史, '<code>docker image history</code>', '<code>git log</code>']
  - [取名字, '<code>docker image tag</code>', '<code>git tag</code>']
  - [存了什麼, 整個 Container 的檔案狀態, 只有 add 過的檔案]
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
  '這次用剛剛做好的 node-base 開 Container，裡面已經有 Node。',
  '進到 Container 裡。',
  '把一行程式寫進 app.js。',
  '先在裡面跑一次確認。',
  '離開 Container。',
  '存成 sample-app，並用 -c 指定啟動時要跑的指令。',
  '不用再進去，run 起來就直接印出結果。',
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
  { t: '&quot;CMD node app.js&quot;', label: '啟動時要跑的指令', h: 40 },
  { t: '-m' },
  { t: '&quot;Add app&quot;', label: '這一版的說明', h: 110 },
  { t: 'app-container', label: '從哪個 Container', h: 40 },
  { t: 'sample-app', label: '新 Image 的名字', h: 110 },
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
  'app-container 就是用 node-base 開的，裡面有 app.js。',
  '同一個 node-base 開一個新的 Container，列出檔案：沒有 app.js。',
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

看不到。每個 Container 各自獨立，在 A 裡做的事不會影響 B，你們剛剛用 `docker run node-base ls` 自己證明了。

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
  '一個 Image，還沒開任何 Container。',
  '用同一個 Image，開出 A 和 B 兩個 Container。',
  'A 裡建立 hello.txt，B 還是空的：每個 Container 各自獨立。',
]" />

<!--
這張圖 Ch4 會再出現，接著往下演。
-->

---
layout: statement
chapter: Ch 3 · Building Images
---

# commit 無法記錄建立過程

就像煮到一半拍照存檔，看不出中間加了什麼。把步驟寫下來交給 Docker 照著做，這份食譜就是 `Dockerfile`。

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
  '剛剛手做的 node-base，在這裡只要一行 FROM。',
  '設定之後指令在哪個資料夾執行。',
  '把電腦上的專案檔案複製進 Image。',
  '建立 Image 時安裝套件。',
  'Container 啟動時要跑的指令。',
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
  '五行，每一行都是一個指令加上它的參數。',
  'FROM：基底 Image。node:22-alpine 是官方做好的 Node 22，底層是很小的 Alpine Linux。',
  'WORKDIR：之後的指令都在 /app 裡執行，相當於 cd 進去。',
  'COPY . .：第一個點是電腦上的目前資料夾，第二個點是 Image 裡的 /app。',
  'RUN：只在 build 的時候跑一次，這裡用 yarn 安裝套件。',
  'CMD：每次 Container 啟動時跑。用中括號把指令和參數分開寫。',
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
  '新手最常卡在這裡，先看一次錯誤長什麼樣子。',
  'docker build . 的點代表目前資料夾，這裡沒有 Dockerfile。',
  '看提示字元確認自己在哪，cd 到 app。',
  '在正確的資料夾就 build 成功了。',
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
  'build 完只給一串 sha256，沒人記得住。',
  '-t 在 build 時順便取名字，就像 git tag。',
  'docker image ls 列出所有 Image，沒寫版本時 TAG 預設是 latest。',
]" />

---
layout: figure
chapter: Ch 3 · Building Images
takeaway: 看到 my-username/my-image 就成功；做得快的人，改一下 app.js 再 build，看哪幾層顯示 CACHED。
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

<Tile variant="hero" label="這一章" value="Image 是一層層疊起來的">每一個步驟都會多一層，舊的層不會被改掉</Tile>
<Tile label="手做" value="commit" mono>進 Container 裝好再存檔</Tile>
<Tile variant="accent" label="食譜" value="Dockerfile" mono>把步驟寫下來，照著 build</Tile>
<Tile label="取名字" value="build -t" mono>像 git tag，不用記 sha256</Tile>
<Tile label="看歷史" value="image history" mono>像 git log，看每一層</Tile>
