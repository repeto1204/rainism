import {useQuery} from '@tanstack/react-query'
import {getGitHubData} from "../../getData";
import dayjs from "dayjs";

const startData = new Date('2022-01-03T00:00:00')
const sevenDaysTime = 1000 * 60 * 60 * 24 * 7

const pickPerWeek = (data) => {
    const itemArray = []
    if(data) {
        const sortedData = data?.items.map(({created_at, html_url, title, id}) => ({
            created_at,
            html_url,
            title,
            id
        })).sort(({created_at: prevCreatedAt}, {created_at: nextCreatedAt}) => new Date(prevCreatedAt) - new Date(nextCreatedAt))
        for (let i = 0; i < 52; i++) {
            const startWeekDay = startData.getTime() + sevenDaysTime * i;
            const endWeekDay = startData.getTime() + sevenDaysTime * (i + 1)
            const filteredData = sortedData?.filter(({created_at}) => {
                const createDate = new Date(created_at).getTime()
                return createDate >= startWeekDay && createDate < endWeekDay
            })

            if (filteredData.length > 0)
                itemArray.push({
                    period: `${dayjs(startWeekDay).format('YYYY-MM-DD')} ~ ${dayjs(endWeekDay).format('YYYY-MM-DD')}`,
                    data: filteredData
                })

        }
    }


    return itemArray.length <= 0 ? null : {totalCount: data.total_count,item: itemArray}
}

export function useGetGitHubPR(
    yourName, repoName, gitToken,
    options,
) {
    return useQuery(
        [yourName, repoName, gitToken, 'PR'],
        () => getGitHubData(yourName, repoName, gitToken, 'PR'),
        {staleTime: Infinity,
            select: pickPerWeek,
            ...options},
    )
}

export function useGetGitHubReview(
    yourName, repoName, gitToken,
    options,
) {
    return useQuery(
        [yourName, repoName, gitToken, 'REVIEW'],
        () => getGitHubData(yourName, repoName, gitToken, 'REVIEW'),
        {staleTime: Infinity,
            select: pickPerWeek,
            ...options},
    )
}