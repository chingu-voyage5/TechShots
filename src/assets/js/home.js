const d = document;
const http = new XMLHttpRequest();

const likeElems = d.getElementsByClassName('like-action');

const likeAction = (e) => {
    http.open('POST', 'like', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200){
            alert(http.responseText);
        }
    }
    http.send('id='+e.target.id);
};

// attaching click event listener for each element
for (let i = 0; i < likeElems.length; i++){
    likeElems[i].addEventListener('click', likeAction, false);
}