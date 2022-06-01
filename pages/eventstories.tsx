import { useState } from 'react'
import { Grid } from '@mantine/core'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Title from '#components/Title'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import { APIResponseOf } from '#utils/api'
import ListButton from '#components/ListButton'
import EventStoryView from '#components/eventstories/EventStoryView'

const EventStoriesPage = ({
  EventStoriesData,
}: {
  EventStoriesData: APIResponseOf<'EventStory/List'>
}) => {
  const { t: $ev } = useTranslation('events')

  const [currEvent, setCurrEvent] = useState<
    APIResponseOf<'EventStory/List'>[number] | null
  >(null)
  return (
    <>
      <p>活动剧情从新到老排列。</p>
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={3}>
          <div className="h-[65vh] overflow-y-auto">
            {EventStoriesData.sort((a, b) => b.order - a.order).map(
              (item, key) => (
                <ListButton
                  key={key}
                  onClick={() => {
                    setCurrEvent(item)
                  }}
                  selected={currEvent?.id === item.id}
                >
                  {$ev(item.description)}
                </ListButton>
              )
            )}
          </div>
        </Grid.Col>
        <Grid.Col xs={12} lg={9}>
          {currEvent && <EventStoryView currEvent={currEvent} />}
        </Grid.Col>
      </Grid>
    </>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['events'])),
    },
  }
}

const SkeletonEventStoriesPage = () => {
  const { data: EventStoriesData } = useApi('EventStory/List')

  const allData = {
    EventStoriesData,
  }

  return (
    <>
      <Title title="活动剧情" />
      {allFinished(allData) ? (
        <EventStoriesPage {...allData} />
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

export default SkeletonEventStoriesPage
