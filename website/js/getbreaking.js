var xhr_break = new XMLHttpRequest();
xhr_break.open('GET', "https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b", true);
xhr_break.send();

xhr_break.onreadystatechange = process_request_break;

function process_request_break() {
    if (xhr_break.readyState == 4 && xhr_break.status == 200) {

        var num;
        var data = JSON.parse(xhr_break.responseText);
        var num_articles = 3

        /*console.log(data.articles);*/

        for (num = 0; num < num_articles; num++) {
            var article = {
                'title': (data.articles[num].title),
                'author': (data.articles[num].author),
                'content': (data.articles[num].content),
                'imageurl': (data.articles[num].urlToImage),
                'url': (data.articles[num].url)
            }

            var article_title_html = document.createElement("a");
            article_title_html.className = "breaking_article_title"
            var article_title_node = document.createTextNode(article.title);
            article_title_html.appendChild(article_title_node);

            var article_author_html = document.createElement("a");
            article_author_html.className = "breaking_article_author"
            var article_author_node = document.createTextNode(article.author);
            article_author_html.appendChild(article_author_node);

            var article_content_html = document.createElement("p");
            article_content_html.className = "breaking_article_content"
            var article_content_node = document.createTextNode(article.content);
            article_content_html.appendChild(article_content_node);

            var article_imageurl_html = document.createElement("img");
            article_imageurl_html.className = "breaking_article_img"
            article_imageurl_html.src = article.imageurl;

            var article_url_html = document.createElement("a");
            article_url_html.className = "breaking_article_url"
            article_url_html.href = article.url
            var article_url_node = document.createTextNode(article.url);
            article_url_html.appendChild(article_url_node);

            var article_div = document.createElement("li");
            article_div.appendChild(article_title_html);
            article_div.appendChild(article_author_html);
            article_div.appendChild(article_content_html);
            article_div.appendChild(article_imageurl_html);
            article_div.appendChild(article_url_html);

            var article_html = document.getElementById("breaking_news");
            article_html.appendChild(article_div);
        }    
    }
}   