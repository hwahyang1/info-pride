import type { Card } from '../utils/wikiPages/cards'
import type { IdolName } from '../data/idols'
import CardStoriesData from '../data/cardStories.data'

import { Colors } from '../data/colors'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import Paths from '../utils/paths'
import { toVideoLink } from './ExternalVideo'

const Status = ({
  vocTop,
  danTop,
  visTop,
  staTop,
}: Pick<Card, 'vocTop' | 'danTop' | 'visTop' | 'staTop'>) => (
  <Box>
    <span className="mr-3" style={{ color: Colors.Vocal }}>
      {vocTop}
    </span>
    <span className="mr-3" style={{ color: Colors.Dance }}>
      {danTop}
    </span>
    <span className="mr-3" style={{ color: Colors.Visual }}>
      {visTop}
    </span>
    <span className="mr-3" style={{ color: Colors.Stamina }}>
      {staTop}
    </span>
  </Box>
)

const CardStories = ({
  idolName,
  cardNumber,
}: {
  idolName: IdolName
  cardNumber: number
}) => {
  const stories = CardStoriesData?.[idolName]?.[cardNumber]

  if (!stories) {
    return (
      <div className="mb-2 text-gray-500">
        尚无剧情信息。请添加卡片剧情信息到 data/cardStories.data.ts 的 data[
        {idolName}][{cardNumber}] 。
      </div>
    )
  }

  return (
    <Box className="mb-2">
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {[1, 2, 3].map((id) => (
          <Button
            key={id}
            component="a"
            href={toVideoLink(stories[id as unknown as 1 | 2 | 3].video)}
            target="_blank"
            rel="noopener"
          >
            {id} - {stories[id as unknown as 1 | 2 | 3].name}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}

const CardItem = ({
  card,
  idolName,
  cardNumber,
}: {
  card: Card
  idolName: IdolName
  cardNumber: number
}) => {
  const {
    type,
    rarity,
    prop,
    ski1Typ,
    ski2Typ,
    ski3Typ,
    vocTop,
    danTop,
    visTop,
    staTop,
    nameCn,
    nameJa,
  } = card

  return (
    <>
      <div className="text-4xl mb-2" lang="zh-CN">
        {nameCn}
      </div>
      <div className="text-xl mb-2" lang="ja">
        {nameJa}
      </div>
      <div>
        {type} / {prop} / {rarity}★
      </div>
      <br />
      <Status vocTop={vocTop} danTop={danTop} visTop={visTop} staTop={staTop} />
      <br />

      <CardStories idolName={idolName} cardNumber={cardNumber} />

      <Button
        variant="outlined"
        component="a"
        href={Paths.wiki(`${idolName}/卡牌/${cardNumber}`)}
        target="_blank"
        rel="noopener"
      >
        Wiki 页面
      </Button>
    </>
  )
}

export default CardItem