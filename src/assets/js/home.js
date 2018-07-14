const hearts = document.querySelectorAll('.heart');

hearts.forEach(heart => {
  heart.addEventListener('click', (e) => {
    const thePost = e.target.getElementsByTagName('input');
    const postBody = {
        title: e.target.id,
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
    .then((info) => {
        console.log(info.likes)
        const actioned = document.getElementById(`like-${postBody.title}`);
        actioned.innerText = info.likes;
    })
    .catch(console.log)
    heart.classList.toggle('active');
  });
});

const filterButton = document.querySelector('.filter-btn');
const filters = document.querySelector('.filter-container');

filterButton.addEventListener('click', () => filters.classList.toggle('active'));