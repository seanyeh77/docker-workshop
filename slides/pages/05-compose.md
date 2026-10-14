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
  '最初僅指定 Image 名稱。',
  '加入 Container 名稱。',
  '加入背景執行與 Port。',
  '再加入 Volume，指令已過於冗長。',
  '將相同內容寫成 compose.yaml，之後僅需執行 docker compose up。',
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
  '一份 compose.yaml 可以描述多個 Container。',
  'services 下的每一項代表一個 Container，my-image 為自訂名稱。',
  '指定使用的 Image 與 Container 名稱。',
  'ports 為清單，可指定多個 Port。',
  'volumes 亦為清單，格式與 -v 相同。',
  '最下方宣告使用的 Volume；external: true 代表使用先前建立的 todo-data。',
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
  '僅設定 Port 的版本可以啟動 app，但資料仍會消失。',
  '綠色為新增內容：在 service 中掛載 Volume，並於最下方宣告。',
  '此為完整的 compose.yaml，存放於 app 目錄中。',
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
  { c: 'docker compose up -d', o: '[+] Running 2/2\n ✔ Network app_default  Created\n ✔ Container my-image   Started' },
]" />

::note::

<Note :notes="[
  'Compose 會使用相同的名稱與 Port，因此需先刪除 Ch4 的 Container。',
  '刪除舊的 my-image。',
  '於 compose.yaml 所在目錄執行；-d 同樣代表背景執行。',
]" />

---
layout: figure
chapter: Ch 5 · Docker Compose
takeaway: Ch4 新增的 3 筆資料仍存在，因為 Compose 掛載的是同一個 todo-data Volume。
---

# 檢查點：Compose 啟動完成

<BrowserMock :items="['買牛奶', '寫作業', '練習 Docker']" />

<!--
要停的時候用 docker compose down，它會刪掉 Container，但 todo-data 是 external 的 Volume，不會被刪。
加分題：在 compose.yaml 加一個 postgres service，up 之後 docker ps 看到 2 個 Container。
-->
