import type { Logic } from '#components/storyreplay/logicParser'

// https://miro.com/app/board/uXjVLGn9Zrk=/
const rules: Record<string, [Logic, string | null][]> = {
    '001': [[['TRUE'], '002']],
    '002': [[['TRUE'], '003']],
    '003': [[['TRUE'], '004']],
    '004': [
        [['EQU', '[004:51]', 1], null], // 思い切って告白する
        [['TRUE'], '005'],
    ],
    '005': [[['TRUE'], '006']],
    '006': [[['TRUE'], '007']],
    '007': [
        [['EQU', '[007:4]', 0], '008-bad'], // 電話に出ない
        [
            [
                'AND',
                [
                    'AND',
                    [
                        'AND',
                        ['EQU', '[003:7]', 0], // 言われたとおりにしてみる
                        ['EQU', '[003:45]', 0], // 抱き寄せて優の顔を隠す
                    ],
                    [
                        'AND',
                        ['EQU', '[004:29]', 0], // 名前で呼んでみる
                        ['EQU', '[004:51]', 0], // 告白を我慢する
                    ],
                ],
                [
                    'AND',
                    [
                        'AND',
                        ['EQU', '[005:32]', 0], // 試しに肯定してみる
                        ['EQU', '[006:11]', 0], // 待ってないと嘘をつく
                    ],
                    [
                        'AND',
                        ['EQU', '[006:31]', 0], // 優と呼ぶ
                        [
                            'AND',
                            ['EQU', '[007:4]', 1], // 電話に出る
                            ['EQU', '[007:4.60]', 0], // これからだ、と答える
                        ],
                    ],
                ],
            ],
            '008-happy',
        ],
        [['TRUE'], '008-normal'],
    ],
    '008-bad': [[['TRUE'], null]],
    '008-normal': [[['TRUE'], null]],
    '008-happy': [[['TRUE'], null]],
}
export default rules
