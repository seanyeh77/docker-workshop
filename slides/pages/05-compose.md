---
layout: section
number: 5
chapter: Ch 5 · Docker Compose
---

# Docker Compose

- **5.1** docker run 指令的問題
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
  '一開始只有一個 Image 名稱。',
  '加上名字。',
  '加上背景執行和 Port。',
  '再加上 Volume，已經長到記不住了。',
  '同樣的內容寫成一份 compose.yaml，以後只要 docker compose up。',
]" />

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
ltag: compose.yaml
---

# compose.yaml 逐段說明

```yaml {all|1-2|3-4|5-6|7-8|10-12}
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

::note::

<Note :notes="[
  '一份 compose.yaml 可以描述好幾個 Container。',
  'services 底下每一項是一個 Container，my-image 是自己取的名字。',
  '用哪個 Image，以及 Container 叫什麼名字。',
  'ports 是一個清單，可以開好幾個 Port。',
  'volumes 也是清單，寫法和 -v 一樣。',
  '最下面宣告用到的 Volume。external: true 代表用剛剛自己建好的 todo-data。',
]" />

<!--
YAML 用空格縮排，不能用 Tab。這是最常見的錯。
-->

---
layout: textbook
chapter: Ch 5 · Docker Compose
ltag: compose.yaml
clicks: 2
---

# 在 compose.yaml 加入 Volume

<ConfigDiff file="compose.yaml" :rows="[
  ['', 'services:'],
  ['', '  my-image:'],
  ['', '    image: my-username/my-image'],
  ['', '    container_name: my-image'],
  ['', '    ports:'],
  ['', '      - &quot;3000:3000&quot;'],
  ['add', '    volumes:'],
  ['add', '      - todo-data:/etc/todos'],
  ['add', ''],
  ['add', 'volumes:'],
  ['add', '  todo-data:'],
  ['add', '    external: true'],
]" />

::note::

<Note :notes="[
  '先寫出只有 Port 的版本，app 跑得起來，但資料一樣會不見。',
  '綠色是新增的：在 service 裡掛上 Volume，並在最下面宣告它。',
  '這就是完整的 compose.yaml，存在 app 資料夾裡。',
]" />

---
layout: textbook
chapter: Ch 5 · Docker Compose
ltag: Terminal
clicks: 2
---

# 實作：docker compose up

<TerminalTyping :keep="2" :cmds="[
  { c: 'docker rm -f my-image', o: 'my-image' },
  { c: 'docker compose up -d', o: '[+] Running 1/1\n ✔ Container my-image  Started' },
]" />

::note::

<Note :notes="[
  'Compose 會用同一個名字和 Port，先把 Ch4 的 Container 刪掉。',
  '先刪掉舊的 my-image。',
  '在 compose.yaml 所在的資料夾執行。-d 一樣是背景執行。',
]" />

---
layout: figure
chapter: Ch 5 · Docker Compose
takeaway: Ch4 加的 3 筆還在，因為 Compose 掛的是同一個 todo-data Volume。
---

# 檢查點：Compose 啟動完成

<BrowserMock :items="['買牛奶', '寫作業', '練習 Docker']" />

<!--
要停的時候用 docker compose down，它會刪掉 Container，但 todo-data 是 external 的 Volume，不會被刪。
加分題：在 compose.yaml 加一個 postgres service，up 之後 docker ps 看到 2 個 Container。
-->
