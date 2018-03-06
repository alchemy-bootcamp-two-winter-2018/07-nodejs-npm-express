'use strict';

const template = Handlebars.compile($('#article-template').html());

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);
}

Article.prototype.toHtml = function() {
  return template(this);
};

Article.load = articleData => {
  const articles = [];
  articleData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
  articleData.forEach(articleObject => articles.push(new Article(articleObject)));
  return articles;
};
