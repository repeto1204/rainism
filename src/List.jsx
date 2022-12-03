import styled from "styled-components";

const List = ({period, data}) => {
    return (
        <ListWrapper>
            <Title>{period} / {data.length}개</Title>
            {data.map(({id, html_url, title}) => <a key={id} href={html_url} target={"_blank"} rel="noreferrer">{title}</a>)}
        </ListWrapper>
    )
}

export default List

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
`
