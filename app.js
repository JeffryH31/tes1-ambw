    var deferredPrompt;
    window.addEventListener('beforeinstallprompt', function (event) {
        console.log('beforeinstallprompt fired');
        event.preventDefault();
        deferredPrompt = event;
        return false;
    });
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(posts => {
            const postContainer = document.getElementById("posts");
            console.log(posts);
            postContainer.innerHTML = posts.slice(0, 10).map(post => `
                    <div class="card max-w-2xl max-sm:w-full">
                        <div class="p-4">
                            <h2 class="font-semibold text-2xl text-justify mb-2 max-sm:text-xl">${post.title}</h2>
                            <p class="text-justify">${post.body}</p>
                        </div>
                        <p class="mt-4 p-4 border-t border-white">Post ID: ${post.id}</p>
                    </div>
                `).join('');
        })
        .catch(() => console.log("Failed to fetch posts"));
