const getURL = (yourName, repoName, gitToken, type, page) => {
    return type === 'PR' ? `https://api.github.com/search/issues?per_page=100&page=${page}&q=repo:ground-x/${repoName}+is:pr+author:${yourName}+created:>=2022-01-01` : `https://api.github.com/search/issues?per_page=100&page=${page}&q=repo:ground-x/${repoName}+is:pr+commenter:${yourName}+created:>=2022-01-01`
}

export const getGitHubData = async (yourName, repoName, gitToken, type) => {
    let page = 1;
    let result = []
    let totalCount = 0;

    while(true) {
        const data = await fetch(getURL(yourName, repoName, gitToken, type, page), {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${gitToken}`
            }
        })
        const parsedData = await data.json();
        totalCount = parsedData.total_count;
        result = [...result, ...parsedData.items]
        if(result.length >= totalCount || page >= 10) break;
        page++;
    }

    return {total_count: totalCount, items: result}
}