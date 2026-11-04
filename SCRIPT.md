# Docker Workshop 筆記與講稿

搭配投影片使用，依投影片順序排列。每張投影片列出：

- 筆記：投影片右側 NOTE 欄依點擊順序顯示的重點（括號內為第幾次點擊）。
- 講稿：講者要說的內容與補充說明。

投影片本身不含講者備註，所有講稿都在這份文件。

## 1. Docker Workshop

講稿：

- 開場。先不講 Docker 是什麼，只說結束時大家會自己把一個網站跑起來。

# Warm-up

## 2. 學習目標

講稿：

- 最後一項就是這次的終點：一個真的能在瀏覽器打開的 todo app，而且資料刪掉 Container 也不會不見。

## 3. Q1．將專案推上 GitHub 後，組員以 git clone 取得。下列哪一項會隨 clone 一起取得？

講稿：

- 先舉手表決，再按一下公布答案。
- 問大家：「你上次接手別人的專案，clone 下來就能跑嗎？」
- Ch1 的對話情境與「git 管理程式碼，不管理執行環境」會再呼應這題。

# Ch 1 · Intro to Docker

## 4. Intro to Docker

## 5. 同一份程式在不同電腦上的執行結果

講稿：

- 分組作業情境，一句一句點出來。
1. 程式碼一模一樣，組員也有 clone 到。
2. 但組員電腦沒裝 flask，版本也可能不同，所以跑不起來。
3.「在我電腦上可以跑」是全世界工程師都講過的一句話。
4. 搬電腦是玩笑，但 Docker 做的真的就是這件事：把能跑的那台電腦的環境一起打包帶走。
- 最後帶到下方的重點句，接下一張的三個痛點。

## 6. Docker 要解決的三個問題

講稿：

- 一張一張翻。每一張都問一句「有人遇過嗎？」讓大家舉手。

## 7. git 管理程式碼，不管理執行環境

講稿：

- 用過 git 的人會想說「我不是已經用 git 分享程式了嗎？」
- git 只管程式碼。程式要跑起來需要的語言版本、套件、資料庫，git 都不管。

## 8. Docker 的核心元件

筆記：

- （1）Image 是靜態的材料，本身不會執行。
- （2）同一個 Image 可啟動多個 Container，彼此獨立。
- （3）Docker Hub 之於 Image，如同 GitHub 之於程式碼。

## 9. 定義：Image

講稿：

- Immutable 用 git commit 解釋：commit 之後不能改，只能再開一個新的 commit。

## 10. 定義：Container

講稿：

- 四個特性：Self-contained、Isolated、Independent、Portable。
- 「不會影響另外兩個」這句先埋著，Ch3 會實際看到。

## 11. Container 的生命週期

講稿：

- 逐步點出：
1. pull：從 Registry 把 Image 抓到自己電腦。
2. run：用 Image 開一個 Container，開始跑。
3. stop：停下來，但還在，可以 restart。
4. rm：刪掉，Container 裡的東西跟著不見。記住這一點，Ch4 會用到。

## 12. VM 與 Container 的差異

講稿：

- 由下往上一層一層疊，每按一下講一層。
1. 底下兩層一樣：硬體和電腦本身的作業系統。
2. VM 先裝 Hypervisor（例如 VirtualBox、VMware），在上面模擬出好幾台電腦。每台都要裝一套完整的作業系統，開機要等，一台動輒數 GB。
3. Container 只需要 Docker Engine，App 直接跑在主機的作業系統上，彼此隔離但不另外開機。
4. 重點：Container 少了 Guest OS 這一層。作業系統最核心、負責管理硬體的部分叫 kernel，Container 共用主機的 kernel，所以啟動像開一個程式，大小常見幾十到幾百 MB。
- 類比：VM 像獨棟住宅，水電廚房自己一套；Container 像公寓套房，各自上鎖，共用大樓水電。
- 講完接 Q2：先讓大家猜 Container 使用的 kernel 從哪裡來，再公布答案；Ch2 用 uname -r 驗證。

## 13. Q2．以 ubuntu Image 啟動 Container，Container 使用的 kernel 來自何處？

講稿：

- 先舉手表決，再按一下公布答案。
- A 是以為 Image 像完整的作業系統；B 是把 Container 想成小型 VM。
- Ch2 用 uname -r 驗證。

# Ch 2 · Set up Docker

## 14. Set up Docker

## 15. 執行第一個 Container

筆記：

- （0）指令清單：seanyeh77.github.io/docker-workshop/commands.html
- （1）-L 3000:localhost:3000：讓瀏覽器能開啟 localhost:3000。
- （3）出現 Hello from Docker! 即可使用。

講稿：

- 主機已預先裝好 Docker，Image 也已預先下載。這裡只做驗證。
- 若改在自己的電腦上用 Docker Desktop，略過 ssh 這一行，Ch4 直接開 localhost:3000 即可。
- --rm 讓 Container 執行完就自動刪除。
- port、user、host 依每人分配到的連線資訊填入。忘了加 -L 的話，Ch4 開不了網頁，之後斷線重連時補上即可。
- 版本號每個人不一樣，沒關係。
- 最後一步就是檢查點：看到 Hello from Docker! 就成功。
- 常見狀況：
- permission denied ... docker.sock：帳號不在 docker 群組。
- ssh 連不上：port、user 或 host 打錯。
- bind [127.0.0.1]:3000: Address already in use：筆電上已有程式占用 3000，ssh 仍會連上，但轉送失敗。

## 16. 驗證 Q2：Container 使用的 kernel

筆記：

- （2）Ubuntu 的 Container 印出相同的版本。
- （3）Image 不含 kernel，Container 共用主機的 kernel。

講稿：

- 驗證 Q2 的答案。先問大家：如果 Image 內附 kernel，ubuntu 與 alpine 印出的 kernel 版本應該一樣嗎？
- ubuntu 和 alpine 是兩套不同的 Linux 發行版，若 Image 自帶 kernel，版本應該不同。
- Alpine 是很輕量的 Linux 發行版，整個 Image 不到 10MB，Ch3 會用它來做 node-base。
- --rm 前面 hello-world 已經用過：Container 執行完就自動刪除，不會留下來。
- 三行相同：Container 共用的是執行 Docker 的這台主機的 kernel。
- 延伸：在自己的 Mac 或 Windows 上用 Docker Desktop 時，uname -r 結尾是 linuxkit；OrbStack 則會出現 orbstack 字樣（例如 7.2.12-orbstack-...）。兩者都是在背後開了一台小型 Linux VM，所有 Container 都跑在裡面，這也回答了「Windows 怎麼能跑 Linux Container」。

# Ch 3 · Building Images

## 17. Building Images

## 18. 建立 Image 的兩種方式

講稿：

- 先用手做，體會 Image 是怎麼一層層長出來的；再換成 Dockerfile，看為什麼大家都用食譜。

## 19. 以 commit 建立 Image 的流程

講稿：

- 這是等一下實作的四個步驟，先看全貌。

## 20. Q3．將裝好 Node 的 base-container commit 成 Image node-base 後，以原本的 alpine Image 啟動的 Container 有 Node 嗎？

講稿：

- 剛講完 commit 的流程，先舉手表決，再按一下公布答案。
- 做完 node-base 後用 which node 驗證。

## 21. 實作：建立 node-base

筆記：

- （1）-it：進入 Container 操作，提示字元變為 / #。
- （4）exit：返回主機。
- （5）commit：將 Container 存成 Image node-base。

講稿：

- 最常見的錯：還在 Container 裡就打 docker 指令，會出現 command not found。先看提示字元。
- 若有人遇到名稱衝突，下一張說明處理方式。

## 22. 名稱已被使用：重新進入原本的 Container

筆記：

- （1）Container 名稱不能重複使用。
- （2）docker start -ai：重新啟動並進入原本的 Container。
- （3）先前安裝的 Node 仍在。
- （4）exit 只會停止 Container，不會刪除。

講稿：

- 離開 Container 不會刪掉它，所以重打一次 docker run 就會撞名。
- 第一種處理：docker start -ai 回到原本那個 Container，裝過的東西都還在。

## 23. 名稱已被使用：刪除後重新建立

筆記：

- （1）docker rm -f：刪除舊的 Container。
- （3）舊 Container 中的變更一併消失。

講稿：

- 第二種處理：刪掉重來。Ch4 會再正式講名稱衝突與 rm。

## 24. 驗證 Q3：commit 不會修改原本的 Image

筆記：

- （0）which node：輸出 node 的位置，找不到則沒有輸出。
- （1）alpine 沒有 Node。
- （2）node-base 有 Node。

講稿：

- 剛做完 node-base，馬上驗證 Q3 的答案：commit 產生新的 Image，原本的 alpine 不受影響。
- 下一張換個角度：從同一個 Image 開出的 Container 之間也互不影響。

## 25. 同一 Image 的獨立 Container

講稿：

- 接續驗證 Q3：Image 不會被 Container 修改，Container 之間也各自獨立。在 A 裡建立的檔案，B 看不到。
- 這張圖 Ch4 會再出現，接著往下演。
- 下一張盤點目前手上的 Image 與 Container。

## 26. 目前的 Image 與 Container

講稿：

- 盤點一下目前手上有什麼。綠色是 Image，灰色是 Container，teal 框是這一段新增的。
- alpine 經 run 變成 base-container，裝了 Node 之後 commit 成 node-base。
- 請大家打 docker image ls 與 docker ps -a 對照：Image 會看到 alpine、node-base（以及 Ch2 的 hello-world、ubuntu）；Container 會看到已停止的 base-container。
- 這張圖之後還會出現兩次，每次多幾個方塊。

## 27. 查看 node-base 的 Layer

筆記：

- （0）docker image history：列出 Image 的 Layer，最上面是最新的。
- （1）最上層 68.4MB 由 commit 新增；下面兩層來自 alpine。

講稿：

- 接續盤點圖：圖上說 node-base 是從 alpine commit 出來的，這裡用指令親眼確認。
- 最上面那一層就是剛剛 commit 的 Add node，68.4MB，是裝 Node 多出來的；下面兩層是 alpine 本來就有的，整個 alpine 不到 10MB。
- Image 就是這樣一層層疊起來的。git 也有類似的指令 git log，Ch3 最後的對照表會整理。
- 下一張：如果對同一個 Container 再 commit 一次，這個歷史會變成什麼樣子？

## 28. 重複 commit 與未命名的 Image

筆記：

- （1）node-base 這個名稱移到新的 Image 上。
- （2）舊 Image 失去名稱但仍佔用空間；ls 需加 -a 才會顯示。
- （3）prune：刪除未命名且未被使用的 Image。

講稿：

- 原理：Image 的名稱（tag）只是一張標籤，同一時間只能貼在一個 Image 上。commit 到同一個名稱，標籤就移到新的 Image，舊的不會被刪除，只是沒有名字。
- 和 git 不同：第二次 commit 不會疊在第一次上面，docker image history node-base 只會看到這一次的 commit 直接接在 alpine 上。
- prune 前會詢問確認，輸入 y 才會刪除；加 -f 可略過確認。
- 刪除的 sha256 會列出好幾行，那是這個 Image 的設定與各個 Layer，一起被刪掉。
- 大小依 alpine 與 nodejs 的版本而異。

## 29. 實作：建立 sample-app

筆記：

- （5）-c：指定 Container 啟動時執行的指令。

講稿：

- 重做時若出現 The container name "/app-container" is already in use，先執行 docker rm -f app-container 再重來。

## 30. commit 指令的參數

## 31. 目前的 Image 與 Container

講稿：

- 再盤點一次：從 node-base 開出 app-container，寫好 app.js 後 commit 成 sample-app。
- 同樣的 run、commit 循環又走了一次，只是起點換成 node-base。
- docker run --rm 開的 Container 用完就刪，所以不會出現在圖上。

## 32. commit 無法記錄建立過程

## 33. 實作：下載範例專案

講稿：

- 用上次學的 git clone，-b 直接切到 build-image-from-scratch 這個 branch。
- app 資料夾裡原本有一份 Dockerfile，先刪掉，我們自己從頭寫。
- 刪掉後用任何文字編輯器新增一個叫 Dockerfile 的檔案，沒有副檔名。

## 34. 撰寫 Dockerfile

筆記：

- （0）FROM：基底 Image。
- （1）WORKDIR：之後的指令在 /app 中執行。
- （2）COPY . .：將主機的目前目錄複製到 Image 的 /app。
- （3）RUN：build 時執行。
- （4）CMD：Container 啟動時執行。

## 35. Dockerfile 與 Image Layer

講稿：

- 和手做時一樣，Image 是一層層疊起來的。
- RUN yarn install 那層最大，因為套件都裝在這層。
- 每一行都會在 history 留下一筆紀錄，但只有改到檔案的 RUN、COPY、ADD 會產生有內容的 Layer。
- CMD、ENV、EXPOSE 只改設定，所以是 0 B。
- WORKDIR 會建立 /app 目錄，但目錄本身幾乎不佔空間，所以通常顯示 0B；某些環境會顯示幾 kB。
- 數字來自實際 build：node:22-alpine 本身 164MB，加上 COPY 4.59MB、yarn install 89.8MB，整個 Image 約 258MB，和 docker image ls 看到的一致。

## 36. commit 與 Dockerfile 的 Layer 比較

筆記：

- （0）輸出只保留 CREATED BY、SIZE 與 COMMENT。
- （1）commit：只記錄 /bin/sh，看不出做了什麼。
- （2）Dockerfile：每一層記錄對應的指令。

講稿：

- 回扣「commit 無法記錄建立過程」那張：同樣是一層層的 Image，差別在 CREATED BY 這一欄。
- sample-app 是兩次 commit 疊起來的：68.4MB 那層是 apk add nodejs（Add node），2.26kB 那層是寫進去的 app.js（Add app）。兩層的 CREATED BY 都只寫 /bin/sh，因為 commit 只拍下結果；能看出做了什麼的只有 -m 那句話。
- my-username/my-image 的每一層都寫著 Dockerfile 的那一行；最下面的 ... 是 node:22-alpine 本身的 9 層，共約 164MB。
- 畫面上的輸出省略 IMAGE 與 CREATED 兩欄。COMMENT 欄：BuildKit 依 Dockerfile 建立的層會標 buildkit.dockerfile.v0；commit 產生的層只有 -m 寫的說明，沒加 -m 就是空的。sample-app 與 my-username/my-image 是同一個 app 的兩種做法，正好可以並排比較。

## 37. 常見錯誤：找不到 Dockerfile

筆記：

- （0）示範常見錯誤，不必跟著做。
- （2）docker build . 的點代表目前目錄，此處沒有 Dockerfile。

講稿：

- 示範即可。聽眾前面已經 cd 到 app 並在那裡寫好 Dockerfile，直接 docker build . 就會成功。
- 真正會踩到的情境：開新的 Terminal、或 clone 完忘了 cd，停在上一層就執行 build。

## 38. 以 Tag 命名 Image

筆記：

- （1）-t：build 時指定名稱。
- （2）未指定版本時預設為 latest。

講稿：

- 最後一步就是檢查點：列表中出現 my-username/my-image 就成功。
- 做得快的人：改一下 src/index.js 再 build 一次，看哪幾層顯示 CACHED。

## 39. Docker 與 git 的對應

講稿：

- Ch3 的指令都學完了，用這張和 git 對照整理。一列一列翻。最後一列要講清楚：docker commit 不用先 add，它會把整個 Container 的檔案狀態存起來。
- 命名那列：docker tag 是 docker image tag 的簡寫，要給兩個參數：原本的 Image 與新名稱。它不會複製 Image，只是多貼一張標籤，指向同一個 Image ID，就像 git tag v1 指向某個 commit。
- 另一個差異：git commit 會一個接一個串成歷史；docker commit 每次都是把 Container 當下的狀態直接疊在基底 Image 上，前面重複 commit 時已經看過。

## 40. 目前的 Image 與 Container

講稿：

- 最後一次盤點。上面兩排是手動 run、commit 做出來的；最下面一排是 Dockerfile 用 docker build 一步做出來的。
- build 的過程中 Docker 也會開暫時的環境執行每一行，但做完就清掉，所以只留下 Image。
- Ch4 會從 my-username/my-image 開始跑 Container。

## 41. Building Images 重點整理

# Break

## 42. 休息

講稿：

- 回來時按一下，打出 docker restart audience。等一下講到 stop 和 restart，可以說「你們剛剛就被 restart 過了」。

# Ch 4 · Running Containers

## 43. Running Containers

## 44. 背景執行 Container

筆記：

- （1）-d：在背景執行。
- （2）docker ps：列出執行中的 Container。

## 45. 停止、重啟與刪除 Container

講稿：

- 「離開」不等於「關掉」。背景執行的 Container 要用 docker stop 停。
- 剛剛休息時你們就被 stop 又 restart 過一次。

## 46. 常見錯誤：Container 名稱衝突

筆記：

- （1）同名的 Container 仍存在。
- （2）rm -f：先停止再刪除。

## 47. 以 prune 清除已停止的 Container

筆記：

- （1）ps -a：連同已停止的 Container 一起列出。
- （2）container prune：刪除所有已停止的 Container。

講稿：

- 銜接上一張：rm 一次刪一個指定的 Container；prune 一次刪掉所有已停止的。
- 原理：Container 停止後，裡面的檔案（可寫層）仍保留在硬碟上，所以才能 restart 或 start -ai 回去。不再需要時要自己刪。
- Ch3 留下的 base-container、app-container 都是已停止的，正好一次清掉。
- image prune 刪的是沒有名字的 Image；container prune 刪的是已停止的 Container。被 Container 使用中的 Image 不會被 image prune 刪除，所以通常先 container prune 再 image prune。
- prune 前會詢問確認，輸入 y 才會刪除；加 -f 可略過確認。

## 48. 環境變數

筆記：

- （1）-e：設定環境變數，覆蓋 Image 中的預設值。
- （2）.env：每行一個變數。
- （4）--env-file：一次讀取整個檔案。

## 49. Container 無法從外部連線

講稿：

- docker ps 看得到它活著，但沒開 Port，外面的請求進不去，Container「已讀不回」。

## 50. Port Mapping

筆記：

- （1）-p 主機 Port:Container Port。

## 51. 實作：Port Mapping

筆記：

- （1）-p 3000：對應到主機上隨機的 Port。
- （4）-p 3000:3000：固定對應到主機的 3000。

## 52. 檢查點：todo app 可以連線

## 53. 常見錯誤：Port 已被占用

筆記：

- （1）同一個 Port 只能對應一個 Container。
- （2）啟動失敗的 Container 仍會保留，需先刪除。

## 54. 實作：新增 3 筆待辦事項

講稿：

- 請大家真的加 3 筆，等一下要用。

## 55. Q4．todo app 中已新增 3 筆待辦事項。以 docker rm -f 刪除 Container，再以同一個 Image 重新啟動，資料還在嗎？

講稿：

- 先舉手表決，再按一下公布答案。
- A 是把 Image 當成存檔的人會選的；C 是以為「正常關機」就會存檔。
- 下一張實際刪掉重開，接著問：「那資料要放在哪裡？」→ Volume。

## 56. 刪除 Container 後的資料

筆記：

- （0）待辦事項存於 Container 中的 /etc/todos。
- （2）重新啟動後資料已消失。

## 57. 以 Volume 保存資料

## 58. 定義：Volume

## 59. 實作：掛載 Volume

筆記：

- （1）Volume：存放資料的空間，獨立於 Container。
- （3）-v todo-data:/etc/todos：資料改寫入 Volume。

## 60. 檢查點：資料在重建後保留

講稿：

- 加分題：同時開兩個 todo app，分別綁 3000 和 3001，兩個分頁各自有獨立的待辦事項。

## 61. docker run 參數總覽

講稿：

- Ch4 學到的參數一次整理：-d、-p、-v、--name。
- 每次都要打這麼長，下一章用 Compose 把它們寫進檔案。

# Ch 5 · Docker Compose

## 62. Docker Compose

## 63. 從 docker run 到 compose.yaml

筆記：

- （3）指令已過於冗長。
- （4）改寫成 compose.yaml。

講稿：

- services 下的每一項是一個 Container；最下方 volumes 宣告使用的 Volume，external: true 代表沿用 Ch4 建立的 todo-data。
- YAML 用空格縮排，不能用 Tab。這是最常見的錯。

## 64. docker run 參數與 Compose 欄位

講稿：

- Compose 就像點套餐：不用每次一樣一樣點，寫好一份菜單，說「一號餐」就好。
- 每個 docker run 參數在 compose.yaml 裡都有對應的欄位。

## 65. 實作：docker compose up

筆記：

- （1）需先刪除 Ch4 的 Container，避免名稱與 Port 衝突。
- （2）於 compose.yaml 所在目錄執行。

## 66. 檢查點：Compose 啟動完成

講稿：

- 要停的時候用 docker compose down，它會刪掉 Container，但 todo-data 是 external 的 Volume，不會被刪。
- 加分題：在 compose.yaml 加一個 postgres service，up 之後 docker ps 看到 2 個 Container。

# Summary

## 67. 重點整理

## 68. 環境可以跟著程式一起交付

## 69. 指令總表

## 70. Q&A

講稿：

- 開放提問，最後放回饋表單的 QR code。
- 延伸學習：Docker 官方文件的 Get started 教學。
