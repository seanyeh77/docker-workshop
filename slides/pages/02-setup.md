---
layout: section
number: 2
chapter: Ch 2 · Set up Docker
---

# Set up Docker

- **2.1** 連線至 VM 並確認 Docker 運作中
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
  '每位學員各有一台已安裝 Docker 的 VM。',
  '以 ssh 連線至自己的 VM。-L 3000:localhost:3000 將筆電的 3000 轉送到 VM 的 3000，Ch4 以瀏覽器開啟 localhost:3000 時會用到。',
  'docker -v 僅確認指令已安裝，即使 Docker 未在執行也會顯示版本。',
  'hello-world 會實際啟動一個 Container；Image 已預先下載至 VM。--rm 讓 Container 執行完就自動刪除。出現 Hello from Docker! 即代表安裝完成；若未出現，請舉手由 TA 協助。',
]" />

<!--
VM 已預先裝好 Docker。這裡只做驗證，TA 下去巡。
port、user、host 依每人分配到的 VM 填入。忘了加 -L 的話，Ch4 開不了網頁，之後斷線重連時補上即可。
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
  'uname -r 顯示 kernel 版本。先在 VM 上執行，再分別以 ubuntu 與 alpine 兩個 Image 啟動 Container 執行。',
  'VM 的 kernel 是 Debian 的版本。',
  'Ubuntu 的 Container 印出相同的版本，而不是 Ubuntu 的 kernel。',
  'Alpine 的 Container 也相同：Image 不含 kernel，所有 Container 共用這台 VM 的 kernel。',
]" />

<!--
驗證 Q2 的答案。先問大家：如果 Image 內附 kernel，ubuntu 與 alpine 印出的 kernel 版本應該一樣嗎？
ubuntu 和 alpine 是兩套不同的 Linux 發行版，若 Image 自帶 kernel，版本應該不同。
Alpine 是很輕量的 Linux 發行版，整個 Image 不到 10MB，Ch3 會用它來做 node-base。
--rm 前面 hello-world 已經用過：Container 執行完就自動刪除，不會留下來。
三行相同，而且都不是 VM 所在實體主機的 kernel：VM 有自己的 kernel，Container 只共用到 VM 這一層。
延伸：在自己的 Mac 或 Windows 上用 Docker Desktop 時，uname -r 結尾是 linuxkit；OrbStack 則會出現 orbstack 字樣（例如 7.2.12-orbstack-...）。兩者都是在背後開了一台小型 Linux VM，所有 Container 都跑在裡面，這也回答了「Windows 怎麼能跑 Linux Container」。
-->
