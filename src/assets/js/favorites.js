const favorites = document.getElementById('favorites-btn');

const getFavs = () => {
    fetch(
        'favorites',
        {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({faaa: 'dd'}),
            headers: {
                'Content-Type': 'application/json'
            } 
        }
    )
    .then((res) => res.json())
    .then((all) => {
        return all.favs;
    })
    .then((posts) => {
        const favFeed = document.createElement('div');
        favFeed.className = 'feed';

        const excludeFavPost = (element) => {
            // make a request that will exclude the post
            fetch(
                'like',
                {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(
                        { title: element.target.id }
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                }
            )
            .then(() => {
                setTimeout(() => {
                    // removing post represantion from DOM
                    element.target.parentElement.parentElement.parentElement.remove();
                }, 1500);

                element.target.classList.remove('active');
                const postLikes = document.getElementById('like-' + element.target.id);
                postLikes.innerText -= 1;
            })
            .catch(console.log)

        };
        
        posts.forEach((post) => {
            const feedCard = document.createElement('div');
            feedCard.className = 'feed-card primary'
            
            favFeed.appendChild(feedCard);
            
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
            heart.className = 'heart active';
            heart.id = post.title;
            heart.addEventListener('click', excludeFavPost);
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

            const mainFeed = document.getElementsByClassName('feed')[0];
            mainFeed.remove();

            document.getElementsByClassName('category')[0].appendChild(favFeed);
        });

    })
    .catch(console.log)
};

favorites.addEventListener('click', getFavs)