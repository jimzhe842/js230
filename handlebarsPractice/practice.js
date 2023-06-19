let post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: '<em>Sed ut perspiciatis unde omnis iste</em> natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  tags: ['foo', 'tag', 'latin', 'article', 'template']
};

let post2 = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: '<em>Sed ut perspiciatis unde omnis iste</em> natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
}

let posts = [post, post2];

$(function() {
  let $template = $('#post');
  let $tagPartial = $('#tag');
  let postTemplate = Handlebars.compile($template.html());
  Handlebars.registerPartial('tag', $tagPartial.html());  
  $('body').append(postTemplate({posts}));
});