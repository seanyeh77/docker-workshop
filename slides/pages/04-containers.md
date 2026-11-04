---
layout: figure
chapter: Break
near: true
clicks: 1
---

# 休息

<TerminalTyping big :start="1" :keep="2" :cmds="[
  { c: 'docker stop audience', o: 'audience' },
  { c: 'docker restart audience', o: 'audience' },
]" />

---
layout: section
number: 4
chapter: Ch 4 · Running Containers
---

# Running Containers

- **4.1** 背景執行、停止與刪除
- **4.2** 環境變數
- **4.3** Port Mapping
- **4.4** 以 Volume 保存資料

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 2
---

# 背景執行 Container

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker run -d --name=my-image my-username/my-image', o: '7c604fab2e45...' },
  { c: 'docker ps', o: 'CONTAINER ID   IMAGE                  STATUS         PORTS   NAMES\n7c604fab2e45   my-username/my-image   Up 2 seconds           my-image' },
]" />

::note::

<Note :notes="[
  '',
  '-d：在背景執行。',
  'docker ps：列出執行中的 Container。',
]" />

---
layout: focus
chapter: Ch 4 · Running Containers
numbered: true
clicks: 3
items:
  - title: 背景執行
    code: docker run -d
    text: 啟動一個在背景執行的 Container，Terminal 可立即繼續使用。
  - title: 停止
    code: docker stop my-image
    text: 停止 Container 的執行；Container 與其中的檔案仍會保留。
  - title: 重新啟動
    code: docker restart my-image
    text: 重新啟動已停止的 Container，並從先前的狀態繼續執行。
  - title: 刪除
    code: docker rm -f my-image
    text: 刪除 Container，其中的檔案會一併移除；-f 會先停止執行中的 Container 再刪除。
---

# 停止、重啟與刪除 Container

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 3
---

# 常見錯誤：Container 名稱衝突

<TerminalTyping :keep="3" :cmds="[
  { c: 'docker run -d --name=my-image my-username/my-image', o: 'docker: Error response from daemon: Conflict. The container name\n&quot;/my-image&quot; is already in use by container &quot;7c604fab2e45...&quot;.' },
  { c: 'docker rm -f my-image', o: 'my-image' },
  { c: 'docker run -d --name=my-image my-username/my-image', o: '0b8d1e5f93a2...' },
]" />

::note::

<Note :notes="[
  '',
  '同名的 Container 仍存在。',
  'rm -f：先停止再刪除。',
  '',
]" />

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 3
---

# 以 prune 清除已停止的 Container

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker ps -a', o: 'CONTAINER ID   IMAGE                  STATUS                      NAMES\n0b8d1e5f93a2   my-username/my-image   Up 1 minute                 my-image\n3b2e9d10c4a7   node-base              Exited (0) 40 minutes ago   app-container\n28c4c1f50039   alpine                 Exited (0) 45 minutes ago   base-container' },
  { c: 'docker container prune', o: 'WARNING! This will remove all stopped containers.\nAre you sure you want to continue? [y/N] y\nDeleted Containers:\n3b2e9d10c4a7...\n28c4c1f50039...\n\nTotal reclaimed space: 68.41MB' },
  { c: 'docker ps -a', o: 'CONTAINER ID   IMAGE                  STATUS                      NAMES\n0b8d1e5f93a2   my-username/my-image   Up 2 minutes                my-image' },
]" />

::note::

<Note :notes="[
  '',
  'ps -a：連同已停止的 Container 一起列出。',
  'container prune：刪除所有已停止的 Container。',
  '',
]" />

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 4
---

<script setup>
const cmds = [
  { c: 'docker run --rm -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=default postgres env', o: '...\nPOSTGRES_PASSWORD=secret\nPOSTGRES_DB=default\n...\nPG_MAJOR=18\n...' },
  { c: "printf 'POSTGRES_DB=default\\nPOSTGRES_PASSWORD=secret\\n' > .env", o: '' },
  { c: 'cat .env', o: 'POSTGRES_DB=default\nPOSTGRES_PASSWORD=secret' },
  { c: 'docker run --rm --env-file .env postgres env', o: '...\nPOSTGRES_PASSWORD=secret\n...\nPG_MAJOR=18\n...\nPOSTGRES_DB=default' },
]
</script>

# 環境變數

<TerminalTyping :cmds="cmds" :keep="3" dir="~/getting-started-todo-app/app" />

::note::

<Note :notes="[
  '',
  '-e：設定環境變數，覆蓋 Image 中的預設值。',
  '.env：每行一個變數。',
  '',
  '--env-file：一次讀取整個檔案。',
]" />

---
layout: figure
chapter: Ch 4 · Running Containers
clicks: 2
---

# Container 無法從外部連線

<ChatBubbles :lines="[
  { who: 'left', name: '瀏覽器', text: 'localhost:3000，在嗎？' },
  { who: 'right', name: 'Container', text: '（已讀）' },
  { who: 'left', name: '瀏覽器', text: '……' },
]" />

---
layout: textbook
chapter: Ch 4 · Running Containers
clicks: 1
---

# Port Mapping

<PortMap />

::note::

<Note :notes="[
  '',
  '-p 主機 Port:Container Port。',
]" />

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 5
---

<script setup>
const cmds = [
  { c: 'docker rm -f my-image', o: 'my-image' },
  { c: 'docker run -d -p 3000 --name=my-image my-username/my-image', o: 'ced6da9e318c...' },
  { c: 'docker ps', o: 'IMAGE                  PORTS                     NAMES\nmy-username/my-image   0.0.0.0:32768->3000/tcp   my-image' },
  { c: 'docker rm -f my-image', o: 'my-image' },
  { c: 'docker run -d -p 3000:3000 --name=my-image my-username/my-image', o: 'bcce8acb5047...' },
]
</script>

# 實作：Port Mapping

<TerminalTyping :cmds="cmds" :keep="3" />

::note::

<Note :notes="[
  '',
  '-p 3000：對應到主機上隨機的 Port。',
  '',
  '',
  '-p 3000:3000：固定對應到主機的 3000。',
]" />

---
layout: figure
chapter: Ch 4 · Running Containers
takeaway: 以瀏覽器開啟 localhost:3000，出現 todo app 即代表成功。
---

# 檢查點：todo app 可以連線

<BrowserMock />

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 2
---

# 常見錯誤：Port 已被占用

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker run -d -p 3000:3000 --name=my-image-2 my-username/my-image', o: 'docker: Error response from daemon: failed to set up container networking:\n... Bind for 0.0.0.0:3000 failed: port is already allocated' },
  { c: 'docker rm -f my-image-2', o: 'my-image-2' },
]" />

::note::

<Note :notes="[
  '',
  '同一個 Port 只能對應一個 Container。',
  '啟動失敗的 Container 仍會保留，需先刪除。',
]" />

---
layout: figure
chapter: Ch 4 · Running Containers
takeaway: 在瀏覽器中新增 3 筆待辦事項，內容不拘。
---

# 實作：新增 3 筆待辦事項

<BrowserMock :items="['買牛奶', '寫作業', '練習 Docker']" />

---
layout: quiz
chapter: Ch 4 · Running Containers
question: Q4．todo app 中已新增 3 筆待辦事項。以 docker rm -f 刪除 Container，再以同一個 Image 重新啟動，資料還在嗎？
clicks: 1
answer: 1
options:
  - 還在，資料存在 Image 中
  - 不見了
  - 只要先 docker stop 再刪除就會保留
---

資料寫在 Container 中，刪除 Container 時一併移除；Image 不會保存執行時產生的資料。下一張實際操作。

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 2
---

# 刪除 Container 後的資料

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker rm -f my-image', o: 'my-image' },
  { c: 'docker run -d -p 3000:3000 --name=my-image my-username/my-image', o: '5d1c7a0e2b44...' },
]" />

::note::

<Note :notes="[
  '待辦事項存於 Container 中的 /etc/todos。',
  '',
  '重新啟動後資料已消失。',
]" />

---
layout: figure
chapter: Ch 4 · Running Containers
clicks: 3
---

# 以 Volume 保存資料

<ContainerStory :from="2" :to="5" :captions="[
  '',
  '',
  'A 中有 hello.txt，B 為空。',
  '刪除並重新啟動 A 後，hello.txt 隨之消失。',
  '將 Volume 掛載至 A，hello.txt 改為儲存於 Volume 中。',
  '再次刪除並重新啟動 A，掛載同一個 Volume 後，hello.txt 仍然存在。',
]" />

---
layout: definition
chapter: Ch 4 · Running Containers
term: Volume
kind: 名詞
---

由 Docker 管理、位於 Container 之外的儲存空間。將其掛載至 Container 中的目錄後，寫入該目錄的檔案會儲存於 Volume，即使刪除 Container 也不會消失。

::example::

Container 類似飯店房間，退房（rm）時房內物品會被清除；Volume 類似寄放於櫃檯的行李，再次入住（run）時可取回。

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 3
---

# 實作：掛載 Volume

<TerminalTyping :keep="3" :cmds="[
  { c: 'docker volume create todo-data', o: 'todo-data' },
  { c: 'docker rm -f my-image', o: 'my-image' },
  { c: 'docker run -d -p 3000:3000 -v todo-data:/etc/todos --name=my-image my-username/my-image', o: '9a3f6c1d8e20...' },
]" />

::note::

<Note :notes="[
  '',
  'Volume：存放資料的空間，獨立於 Container。',
  '',
  '-v todo-data:/etc/todos：資料改寫入 Volume。',
]" />

---
layout: figure
chapter: Ch 4 · Running Containers
takeaway: 重新新增數筆待辦事項，執行 rm -f 後以相同的 -v 指令重新啟動，資料仍存在即代表成功。
---

# 檢查點：資料在重建後保留

<BrowserMock :items="['繳電話費', '複習 Volume', '準備報告']" />

---
layout: textbook
chapter: Ch 4 · Running Containers
clicks: 5
---

# docker run 參數總覽

<AnnotatedCommand :size="28" :parts="[
  { t: 'docker' },
  { t: 'run' },
  { t: '-d', label: '背景執行', h: 40 },
  { t: '-p 3000:3000', label: '主機 Port : Container Port', h: 120 },
  { t: '-v todo-data:/etc/todos', label: 'Volume : Container 內的目錄', h: 40 },
  { t: '--name=my-image', label: 'Container 名稱', h: 120 },
  { t: 'my-username/my-image', label: '使用的 Image', h: 40 },
]" />

