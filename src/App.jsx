import styled from "styled-components";
import {getGithubPRData, getGithubReviewData, getGithubCommentData} from './getData'
import {PR_DATA, REVIEW_DATA, COMMENT_DATA} from './data'
import {useEffect, useState} from "react";

function App() {
    const [repoName, setRepoName] = useState('')
    const [yourName, setYourName] = useState('')
    const [gitToken, setGitToken] = useState('')
    console.log(PR_DATA)
    console.log(REVIEW_DATA)
    console.log(COMMENT_DATA)

    useEffect(() => {
        console.log(COMMENT_DATA.items.reduce((acc,cur) => acc + cur.comments, 0))
        console.log(COMMENT_DATA.items.map(({comments}) => comments))
    }, [COMMENT_DATA])


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
                <Button onClick={() => getGithubPRData(yourName, repoName, gitToken)}>GET PR DATA</Button>
                <Button onClick={() => getGithubReviewData(yourName, repoName, gitToken)}>GET REVIEW DATA</Button>
                <Button onClick={() => getGithubCommentData(yourName, repoName, gitToken)}>GET COMMENT DATA</Button>
            </ButtonWrapper>
            <CalendarWrapper>
                <WeekCalendar type={'week'} min={"2022-W01"} max={"2022-W52"} onChange={(e) => console.log(e)} />
            </CalendarWrapper>
        </>
    )
}

export default App;

const InputWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const InputTitle = styled.span`
`

const Input = styled.input``

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
`

const Button = styled.button``

const CalendarWrapper = styled.div``

const WeekCalendar = styled.input``