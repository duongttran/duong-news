let newsList = [];
let page = 1;
let defaultImage = 'img/default-img.jpg';
let category = 'vietnam';

const apiKey = "a037dc639f444558a7383916f4a0eeb7";

const loadNews = async(status) => {
    let url = `https://newsapi.org/v2/everything?q=${category}&page=${page}&from=2020-05-20&apiKey=${apiKey}`;

    let data = await fetch(url);
    let result = await data.json();



    if (status === 'firstload' || status === 'keyword') {
        newsList = result.articles;
        render(newsList);
    } else if (status === 'loadmore') {
        let dataList = result.articles;
        newsList = newsList.concat(dataList);
        //console.log("what we get here", result);
        render(newsList);
    }


}

//let newsType = document.getElementById("newsCategory").value;

function changeNewsCategory() {
    let newsType = document.getElementById("newsCategory").value;
    category = newsType;
    document.getElementById("displayNewsCategory").innerHTML = `${newsType}`

    console.log(category);
    loadNews('keyword');
}

const render = (list) => {
    console.log("you call render and you have list", list)
    document.getElementById("noOfNews").innerHTML = list.length;

    let newsHtml = list.map(item => `<div id="news">
    <div id="contentsArea">
    <div id="imgArea">
  
<img src=${returnImg(item.urlToImage)}>
</div>
    <h3 id="title">
   ${item.title}
    </h3>
    <div id="source"> ${item.source.name}</div>
    <div id="publishedAt">${moment(item.publishedAt).fromNow()}</div>
    <a href="${item.url}" target="_blank">Read more</a>
</div>
</div>`).join('')
        //console.log(`what is news html`)
    document.getElementById('newsArea').innerHTML = newsHtml
}


function loadMore() {
    page++;
    loadNews('loadmore');
}

loadNews('firstload');

let returnImg = (imgLink) => {
    if (imgLink == null) {
        imgLink = `img/default-img.jpg`;
    }
    return imgLink;

}