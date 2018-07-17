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

allLinkBtn.addEventListener('click', () => {
    if (getCategory('all')){
        mainFeed.remove();
    }
});

