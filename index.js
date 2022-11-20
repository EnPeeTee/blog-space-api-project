const arrPosts = [];

function renderPosts() {
    let postHtml = ``;
    arrPosts[0].forEach( post => {
        postHtml += `   
        <div>
            <h3>Title: ${post.title}</h3> 
            <p> Body: ${post.body}</p>
        </div>`;
    });
    document.getElementById("container-posts").innerHTML = postHtml;
};

fetch("https://apis.scrimba.com/jsonplaceholder/posts/")
    .then( res => res.json() )
    .then( data => {
        arrPosts.push(data.slice( 0, 5 ));
        renderPosts();
    });

document.getElementById("post-new").addEventListener( "submit", e => {
    e.preventDefault();
    const postTitle = document.getElementById("post-title").value;
    const postBody = document.getElementById("post-body").value;
    const postFormData = {
        title: postTitle,
        body: postBody
    };
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts/", 
        {method: "POST", 
        body: JSON.stringify(postFormData),
        headers: {"Content-Type": "application/json"}}
        )
        .then( res => res.json() )
        .then( post => {
            arrPosts[0].unshift(post);
            renderPosts(); 
        });

    document.getElementById("post-new").reset();
});