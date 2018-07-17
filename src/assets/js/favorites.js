const hearts = document.querySelectorAll('.heart');

hearts.forEach(heart => {
  heart.addEventListener('click', (e) => {
    const thePost = e.target.getElementsByTagName('input');
    likeThePost(e.target.id, thePost)
    .then((info) => {
        console.log(info.likes)
        const actioned = document.getElementById(`like-${e.target.id}`);
        actioned.innerText = info.likes;
    })
    .catch(console.log)
    heart.classList.toggle('active');
  });
});

const filterButton = document.querySelector('.filter-btn');
const filters = document.querySelector('.filter-container');

filterButton.addEventListener('click', () => filters.classList.toggle('active'));

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
        const favFeed = document.createElement('div');
        favFeed.className = 'feed';
        posts.forEach((post) => {
            const insertedFavs = insertPosts(favFeed, post, excludeFavPost);
            insertedFavs.className = 'heart active';
        
        });
        document.getElementsByClassName('category')[0].appendChild(favFeed);
    })
    .catch(console.log)
};


const favsClicked = () => {
    if (getCategory('fav')){
        getFavs();
        document.getElementsByClassName('feed')[0].remove();
    }    
};

favorites.addEventListener('click', favsClicked);