import {useState} from "react";
import {useGetGitHubPR, useGetGitHubReview} from "./hooks/queries/useGetGitHubAPI";
import List from "./List";
import styled from "styled-components";

const RainBoard = () => {
    const [targetData, setTargetData] = useState('PR')
    const [repoName, setRepoName] = useState('')
    const [yourName, setYourName] = useState('')
    const [gitToken, setGitToken] = useState('')
    const {data: prData, refetch: refetchPRData, isFetching: prFetching} = useGetGitHubPR(yourName, repoName, gitToken, {enabled: false})
    const {
        data: reviewData,
        refetch: refetchReviewData,
        isFetching: reviewFetching
    } = useGetGitHubReview(yourName, repoName, gitToken, {enabled: false})

    console.log('prFetching', prFetching)
    console.log('reviewFetching', reviewFetching)
    const renderList = () => {
        const target = targetData === 'PR' ? prData : reviewData
        return (
            <>
                <TotalCount>총 {target?.totalCount}개</TotalCount>
                {target?.item.map((prData) => <List key={prData.period} {...prData} />)}
            </>
        )
    }

    const setPRData = () => {
        if (!prData) refetchPRData()
        setTargetData('PR')
    }

    const setReviewData = () => {
        if (!reviewData) refetchReviewData()
        setTargetData('REVIEW')
    }

    return (
        <>
            <InputWrapper>
                <InputTitle>REPO NAME</InputTitle>
                <Input value={repoName} onChange={(e) => setRepoName(e.target.value)}/>
            </InputWrapper>
            <InputWrapper>
                <InputTitle>YOUR NAME</InputTitle>
                <Input value={yourName} onChange={(e) => setYourName(e.target.value)}/>
            </InputWrapper>
            <InputWrapper>
                <InputTitle>GIT TOKEN</InputTitle>
                <Input value={gitToken} onChange={(e) => setGitToken(e.target.value)}/>
            </InputWrapper>
            <ButtonWrapper>
                <Button disabled={prFetching || reviewFetching} onClick={setPRData}>GET PR DATA</Button>
                <Button disabled={prFetching || reviewFetching} onClick={setReviewData}>GET REVIEW DATA</Button>
            </ButtonWrapper>
            <ListWrapper>
                {renderList()}
            </ListWrapper>
        </>
    )
}

export default RainBoard


const InputWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`

const InputTitle = styled.span`
`

const Input = styled.input``

const ButtonWrapper = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 20px;
`

const Button = styled.button``

const TotalCount = styled.span`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`