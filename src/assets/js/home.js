// account block
const accountButton = document.querySelector('.account-btn');
const account = document.querySelector('.account-container');

accountButton.addEventListener('click', () => account.classList.toggle('active'));

// log out
const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    window.location.replace('/');
}

document.getElementById('logout-btn').addEventListener('click', logout, false);

// feed
const mainFeed = document.getElementsByClassName('feed')[0];

const allLinkBtn = document.getElementById('all-posts-btn');
const favLinkBtn = document.getElementById('favorites-btn')

const changeCategories = (all, fav) => {
    return function(clicked){
        if (clicked === 'all' && !all.classList.contains('active')){
            fav.classList.remove('active');
            all.classList.add('active');
            return true;
        } else if (clicked === 'fav' && !fav.classList.contains('active')){
            all.classList.remove('active');
            fav.classList.add('active');
            return true;       
        }
        return false;
    };
    
};

const getCategory = changeCategories(allLinkBtn, favLinkBtn);

const insertPosts = (newsFeed, post, favAction) => {
    const feedCard = document.createElement('div');
            
    feedCard.className = 'feed-card primary'
    
    newsFeed.appendChild(feedCard);
    
    const feedImageContainer = document.createElement('div');
    feedImageContainer.className = 'feed-image-container'; 
    const postImg = document.createElement('img');
    postImg.src = post.urlToImage;
    feedImageContainer.appendChild(postImg);
    
    feedCard.appendChild(feedImageContainer);
    
    const feedDetails = document.createElement('div');
    feedDetails.className = 'feed-details';
    const postSrc = document.createElement('p');
    postSrc.className = 'post-src';
    feedDetails.appendChild(postSrc);
    const sourceImg = document.createElement('img');
    sourceImg.src = '/tc.jpg';
    postSrc.appendChild(sourceImg);
    const postUrl = document.createElement('a');
    postUrl.className = 'post-link';
    postUrl.target = 'blank';
    postUrl.href = post.source;
    const postTitle = document.createElement('h3');
    postTitle.className = 'post-title';
    postTitle.innerText = post.title;
    postUrl.appendChild(postTitle);
    feedDetails.appendChild(postUrl);
    
    const postDesc = document.createElement('p');
    postDesc.className = 'post-desc';
    postDesc.innerHTML = post.description;
    feedDetails.appendChild(postDesc);
    
    const hr = document.createElement('hr');
    feedDetails.appendChild(hr);
    
    const postBtns = document.createElement('div');
    postBtns.className = 'post-btns';
    feedDetails.appendChild(postBtns);
    
    const heart = document.createElement('span');
    heart.id = post.title;
    heart.addEventListener('click', favAction);
    postBtns.appendChild(heart);
    
    const hiddenData = document.createElement('span');
    hiddenData.style.display = 'none';
    heart.appendChild(hiddenData);
    
    const postData = [
        { id: 'description', value: post.description },
        { id: 'urlToImage', value: post.urlToImage },
        { id: 'source', value: post.source }
    ];
    
    postData.forEach((item) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = item.id;
        input.defaultValue = item.value;
        hiddenData.appendChild(input)
    });
    
    const label = document.createElement('span');
    label.className = 'label'
    label.id = 'like-' + post.title;
    const postLikes = document.createTextNode(post.likes);
    label.appendChild(postLikes);
    postBtns.appendChild(label);
    
    const eye = document.createElement('span');
    eye.className = 'eye';
    postBtns.appendChild(eye);
    
    const label2 = document.createElement('span');
    label2.className = 'label'
    const postViews = document.createTextNode(post.views);
    label2.appendChild(postViews);
    postBtns.appendChild(label2);
    
    feedCard.appendChild(feedDetails);
    
    const clearFix = document.createElement('div');
    clearFix.className = 'clearfix'
    feedCard.appendChild(clearFix);

    return heart; // in order to attach right icon
};

const likeThePost = (title, thePost) => {
    return new Promise((resolve, reject) => {
        const postBody = {
            title,
            description: thePost.description.value,
            urlToImage: thePost.urlToImage.value,
            source: thePost.source.value
        };
        fetch(
            'like', 
            {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(postBody),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
    
};

const loadNews = (page = 1) => {
    return new Promise((resolve, reject) => {
        fetch(
            'posts',
            {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ page }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((res) => res.json())
        .then((posts) => {
            const newsFeed = document.createElement('div');
            newsFeed.className = 'feed';
            posts.articles.forEach((post) => {
                const likeBtn = insertPosts(newsFeed, post);
                likeBtn.className = 'heart ' + post.liked;
                likeBtn.addEventListener('click', (e) => {
                    const thePost = e.target.getElementsByTagName('input');
                    likeThePost(e.target.id, thePost)
                        .then((info) => {
                            const actioned = document.getElementById(`like-${e.target.id}`);
                            actioned.innerText = info.likes;
                            likeBtn.classList.toggle('active');
                        });
                });
            });
            resolve(newsFeed) // return new news feed;
            
        })
        .catch(reject)
    });

    
}; 

allLinkBtn.addEventListener('click', () => {
    if (getCategory('all')){
        loadNews()
            .then((newsFeed) => {
                // remove current news feed
                document.getElementsByClassName('feed')[0].remove();
                // insert new parsed news
                document.getElementsByClassName('category')[0].appendChild(newsFeed);
                nextPage.reset();
                paginator.style.display = 'inline-block';
            })
            .catch(console.log);
    }
});

// paginator
const nextPage = (() => {
    let page = 1;
    
    return {
        go: () => {
            page += 1;
            loadNews(page)
                .then((feed) => {
                    document.getElementsByClassName('feed')[0].appendChild(feed);
                })
                .catch(console.log)
        },
        reset: () => page = 1
    };
        
})();

const paginator = document.getElementById('load-more');
paginator.addEventListener('click', nextPage.go);
