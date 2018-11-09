// Create function 'showImages' which
// loads images.json which has links to images as an array.

// create a loop which builds the following HTML from every image in the array: 
/*
<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>
*/
// Make the above HTML by using DOM methods.
// Create elements with createElement()
// Add attributes with setAttribute()
// Add elements with appendChild
// When the above HTML is ready append it to the <ul> element

const showImages = (images) => {
    const ul = document.querySelector('ul');
    images.forEach((image) =>{

        const li = document.createElement('li');
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const h3 = document.createElement('h3');
        const a = document.createElement('a');
        const img = document.createElement('img');

        h3.innerText = image.mediaTitle;
        li.appendChild(figure);
        figure.appendChild(a);
        figure.appendChild(figcaption);
        figcaption.appendChild(h3);
        a.appendChild(img);

        img.setAttribute('src', `img/thumbs/${image.mediaThumb}`);
        ul.appendChild(li);

    });
};
        
fetch('images.json').then((response) =>{
    return response.json();
}).then((json) => {
    showImages(json);
});

