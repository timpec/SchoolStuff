'use strict';

const frm = document.querySelector('#mediaform');
const sFrm = document.querySelector('#searchform');
const updatefrm = document.querySelector('#updateform');
const dFrm = document.querySelector('#deleteform');
const list = document.querySelector('#imagelist');

const fillUpdate = (image) => {
  console.log(image);
  document.querySelector('#updateform input[name=idM]').value = image.idM;
  document.querySelector('#updateform input[name=title]').value = image.title;
  document.querySelector('#updateform button').removeAttribute('disabled');
};
const fillDelete = (image) => {
  console.log(image);
  document.querySelector('#deleteform input[name=idM]').value = image.idM;
  document.querySelector('#deleteform button').removeAttribute('disabled');
};

const getImages = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // clear list before adding upated data
    list.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const title = document.createElement('h3');
      title.innerHTML = image.title;
      li.appendChild(title);
      const img = document.createElement('img');
      img.src = 'thumbs/' + image.thumbnail;
      img.addEventListener('click', () => {
        fillUpdate(image);
        fillDelete(image);
      });
      li.appendChild(img);
      list.appendChild(li);
    });
  });
};

const searchImages = (evt) => {
    evt.preventDefault();
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    list.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const title = document.createElement('h3');
      title.innerHTML = image.title;
      li.appendChild(title);
      const img = document.createElement('img');
      img.src = 'thumbs/' + image.thumbnail;
      img.addEventListener('click', () => {
        fillUpdate(image);
        fillDelete(image);
      });
      li.appendChild(img);
      list.appendChild(li);
    });
  });
};
/*
const searchForm = (evt) => {
  evt.preventDefault();
  fetch('/upload', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    searchImages();
  });
};
*/
const sendForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };
  fetch('/upload', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    getImages();
  });
};

/*
const deleteData = (evt) => {
  evt.preventDefault();
  console.log('delete painettu');
  const settings = {
    method: 'post',
  };
  fetch('/delete', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    getImages();
  });
};
*/

/*
const sendUpdate = (evt) => {
  evt.preventDefault();
  const fd = new FormData(updatefrm);
  const settings = {
    method: 'post',
    body: fd,
  };
  // app.patch('/images'.... needs to be implemented to index.js (remember body-parser)
  fetch('/update', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // update list
    getImages();
  });
};
*/

frm.addEventListener('submit', sendForm);
//sFrm.addEventListener('submit', searchImages);

getImages();
