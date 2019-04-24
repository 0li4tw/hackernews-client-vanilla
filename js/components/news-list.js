import { getTopStories } from "../hacker-news-api";

export class NewsList {
  constructor(elemId) {
    this.topStories = [];
    this.elem = document.querySelector("#" + elemId);
    this.init();
  }

  init() {
    getTopStories().then(stories => {
      this.topStories = [stories]; //TODO: REMOVE ARRAY
      this.render();
    });
  }

  renderItems() {
    let html = "";

    for (let story of this.topStories) {
      html += `
            <li class="news-list__item">
            <h3><a href="${story.url}" title="${story.title}">${story.title}</a></h3>
                <div class="news-list__item-details">
                    ${story.score} points
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
