---
layout: bento
chapter: Summary
big: true
---

# 課程重點整理

<Tile variant="hero" label="核心概念" value="將環境與程式一併封裝">程式、套件與設定皆包含於 Image，在任何電腦上的執行結果一致</Tile>
<Tile label="食材" value="Image">由多個 Layer 堆疊而成，建立後不可修改</Tile>
<Tile label="料理" value="Container">由 Image 啟動，彼此獨立</Tile>
<Tile variant="accent" label="食譜" value="Dockerfile" mono>記錄建立 Image 的步驟</Tile>
<Tile label="寄放的行李" value="Volume">刪除 Container 後資料仍保留</Tile>
<Tile label="套餐" value="compose.yaml" mono wide>以 docker compose up 取代冗長的 docker run 指令</Tile>

---
layout: statement
chapter: Summary
---

# 環境可以跟著程式一起交付

將環境寫入 `Dockerfile` 與 `compose.yaml` 後，他人以 `git clone` 取得專案，執行 `docker compose up` 即可啟動。

---
layout: reference
chapter: Summary
cols: 2
---

# 指令總表

| 指令 | 用途 |
| --- | --- |
| `docker run -it ubuntu` | 啟動 Container 並進入 |
| `docker container commit` | 將 Container 儲存為 Image |
| `docker build -t name .` | 依 Dockerfile 建立 Image |
| `docker image ls` | 列出所有 Image |
| `docker image history` | 列出 Image 的每個 Layer |

| 指令 | 用途 |
| --- | --- |
| `docker run -d -p -v` | 背景執行、對應 Port、掛載 Volume |
| `docker ps` | 列出執行中的 Container |
| `docker rm -f name` | 停止並刪除 Container |
| `docker volume create` | 建立 Volume |
| `docker compose up -d` | 依 compose.yaml 啟動服務 |

---
layout: end
chapter: Summary
next: Slido Q&A 與回饋表單
nextNumber: Q&A
---

# Q&A

- `Dockerfile`
- `docker build`
- `docker run`
- `Volume`
- `compose.yaml`

<!--
統一回答 Slido 上的匿名問題，最後放回饋表單的 QR code。
延伸學習：Docker 官方文件的 Get started 教學。
-->
