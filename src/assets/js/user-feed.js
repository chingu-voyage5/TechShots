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


  const allLinkBtn = document.getElementById('all-posts-btn');
  const favLinkBtn = document.getElementById('favorites-btn');
  const getCategory = changeCategories(allLinkBtn, favLinkBtn);
  
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