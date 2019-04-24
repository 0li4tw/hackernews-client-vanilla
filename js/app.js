import {getAllKidsForItem, getItem} from "./hacker-news-api";
import {NewsList} from "./components/news-list";

const newsList = new NewsList('news-list');

/**
 * Sorry guys, I ran out of time and wanted to show the comments loading working.
 * Click on a title then check the console to see the item with all comments loaded.
 */
$('body').on('click', '.news-list__link', (e) => {
   e.preventDefault();
   const id = $(e.target).data('id');
   getItem(id)
      .then(item => {
          getAllKidsForItem(item)
             .then(console.log);
   })
});