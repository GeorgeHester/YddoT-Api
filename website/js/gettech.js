var xhr = new XMLHttpRequest();
xhr.open('GET', "https://yddot-api.herokuapp.com/api/newstech", true);
xhr.send();

xhr.onreadystatechange = process_request;

function process_request() {
    if (xhr.readyState == 4 && xhr.status == 200) {

        var num;
        var data = JSON.parse(xhr.responseText);
        var num_articles = 2

        for (num = 0; num < num_articles; num++) {
            var article = {
                'title': (data.articles[num].title),
                'author': (data.articles[num].author),
                'content': (data.articles[num].content),
                'imageurl': (data.articles[num].urlToImage),
                'url': (data.articles[num].url)
            }

            var article_title_html = document.createElement("a");
            article_title_html.className = "tech_article_title"
            var article_title_node = document.createTextNode(article.title);
            article_title_html.appendChild(article_title_node);

            var article_author_html = document.createElement("a");
            article_author_html.className = "tech_article_author"
            var article_author_node = document.createTextNode(article.author);
            article_author_html.appendChild(article_author_node);

            var article_content_html = document.createElement("p");
            article_content_html.className = "tech_article_content"
            var article_content_node = document.createTextNode(article.content);
            article_content_html.appendChild(article_content_node);

            var article_imageurl_html = document.createElement("img");
            article_imageurl_html.className = "tech_article_img"
            article_imageurl_html.src = article.imageurl;

            var article_url_html = document.createElement("a");
            article_url_html.className = "tech_article_url"
            article_url_html.href = article.url
            var article_url_node = document.createTextNode(article.url);
            article_url_html.appendChild(article_url_node);

            var article_div = document.createElement("li");
            article_div.appendChild(article_title_html);
            article_div.appendChild(article_author_html);
            article_div.appendChild(article_content_html);
            article_div.appendChild(article_imageurl_html);
            article_div.appendChild(article_url_html);

            var article_html = document.getElementById("tech_news_1");
            article_html.appendChild(article_div);
        }    
    }
}  