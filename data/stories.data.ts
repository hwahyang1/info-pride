import type { ChapterItem, SeriesName } from './stories'

const data: Partial<
  Record<SeriesName, Record<number, Record<number, ChapterItem>>>
> = {
  Hoshimi: {
    1: {
      1: {
        name: '长濑麻奈',
        video: { type: 'bilibili', vid: 'av591604610', pid: 1 },
      },
      2: {
        name: '在那之后的三年',
        video: { type: 'bilibili', vid: 'av591604610', pid: 2 },
      },
      3: {
        name: '长濑琴乃和川咲樱',
        video: { type: 'bilibili', vid: 'av591604610', pid: 3 },
      },
      4: {
        name: '神崎莉央',
        video: { type: 'bilibili', vid: 'av591604610', pid: 4 },
      },
      5: {
        name: '想要单独表演',
        video: { type: 'bilibili', vid: 'av591604610', pid: 5 },
      },
      6: {
        name: '互相吸引的两人',
        video: { type: 'bilibili', vid: 'av591604610', pid: 6 },
      },
      7: {
        name: '新成员是什么样的人呢',
        video: { type: 'bilibili', vid: 'av591604610', pid: 7 },
      },
      8: {
        name: '色彩缤纷的五人',
        video: { type: 'bilibili', vid: 'av591604610', pid: 8 },
      },
      9: {
        name: '经纪人兼宿舍长',
        video: { type: 'bilibili', vid: 'av591604610', pid: 9 },
      },
      10: {
        name: '星见祭典的回忆',
        video: { type: 'bilibili', vid: 'av591604610', pid: 10 },
      },
      11: {
        name: '令人无语的提案',
        video: { type: 'bilibili', vid: 'av591604610', pid: 11 },
      },
      12: {
        name: '严重的失误',
        video: { type: 'bilibili', vid: 'av591604610', pid: 12 },
      },
      13: {
        name: '日与月的物语',
        video: { type: 'bilibili', vid: 'av591604610', pid: 13 },
      },
      14: {
        name: '墙上的女孩',
        video: { type: 'bilibili', vid: 'av591604610', pid: 14 },
      },
      15: {
        name: '奇怪的新成员',
        video: { type: 'bilibili', vid: 'av591604610', pid: 15 },
      },
      16: {
        name: '粉蝶花的花语',
        video: { type: 'bilibili', vid: 'av591604610', pid: 16 },
      },
      17: {
        name: '晴天霹雳',
        video: { type: 'bilibili', vid: 'av591604610', pid: 17 },
      },
      18: {
        name: '突然的来访者',
        video: { type: 'bilibili', vid: 'av591604610', pid: 18 },
      },
      19: {
        name: 'NEXT VENUS大赛',
        video: { type: 'bilibili', vid: 'av591604610', pid: 19 },
      },
      20: {
        name: '心跳的真相',
        video: { type: 'bilibili', vid: 'av591604610', pid: 20 },
      },
      21: {
        name: '对偶像感兴趣吗？',
        video: { type: 'bilibili', vid: 'av591604610', pid: 21 },
      },
      22: {
        name: '不足之处',
        video: { type: 'bilibili', vid: 'av591604610', pid: 22 },
      },
      23: {
        name: '意外的相遇',
        video: { type: 'bilibili', vid: 'av591604610', pid: 23 },
      },
      24: {
        name: '舞蹈比赛优胜者',
        video: { type: 'bilibili', vid: 'av591604610', pid: 24 },
      },
      25: {
        name: '最后一块拼图',
        video: { type: 'bilibili', vid: 'av591604610', pid: 25 },
      },
      26: {
        name: '夜晚、海岸边的街道',
        video: { type: 'bilibili', vid: 'av591604610', pid: 26 },
      },
      27: {
        name: '清晨、商谈着的两人',
        video: { type: 'bilibili', vid: 'av591604610', pid: 27 },
      },
      28: {
        name: '诞生在这个世界瞬间的声音',
        video: { type: 'bilibili', vid: 'av591604610', pid: 28 },
      },
    },
    2: {
      1: {
        name: '以那个高度为目标',
        video: { type: 'bilibili', vid: 'av807206975' },
      },
      2: {
        name: '未填之坑',
        video: { type: 'bilibili', vid: 'av807206975', pid: 2 },
      },
      3: {
        name: '怜的秘密',
        video: { type: 'bilibili', vid: 'av807206975', pid: 3 },
      },
      4: {
        name: '焦急的真相',
        video: { type: 'bilibili', vid: 'av807206975', pid: 4 },
      },
      5: {
        name: '五人一起！',
        video: { type: 'bilibili', vid: 'av807206975', pid: 5 },
      },
      6: {
        name: '偶像知识竞赛王者',
        video: { type: 'bilibili', vid: 'av677428266' },
      },
      7: {
        name: '夜中、卧室里',
        video: { type: 'bilibili', vid: 'av677428266', pid: 2 },
      },
      8: {
        name: '擅长与不擅长',
        video: { type: 'bilibili', vid: 'av677428266', pid: 3 },
      },
      9: {
        name: '两人一起的话、肯定没问题',
        video: { type: 'bilibili', vid: 'av677428266', pid: 4 },
      },
      10: {
        name: '雫与千纱',
        video: { type: 'bilibili', vid: 'av677428266', pid: 5 },
      },
      16: {
        name: '麻奈的顾虑',
        video: { type: 'bilibili', vid: 'av210396686' },
      },
      17: {
        name: '我的个性',
        video: { type: 'bilibili', vid: 'av210396686', pid: 2 },
      },
      18: {
        name: '渚的真心话',
        video: { type: 'bilibili', vid: 'av210396686', pid: 3 },
      },
      19: {
        name: '是什么风吹来的',
        video: { type: 'bilibili', vid: 'av210396686', pid: 4 },
      },
      20: {
        name: '雾散天晴',
        video: { type: 'bilibili', vid: 'av210396686', pid: 5 },
      },
      21: {
        name: '大小姐的主张',
        video: { type: 'bilibili', vid: 'av723577672' },
      },
      22: {
        name: '钱包空空',
        video: { type: 'bilibili', vid: 'av723577672', pid: 2 },
      },
      23: {
        name: '得知社会的艰辛',
        video: { type: 'bilibili', vid: 'av723577672', pid: 3 },
      },
      24: {
        name: '躲不掉的事',
        video: { type: 'bilibili', vid: 'av723577672', pid: 4 },
      },
      25: {
        name: '新人 top 的建议',
        video: { type: 'bilibili', vid: 'av723577672', pid: 5 },
      },
      26: {
        name: '真的真的真的？',
        video: { type: 'bilibili', vid: 'av381308830' },
      },
      27: {
        name: '尾随开始',
        video: { type: 'bilibili', vid: 'av381308830', pid: 2 },
      },
      28: {
        name: '深夜、小屋里',
        video: { type: 'bilibili', vid: 'av381308830', pid: 3 },
      },
      29: {
        name: '芽衣的真心话',
        video: { type: 'bilibili', vid: 'av381308830', pid: 4 },
      },
      30: {
        name: '指南',
        video: { type: 'bilibili', vid: 'av381308830', pid: 5 },
      },
    },
  },
}

const SubTitles: Partial<
  Record<SeriesName, Record<number, Record<number, string>>>
> = {
  Hoshimi: {
    1: {
      1: 'Shine Purity',
      7: 'Short Goodbye',
      12: 'like the Sun/Moon',
      17: 'Strange One',
      22: 'The Sun, Moon and Stars',
    },
    2: {
      1: 'to Trust One',
      6: 'Drop of Smile',
      11: 'Make up her Mind',
      16: 'With a Will',
      21: 'Proud Lady',
      26: 'Resolution',
      31: 'Dear My Sister',
      40: 'Sunlight',
    },
  },
}

export default data
export { SubTitles }
