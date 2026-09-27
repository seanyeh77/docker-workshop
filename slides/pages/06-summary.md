---
layout: bento
chapter: Summary
big: true
---

# 今天學到的五個東西

<Tile variant="hero" label="一句話" value="把環境一起打包帶走">程式、套件、設定都在 Image 裡，到哪台電腦都一樣跑</Tile>
<Tile label="食材" value="Image">一層層疊起來，建好不能改</Tile>
<Tile label="上桌的料理" value="Container">用 Image 跑起來，彼此獨立</Tile>
<Tile variant="accent" label="食譜" value="Dockerfile" mono>把做 Image 的步驟寫下來</Tile>
<Tile label="寄放的行李" value="Volume">Container 刪掉，資料還在</Tile>
<Tile label="套餐" value="compose.yaml" mono wide>一長串 docker run 變成一行 docker compose up</Tile>

---
layout: statement
chapter: Summary
---

# 現在，你真的可以把你的電腦出貨了。

把環境寫進 `Dockerfile` 和 `compose.yaml`，別人 `git clone` 下來，一行 `docker compose up` 就能跑。

---
layout: reference
chapter: Summary
cols: 2
---

# 今天用到的指令

| 指令 | 用途 |
| --- | --- |
| `docker run -it ubuntu` | 開一個 Container 並進去 |
| `docker container commit` | 把 Container 存成 Image |
| `docker build -t name .` | 照 Dockerfile 建 Image |
| `docker image ls` | 列出所有 Image |
| `docker image history` | 看 Image 的每一層 |

| 指令 | 用途 |
| --- | --- |
| `docker run -d -p -v` | 背景執行、開 Port、掛 Volume |
| `docker ps` | 看正在跑的 Container |
| `docker rm -f name` | 停止並刪除 Container |
| `docker volume create` | 建立 Volume |
| `docker compose up -d` | 照 compose.yaml 開起來 |

---
layout: end
chapter: Summary
next: Slido Q&A 與回饋表單
nextNumber: Q&A
---

# 有問題嗎？

- `Dockerfile`
- `docker build`
- `docker run`
- `Volume`
- `compose.yaml`

<!--
統一回答 Slido 上的匿名問題，最後放回饋表單的 QR code。
延伸學習：Docker 官方文件的 Get started 教學。
-->
