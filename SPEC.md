# Docker Workshop 簡報 SPEC

Sep 28, 2026 · @seanyeh

## Overview

這份 SPEC 定義 Docker Workshop 的簡報流程：180 分、5 個章節、2 次休息、2 題有連續性的 Slido 技術題，內容以 Notion 講義「Docker Workshop」為準。

- 對象：學過寫程式、上過 Terminal 與 git；沒有軟體開發經驗、沒自己裝過程式環境、不知道 Docker 是什麼。
- 課後目標：能說出 Image、Container、Registry 的差別；能寫出一份 Dockerfile 並 build 成 Image；能用 `-d`、`-p`、`-v` 跑起 todo app；能用 `docker compose up` 取代一長串 `docker run`。
- 環境假設：學員在自己電腦上用 Docker Desktop，課前已完成安裝。若改用每人一台 VM，只有 Ch2 需要改成「連上你的 VM」。
- 時長假設：180 分。若只有 120 分，優先砍 Ch3 的 commit 做法（改成講師 demo）與 Ch4 的環境變數段。

### 故事線

整堂課沿著同一個問題往下走，每章的結尾都是下一章的動機：

1. 你的程式傳給別人就跑不起來，而 git 只存程式碼、不存環境（Ch1）
2. 把環境也打包，就是 Image（Ch3）
3. Image 跑起來變成一個真的網站（Ch4）
4. 網站的資料在刪掉 Container 後消失了 → Volume（Ch4 高潮）
5. 指令太長記不住 → Compose（Ch5）

### 核心手法

- 借 git 講 Docker：學員已有 git 的心智模型，commit、log、tag、clone 都能直接對應。
- 兩題 Slido 是上下集：Q1 先猜、在實作中親手驗證；Q2 接著 Q1 問，答案直接引出 Volume。
- 故意示範失敗：新手第一次看到錯誤訊息是在講師的螢幕上，而不是自己的。

## 時間表

章節內容 130 分、休息 20 分、暖場與 Slido Q1 與總結 30 分，共 180 分。

| 開始 | 長度（分） | 段落 | 重點 | 互動 |
| --- | --- | --- | --- | --- |
| 0:00 | 10 | 暖場 | 破冰、點出「環境是別人幫你裝的」 | Slido 暖場投票 |
| 0:10 | 30 | Ch1 Intro to Docker | 三個痛點、git 不存環境、Image / Container / Registry、VM vs Docker | 梗圖 |
| 0:40 | 5 | Slido Q1 | 同一個 Image 開兩個 Container，檔案互通嗎 | 只投票，不公布答案 |
| 0:45 | 10 | Ch2 Set up Docker | `docker run hello-world` 驗證、TA 救援 | TA 巡場 |
| 0:55 | 10 | 休息 1 |  | `docker pause audience` |
| 1:05 | 35 | Ch3 Building Images | commit 做法 → 驗證 Q1 → Dockerfile → build → tag | 實作 |
| 1:40 | 10 | 休息 2 |  | `docker stop audience` |
| 1:50 | 35 | Ch4 Running Containers | `-d`、stop / rm → env → port → Q2 → Volume | Slido Q2、實作 |
| 2:25 | 20 | Ch5 Docker Compose | 長指令 → compose.yaml → `compose up` | 實作 |
| 2:45 | 15 | 總結 | Bento 總結、Q&A、回饋表單 | Slido Q&A |

## 逐段內容與投影片大綱

全份約 50 張投影片（含 2 張休息畫面）。每個實作段落結尾都放一張「看到這個就代表成功」的檢查點投影片，讓學員自己判斷要不要舉手求救。

### 暖場（10 分，3 張）

1. 封面
2. 自我介紹與今天會做出什麼：最後一張放 todo app 的截圖，說「3 小時後你會自己把它跑起來」
3. Slido 暖場投票（題目見 Slido 章節）→ 公布結果時點出「你們能直接寫程式，是因為有人幫你把環境裝好了，今天換你學會當那個人」

### Ch1 Intro to Docker（30 分，9 張）

1. 梗圖對話：「在我電腦上可以跑啊」→「那就把你的電腦出貨吧」→「Docker 做的就是這件事」
2. 三個痛點，用學生情境講：分組作業版本不同跑不起來；接手學長專案要先裝一整天；兩門課要不同版本的 Python
3. 轉折：「你們會 git 了，那 git clone 下來為什麼還是跑不起來？」→ git 存程式碼，不存環境
4. Image：沿用講義甜點比喻（食材），加上 Layer 疊加的圖；Immutable 用「commit 之後不能改，只能再開新 commit」解釋
5. Container：上桌的料理，四個特性各一行
6. Registry：Docker Hub 就是 Image 界的 GitHub，`docker pull` 就像 `git clone`
7. 甜點比喻總覽圖：Registry（全聯）→ Image（食材）→ Container（料理）
8. VM vs Docker：租屋比喻，VM 是整棟透天厝（自己的水電廚房），Container 是雅房（房間各自上鎖，共用大樓水電，也就是共用 OS 核心）
9. 講義的 VM / Docker 對照表 → 結論：更輕、更快、吃更少資源

### Slido Q1（5 分，1 張）

只投票、只顯示票數分布，不公布答案，說「等一下實作你們自己證明」。

### Ch2 Set up Docker（10 分，2 張）

1. 課前作業回顧：開啟 Docker Desktop，執行 `docker run hello-world`，順便看一次 `docker -v`
2. 檢查點：看到 Hello from Docker! 就成功；沒看到的舉手，TA 到場處理。講師在這段先把下一章的指令貼到共用連結

### Ch3 Building Images（35 分，12 張）

1. 兩種做 Image 的方式：現場手做後拍照存檔（commit）vs 照食譜做（Dockerfile）
2. 實作：`docker run --name=base-container -it ubuntu` → 安裝 Node → `node -e` 驗證 → `exit`
3. `docker container commit -m "Add node"`：左右並排 `git commit -m`；補一句差別：Docker 會存整個 Container 的檔案狀態，不需要先 add
4. `docker image history`：左右並排 `git log` 的輸出，兩者排版很像
5. 實作：用 `node-base` 開 `app-container`，寫 `app.js`，commit 成 `sample-app`，`docker run sample-app` 看到 `Hello from an app`
6. 驗證 Q1：執行 `docker run node-base ls`，同一個 Image 開的新 Container 裡沒有 `app.js` → 回頭公布 Q1 答案
7. commit 做法的問題：像「煮到一半拍照」，沒人知道中間加了什麼 → 需要寫下來的食譜 = Dockerfile
8. Dockerfile 常見指令表（講義的 8 個指令，今天只用 FROM、WORKDIR、COPY、RUN、CMD 五個，其他標灰）
9. 實作：`git clone` 範例專案、切到 `build-image-from-scratch` branch、刪掉舊 Dockerfile、逐行寫出新的
10. 故意失敗：講師在錯的資料夾執行 `docker build .`，讓大家看找不到 Dockerfile 的錯誤，再 `cd` 回正確位置
11. sha256 長名字梗：「你會背自己的身分證字號嗎？」→ `docker build -t`，對照 `git tag`
12. 檢查點：`docker image ls` 看到 `my-username/my-image` 就成功

### Ch4 Running Containers（35 分，12 張）

1. 痛點：關掉 Terminal 服務就停了 → `-d` 背景執行、`docker ps` 查看
2. `docker stop`、`docker restart`、`docker rm`：一張圖畫出 Container 的狀態變化
3. 故意失敗：直接再跑一次同名的 `docker run -d --name=my-image` → 名稱衝突錯誤 → 教 `docker rm -f my-image`，之後每次重開前都先執行它
4. 環境變數 `-e` 與 `--env-file`：用 postgres 範例，看 `env` 的輸出
5. Port 梗：Container 是大樓裡的房間，`-p 3000:3000` 是總機轉接
6. 實作：先 `-p 3000` 看隨機 port，再 `-p 3000:3000`，瀏覽器打開 `localhost:3000` 看到 todo app
7. 故意失敗：講師再開一個不同名稱、同樣綁 3000 的 Container → port 已被占用的錯誤
8. 請學員在 todo app 加 3 筆待辦事項
9. Slido Q2（題目見 Slido 章節）
10. 公布答案並現場驗證：`docker rm -f my-image` → 重開 → 3 筆全部消失
11. Volume 梗：Container 像飯店房間，退房（rm）東西會被清掉，Volume 是寄放在櫃檯的行李 → `docker volume create todo-data` 加 `-v`
12. 檢查點：加待辦事項 → `rm -f` → 用同一條 `-v` 指令重開 → 資料還在

### Ch5 Docker Compose（20 分，5 張）

1. 把 Ch4 最後那條超長的 `docker run` 用很小的字塞滿整頁：「每次都要打這個？」
2. 點套餐梗：Compose 是「一號餐」，不用一樣一樣點；講義的 `docker run` 參數與 Compose 欄位對照表做成 before / after 動畫
3. 實作：在 `app` 資料夾寫 `compose.yaml`
4. 先執行 `docker rm -f my-image`（Compose 會用同一個名稱和 port）→ `docker compose up -d`
5. 檢查點與回收：打開 `localhost:3000`，Ch4 加的待辦事項還在，因為 Compose 掛的是同一個 `todo-data` Volume；結束時 `docker compose down`

### 總結（15 分，3 張）

1. Bento grid 五格：Image（食材）、Container（上桌的料理）、Dockerfile（食譜）、Volume（寄放的行李）、Compose（套餐）
2. 回收開場梗：「現在你真的可以把你的電腦出貨了」+ 延伸學習連結
3. Slido Q&A 統一回答、回饋表單 QR code

## 投影片做法

每張投影片只講一個概念。投影片上只放標題與元件，解說全部寫進 speaker notes，每一步 click 對應一句 note。

### 每章的節奏

每章依序是：為什麼需要 → 角色與名詞 → 流程動畫 → code 動畫（寫出來、逐行讀、實際跑）→ 中段 Bento → 進階概念動畫 → 設定前後對照 → 章末整理。標題一律用短句，例如「為什麼需要 Docker」「逐行讀懂 Dockerfile」「刪掉 Container，資料去哪了」。

### 動畫元件與對應投影片

| 元件 | 效果 | 用在 |
| --- | --- | --- |
| Cover | teal 大章節號加章名 | Ch1 到 Ch5 各一張封面 |
| v-click 條列 | 條列逐項出現 | Ch1：三個痛點 |
| Deflist | 名詞與說明逐列出現，名詞用等寬字 | Ch1：Image、Container、Registry |
| 流程動畫（Motion Canvas） | 一個流程分步推進，每個 click 一步 | Ch1：Registry → pull → Image → run → Container → stop → rm |
| Magic Move | 程式碼逐步變形成下一版 | Ch3：Dockerfile 從 FROM 一行長到 5 行；Ch5：`docker run` 越變越長再縮成 compose.yaml |
| Line highlight | 其他行變淡，逐段點亮 | Ch3：逐行讀懂 Dockerfile；Ch5：逐段讀懂 compose.yaml |
| Terminal typing | 逐字打出指令再顯示輸出，保留前一條 | Ch3：`docker run -it ubuntu` 進去再 `exit` 出來的提示字元變化；Ch4：`docker ps` 的 STATUS 與 PORTS；兩張休息畫面 |
| Code-to-diagram | 左邊點亮一行 code，右邊圖上對應的部分同步亮起 | Ch3：Dockerfile 每一行點亮右邊 Image 疊上去的那一層 |
| Annotated command | 指令下方逐一拉出標籤，說明每個參數 | Ch3：`docker container commit -c -m`；Ch4：最長的 `docker run -d -p -v --name` |
| SVG 步驟動畫 | 圖表配色的 SVG，右下角 Step x of y，下方一行 caption | Ch3 與 Ch4：Q1、Q2 的揭曉動畫 |
| Config diff | 刪除行標紅、新增行標綠，再收成最終版 | Ch5：compose.yaml 加上 volumes 區塊前後 |
| Manim 影片 | 影片依 click 分段播放 | Ch1：VM 與 Container 的啟動時間與大小比較，選用 |
| Bento | 格狀重點整理，一格 hero、一格 accent | Ch3 結尾中段整理；總結五格 |

### 需要新做的投影片

Slido 與檢查點直接套既有 layout，只有梗圖對話框要新做：

- Slido 投影片：用 tb-quiz layout，選項用 A、B、C 方框，揭曉時正確選項轉成 teal 並淡入解說；右側放 Slido QR code。
- 檢查點投影片：用 tb-figure layout，上方放 Terminal 輸出或瀏覽器截圖，下方 teal 左框的一行 takeaway「看到這個就成功」。
- 梗圖對話框：左右兩個直角對話框依 click 出現，框線 1.5px、無圓角，配色用 Textbook 色票；用在「在我電腦上可以跑啊」與 Port 的「已讀不回」。

### Q1 與 Q2 的揭曉動畫

用 SVG 步驟動畫：每個 click 一步、右下角顯示 Step x of y、下方一行 caption。

1. 一個 Image 方塊，往下長出 Container A 與 Container B
2. A 裡面出現 hello.txt，B 裡面是空的（Q1 答案）
3. A 被 rm 掉，從同一個 Image 重新長出一個新的 A，裡面是空的（Q2 答案）
4. 旁邊出現一個 Volume 方塊，接到 A，hello.txt 改存在 Volume 裡
5. A 再被 rm 一次，重開後接回同一個 Volume，hello.txt 還在

第 1 到 2 步在 Ch3 驗證 Q1 時播，第 3 到 5 步在 Ch4 講 Volume 時播，同一張圖分兩次出現，讓兩題的連續性在畫面上看得到。

### 對投影片大綱的影響

「逐段內容與投影片大綱」裡每張投影片的說明文字，都放進 speaker notes；投影片上只留標題與元件。

## 投影片風格（Textbook）

整份使用 Textbook 主題：淺色、教科書感的版面，teal 章節編號、serif 標題、直角方塊。以下是完整規格。

### 色票

| 用途 | 色碼 |
| --- | --- |
| 主文字 ink | #20262e |
| 次要文字 muted | #66707c |
| 強調色 teal（章節標籤、進度條、清單符號、note 左框、正確答案） | #0f766e |
| 分隔線 rule | #e2e5e9 |
| 程式碼背景 | #f5f8f8 |
| 圖表：外層容器 / 內層 node / service / bar 與 storage | #aeacac / #e7e7e7 / #adf0c7 / #6eea9e |

只用淺色背景（投影片底色 #ffffff），不用深色主題。

### 字型與字級

| 用途 | 字型 | 字級（px） |
| --- | --- | --- |
| 標題 | Literata + Noto Sans TC，600 | 54 |
| 內文、條列 | Source Sans 3 + Iansui | 35 |
| 程式碼 | IBM Plex Mono + Iansui | 25（Terminal 26、Annotated command 36） |
| 右側 note 欄 | Source Sans 3 + Iansui | 26 |
| 章節標籤 | Source Sans 3，600，大寫、字距 0.08em | 19 |
| 頁尾 | Source Sans 3 | 18 |
| 封面章節號 / 封面標題 | Literata 600 | 220 / 84 |

### 每張投影片的固定元素

- 頂端 7px 進度條，teal 填色。
- 左上 teal 章節標籤，例如 CH 3 · BUILDING IMAGES；與標題之間留距，不貼著標題。
- 頁尾一條分隔線，左邊簡報名稱、右邊「頁碼 / 總頁數」。
- 需要時右上角放 ltag 小標籤，標示語言或檔名，例如 Dockerfile、compose.yaml、bash。
- 程式碼框與圖表方塊一律直角，框線 1.5px 到 2px。

### 版面規則

- 標題不置中：預設在左上，內容放在剩下空間的正中央（tb-center）；內容較少的投影片，標題可以下移，貼在內容正上方。
- 章節分隔頁（tb-section）水平置中：左邊 teal 大章節號，右邊列出本章小節。
- 需要旁註時用 textbook layout 的右側 note 欄（寬 330px、teal 左框、NOTE 標籤），放補充術語，例如 daemon、port。
- 圖表文字全英文，不用圈號、全形括號、斜線等特殊符號；方塊直角、框線 #1a1a1a 2px；線條 #333333 2px 直角走線、以單向由上往下為主，線上標籤水平擺放，線不可穿過任何文字。

### 各類投影片對應的 layout

| 投影片 | Layout |
| --- | --- |
| 封面與各章封面 | cover |
| 章節分隔頁 | tb-section |
| 今天會學到什麼 | tb-obj（01、02、03 編號條列） |
| 三個痛點 | tb-cols（三張卡片，依 click 出現） |
| git 存程式碼不存環境、總結回收梗 | tb-statement |
| Image、Container、Volume 定義 | tb-def |
| VM vs Docker、docker run vs compose | tb-compare |
| commit 做法的 4 個步驟 | tb-steps |
| Slido Q1、Q2 | tb-quiz |
| 檢查點、架構圖 | tb-figure |
| 指令總表（課後帶走） | tb-ref |
| 中段與總結 | bento（總結用 big 四欄版） |
| 最後一張 | tb-end（下一步學什麼） |

## Slido 題目設計

Slido 開 3 個投票與 1 個整堂開著的匿名 Q&A。兩題技術題 Q1、Q2 是同一個情境的上下集：Q1 問「兩個 Container 之間」，Q2 問「同一個 Container 刪掉重開之後」，兩題答案都是「看不到 / 不見了」，最後由 Volume 翻轉結局。

### 暖場投票（0:03，非技術題）

題目：你之前寫程式都在哪裡寫？

- 線上解題平台（Online Judge）
- Colab 或 Jupyter
- 學校電腦教室
- 自己電腦裝 VS Code
- 我都複製 ChatGPT 的

用途：公布結果時點出多數人的環境是別人裝好的，接到今天的主題。最後一個選項是給全場笑一下的。

### Q1：兩個 Container 看得到彼此的檔案嗎（0:40）

題目：用同一個 Image 開了兩個 Container A 和 B。在 A 裡面建立 `hello.txt`，B 裡面看得到嗎？

- 看得到，因為它們來自同一個 Image
- 看不到
- 要看 B 是在 A 建檔之前還是之後開的

答案：看不到。對應講義 Container 的 Independency 特性。

公布時機：當下不公布。在 Ch3 學員於 `app-container` 裡寫完 `app.js` 之後，請他們執行 `docker run node-base ls`，親眼看到同一個 `node-base` 開出的新 Container 裡沒有 `app.js`，再回頭公布票數與答案。

### Q2：刪掉重開之後檔案還在嗎（Ch4，約 2:10）

題目：接續 Q1。把 Container A 用 `docker rm` 刪掉，再用同一個 Image 開一個新的 A，`hello.txt` 還在嗎？

- 還在
- 不見了
- 要先 commit 才會在

答案：不見了。Image 是 Immutable 的，檔案只存在被刪掉的那個 Container 裡。

第三個選項是故意設計給有 git 經驗的人的陷阱，他們會直覺覺得「有 commit 就會在」。公布時補一句：commit 確實會存成一個新的 Image，但你是用原本的 Image 重開，所以一樣看不到；要用 commit 出來的新 Image 開才看得到。這句能把 Image 與 Container 的差別再講清楚一次。

公布後現場驗證：學員剛在 todo app 加的 3 筆待辦事項，`docker rm -f my-image` 後重開全部消失 →「那資料要放哪？」→ Volume。

### 匿名 Q&A（整堂開著）

開場就告訴學員卡住或聽不懂可以匿名丟上來。講師在兩次休息時各看一次，總結時統一回答剩下的。

## 梗與類比清單

全場用兩套類比：生活類比（甜點、租屋、飯店）負責解釋概念，git 對照負責接上學員已經會的東西。梗圖一律自己用對話框或簡單插圖重畫，不直接貼網路圖片。

### 生活類比與梗

| 概念 | 類比或梗 | 放在 |
| --- | --- | --- |
| Docker 的目的 | 「在我電腦上可以跑啊」→「那就把你的電腦出貨吧」；總結時回收 | 暖場後、總結 |
| Image | 食材，可以一層層疊成新的食材（沿用講義） | Ch1 |
| Container | 裝盤上桌的料理，每道各自獨立（沿用講義） | Ch1 |
| Registry | 食材的全聯，Docker Hub 是最大間的那家 | Ch1 |
| VM vs Container | 整棟透天厝 vs 雅房：各自上鎖，但共用大樓水電 | Ch1 |
| commit 做法 | 煮到一半拍照存檔，沒人知道中間加了什麼 | Ch3 |
| Dockerfile | 寫下來的食譜（沿用講義） | Ch3 |
| sha256 名稱 | 「你會背自己的身分證字號嗎？」→ 所以要取名字（Tag） | Ch3 |
| 沒開 port | Container 在 `docker ps` 裡活著，但連不到，「已讀不回」 | Ch4 |
| Port mapping | 大樓總機轉接，外面打 3000 轉到房間的 3000 | Ch4 |
| Volume | 飯店退房東西會被清掉，Volume 是寄放在櫃檯的行李 | Ch4 |
| Compose | 點「一號餐」，不用一樣一樣點 | Ch5 |

### git 對照表

| Docker | 對應的 git | 放在 |
| --- | --- | --- |
| Docker Hub | GitHub | Ch1 |
| `docker pull` | `git clone` | Ch1 |
| Image 的 Layer | 一個個疊起來的 commit | Ch1 |
| Image 是 Immutable | commit 後不能改，只能再開新 commit | Ch1 |
| `docker container commit -m` | `git commit -m` | Ch3 |
| `docker image history` | `git log` | Ch3 |
| `docker build -t` 或 `docker image tag` | `git tag` | Ch3 |

這個類比有一處會誤導，講一次就好：`git commit` 只記錄你 add 過的檔案，`docker container commit` 會把整個 Container 的檔案狀態存起來，不需要先 add。

## 休息、TA 與加分題

兩次休息各 10 分，休息畫面同時預習 Ch4 的指令；TA 負責巡場救援；做得快的人有加分題可做，不會閒著。

### 休息畫面

| 時機 | 畫面上的指令 | 下方文字 | 回來時的畫面 |
| --- | --- | --- | --- |
| 休息 1（0:55） | `docker pause audience` | 倒數 10 分 | `docker unpause audience` |
| 休息 2（1:40） | `docker stop audience` | 倒數 10 分；小字「stop 之後要 restart 才會回來，請準時」 | `docker restart audience` |

休息 2 的 stop / restart 剛好是 Ch4 第 2 張投影片的內容，回來講到時可以說「你們剛剛就被 restart 過了」。

### TA 安排

- 實作段落（Ch2、Ch3、Ch4、Ch5）TA 在走道巡場，講師不下台。
- 學員卡住先舉手，TA 處理不了的丟 Slido Q&A，講師在休息時看。
- 講師每個實作段落開始前，把該段指令貼到共用連結，讓學員複製貼上，減少打錯字。
- TA 課前要知道本文件「現場會踩的坑」那一段，最常見的是名稱衝突與 port 衝突。

### 加分題

| 章節 | 加分題 | 預期觀察 |
| --- | --- | --- |
| Ch3 | 改 `app.js` 的輸出字串，重新 commit 成新 Image | `docker image history` 最上面多一層 |
| Ch3 | 改範例專案的任一個檔案後重新 `docker build` | build 輸出裡 COPY 之後的步驟重跑，前面的步驟顯示 CACHED |
| Ch4 | 同時開兩個 todo app，分別綁 3000 和 3001 | 兩個瀏覽器分頁各自有獨立的待辦事項 |
| Ch5 | 在 `compose.yaml` 加一個 postgres service | `docker compose up -d` 後 `docker ps` 看到 2 個 Container |

## 課前準備清單

安裝與下載 Image 都移到課前，因為 Windows 的 WSL2 要重開機，而且全班同時從同一個 Wi-Fi 下載 postgres 這類大 Image 會卡住整堂課。

### 學員課前作業（課前 3 天發出）

- [ ] 安裝 Docker Desktop；Windows 依安裝程式指示啟用 WSL2 並重開機
- [ ] 預留至少 10 GB 硬碟空間
- [ ] 開啟 Docker Desktop 後執行 `docker run hello-world`，看到 `Hello from Docker!` 就代表安裝成功
- [ ] 預先下載課堂會用到的 3 個 Image：`docker pull ubuntu`、`docker pull node:22-alpine`、`docker pull postgres`
- [ ] 回報表單：成功或卡在哪一步，讓 TA 課前先處理

用 `docker run hello-world` 而不是只用 `docker -v` 驗證，是因為 `docker -v` 只檢查指令有沒有裝好，Docker Desktop 沒開也會顯示版本；`hello-world` 才能確認 Docker 真的能跑 Container。

### 講師與 TA 課前準備

- [ ] 在一台乾淨的 Windows 與一台 Mac 上，照講義從頭到尾跑一次
- [ ] 修完講義裡的錯誤（見下一章節）
- [ ] 準備指令共用連結，每個實作段落一區，學員直接複製
- [ ] 準備 Wi-Fi 斷線備案：用 `docker save` 把 3 個 Image 存成檔案放 USB，現場用 `docker load` 匯入
- [ ] Slido 建好暖場投票、Q1、Q2，Q&A 設為匿名
- [ ] 回饋表單與 QR code

## 講義修正與現場會踩的坑

學員會照講義一字一字打，下面前 4 項會直接讓指令失敗，上課前一定要修；其餘是讓內容一致的小修正。

### 會讓指令失敗，必修

| 講義位置 | 問題 | 修正 |
| --- | --- | --- |
| Compose.yaml 兩個範例 | `environment` 下那行與 `external: true` 前面是 Tab 縮排，YAML 不接受 Tab | 全部改成空格縮排 |
| 背景執行 → Exposing Port → 掛載檔案 | 同一個 `--name=my-image` 連續 `docker run` 4 次，第 2 次起會名稱衝突 | 每次重開前加 `docker rm -f my-image`，並在 Ch4 第一次衝突時當成故意失敗來講 |
| 環境變數設定 | `--name=example-database` 用了 2 次，第 2 次會名稱衝突 | 第 2 次改名，或兩條都加 `--rm` |
| Writing Compose File | `container_name: my-image` 與 Ch4 還在跑的 Container 同名、同 port | `docker compose up` 前加 `docker rm -f my-image` |

### 內容一致性

| 講義位置 | 問題 | 修正 |
| --- | --- | --- |
| Installation 測試 | 只用 `docker -v`，Docker Desktop 沒開也會通過 | 改成 `docker run hello-world` |
| Set up（Writing Dockerfile） | 下載 zip 再解壓縮 | 改成 `git clone` 後切到 `build-image-from-scratch` branch |
| Exposing Port 說明文字 | 寫 `50638->80`，但上面的輸出是 `50683->3000` | 改成與輸出一致 |
| 環境變數設定 | `POSTGRES_DATABASE` 不是 postgres 認得的變數，實際是 `POSTGRES_DB` | 改名；示範 `env` 輸出不受影響，但學員之後照抄會沒效果 |
| Compose 對照表 | `—name` 被轉成長破折號 | 改回 `--name` |
| Compose.yaml 結構範例與說明 | `postgrs:latest`、`environtment`、說明裡的 `service:` | 改成 `postgres:latest`、`environment`、`services:` |
| Building Images 輸出範例 | Dockerfile 用 `node:22-alpine`，輸出顯示 `node:20-alpine` | 重跑一次換掉輸出 |
| 內文錯字 | 「最簡單得角度」「在多書情況」「建議一個新的 Dockerfile」「接者」 | 的、多數、建立、接著 |

### 現場最常見的狀況（給 TA）

| 症狀 | 原因 | 處理 |
| --- | --- | --- |
| 打 `docker` 指令出現 command not found | 還在 Container 裡面，提示字元是 `root@...#` | 先 `exit` 回到自己電腦 |
| Windows 出現 the input device is not a TTY | 用 Git Bash 跑 `-it` | 改用 PowerShell |
| Cannot connect to the Docker daemon | Docker Desktop 沒開 | 開啟 Docker Desktop 等它跑起來 |
| `docker build .` 找不到 Dockerfile | Terminal 不在 `app` 資料夾 | `cd` 到 `app` 資料夾 |
| Conflict. The container name is already in use | 同名 Container 還在 | `docker rm -f <名稱>` |
| port is already allocated | 3000 已被其他 Container 占用 | `docker ps` 找出來 `rm -f` |
| 瀏覽器打不開 `localhost:3000` | 忘了加 `-p 3000:3000` | 加上後重開 |
