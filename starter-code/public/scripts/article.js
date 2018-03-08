'use strict';

const template = Handlebars.compile($('#article-template').html());

function Article (Obj) {
  this.author = Obj.author;
  this.authorUrl = Obj.authorUrl;
  this.title = Obj.title;
  this.category = Obj.category;
  this.body = Obj.body;
  this.publishedOn = Obj.publishedOn;
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
