import {httpGet} from "./api";

const HACKERNEWS_API_URL = "https://hacker-news.firebaseio.com/v0";

export function getTopStories() {
    const url = generateUrl(`topstories.json`);

    return httpGet(url).then(ids => {
        const promises = [];

        ids.map(id => {
            promises.push(getItem(id));
        });

        return Promise.all(promises)
            .then(stories => {
                return stories.sort((a, b) => {
                    return b.score - a.score;
                });
            });
    });
}

export function getItem(id) {
    const url = generateUrl(`item/${id}.json`);
    return httpGet(url);
}

function generateUrl(endpoint) {
    return `${HACKERNEWS_API_URL}/${endpoint}`;
}
