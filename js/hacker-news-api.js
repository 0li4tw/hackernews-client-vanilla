import {httpGet} from "./api";

const HACKERNEWS_API_URL = "https://hacker-news.firebaseio.com/v0";
const STORIES_PER_PAGE = 30;

export function getTopStories(page = 1) {
    const url = generateUrl(`topstories.json`);
    const offset = (page - 1) * STORIES_PER_PAGE;
    const limit = offset + STORIES_PER_PAGE;

    return httpGet(url).then(ids => {
        const promises = [];
        ids = ids.slice(offset, limit);

        ids.map(id => {
            promises.push(getItem(id));
        });

        return Promise.all(promises);
    });
}

export function getItem(id) {
    const url = generateUrl(`item/${id}.json`);
    return httpGet(url);
}

export function getItemWithComments(id) {
    return getItem(id)
        .then(traverseItemKids);
}

async function getAllKidsForItems(items) {
    for (let item of items) {
        await traverseItemKids(item);
    }

    return items;
}

export async function getAllKidsForItem(item) {
    await traverseItemKids(item);
    return item;
}

async function traverseItemKids(item) {
    const promises = [];

    if (item.hasOwnProperty('kids')) {
        item.kids.map(id => {
            promises.push(getItem(id));
        });

        item.comments = await Promise.all(promises);

        await getAllKidsForItems(item.comments);
    }
}

function generateUrl(endpoint) {
    return `${HACKERNEWS_API_URL}/${endpoint}`;
}
