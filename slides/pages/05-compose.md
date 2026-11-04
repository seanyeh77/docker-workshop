---
layout: section
number: 5
chapter: Ch 5 · Docker Compose
---

# Docker Compose

- **5.1** docker run 指令的限制
- **5.2** 將參數寫成 compose.yaml
- **5.3** 以 docker compose up 啟動

---
layout: textbook
chapter: Ch 5 · Docker Compose
---

# 從 docker run 到 compose.yaml

````md magic-move {lines: false}
```bash
docker run my-username/my-image
```

```bash
docker run --name=my-image my-username/my-image
```

```bash
docker run -d -p 3000:3000 \
  --name=my-image my-username/my-image
```

```bash
docker run -d -p 3000:3000 \
  -v todo-data:/etc/todos \
  --name=my-image my-username/my-image
```

```yaml
services:
  my-image:
    image: my-username/my-image
    container_name: my-image
    ports:
      - "3000:3000"
    volumes:
      - todo-data:/etc/todos

volumes:
  todo-data:
    external: true
```
````

::note::

<Note :notes="[
  '',
  '',
  '',
  '指令已過於冗長。',
  '改寫成 compose.yaml。',
]" />

<!--
services 下的每一項是一個 Container；最下方 volumes 宣告使用的 Volume，external: true 代表沿用 Ch4 建立的 todo-data。
YAML 用空格縮排，不能用 Tab。這是最常見的錯。
-->

---
layout: compare
chapter: Ch 5 · Docker Compose
left: docker run 參數
right: compose.yaml 欄位
reveal: true
clicks: 5
rows:
  - [Image, '<code>my-username/my-image</code>', '<code>image: my-username/my-image</code>']
  - [名稱, '<code>--name=my-image</code>', '<code>container_name: my-image</code>']
  - [Port, '<code>-p 3000:3000</code>', '<code>ports: ["3000:3000"]</code>']
  - [環境變數, '<code>-e POSTGRES_PASSWORD=secret</code>', '<code>environment: [POSTGRES_PASSWORD=secret]</code>']
  - [掛載, '<code>-v todo-data:/etc/todos</code>', '<code>volumes: ["todo-data:/etc/todos"]</code>']
---

# docker run 參數與 Compose 欄位

<!--
Compose 就像點套餐：不用每次一樣一樣點，寫好一份菜單，說「一號餐」就好。
每個 docker run 參數在 compose.yaml 裡都有對應的欄位。
-->

---
layout: textbook
chapter: Ch 5 · Docker Compose
ltag: Terminal
clicks: 2
---

# 實作：docker compose up

<TerminalTyping :keep="2" dir="~/getting-started-todo-app/app" :cmds="[
  { c: 'docker rm -f my-image', o: 'my-image' },
  { c: 'docker compose up -d', o: '[+] Running 2/2\n ✔ Network app_default  Created\n ✔ Container my-image   Started' },
]" />

::note::

<Note :notes="[
  '',
  '需先刪除 Ch4 的 Container，避免名稱與 Port 衝突。',
  '於 compose.yaml 所在目錄執行。',
]" />

---
layout: figure
chapter: Ch 5 · Docker Compose
takeaway: 掛載 Volume 後新增的待辦事項仍存在，因為 Compose 掛載的是同一個 todo-data Volume。
---

# 檢查點：Compose 啟動完成

<BrowserMock :items="['繳電話費', '複習 Volume', '準備報告']" />

<!--
要停的時候用 docker compose down，它會刪掉 Container，但 todo-data 是 external 的 Volume，不會被刪。
加分題：在 compose.yaml 加一個 postgres service，up 之後 docker ps 看到 2 個 Container。
-->
