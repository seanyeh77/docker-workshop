# Docker Workshop

給只學過寫程式、Terminal 與 git，但沒有軟體開發與安裝環境經驗的學員的 Docker 入門工作坊。

- [SPEC.md](SPEC.md)：簡報規格，包含時間表、逐段投影片大綱、Slido 題目、梗與類比、投影片做法與 Textbook 風格、課前準備與講義修正清單。
- [slides/](slides/)：依 SPEC 做的 Slidev 簡報，共 67 張。

## 簡報

```bash
cd slides
npm install
npm run dev      # 本機預覽，按 p 開講者模式
npm run build    # 輸出靜態網頁到 slides/dist
```

| 檔案 | 內容 |
| --- | --- |
| `slides.md` | 設定與封面，依序引入 `pages/` |
| `pages/00-warmup.md` ~ `06-summary.md` | 暖場、Ch1 到 Ch5（含兩次休息）、總結 |
| `layouts/` | Textbook 版型：cover、textbook、section、quiz、compare、steps、figure、bento 等 |
| `components/` | 動畫元件：TerminalTyping、AnnotatedCommand、ConfigDiff、LayerDiagram、ContainerStory、Lifecycle、PortMap 等 |
| `styles/` | Textbook 主題樣式與字型 |

上課前記得把投影片裡的 Slido 代碼 `#docker-ws` 換成實際的活動代碼。
