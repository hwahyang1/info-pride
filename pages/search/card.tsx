import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useForm } from '@mantine/form'
import { useLocalStorage } from '@mantine/hooks'
import { Alert, Checkbox, NumberInput, TextInput, Tooltip } from '@mantine/core'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

import type { LocalBox } from '../settings'
import jpCharas from '../../locales/ja/v-chr.json'

import tryJSONParse from '#utils/tryJsonParse'
import { LOCALSTORAGE_BOX_TAG } from '#utils/startupHook'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import type { APIResponseOf } from '#utils/api'
import FilterSelect from '#components/search/card/FilterSelect'
import type { CharacterId } from '#data/vendor/characterId'
import { CharacterIds } from '#data/vendor/characterId'
import ResultList from '#components/search/card/ResultList'
import CCIDTable from '#data/ccid'
import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import type { PropsWithL10n } from '#components/types'

const SearchPage = ({
    CardData,
    SkillAllData,
    VCardAlias,
}: {
    CardData: APIResponseOf<'Card'>
    SkillAllData: APIResponseOf<'Skill/All'>
    VCardAlias: Record<string, string>
}) => {
    const $t = useTranslations('search')
    const $vc = useTranslations('v-chr')
    const $v = useTranslations('vendor')

    const [localBox, setLocalBox] = useState<LocalBox>({})
    // provides a escape hatch for those who have already get used to in-game literatures
    const [useJpStr, setUseJpStr] = useLocalStorage({
        key: 'use-jp-strings-during-searching',
        defaultValue: false,
    })
    useEffect(() => {
        setLocalBox(
            tryJSONParse(localStorage.getItem(LOCALSTORAGE_BOX_TAG)) ?? {}
        )
    }, [])

    const {
        values: formValues,
        errors: formErrors,
        getInputProps,
    } = useForm({
        initialValues: {
            keyword: '',
            selectedCharacters: [] as CharacterId[],
            selectedCardTypes: [] as string[],
            ownedOnly: false,
            ctMin: '',
            ctMax: '',
            ctShowSp: false,
            dualA: false,
            initial5Only: false,
        },
        validate: {
            ctMin: (x) =>
                x.trim() !== '' && Number.isNaN(Number(x))
                    ? 'Invalid ctMin'
                    : null,
            ctMax: (x) =>
                x.trim() !== '' && Number.isNaN(Number(x))
                    ? 'Invalid ctMax'
                    : null,
        },
    })

    const [selectedCards, selectedSkills] = useMemo(() => {
        let ret = [...CardData]
        let highlightedSkills: string[] = []

        const {
            keyword,
            selectedCharacters,
            selectedCardTypes,
            ctMin,
            ctMax,
            ctShowSp,
            dualA,
            ownedOnly,
            initial5Only,
        } = formValues

        const numCtMin = Number.isNaN(Number(ctMin)) ? 0 : Number(ctMin)
        const numCtMax = Number.isNaN(Number(ctMax)) ? 0 : Number(ctMax)

        if (keyword.trim() !== '') {
            ret = ret.filter(
                (x) =>
                    x.name.includes(keyword.trim()) ||
                    (VCardAlias[x.assetId] ?? '')
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
            )
        }

        if (selectedCharacters.length > 0) {
            ret = ret.filter((x) =>
                selectedCharacters.includes(x.characterId as CharacterId)
            )
        }

        if (selectedCardTypes.length > 0) {
            ret = ret.filter((x) => {
                return selectedCardTypes.includes(String(x.type))
            })
        }

        if (initial5Only) {
            ret = ret.filter((card) => card.initialRarity === 5)
        }

        if (ownedOnly) {
            ret = ret.filter((card) => {
                const cardCcid = (
                    CCIDTable[card.characterId as CharacterId] ?? []
                ).filter((x) => x.cardId === card.id)?.[0]?.ccid
                // Card does not exist in CCIDDB
                // TODO: find a way to improve
                if (!cardCcid) return true
                return localBox?.[card.characterId as CharacterId]?.[cardCcid]
            })
        }

        ret = ret.filter((card) => {
            const cardSkillIds = [card.skillId1, card.skillId2, card.skillId3]
            const cardSkills = cardSkillIds
                .map((x) => SkillAllData.filter((r) => r.id === x)?.[0])
                .filter((x) => x)
            if (cardSkills.length < 3) {
                // Some skills are not found
                // TODO: find a way to improve
                return true
            }
            if (
                dualA &&
                cardSkills.filter(
                    (x) => x.categoryType === SkillCategoryType.Active
                ).length < 2
            ) {
                return false
            }
            const hasSkillFilters = numCtMin > 0 || numCtMax > 0
            const selectedSkills = cardSkills.filter((sk) => {
                // Only check the highest level for now
                const skillHighestLevel = sk.levels[sk.levels.length - 1]
                // ctMin and ctMax
                if (numCtMin > 0) {
                    if (
                        // For SP, coolTime is 0 so we use ||
                        (skillHighestLevel.coolTime || -1) < numCtMin &&
                        !(
                            ctShowSp &&
                            sk.categoryType === SkillCategoryType.Special
                        )
                    )
                        return false
                }
                if (numCtMax > 0) {
                    if (
                        // For SP, coolTime is 0 so we use ||
                        (skillHighestLevel.coolTime || Infinity) > numCtMax &&
                        !(
                            ctShowSp &&
                            sk.categoryType === SkillCategoryType.Special
                        )
                    )
                        return false
                }

                return true
            })
            if (selectedSkills.length === 0) return false
            if (hasSkillFilters) {
                highlightedSkills = highlightedSkills.concat(
                    selectedSkills.map((x) => x.id)
                )
            }
            return true
        })

        return [ret, highlightedSkills]
    }, [CardData, SkillAllData, VCardAlias, formValues, localBox])

    return (
        <>
            <Alert>
                {$t.rich('use_hs_search', {
                    link: (c) => (
                        <Link href="https://ipr.vibbit.me/search">
                            {(c as ReactNode[])[0]}
                        </Link>
                    ),
                })}
            </Alert>
            <p>
                {$t.rich('notice_mybox', {
                    link: (c) => (
                        <Link href="/settings">{(c as ReactNode[])[0]}</Link>
                    ),
                })}
            </p>
            <div className="mt-2 rounded-md border-solid border-6 border-sky-500 p-2">
                <div className="flex items-center mb-2">
                    <TextInput
                        className="mr-2"
                        label={$t('Keyword')}
                        {...getInputProps('keyword')}
                    />
                    <FilterSelect
                        className="mr-2"
                        label={$t('Character')}
                        multiple
                        list={CharacterIds}
                        displayAs={useJpStr ? undefined : $vc}
                        listNamemap={useJpStr ? jpCharas : undefined}
                        width={300}
                        formProps={getInputProps('selectedCharacters')}
                        maxDropdownHeight={400}
                    />
                    <FilterSelect
                        className="mr-2"
                        label={$t('Type')}
                        multiple
                        list={['1', '2', '3']}
                        listNamemap={{
                            1: $v('Appeal'),
                            2: $v('Technique'),
                            3: $v('Support'),
                        }}
                        width={300}
                        formProps={getInputProps('selectedCardTypes')}
                    />
                    <Checkbox
                        className="mr-2"
                        label={$t('show_only_owned')}
                        {...getInputProps('ownedOnly')}
                    />
                    <Checkbox
                        label={$t('show_only_rare')}
                        {...getInputProps('initial5Only')}
                    />
                </div>
                <div className="flex items-center mb-2">
                    <NumberInput
                        className="mr-2"
                        label={$t('Minimum CT')}
                        placeholder={$t('Unlimited')}
                        min={0}
                        {...getInputProps('ctMin')}
                    />
                    <NumberInput
                        className="mr-2"
                        label={$t('Maximum CT')}
                        placeholder={$t('Unlimited')}
                        min={0}
                        {...getInputProps('ctMax')}
                    />
                    <Checkbox
                        label={$t('no_skip_sp_on_ctfilter')}
                        className="mr-2"
                        {...getInputProps('ctShowSp')}
                    />
                    <Tooltip label={$t('no_skip_sp_on_ctfilter_desc')}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </Tooltip>
                </div>
                <div className="flex items-center mb-2">
                    <Checkbox
                        label={$t('Dual A skills')}
                        className="mr-2"
                        {...getInputProps('dualA')}
                    />
                    <Checkbox
                        label={$t('Use original strings')}
                        className="mr-2"
                        checked={useJpStr}
                        onChange={(e) => setUseJpStr(e.currentTarget.checked)}
                    />
                </div>
            </div>
            <div className="mt-2">
                {selectedCards.length === CardData.length ? (
                    <p>{$t('card_total', { num: CardData.length })}</p>
                ) : (
                    <p>
                        {$t('card_filtered', {
                            total: CardData.length,
                            num: selectedCards.length,
                        })}
                    </p>
                )}
            </div>
            <div className="mt-2">
                <ResultList
                    list={selectedCards}
                    highlightedSkills={selectedSkills}
                    SkillAllData={SkillAllData}
                />
            </div>
        </>
    )
}

const SkeletonSearchPage = (props: PropsWithL10n) => {
    const $t = useTranslations('search')

    const { data: CardData } = useApi('Card')
    const { data: SkillAllData } = useApi('Skill/All')

    const allData = {
        CardData,
        SkillAllData,
        VCardAlias: props._m['v-card-alias'],
    }

    return (
        <>
            <Title title={$t('Card search')} />
            {allFinished(allData) ? (
                <SearchPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export const getStaticProps = getI18nProps([
    'search',
    'search_skills',
    'analyze',
    'vendor',
    'v-chr',
    'v-card-name',
    'v-card-alias',
])

export default SkeletonSearchPage
