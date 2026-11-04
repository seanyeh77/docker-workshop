---
layout: section
number: 2
chapter: Ch 2 · Set up Docker
---

# Set up Docker

- **2.1** 連線至主機並確認 Docker 運作中
- **2.2** 執行第一個 Container
- **2.3** 驗證 Q2：Container 使用的 kernel

---
layout: textbook
chapter: Ch 2 · Set up Docker
ltag: Terminal
clicks: 3
---

# 執行第一個 Container

<TerminalTyping :keep="3" :cmds="[
  { c: 'ssh -p &lt;port&gt; -L 3000:localhost:3000 &lt;user&gt;@&lt;host&gt;', o: '' },
  { c: 'docker -v', o: 'Docker version 29.x.x, build xxxxxxx' },
  { c: 'docker run --rm hello-world', o: '\nHello from Docker!\nThis message shows that your installation appears to be working correctly.' },
]" />

::note::

<Note :notes="[
  '指令清單：seanyeh77.github.io/<wbr>docker-workshop/<wbr>commands.html',
  '-L 3000:localhost:3000：讓瀏覽器能開啟 localhost:3000。',
  '',
  '出現 Hello from Docker! 即可使用。',
]" />

<!--
主機已預先裝好 Docker，Image 也已預先下載。這裡只做驗證，TA 下去巡。
--rm 讓 Container 執行完就自動刪除。
port、user、host 依每人分配到的連線資訊填入。忘了加 -L 的話，Ch4 開不了網頁，之後斷線重連時補上即可。
版本號每個人不一樣，沒關係。
最後一步就是檢查點：看到 Hello from Docker! 就成功，沒看到的舉手。
常見狀況：
- permission denied ... docker.sock：帳號不在 docker 群組。
- ssh 連不上：port、user 或 host 打錯。
- bind [127.0.0.1]:3000: Address already in use：筆電上已有程式占用 3000，ssh 仍會連上，但轉送失敗。
講師這段時間把 Ch3 的指令貼到共用連結。
-->

---
layout: textbook
chapter: Ch 2 · Set up Docker
ltag: Terminal
clicks: 3
---

<script setup>
const cmds = [
  { c: 'uname -r', o: '6.12.107+deb13-cloud-amd64' },
  { c: 'docker run --rm ubuntu uname -r', o: "6.12.107+deb13-cloud-amd64" },
  { c: 'docker run --rm alpine uname -r', o: "6.12.107+deb13-cloud-amd64" },
]
</script>

# 驗證 Q2：Container 使用的 kernel

<TerminalTyping :cmds="cmds" :keep="3" />

::note::

<Note :notes="[
  '',
  '',
  'Ubuntu 的 Container 印出相同的版本。',
  'Image 不含 kernel，Container 共用主機的 kernel。',
]" />

<!--
驗證 Q2 的答案。先問大家：如果 Image 內附 kernel，ubuntu 與 alpine 印出的 kernel 版本應該一樣嗎？
ubuntu 和 alpine 是兩套不同的 Linux 發行版，若 Image 自帶 kernel，版本應該不同。
Alpine 是很輕量的 Linux 發行版，整個 Image 不到 10MB，Ch3 會用它來做 node-base。
--rm 前面 hello-world 已經用過：Container 執行完就自動刪除，不會留下來。
三行相同：Container 共用的是執行 Docker 的這台主機的 kernel。
延伸：在自己的 Mac 或 Windows 上用 Docker Desktop 時，uname -r 結尾是 linuxkit；OrbStack 則會出現 orbstack 字樣（例如 7.2.12-orbstack-...）。兩者都是在背後開了一台小型 Linux VM，所有 Container 都跑在裡面，這也回答了「Windows 怎麼能跑 Linux Container」。
-->
