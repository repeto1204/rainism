export const getGithubPRData = async (yourName, repoName, gitToken) => {
    const data = await fetch(`https://api.github.com/search/issues?q=repo:ground-x/${repoName}+is:pr+author:${yourName}+created:>=2022-01-01`, {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${gitToken}`
        }
    })
    return await data.json();
}

export const getGithubReviewData = async (yourName, repoName, gitToken) => {
    const data = await fetch(`https://api.github.com/search/issues?q=repo:ground-x/${repoName}+is:pr+reviewed-by:${yourName}+created:>=2022-01-01`, {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${gitToken}`
        }
    })
    return await data.json();
}

export const getGithubCommentData = async (yourName, repoName, gitToken) => {
    const data = await fetch(`https://api.github.com/search/issues?per_page=100&page=2&q=repo:ground-x/${repoName}+is:pr+commenter:${yourName}+created:>=2022-01-01`, {
    // const data = await fetch(`https://api.github.com/repos/ground-x/klip-front/issues/3560/comments`, {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${gitToken}`
        }
    })
    return await data.json();
}