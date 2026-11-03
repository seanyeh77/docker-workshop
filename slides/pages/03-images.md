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

<!--
這是等一下實作的四個步驟，先看全貌。
-->

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

<!--
剛講完 commit 的流程，先舉手表決，再按一下公布答案。
做完 node-base 後用 which node 驗證。
-->

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
  '指令皆已放在共用連結，可直接複製使用。',
  '-it 用於進入 Container 操作。提示字元變為 / #，代表已位於 Container 內。',
  '此 Container 僅包含基本的 Alpine，以 apk 安裝 Node。',
  '輸出 Hello world! 代表 Node 安裝完成。',
  'exit 返回主機，提示字元恢復原狀。',
  'commit 將此 Container 的狀態儲存為新的 Image，名稱為 node-base。',
]" />

<!--
最常見的錯：還在 Container 裡就打 docker 指令，會出現 command not found。先看提示字元。
若有人遇到名稱衝突，下一張說明處理方式。
-->

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
  '已建立過 base-container 時，再次執行 docker run 會發生錯誤。',
  '先前的 base-container 仍存在，名稱不能重複使用。',
  'docker start -ai 重新啟動並進入該 Container：-a 顯示輸出，-i 接受輸入。',
  '先前安裝的 Node 仍在，可直接接續。',
  '以 exit 離開 Container，回到主機；Container 會停止，但不會被刪除，之後可再以 docker start -ai 進入。',
]" />

<!--
離開 Container 不會刪掉它，所以重打一次 docker run 就會撞名。
第一種處理：docker start -ai 回到原本那個 Container，裝過的東西都還在。
-->

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
  '同樣的名稱衝突。',
  '若想從頭開始，以 docker rm -f 刪除舊的 base-container；-f 會先停止再刪除。',
  '名稱已釋出，重新建立一個乾淨的 base-container。',
  '舊 Container 中的變更會一併消失，需重新安裝 Node。',
]" />

<!--
第二種處理：刪掉重來。Ch4 會再正式講名稱衝突與 rm。
-->

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
  'which node 會輸出 node 的位置；找不到時不輸出任何內容。這裡比較兩個 Image：原本的 alpine 與 commit 出的 node-base。',
  '以原本的 alpine 啟動：找不到 node。',
  '以 node-base 啟動：Node 位於 /usr/bin/node。',
]" />

<!--
剛做完 node-base，馬上驗證 Q3 的答案：commit 產生新的 Image，原本的 alpine 不受影響。
下一張換個角度：從同一個 Image 開出的 Container 之間也互不影響。
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
接續驗證 Q3：Image 不會被 Container 修改，Container 之間也各自獨立。在 A 裡建立的檔案，B 看不到。
這張圖 Ch4 會再出現，接著往下演。
下一張盤點目前手上的 Image 與 Container。
-->

---
layout: figure
chapter: Ch 3 · Building Images
takeaway: Image 經 run 產生 Container，Container 經 commit 產生新的 Image；原本的 alpine 不會改變。
---

# 目前的 Image 與 Container

<ImageMap :stage="1" />

<!--
盤點一下目前手上有什麼。綠色是 Image，灰色是 Container，teal 框是這一段新增的。
alpine 經 run 變成 base-container，裝了 Node 之後 commit 成 node-base。
請大家打 docker image ls 與 docker ps -a 對照：Image 會看到 alpine、node-base（以及 Ch2 的 hello-world、ubuntu）；Container 會看到已停止的 base-container。
這張圖之後還會出現兩次，每次多幾個方塊。
-->

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
---

<script setup>
const docker = [
  { c: 'docker image history node-base', o: 'IMAGE          CREATED          SIZE     COMMENT\n5c3477c0e3cb   13 seconds ago   68.4MB   Add node\nf7bbaec1bd03   11 days ago      0B       buildkit.dockerfile.v0\n&lt;missing&gt;      11 days ago      8.66MB   buildkit.dockerfile.v0' },
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
剛剛 commit 完，先看 node-base 存了什麼。git 有 git log 看歷史，Docker 也有對應的指令。
最上面那一層就是剛剛 commit 的 Add node，68.4MB，是裝 Node 多出來的。
下面兩層是 alpine 原本就有的：8.66MB 是 alpine 的檔案，0B 那層是 alpine 的 CMD 設定。整個 alpine 不到 10MB。Image 就是這樣一層層疊起來的。
兩邊排版很像，但有一個關鍵差異，下一張再 commit 一次就看得出來。
-->

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
  '對同一個 base-container 再 commit 一次，並沿用名稱 node-base。',
  '產生新的 Image，node-base 這個名稱移到新的 Image 上。',
  '舊的 Image 失去名稱，成為未命名（dangling）的 Image。docker image ls 需加 -a 才會顯示，但仍佔用硬碟空間。',
  'docker image prune 刪除所有未命名、且未被任何 Container 使用的 Image。',
]" />

<!--
原理：Image 的名稱（tag）只是一張標籤，同一時間只能貼在一個 Image 上。commit 到同一個名稱，標籤就移到新的 Image，舊的不會被刪除，只是沒有名字。
和 git 不同：第二次 commit 不會疊在第一次上面，docker image history node-base 只會看到這一次的 commit 直接接在 alpine 上。
prune 前會詢問確認，輸入 y 才會刪除；加 -f 可略過確認。
刪除的 sha256 會列出好幾行，那是這個 Image 的設定與各個 Layer，一起被刪掉。
大小依 alpine 與 nodejs 的版本而異。
-->

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
  { c: 'docker container commit -c "CMD node app.js" -m "Add app" app-container sample-app', o: 'sha256:d7f9fd6abcf2...' },
  { c: 'docker run --rm sample-app', o: 'Hello from an app' },
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
  '無須進入 Container，執行後即直接輸出結果；--rm 讓這個 Container 用完即刪除。',
]" />

<!--
重做時若出現 The container name "/app-container" is already in use，先執行 docker rm -f app-container 再重來。
-->

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

<!--
再盤點一次：從 node-base 開出 app-container，寫好 app.js 後 commit 成 sample-app。
同樣的 run、commit 循環又走了一次，只是起點換成 node-base。
docker run --rm 開的 Container 用完就刪，所以不會出現在圖上。
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
  'FROM：基底 Image。node:22-alpine 為官方提供的 Node 22，取代先前手動建立的 node-base。',
  'WORKDIR：後續指令皆在 /app 中執行，相當於 cd 至該目錄。',
  'COPY . .：第一個點為主機上的目前目錄，第二個點為 Image 中的 /app。',
  'RUN：僅在 build 時執行一次，此處以 yarn 安裝套件。',
  'CMD：每次 Container 啟動時執行，以中括號分隔指令與參數。',
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

<!--
和手做時一樣，Image 是一層層疊起來的。
RUN yarn install 那層最大，因為套件都裝在這層。
每一行都會在 history 留下一筆紀錄，但只有改到檔案的 RUN、COPY、ADD 會產生有內容的 Layer。
CMD、ENV、EXPOSE 只改設定，所以是 0 B。
WORKDIR 會建立 /app 目錄，但目錄本身幾乎不佔空間，所以通常顯示 0B；某些環境會顯示幾 kB。
數字來自實際 build：node:22-alpine 本身 164MB，加上 COPY 4.59MB、yarn install 89.8MB，整個 Image 約 258MB，和 docker image ls 看到的一致。
-->

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 4
---

<script setup>
const up = '~/getting-started-todo-app$ '
const inApp = '~/getting-started-todo-app/app$ '
const cmds = [
  { p: inApp, c: 'cd ..', o: '', after: up },
  { p: up, c: 'docker build .', o: 'ERROR: failed to solve: failed to read dockerfile:\nopen Dockerfile: no such file or directory' },
  { p: up, c: 'cd app', o: '', after: inApp },
  { p: inApp, c: 'docker build .', o: ' => [4/4] RUN yarn install --production    9.7s\n => => writing image sha256:4c27aec27050...' },
]
</script>

# 常見錯誤：找不到 Dockerfile

<TerminalTyping :cmds="cmds" :keep="3" prompt="" />

::note::

<Note :notes="[
  '這是初學者最常遇到的錯誤，由講師示範，學生不必跟著做。',
  '先刻意回到上一層的 getting-started-todo-app。',
  'docker build . 的點代表目前目錄，此目錄中沒有 Dockerfile。',
  '從提示字元確認目前位置，再 cd 至 app。',
  '於正確的目錄中執行即可 build 成功。',
]" />

<!--
講師示範即可。學生前面已經 cd 到 app 並在那裡寫好 Dockerfile，直接 docker build . 就會成功。
真正會踩到的情境：開新的 Terminal、或 clone 完忘了 cd，停在上一層就執行 build。
-->

---
layout: textbook
chapter: Ch 3 · Building Images
ltag: Terminal
clicks: 2
---

# 以 Tag 命名 Image

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker build -t my-username/my-image .', o: ' => => naming to docker.io/my-username/my-image' },
  { c: 'docker image ls', o: 'IMAGE                         ID             DISK USAGE\nmy-username/my-image:latest   314f68b864b1        258MB' },
]" />

::note::

<Note :notes="[
  'build 完成後僅產生一串 sha256，難以辨識。',
  '-t 在 build 時同時指定名稱，作用如同 git tag。',
  'docker image ls 列出所有 Image。列表中出現剛建立的 Image 即代表完成；未指定版本時預設為 latest。',
]" />

<!--
最後一步就是檢查點：列表中出現 my-username/my-image 就成功，沒看到的舉手。
做得快的人：改一下 src/index.js 再 build 一次，看哪幾層顯示 CACHED。
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
  - [命名, '<code>docker tag node-base node-base:v1</code>', '<code>git tag v1</code>']
  - [儲存內容, 整個 Container 的檔案狀態, 僅包含 add 過的檔案]
---

# Docker 與 git 的對應

<!--
Ch3 的指令都學完了，用這張和 git 對照整理。一列一列翻。最後一列要講清楚：docker commit 不用先 add，它會把整個 Container 的檔案狀態存起來。
命名那列：docker tag 是 docker image tag 的簡寫，要給兩個參數：原本的 Image 與新名稱。它不會複製 Image，只是多貼一張標籤，指向同一個 Image ID，就像 git tag v1 指向某個 commit。
另一個差異：git commit 會一個接一個串成歷史；docker commit 每次都是把 Container 當下的狀態直接疊在基底 Image 上，前面重複 commit 時已經看過。
-->

---
layout: figure
chapter: Ch 3 · Building Images
takeaway: Dockerfile 以 build 直接產生 Image，不需手動 run 與 commit。
---

# 目前的 Image 與 Container

<ImageMap :stage="3" />

<!--
最後一次盤點。上面兩排是手動 run、commit 做出來的；最下面一排是 Dockerfile 用 docker build 一步做出來的。
build 的過程中 Docker 也會開暫時的環境執行每一行，但做完就清掉，所以只留下 Image。
Ch4 會從 my-username/my-image 開始跑 Container。
-->

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
