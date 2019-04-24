import { getTopStories } from "../hacker-news-api";
import * as moment from "moment";

export class NewsList {
  constructor(elemId) {
    this.topStories = [];
    this.elem = document.querySelector("#" + elemId);
    this.init();
  }

  init() {
    getTopStories().then(stories => {
      this.topStories = stories;
      this.render();
    });
  }

  getDateForStory(story) {
      return moment.unix(story.time).fromNow();
  }

  renderItems() {
    let html = "";

    for (let story of this.topStories) {
      html += `
            <li id="story-{$story.id}" class="news-list__item">
            <h3><a href="#" class="news-list__link" title="${story.title}" data-id="${story.id}">${story.title}</a></h3>
                <div class="news-list__item-details">
                    ${story.score} points | by ${story.by} | ${this.getDateForStory(story)} | ${story.descendants} comments
                </div>
            </li>
            `;
    }

    return html;
  }

  render() {
    this.elem.innerHTML = `
            <ol class="news-list__list">
                ${this.renderItems()}
            </ol>
        `;
  }
}
