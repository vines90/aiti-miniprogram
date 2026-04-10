# AITI 人格立绘（Seedream）

本目录为 **12 种人格** 各一张全身立绘，风格参考上级目录 `ref-mbti-style.png`（MBTI/16型人格式扁平矢量立绘）。

| 文件名 | 类型 key | 中文名 |
|--------|----------|--------|
| `01-sbai.jpeg` | sbai | 纯情AI脑 |
| `02-rouge.jpeg` | rouge | 赛博韭菜 |
| `03-harden.jpeg` | harden | 永远不信 |
| `04-night.jpeg` | night | 夜袭党 |
| `05-prompt.jpeg` | prompt | 提示词战神 |
| `06-savek.jpeg` | savek | 收藏大师 |
| `07-phone.jpeg` | phone | Mobile-only |
| `08-check.jpeg` | check | 考证狂魔 |
| `09-clean.jpeg` | clean | 精准prompt |
| `10-fish.jpeg` | fish | 记忆金鱼 |
| `11-paper.jpeg` | paper | 论文派 |
| `12-free.jpeg` | free | 白嫖大师 |

## 重新生成

```bash
cd aiti-miniprogram
export ARK_API_KEY="你的方舟 API Key"
# 可选：指定模型（需在方舟控制台开通）
# export AITI_SEEDREAM_MODEL="doubao-seedream-4-5-251128"

pip install 'volcengine-python-sdk[ark]'
python scripts/generate_aiti_avatars.py
```

默认模型为 `doubao-seedream-4-0-250828`。生成链接约 **24 小时** 失效，请以本地已下载文件为准。

## 小程序引用示例

结果页根据 `winner`（即上表 key）选择：

```js
const AVATAR = {
  sbai: '/assets/characters/01-sbai.jpeg',
  rouge: '/assets/characters/02-rouge.jpeg',
  // …
}
```

路径以小程序根目录为准；若真机无法加载，可改为上传到 **小程序素材 / CDN** 后的网络地址。
