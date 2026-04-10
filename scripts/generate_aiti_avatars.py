#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
使用 Seedream 图文生图：参考 ref-mbti-style.png，为 AITI 十二人格各生成一张立绘。
依赖：pip install 'volcengine-python-sdk[ark]'
认证：环境变量 ARK_API_KEY，或 ~/.claude/skills/seedream-imaging/references/credentials.env
"""

from __future__ import annotations

import base64
import os
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "assets" / "ref-mbti-style.png"
OUT = Path(os.environ.get("AITI_CHAR_OUT") or (ROOT / "assets" / "characters"))

DEFAULT_CREDS = Path.home() / ".claude" / "skills" / "seedream-imaging" / "references" / "credentials.env"

# 可在环境变量 AITI_SEEDREAM_MODEL 覆盖；默认 4.0（需在方舟控制台开通对应模型）
MODEL = os.environ.get("AITI_SEEDREAM_MODEL", "doubao-seedream-4-0-250828")
SIZE = os.environ.get("AITI_SEEDREAM_SIZE", "2048x2048")

STYLE = (
    "【画风锁定】严格参考参考图的整体美术风格：类似 MBTI 十六型人格官网的扁平矢量全身立绘。"
    "几何块面、干净描边、柔和扁平阴影、不要写实、不要3D、不要照片。"
    "大头略方带圆角、黑色圆点眼睛、极简眉嘴、大耳朵；浅色偏白背景，角色居中，脚下淡椭圆投影，像一张圆角角色卡。"
    "保持与参考图一致的插画气质与完成度。"
)

# key -> (filename_prefix, prompt_body)
TYPES: list[tuple[str, str, str]] = [
    (
        "sbai",
        "01-sbai",
        "角色为「AI信徒」：双手合十于胸前做虔诚祈祷状，头顶淡淡光环或星芒线，周围飘小爱心与点赞图标，表情真诚热烈，配色偏淡紫与青色高光。",
    ),
    (
        "rouge",
        "02-rouge",
        "角色为「赛博韭菜」：被层层叠叠写着课程教程的文件夹与金币压住，仍开心刷手机下单，表情又满足又懵，幽默夸张。",
    ),
    (
        "harden",
        "03-harden",
        "角色为「嘴硬」：双臂交叉撇嘴不屑，身后却有一台亮着的屏幕显示AI聊天界面，形成反差搞笑。",
    ),
    (
        "night",
        "04-night",
        "角色为「夜猫」：明显黑眼圈，头顶小月亮，盘腿坐笔记本电脑前敲键盘，旁边咖啡杯与台灯，深夜修仙氛围。",
    ),
    (
        "prompt",
        "05-prompt",
        "角色为「提示词战神」：像指挥官高举写满密密麻麻小字的巨大卷轴纸条，眼神得意，周围飞散关键字便签。",
    ),
    (
        "savek",
        "06-savek",
        "角色为「收藏大师」：被悬浮的文件夹、收藏星星、打勾图标环绕，怀里抱着标未读的资料，自我感动式微笑。",
    ),
    (
        "phone",
        "07-phone",
        "角色为「手机侠」：双手只捧巨大智能手机，背后电脑与游戏机被冷落蒙灰，夸张表现只用手机。",
    ),
    (
        "check",
        "08-check",
        "角色为「考证狂魔」：手持放大镜与印章，面对悬浮网页窗口与问号，认真核查的神态，小侦探气质。",
    ),
    (
        "clean",
        "09-clean",
        "角色为「洁癖」：戴白手套拿小喷壶对对话气泡做清洁，周围对齐网格线，强迫症整理提示词场景。",
    ),
    (
        "fish",
        "10-fish",
        "角色为「金鱼记忆」：头旁画小金鱼与水泡，抓头健忘，周围飞「又忘了？」小纸条，呆萌可爱。",
    ),
    (
        "paper",
        "11-paper",
        "角色为「论文派」：戴眼镜，怀抱论文与数据图表，身边书堆很高，学者书呆子气质但不丑化。",
    ),
    (
        "free",
        "12-free",
        "角色为「白嫖大师」：一手举空钱包一手攥满免费券与折扣标签，贼兮兮坏笑，趣味夸张。",
    ),
]


def load_api_key() -> str | None:
    k = os.environ.get("ARK_API_KEY")
    if k:
        return k.strip()
    cred = Path(os.environ.get("ARK_CREDENTIALS") or DEFAULT_CREDS)
    if not cred.exists():
        return None
    for line in cred.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        name, _, val = line.partition("=")
        if name.strip() == "ARK_API_KEY":
            return val.strip().strip('"').strip("'")
    return None


def resolve_image_local(path: Path) -> str:
    suffix = path.suffix.lower().lstrip(".")
    mime = {"jpg": "jpeg", "jpeg": "jpeg", "png": "png", "webp": "webp"}.get(suffix, "jpeg")
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/{mime};base64,{b64}"


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(url, dest)


def main() -> int:
    if not REF.exists():
        print(f"[错误] 找不到参考图: {REF}", file=sys.stderr)
        return 1
    api_key = load_api_key()
    if not api_key:
        print("[错误] 未配置 ARK_API_KEY（或 credentials.env）", file=sys.stderr)
        return 1

    try:
        from volcenginesdkarkruntime import Ark
    except ImportError:
        print("[错误] 请安装: pip install 'volcengine-python-sdk[ark]'", file=sys.stderr)
        return 1

    client = Ark(base_url="https://ark.cn-beijing.volces.com/api/v3", api_key=api_key)
    ref_uri = resolve_image_local(REF)
    OUT.mkdir(parents=True, exist_ok=True)

    manifest = OUT / "manifest.txt"
    lines: list[str] = []

    for i, (key, prefix, body) in enumerate(TYPES, 1):
        prompt = f"{STYLE}\n{body}\n画面上下预留少量留白，便于后期叠加中文标签与英文代号。"
        print(f"\n[{i}/12] {prefix} ({key}) 生成中…")
        try:
            resp = client.images.generate(
                model=MODEL,
                prompt=prompt,
                image=ref_uri,
                size=SIZE,
                response_format="url",
                watermark=False,
            )
            url = resp.data[0].url if resp.data else None
            if not url:
                print("  无返回 URL", file=sys.stderr)
                lines.append(f"{prefix}\t{key}\tFAIL")
                continue
            dest = OUT / f"{prefix}.jpeg"
            print(f"  URL: {url[:80]}…")
            download(url, dest)
            print(f"  已保存: {dest}")
            lines.append(f"{prefix}\t{key}\t{dest.name}")
        except Exception as e:
            print(f"  失败: {e}", file=sys.stderr)
            lines.append(f"{prefix}\t{key}\tERROR:{e}")
        if i < len(TYPES):
            time.sleep(2)

    manifest.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"\n完成。清单: {manifest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
