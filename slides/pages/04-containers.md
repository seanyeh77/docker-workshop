---
layout: figure
chapter: Break
near: true
clicks: 1
---

# 休息 10 分鐘

<TerminalTyping big :start="1" :keep="2" :cmds="[
  { c: 'docker stop audience', o: 'audience' },
  { c: 'docker restart audience', o: 'audience' },
]" />

<Countdown :minutes="10" />

<p class="break-note">stop 之後要 restart 才會回來，請準時。</p>

<!--
回來時按一下，打出 docker restart audience。等一下講到 stop 和 restart，可以說「你們剛剛就被 restart 過了」。
-->

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
  '之前跑 Container 都要讓 Terminal 開著，一關服務就停了。',
  '-d 讓 Container 在背景執行，Terminal 馬上就能繼續用。',
  'docker ps 列出正在跑的 Container，STATUS 是 Up 代表活著。',
]" />

---
layout: steps
chapter: Ch 4 · Running Containers
clicks: 3
steps:
  - title: 背景執行
    code: docker run -d
    text: 開一個 Container 放著跑。
  - title: 停止
    code: docker stop my-image
    text: 停下來，但 Container 還在。
  - title: 重新啟動
    code: docker restart my-image
    text: 停下來的 Container 可以再開。
  - title: 刪除
    code: docker rm my-image
    text: 停下來的 Container 才能刪；刪了就沒了。
---

# 停止、重啟與刪除 Container

<!--
「離開」不等於「關掉」。背景執行的 Container 要用 docker stop 停。
剛剛休息時你們就被 stop 又 restart 過一次。
-->

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
  '同一個名字不能有兩個 Container。',
  '剛剛那個 my-image 還在，所以名稱衝突。',
  'rm -f 會先停再刪，一步到位。',
  '之後每次要重開同名的 Container，都先 rm -f。',
]" />

---
layout: textbook
chapter: Ch 4 · Running Containers
ltag: Terminal
clicks: 3
---

<script setup>
const cmds = [
  { c: 'docker run --rm -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=default postgres env', o: 'POSTGRES_PASSWORD=secret\nPOSTGRES_DB=default\nPG_MAJOR=18\n...' },
  { c: 'cat .env', o: 'POSTGRES_DB=default\nPOSTGRES_PASSWORD=secret' },
  { c: 'docker run --rm --env-file .env postgres env', o: 'POSTGRES_DB=default\nPOSTGRES_PASSWORD=secret\n...' },
]
</script>

# 環境變數

<TerminalTyping :cmds="cmds" :keep="2" />

::note::

<Note :notes="[
  'Dockerfile 裡的 ENV 是預設值，實際用時常要改，例如資料庫的密碼和名稱。',
  '-e 設一個環境變數，會蓋掉 Image 裡的預設值。最後的 env 會把所有變數印出來。',
  '變數一多，就寫進 .env 檔。',
  '--env-file 一次讀進整個檔案。--rm 讓 Container 跑完就自動刪掉。',
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

<!--
docker ps 看得到它活著，但沒開 Port，外面的請求進不去，Container「已讀不回」。
-->

---
layout: textbook
chapter: Ch 4 · Running Containers
clicks: 1
---

# Port Mapping

<PortMap />

::note::

<Note :notes="[
  'Container 像大樓裡的房間，外面打不進去。',
  '-p 3000:3000：外面打到電腦的 3000，轉接到房間裡的 3000。左邊是電腦，右邊是 Container。',
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
  { c: 'docker run -d -p 3000 --name=my-image my-username/my-image', o: 'f0e47efa2504...' },
  { c: 'docker ps', o: 'IMAGE                  PORTS                     NAMES\nmy-username/my-image   0.0.0.0:50683->3000/tcp   my-image' },
  { c: 'docker rm -f my-image', o: 'my-image' },
  { c: 'docker run -d -p 3000:3000 --name=my-image my-username/my-image', o: 'bcce8acb5047...' },
]
</script>

# 實作：Port Mapping

<TerminalTyping :cmds="cmds" :keep="3" />

::note::

<Note :notes="[
  '先把沒開 Port 的那個刪掉。',
  '只寫 -p 3000：Container 的 3000 會接到電腦上一個隨機的 Port。',
  '這次是 50683，每次都不一樣，開發時很不方便。',
  '再刪掉，這次把兩邊都寫清楚。',
  '電腦的 3000 固定接到 Container 的 3000。',
]" />

---
layout: figure
chapter: Ch 4 · Running Containers
takeaway: 瀏覽器打開 localhost:3000，看到 todo app 就成功。
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
  { c: 'docker run -d -p 3000:3000 --name=my-image-2 my-username/my-image', o: 'docker: Error response from daemon: ... Bind for 0.0.0.0:3000 failed:\nport is already allocated.' },
  { c: 'docker rm -f my-image-2', o: 'my-image-2' },
]" />

::note::

<Note :notes="[
  '同一個 Port 只能接一個 Container。',
  '3000 已經接到 my-image 了，第二個接不上。',
  '失敗的 Container 還留著，先刪掉。想同時開兩個，就把第二個改成 -p 3001:3000。',
]" />

---
layout: textbook
chapter: Ch 4 · Running Containers
near: true
---

# 實作：新增 3 筆待辦事項

<BrowserMock :items="['買牛奶', '寫作業', '練習 Docker']" />

<!--
請大家真的加 3 筆，等一下要用。
-->

---
layout: quiz
chapter: Ch 4 · Running Containers
question: 接續 Q1。把 Container A 用 docker rm 刪掉，再用同一個 Image 開一個新的 A，hello.txt 還在嗎？
slido: '#docker-ws'
clicks: 1
answer: 1
options:
  - 還在
  - 不見了
  - 要先 commit 才會在
---

不見了。Image 建好就不會改，檔案只存在被刪掉的那個 Container 裡。commit 確實會存成新的 Image，但你是用原本的 Image 重開，所以一樣看不到。

<!--
先投票，再按一下揭曉。
第三個選項是給學過 git 的人的陷阱：「有 commit 就會在」。
-->

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
  '待辦事項存在 Container 裡的 /etc/todos。',
  '把 Container 刪掉。',
  '用同一個 Image 重開，重新整理瀏覽器：3 筆全部不見了。',
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
  'A 裡有 hello.txt，B 是空的。',
  'A 刪掉重開，hello.txt 跟著不見：這就是 Q2 的答案。',
  '加一個 Volume 掛進 A，hello.txt 改存在 Volume 裡。',
  'A 再刪掉重開，接回同一個 Volume，hello.txt 還在。',
]" />

---
layout: definition
chapter: Ch 4 · Running Containers
term: Volume
kind: 名詞
---

Docker 管理的一塊儲存空間，放在 Container 外面。把它掛到 Container 裡的某個資料夾，寫進那個資料夾的檔案就會存在 Volume 裡，Container 刪掉也不會消失。

::example::

Container 像飯店房間，退房（rm）時房裡的東西會被清掉；Volume 是寄放在櫃檯的行李，下次入住（run）再領回來。

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
  { t: '-p 3000:3000', label: '電腦的 Port : Container 的 Port', h: 120 },
  { t: '-v todo-data:/etc/todos', label: 'Volume : Container 裡的資料夾', h: 40 },
  { t: '--name=my-image', label: 'Container 的名字', h: 120 },
  { t: 'my-username/my-image', label: '用哪個 Image', h: 40 },
]" />

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
  '先建一個 Volume，專門放 todo app 的資料。',
  '建好 Volume。',
  '刪掉舊的 Container。',
  '用 -v 把 todo-data 掛到 /etc/todos，todo app 的資料就寫在這裡。',
]" />

---
layout: figure
chapter: Ch 4 · Running Containers
takeaway: 加幾筆待辦事項，rm -f 之後用同一條 -v 指令重開，資料還在就成功。
---

# 檢查點：資料在重建後保留

<BrowserMock :items="['買牛奶', '寫作業', '練習 Docker']" />

<!--
加分題：同時開兩個 todo app，分別綁 3000 和 3001，兩個分頁各自有獨立的待辦事項。
-->
