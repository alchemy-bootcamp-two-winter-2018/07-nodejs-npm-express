/* globals Article */
'use strict';

const articleView = {};

articleView.populateFilters = () => {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = () => {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

// COMMENTed: When/where is this function invoked? What event ultimately triggers its execution? Explain the sequence of code execution when this function is invoked.
// This function is called at the very end of the body of new.html, which means it runs when the page has loaded. The only thing that really happens at that point, however, is that everything with a class of "tab-content" gets displayed. The remaining two functions are event listeners, and they run when the form is altered or submitted.
articleView.initNewArticlePage = () => {
  $('.tab-content').show();
  $('#new-form').on('change', 'input, textarea', articleView.preview);
  $('#new-form').on('submit', articleView.submit);
};

articleView.fetchAll = () => {
  if (localStorage.rawData) {
    articleView.loadArticles(JSON.parse(localStorage.rawData));
    articleView.setupView();
  } else {
    // TODOne update me to work with actual new server path
    $.getJSON('/api/articles')
      .then(data => {
        // store the data for next time!
        localStorage.rawData = JSON.stringify(data);
        articleView.loadArticles(data);
        articleView.setupView();
      }, err => {
        console.error(err);
      });
  }
};

articleView.loadArticles = rawData => {
  const articles = Article.loadAll(rawData);
  articles.forEach(article =>{
    $('#articles').append(article.toHtml());
  });
};

articleView.getFormData = () => {
  return {
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    body: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? new Date() : null
  };
};

// COMMENTed: When is this function called? What event ultimately triggers its execution?
// This function is a form event handler. It gets called when the form "hears" a change event in an input or textarea element.
articleView.preview = () => {
  let article;
  $('#articles').empty();

  const formData = articleView.getFormData();
  article = new Article(formData);

  $('#articles').append(article.toHtml());
  $('.read-on').hide();
};

// COMMENTed: When is this function called? What event ultimately triggers its execution?
// This function is a form event handler. It gets called when the form "hears" a submit event.
articleView.submit = event => {
  event.preventDefault();
  // TODOne: Extract the getDataFrom form from the preview, so you can
  // use it here to get the raw data!
  const formData = articleView.getFormData(); // Call the raw data method
  // COMMENTed: Where is this function defined? When is this function called? 
  // What event ultimately triggers its execution?
  // The function below is part of the submit method, so it's called when the form is submitted. It's defined in the next code block.
  articleView.insertRecord(formData);
};


// REVIEW: This new prototype method on the Article object constructor will allow us to create a new article from the new.html form page, and submit that data to the back-end. We will see this log out to the server in our terminal!
articleView.insertRecord = formData => {
  // TODOne: POST the article to the server
  $.post('/api/articles', formData);
  // when the save is complete, console.log the returned data object
  console.log(formData);

  // STRETCHed: pick one that happens _after_ post is done:
  // 1) clear the form, so user can input a new one
  $('form')[0].reset();
  // 2) navigate to the index page
  // (HINT: use: `window.location = <url>`)
};

articleView.setupView = () => {
  // 3) after the data is loaded this function will be called
  //    to finishing setting up the view!
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.setTeasers();
};

articleView.initIndexPage = () => {
  // 1) initiate data loading
  articleView.fetchAll();
  // 2) do setup that doesn't require data being loaded
  articleView.handleMainNav();
};
