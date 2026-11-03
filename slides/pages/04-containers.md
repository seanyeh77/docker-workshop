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
  '先前執行 Container 時必須保持 Terminal 開啟，關閉後服務即停止。',
  '-d 使 Container 在背景執行，Terminal 可立即繼續使用。',
  'docker ps 列出執行中的 Container，STATUS 為 Up 代表正在執行。',
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
  '同一名稱不能同時指定給兩個 Container。',
  '先前的 my-image 仍存在，因此發生名稱衝突。',
  'rm -f 會先停止再刪除 Container。',
  '之後重新啟動同名 Container 前，請先執行 rm -f。',
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
  'exit 與 docker stop 只會停止 Container，不會刪除；用過的 Container 會持續累積並佔用空間。',
  'docker ps 只列出執行中的 Container，加 -a 才會列出已停止的。',
  'docker container prune 一次刪除所有已停止的 Container；執行中的 my-image 不受影響。',
  '只剩執行中的 Container。刪除前請確認不再需要其中的資料。',
]" />

<!--
銜接上一張：rm 一次刪一個指定的 Container；prune 一次刪掉所有已停止的。
原理：Container 停止後，裡面的檔案（可寫層）仍保留在硬碟上，所以才能 restart 或 start -ai 回去。不再需要時要自己刪。
Ch3 留下的 base-container、app-container 都是已停止的，正好一次清掉。
image prune 刪的是沒有名字的 Image；container prune 刪的是已停止的 Container。被 Container 使用中的 Image 不會被 image prune 刪除，所以通常先 container prune 再 image prune。
prune 前會詢問確認，輸入 y 才會刪除；加 -f 可略過確認。
-->

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
  'Dockerfile 中的 ENV 為預設值，實際使用時常需調整，例如資料庫的密碼與名稱。',
  '-e 設定一個環境變數，並覆蓋 Image 中的預設值。最後的 env 會輸出所有變數。',
  '變數較多時，改寫在 .env 檔中，每行一個變數。此處以 printf 在目前的資料夾建立該檔，\\n 表示換行；也可以用編輯器建立。',
  '以 cat 確認 .env 的內容。',
  '--env-file 一次讀取整個檔案；--rm 使 Container 結束後自動刪除。',
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
  'Container 類似大樓中的房間，外部無法直接連入。',
  '-p 3000:3000：連到主機 3000 的請求會轉送到 Container 的 3000。左側為主機，右側為 Container。',
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
  '先刪除未設定 Port 的 Container。',
  '僅指定 -p 3000 時，Container 的 3000 會對應到主機上隨機的 Port。',
  '此次為 32768，每次可能不同，不利於開發。',
  '再次刪除，並明確指定兩側的 Port。',
  '主機的 3000 固定對應到 Container 的 3000。',
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
  '同一個 Port 僅能對應一個 Container。',
  '3000 已對應到 my-image，第二個 Container 無法使用。主機上其他程式占用 3000 時也會出現相同錯誤，可用 docker ps 查看是誰占用。',
  '啟動失敗的 Container 仍會保留，需先刪除。若要同時執行兩個，可將第二個改為 -p 3001:3000。',
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
question: Q4．todo app 中已新增 3 筆待辦事項。以 docker rm -f 刪除 Container，再以同一個 Image 重新啟動，資料還在嗎？
clicks: 1
answer: 1
options:
  - 還在，資料存在 Image 中
  - 不見了
  - 只要先 docker stop 再刪除就會保留
---


資料寫在 Container 中，刪除 Container 時一併移除；Image 不會保存執行時產生的資料。下一張實際操作。

<!--
先舉手表決，再按一下公布答案。
A 是把 Image 當成存檔的人會選的；C 是以為「正常關機」就會存檔。
下一張實際刪掉重開，接著問：「那資料要放在哪裡？」→ Volume。
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
  '待辦事項儲存於 Container 中的 /etc/todos。',
  '刪除 Container。',
  '以同一個 Image 重新啟動並重新整理瀏覽器，3 筆資料皆已消失。',
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
  '先建立一個 Volume，用於存放 todo app 的資料。',
  'Volume 建立完成。',
  '刪除舊的 Container。',
  '以 -v 將 todo-data 掛載至 /etc/todos，todo app 的資料會寫入此處。',
]" />

---
layout: figure
chapter: Ch 4 · Running Containers
takeaway: 新增數筆待辦事項，執行 rm -f 後以相同的 -v 指令重新啟動，資料仍存在即代表成功。
---

# 檢查點：資料在重建後保留

<BrowserMock :items="['買牛奶', '寫作業', '練習 Docker']" />

<!--
加分題：同時開兩個 todo app，分別綁 3000 和 3001，兩個分頁各自有獨立的待辦事項。
-->

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

<!--
Ch4 學到的參數一次整理：-d、-p、-v、--name。
每次都要打這麼長，下一章用 Compose 把它們寫進檔案。
-->
