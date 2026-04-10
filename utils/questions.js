/**
 * AITI 题目与类型数据（与项目文档一致；文档笔误已统一为「永远不信」）
 */

const TYPES = {
  sbai: { code: '01', name: '纯情AI脑', tag: '信徒', en: 'SB-AI' },
  rouge: { code: '02', name: '赛博韭菜', tag: '韭菜', en: 'ROUGE' },
  harden: { code: '03', name: '永远不信', tag: '嘴硬', en: 'HARDEN' },
  night: { code: '04', name: '夜袭党', tag: '夜猫', en: 'NIGHT' },
  prompt: { code: '05', name: '提示词战神', tag: '调教王', en: 'PROMPT' },
  savek: { code: '06', name: '收藏大师', tag: '收藏帝', en: 'SAVE-K' },
  phone: { code: '07', name: 'Mobile-only', tag: '手机侠', en: 'PHONE' },
  check: { code: '08', name: '考证狂魔', tag: '考证侠', en: 'CHECK' },
  clean: { code: '09', name: '精准prompt', tag: '洁癖', en: 'CLEAN' },
  fish: { code: '10', name: '记忆金鱼', tag: '金鱼', en: 'FISH' },
  paper: { code: '11', name: '论文派', tag: '论文狗', en: 'PAPER' },
  free: { code: '12', name: '白嫖大师', tag: '白嫖怪', en: 'FREE' }
}

const RESULT_LINES = {
  sbai: 'AI说的都对，你是AI最忠实的信徒',
  rouge: '课买了999个，23G提示词存着落灰',
  harden: '"垃圾AI"但用得比谁都欢',
  night: '凌晨2点还在调AI，省峰值费用',
  prompt: '调prompt能调一整天，prompt艺术家',
  savek: '存了=会了，收藏仪式感拉满',
  phone: '电脑是用来打游戏的',
  check: 'AI说啥都要去查一下真的假的',
  clean: '对话前必须写300字提示词',
  fish: '每次都当第一天用AI',
  paper: '先看论文再动手',
  free: '能不花钱绝对不花钱'
}

/** 每题四个选项文案 + 对应类型 key；选第 i 项计 (i+1) 分到该类型 */
const QUESTIONS = [
  {
    id: 1,
    text: '你在网上看到有人推某个"神器"，你会？',
    options: [
      { text: '马上试试，强推！', type: 'sbai' },
      { text: '先mark，看看别人怎么说', type: 'rouge' },
      { text: '将信将疑，自己去搜', type: 'check' },
      { text: '又是营销号割韭菜', type: 'harden' }
    ]
  },
  {
    id: 2,
    text: '你买过网上付费内容吗？',
    options: [
      { text: '买了一堆，一个没看', type: 'rouge' },
      { text: '买过几个有用的', type: 'paper' },
      { text: '偶尔买，性价比高的', type: 'clean' },
      { text: '从不买，白嫖最香', type: 'free' }
    ]
  },
  {
    id: 3,
    text: '你跟朋友聊到某个好用的东西，你会？',
    options: [
      { text: '必须按头安利的程度', type: 'sbai' },
      { text: '还行，推荐一下', type: 'clean' },
      { text: '一般般，不推荐', type: 'harden' },
      { text: '根本不提，自己用', type: 'night' }
    ]
  },
  {
    id: 4,
    text: '你一般几点睡？',
    options: [
      { text: '12点前准时睡', type: 'clean' },
      { text: '1点左右，偶尔修仙', type: 'clean' },
      { text: '2点是日常操作', type: 'night' },
      { text: '凌晨4点不在话下', type: 'night' }
    ]
  },
  {
    id: 5,
    text: '你让人帮你做事，会把需求说多详细？',
    options: [
      { text: '就说一句，剩下的自己悟', type: 'sbai' },
      { text: '大概说清楚就行', type: 'clean' },
      { text: '会写得很详细', type: 'prompt' },
      { text: '必须手把手教', type: 'prompt' }
    ]
  },
  {
    id: 6,
    text: '你网盘里存了多少G资料？',
    options: [
      { text: '存了=会了，仪式感', type: 'savek' },
      { text: '存了一些常用的', type: 'paper' },
      { text: '用到再存，不全存', type: 'free' },
      { text: '根本不存', type: 'harden' }
    ]
  },
  {
    id: 7,
    text: '你平时用什么设备上网？',
    options: [
      { text: '手机，刷个没完', type: 'phone' },
      { text: '电脑，屏幕大', type: 'phone' },
      { text: '平板，凑合用用', type: 'phone' },
      { text: '根本没设备', type: 'harden' }
    ]
  },
  {
    id: 8,
    text: '别人告诉你"这个东西超好用"，你会？',
    options: [
      { text: '马上试！', type: 'sbai' },
      { text: '将信将疑', type: 'clean' },
      { text: '自己先去搜一下', type: 'check' },
      { text: '一概不信', type: 'harden' }
    ]
  },
  {
    id: 9,
    text: '你做事前会做准备吗？',
    options: [
      { text: '必须准备充分！', type: 'prompt' },
      { text: '大概想一下', type: 'clean' },
      { text: '边干边想', type: 'fish' },
      { text: '直接开干', type: 'harden' }
    ]
  },
  {
    id: 10,
    text: '你觉得自己会用东西吗？',
    options: [
      { text: '学过=会了', type: 'savek' },
      { text: '常用那几个功能', type: 'fish' },
      { text: '什么都能鼓捣一下', type: 'clean' },
      { text: '比谁都熟', type: 'prompt' }
    ]
  },
  {
    id: 11,
    text: '你学新东西的方式是？',
    options: [
      { text: '报班！有人教', type: 'rouge' },
      { text: '看教程自己学', type: 'paper' },
      { text: '先查资料搞明白', type: 'paper' },
      { text: '直接开干', type: 'harden' }
    ]
  },
  {
    id: 12,
    text: '你愿意为什么付费？',
    options: [
      { text: '坚决不付费', type: 'free' },
      { text: '必要的才付', type: 'clean' },
      { text: '好用的就付', type: 'paper' },
      { text: '付费就是大爷', type: 'rouge' }
    ]
  },
  {
    id: 13,
    text: '别人给的东西你会直接用吗？',
    options: [
      { text: '神的馈赠，用！', type: 'sbai' },
      { text: '看看有没有用', type: 'clean' },
      { text: '参考一下再改改', type: 'check' },
      { text: '根本看不上', type: 'harden' }
    ]
  },
  {
    id: 14,
    text: '你网盘里有什么？',
    options: [
      { text: '各种"XXX大全""XXX教程"', type: 'savek' },
      { text: '一些工具/资源', type: 'paper' },
      { text: '偶尔存一点', type: 'free' },
      { text: '根本不存', type: 'harden' }
    ]
  },
  {
    id: 15,
    text: '朋友问你某个东西好用吗，你会说？',
    options: [
      { text: '强推！太好用了', type: 'sbai' },
      { text: '还行，一般般', type: 'clean' },
      { text: '没怎么用，不清楚', type: 'fish' },
      { text: '不好用，垃圾', type: 'harden' }
    ]
  },
  {
    id: 16,
    text: '你熬夜一般为了什么？',
    options: [
      { text: '根本不熬夜', type: 'clean' },
      { text: '追剧/玩游戏', type: 'fish' },
      { text: '便宜！避开高峰期', type: 'night' },
      { text: '夜深人静才有灵感', type: 'night' }
    ]
  },
  {
    id: 17,
    text: '你指挥人/AI做事，最看重？',
    options: [
      { text: '能做就行', type: 'sbai' },
      { text: '做得对', type: 'clean' },
      { text: '做得好', type: 'prompt' },
      { text: '按我的方式来', type: 'prompt' }
    ]
  },
  {
    id: 18,
    text: '你收藏过哪些东西？',
    options: [
      { text: '各种"XX合集""XX手册"', type: 'savek' },
      { text: '好用的工具', type: 'paper' },
      { text: '偶尔看的内容', type: 'fish' },
      { text: '根本不收藏', type: 'night' }
    ]
  },
  {
    id: 19,
    text: '你电脑主要用什么？',
    options: [
      { text: '打游戏，生产力是例外', type: 'phone' },
      { text: '办公软件', type: 'phone' },
      { text: '都要用', type: 'phone' },
      { text: '没有电脑', type: 'harden' }
    ]
  },
  {
    id: 20,
    text: '别人说"这个超牛X"，你会？',
    options: [
      { text: '马上试！', type: 'sbai' },
      { text: '看看再说', type: 'clean' },
      { text: '先查一下', type: 'check' },
      { text: '一概不信', type: 'harden' }
    ]
  },
  {
    id: 21,
    text: '你写东西会改几遍？',
    options: [
      { text: '写完就发', type: 'fish' },
      { text: '看一遍改改', type: 'clean' },
      { text: '改几遍才满意', type: 'prompt' },
      { text: '精雕细琢改半天', type: 'prompt' }
    ]
  },
  {
    id: 22,
    text: '你跟某个"工具"熟悉之后会？',
    options: [
      { text: '还是不敢用', type: 'fish' },
      { text: '就用那固定的几个功能', type: 'fish' },
      { text: '越来越会用', type: 'clean' },
      { text: '把它调教成我想要的样子', type: 'prompt' }
    ]
  },
  {
    id: 23,
    text: '你学新功能的方式是？',
    options: [
      { text: '等别人教', type: 'rouge' },
      { text: '看视频教程', type: 'paper' },
      { text: '查官方文档', type: 'paper' },
      { text: '自己摸索着就会了', type: 'harden' }
    ]
  },
  {
    id: 24,
    text: '你每个月花多少钱在这件事上？',
    options: [
      { text: '0，一分钱不花', type: 'free' },
      { text: '几块，意思意思', type: 'clean' },
      { text: '几十块，正常花费', type: 'paper' },
      { text: '几百块，尊贵的', type: 'rouge' }
    ]
  }
]

const TYPE_KEYS = Object.keys(TYPES)

/**
 * @param {number[]} choiceIndexes 每题所选选项下标 0-3
 * @returns {{ winner: string, scores: Record<string, number> }}
 */
function computeResult(choiceIndexes) {
  const scores = {}
  TYPE_KEYS.forEach((k) => {
    scores[k] = 0
  })
  QUESTIONS.forEach((q, qi) => {
    const idx = choiceIndexes[qi]
    if (idx === undefined || idx < 0 || idx > 3) return
    const opt = q.options[idx]
    const points = idx + 1
    scores[opt.type] += points
  })
  let max = -1
  TYPE_KEYS.forEach((k) => {
    if (scores[k] > max) max = scores[k]
  })
  const tied = TYPE_KEYS.filter((k) => scores[k] === max)
  tied.sort((a, b) => parseInt(TYPES[a].code, 10) - parseInt(TYPES[b].code, 10))
  const winner = tied[0]
  return { winner, scores }
}

module.exports = {
  TYPES,
  RESULT_LINES,
  QUESTIONS,
  computeResult
}
