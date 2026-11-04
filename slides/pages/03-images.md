---
layout: section
number: 3
chapter: Ch 3 · Building Images
---

# Building Images

- **3.1** 以 commit 建立 Image
- **3.2** 驗證 Q3
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

---
layout: focus
chapter: Ch 3 · Building Images
numbered: true
clicks: 3
items:
  - title: 進入 Container
    code: docker run --name=base-container -it alpine
    text: 以 alpine Image 啟動一個名為 <code>base-container</code> 的 Container，並進入其 Terminal。
  - title: 安裝 Node
    code: apk add nodejs
    text: 以 Alpine 的套件管理工具 <code>apk</code> 安裝 Node；它會自動取得套件清單。
  - title: 離開 Container
    code: exit
    text: 返回主機，提示字元由 <code>/ #</code> 恢復為原本的格式。
  - title: 儲存為 Image
    code: docker container commit base-container node-base
    text: 將已安裝 Node 的 <code>base-container</code> 儲存為新的 Image，命名為 <code>node-base</code>。
---

# 以 commit 建立 Image 的流程

---
layout: quiz
chapter: Ch 3 · Building Images
question: Q3．將裝好 Node 的 base-container commit 成 Image node-base 後，以原本的 alpine Image 啟動的 Container 有 Node 嗎？
clicks: 1
answer: 1
options:
  - 有，commit 會一併更新 alpine Image
  - 沒有，Node 只存在於 node-base
  - 只在原本的 Container 執行時才有
---

commit 產生一個新的 Image，原本的 alpine Image 不會被修改。接下來實際建立 node-base 並驗證。

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 5
---

<script setup>
const root = '/ # '
const cmds = [
  { c: 'docker run --name=base-container -it alpine', o: '', after: root },
  { p: root, c: 'apk add nodejs', o: 'fetch https://dl-cdn.alpinelinux.org/alpine/v3.24/main/x86_64/APKINDEX.tar.gz\n...\nOK: xx MiB in xx packages' },
  { p: root, c: `node -e 'console.log("Hello world!")'`, o: 'Hello world!' },
  { p: root, c: 'exit', o: '', after: '$ ' },
  { c: 'docker container commit -m "Add node" base-container node-base', o: 'sha256:5c3477c0e3cb...' },
]
</script>

# 實作：建立 node-base

<TerminalTyping :cmds="cmds" :keep="5" />

::note::

<Note :notes="[
  '',
  '-it：進入 Container 操作，提示字元變為 / #。',
  '',
  '',
  'exit：返回主機。',
  'commit：將 Container 存成 Image node-base。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 4
---

# 名稱已被使用：重新進入原本的 Container

<TerminalTyping :keep="3" :cmds="[
  { c: 'docker run --name=base-container -it alpine', o: 'docker: Error response from daemon: Conflict. The container name\n&quot;/base-container&quot; is already in use by container &quot;28c4c1f50039...&quot;.' },
  { c: 'docker start -ai base-container', o: '', after: '/ # ' },
  { p: '/ # ', c: 'which node', o: '/usr/bin/node' },
  { p: '/ # ', c: 'exit', o: '', after: '$ ' },
]" />

::note::

<Note :notes="[
  '',
  'Container 名稱不能重複使用。',
  'docker start -ai：重新啟動並進入原本的 Container。',
  '先前安裝的 Node 仍在。',
  'exit 只會停止 Container，不會刪除。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 3
---

# 名稱已被使用：刪除後重新建立

<TerminalTyping :keep="3" :cmds="[
  { c: 'docker run --name=base-container -it alpine', o: 'docker: Error response from daemon: Conflict. The container name\n&quot;/base-container&quot; is already in use by container &quot;28c4c1f50039...&quot;.' },
  { c: 'docker rm -f base-container', o: 'base-container' },
  { c: 'docker run --name=base-container -it alpine', o: '', after: '/ # ' },
]" />

::note::

<Note :notes="[
  '',
  'docker rm -f：刪除舊的 Container。',
  '',
  '舊 Container 中的變更一併消失。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 2
---

# 驗證 Q3：commit 不會修改原本的 Image

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker run --rm alpine which node', o: '' },
  { c: 'docker run --rm node-base which node', o: '/usr/bin/node' },
]" />

::note::

<Note :notes="[
  'which node：輸出 node 的位置，找不到則沒有輸出。',
  'alpine 沒有 Node。',
  'node-base 有 Node。',
]" />

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

---
layout: figure
chapter: Ch 3 · Building Images
takeaway: Image 經 run 產生 Container，Container 經 commit 產生新的 Image；原本的 alpine 不會改變。
---

# 目前的 Image 與 Container

<ImageMap :stage="1" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 1
---

<script setup>
const cmds = [
  { c: 'docker image history node-base', o: 'IMAGE          CREATED          SIZE     COMMENT\n5c3477c0e3cb   13 seconds ago   68.4MB   Add node\nf7bbaec1bd03   11 days ago      0B       buildkit.dockerfile.v0\n&lt;missing&gt;      11 days ago      8.66MB   buildkit.dockerfile.v0' },
]
</script>

# 查看 node-base 的 Layer

<TerminalTyping :cmds="cmds" :keep="1" />

::note::

<Note :notes="[
  'docker image history：列出 Image 的 Layer，最上面是最新的。',
  '最上層 68.4MB 由 commit 新增；下面兩層來自 alpine。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 3
---

# 重複 commit 與未命名的 Image

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker container commit base-container node-base', o: 'sha256:9e1f4a7c2d30...' },
  { c: 'docker image ls -a', o: 'IMAGE                ID             DISK USAGE\nnode-base:latest     9e1f4a7c2d30         77.1MB\n&amp;lt;untagged&amp;gt;           5c3477c0e3cb         77.1MB' },
  { c: 'docker image prune', o: 'WARNING! This will remove all dangling images.\nAre you sure you want to continue? [y/N] y\nDeleted Images:\ndeleted: sha256:44ed90d734c1...\ndeleted: sha256:be2fc08f6950...\n...\n\nTotal reclaimed space: 68.41MB' },
]" />

::note::

<Note :notes="[
  '',
  'node-base 這個名稱移到新的 Image 上。',
  '舊 Image 失去名稱但仍佔用空間；ls 需加 -a 才會顯示。',
  'prune：刪除未命名且未被使用的 Image。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 6
---

<script setup>
const root = '/ # '
const cmds = [
  { c: 'docker run --name=app-container -it node-base', o: '', after: root },
  { p: root, c: `echo 'console.log("Hello from an app")' > app.js`, o: '' },
  { p: root, c: 'node app.js', o: 'Hello from an app' },
  { p: root, c: 'exit', o: '', after: '$ ' },
  { c: 'docker container commit -c "CMD node app.js" -m "Add app" app-container sample-app', o: 'sha256:10d3013d540b...' },
  { c: 'docker run --rm sample-app', o: 'Hello from an app' },
]
</script>

# 實作：建立 sample-app

<TerminalTyping :cmds="cmds" :keep="3" />

::note::

<Note :notes="[
  '',
  '',
  '',
  '',
  '',
  '-c：指定 Container 啟動時執行的指令。',
  '',
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
layout: figure
chapter: Ch 3 · Building Images
takeaway: sample-app 由 node-base 衍生而來；每個 Container 都來自一個 Image。
---

# 目前的 Image 與 Container

<ImageMap :stage="2" />

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

<TerminalTyping :keep="3" dir="~" :cmds="[
  { c: 'git clone -b build-image-from-scratch https://github.com/docker/getting-started-todo-app', o: 'Cloning into \'getting-started-todo-app\'...' },
  { c: 'cd getting-started-todo-app/app', o: '', to: '~/getting-started-todo-app/app' },
  { c: 'rm Dockerfile', o: '' },
]" />

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
  'FROM：基底 Image。',
  'WORKDIR：之後的指令在 /app 中執行。',
  'COPY . .：將主機的目前目錄複製到 Image 的 /app。',
  'RUN：build 時執行。',
  'CMD：Container 啟動時執行。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
---

# Dockerfile 與 Image Layer

<LayerDiagram
  all
  code="FROM node:22-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD [&quot;node&quot;, &quot;./src/index.js&quot;]"
  :layers="[
    { name: 'node:22-alpine', size: '164 MB' },
    { name: 'WORKDIR /app', size: '0 B' },
    { name: 'COPY . .', size: '4.59 MB' },
    { name: 'RUN yarn install', size: '89.8 MB' },
    { name: 'CMD node ...', size: '0 B' },
  ]"
/>

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 2
---

<script setup>
const cmds = [
  { c: 'docker image history sample-app', o: 'CREATED BY                                      SIZE      COMMENT\n/bin/sh                                         2.26kB    Add app\n/bin/sh                                         68.4MB    Add node\nCMD ["/bin/sh"]                                 0B        buildkit.dockerfile.v0\nADD alpine-minirootfs-3.24.3-aarch64.tar.gz …   8.66MB    buildkit.dockerfile.v0' },
  { c: 'docker image history my-username/my-image', o: 'CREATED BY                                      SIZE      COMMENT\nCMD ["node" "./src/index.js"]                   0B        buildkit.dockerfile.v0\nRUN /bin/sh -c yarn install --production # b…   89.8MB    buildkit.dockerfile.v0\nCOPY . . # buildkit                             4.59MB    buildkit.dockerfile.v0\nWORKDIR /app                                    0B        buildkit.dockerfile.v0\n...' },
]
</script>

# commit 與 Dockerfile 的 Layer 比較

<TerminalTyping :cmds="cmds" :keep="2" />

::note::

<Note :notes="[
  '輸出只保留 CREATED BY、SIZE 與 COMMENT。',
  'commit：只記錄 /bin/sh，看不出做了什麼。',
  'Dockerfile：每一層記錄對應的指令。',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 4
---

<script setup>
const cmds = [
  { dir: '~/getting-started-todo-app/app', c: 'cd ..', o: '', to: '~/getting-started-todo-app' },
  { c: 'docker build .', o: 'ERROR: failed to solve: failed to read dockerfile:\nopen Dockerfile: no such file or directory' },
  { c: 'cd app', o: '', to: '~/getting-started-todo-app/app' },
  { c: 'docker build .', o: ' => [4/4] RUN yarn install --production    9.7s\n => => writing image sha256:4c27aec27050...' },
]
</script>

# 常見錯誤：找不到 Dockerfile

<TerminalTyping :cmds="cmds" :keep="3" />

::note::

<Note :notes="[
  '示範常見錯誤，不必跟著做。',
  '',
  'docker build . 的點代表目前目錄，此處沒有 Dockerfile。',
  '',
  '',
]" />

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 2
---

# 以 Tag 命名 Image

<TerminalTyping :keep="2" dir="~/getting-started-todo-app/app" :cmds="[
  { c: 'docker build -t my-username/my-image .', o: ' => => naming to docker.io/my-username/my-image' },
  { c: 'docker image ls', o: 'IMAGE                         ID             DISK USAGE\nmy-username/my-image:latest   314f68b864b1        258MB' },
]" />

::note::

<Note :notes="[
  '',
  '-t：build 時指定名稱。',
  '未指定版本時預設為 latest。',
]" />

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
  - [命名, '<code>docker tag node-base node-base:v1</code>', '<code>git tag v1</code>']
  - [儲存內容, 整個 Container 的檔案狀態, 僅包含 add 過的檔案]
---

# Docker 與 git 的對應

---
layout: figure
chapter: Ch 3 · Building Images
takeaway: Dockerfile 以 build 直接產生 Image，不需手動 run 與 commit。
---

# 目前的 Image 與 Container

<ImageMap :stage="3" />

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
