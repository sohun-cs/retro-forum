let count = 0;


const loadPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;

    displayPosts(posts);


}


const displayPosts = (posts) => {

    const postsContainer = document.getElementById('post-container');

    posts.forEach(post => {

        const postCard = document.createElement('div');

        postCard.classList = 'flex flex-col lg:flex-row items-center lg:items-start bg-gray-100 rounded-lg lg:rounded-3xl p-2 lg:p-10 lg:gap-10 lg:col-span-2';

        const title = post.title;
        const category = post.category;
        const authorName = post.author.name;
        const description = post.description;
        const comments = post.comment_count;
        const views = post.view_count;
        const posted = post.posted_time;
        const activeStatus = post.isActive;


        if (activeStatus) {

            postCard.innerHTML = `
        
                <div class="m-2">
                    <div class="indicator">
                        <span id="active-status" class="indicator-item badge bg-[#3eff2d]"></span>
                        <div><img src="images/icons/Rectangle 4.png" alt=""></div>
                    </div>
                </div>
                
                
                <div class="space-y-3 lg:w-full">
                    <div>
                        <p class="font-semibold text-sm">#${category} &nbsp; &nbsp; Author: ${authorName}
                        </p>
                    </div>
                    <h3 class="font-bold text-xl">${title}</h3>
                    <p>${description}</p>
                    <hr class="decoration-dashed">
                    <div class="flex justify-between items-center p-1">
                        <div class="flex justify-between lg:min-w-80 gap-2">
                            <div class="flex justify-around items-center gap-1">
                                <img src="images/icons/Group 13.png" alt="">
                                <p>${comments}</p>
                            </div>
                            <div class="flex justify-around items-center gap-2">
                                <img src="images/icons/tabler-icon-eye.png" alt="">
                                <p>${views}</p>
                            </div>
                            <div class="flex justify-around items-center gap-2">
                                <img src="images/icons/tabler-icon-clock-hour-9.png" alt="">
                                <p>${posted} min</p>
                            </div>
                        </div>
                        <div>
                            <img onclick="handleBookmark('${title.replace(/'/g, "\\'")}', '${views}')" class="hover:cursor-pointer" src="images/icons/Group 40106.png" alt="">
                        </div>
                    </div>
                </div>
            `
        }
        else {

            postCard.innerHTML = `
        
                <div class="m-2">
                    <div class="indicator">
                        <span id="active-status" class="indicator-item badge bg-[#ff4343]"></span>
                        <div><img src="images/icons/Rectangle 4.png" alt=""></div>
                    </div>
                </div>
            
            
                <div class="space-y-3 lg:w-full">
                    <div>
                        <p class="font-semibold text-sm">#${category} &nbsp; &nbsp; Author: ${authorName}
                        </p>
                    </div>
                    <h3 class="font-bold text-xl">${title}</h3>
                    <p>${description}</p>
                    <hr class="decoration-dashed">
                    <div class="flex justify-between items-center p-1">
                        <div class="flex justify-between lg:min-w-80 gap-2">
                            <div class="flex justify-around items-center gap-1">
                                <img src="images/icons/Group 13.png" alt="">
                                <p>${comments}</p>
                            </div>
                            <div class="flex justify-around items-center gap-2">
                                <img src="images/icons/tabler-icon-eye.png" alt="">
                                <p>${views}</p>
                            </div>
                            <div class="flex justify-around items-center gap-2">
                                <img src="images/icons/tabler-icon-clock-hour-9.png" alt="">
                                <p>${posted} min</p>
                            </div>
                        </div>
                        <div>
                            <img onclick="handleBookmark('${title.replace(/'/g, "\\'")}', '${views}')" class="hover:cursor-pointer" src="images/icons/Group 40106.png" alt="">
                        </div>
                    </div>
                </div>
            `

        }

        postsContainer.appendChild(postCard)

    });

    toggleLoadingSpinner(false);

}


const handleBookmark = (title, views) => {

    const bookmarkContainer = document.getElementById("bookmark-container");
    let bookmarkCountValue = document.getElementById("bookmark-count").innerHTML;

    let bookmarkCount = parseInt(bookmarkCountValue);

    let totalBookmark = bookmarkCount + count;

    document.getElementById("bookmark-count").innerHTML = totalBookmark;



    const bookmark = document.createElement('div');
    bookmark.classList = "flex justify-between items-center bg-white p-4 rounded-2xl my-4"

    bookmark.innerHTML = `
    
    <div>
        <h3 class="font-bold">
            ${title}
        </h3>
    </div>

    <div class="flex justify-around items-center gap-2">
        <img src="images/icons/tabler-icon-eye.png" alt="">
        <p>${views}</p>
    </div>

    `

    bookmarkContainer.appendChild(bookmark);

}

count++;

loadPosts();


// ============================== latest Post =================================

const loadLatestPosts = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const posts = data;
    displayLatestPosts(posts)

}


const displayLatestPosts = (posts) => {

    const cardContainer = document.getElementById('card-container');


    posts.forEach(post => {

        const latestPost = document.createElement('div')

        latestPost.classList = 'card lg:w-96 bg-base-100 shadow-xl m-2';


        latestPost.innerHTML = `
    
            <figure class="p-2 lg:px-10 pt-10">
                <img src="${post.cover_image}" alt="Shoes"
                    class="rounded-xl" />
            </figure>
            <div class="card-body space-y-2">
                <div class="flex items-center gap-4">
                    <img src="images/icons/Frame.png" alt="">
                    <p>${post.author?.posted_date || 'No Date'}</p>
                </div>
                <h2 class="card-title font-bold">${post.title}</h2>
                <p>${post.description}</p>
                <div class="flex items-center gap-5">
                    <img class="w-20 rounded-full" src="${post.profile_image}" alt="">
                    <div>
                        <h3 class="font-bold">${post.author.name}</h3>
                        <p>${post.author?.designation || 'Unknown'}</p>
                    </div>
                </div>
            </div>

        `

        cardContainer.appendChild(latestPost)


    })


}

loadLatestPosts()


// =============================== Search Result ================================

const loadSearch = async (search) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);

    const data = await res.json();
    const searchPosts = data.posts;
    displaySearchResult(searchPosts)

}

const displaySearchResult = (searchPosts) => {



    const postsContainer = document.getElementById('post-container');

    postsContainer.textContent = ''

    searchPosts.forEach(post => {

        const postCard = document.createElement('div');

        postCard.classList = 'flex flex-col lg:flex-row items-center lg:items-start bg-gray-100 rounded-lg lg:rounded-3xl p-2 lg:p-10 lg:gap-10 lg:col-span-2';

        const title = post.title;
        const category = post.category;
        const authorName = post.author.name;
        const description = post.description;
        const comments = post.comment_count;
        const views = post.view_count;
        const posted = post.posted_time;
        const activeStatus = post.isActive;


        if (activeStatus) {

            postCard.innerHTML = `
        
                <div class="m-2">
                    <div class="indicator">
                        <span id="active-status" class="indicator-item badge bg-[#3eff2d]"></span>
                        <div><img src="images/icons/Rectangle 4.png" alt=""></div>
                    </div>
                </div>
                
                
                <div class="space-y-3 lg:w-full">
                    <div>
                        <p class="font-semibold text-sm">#${category} &nbsp; &nbsp; Author: ${authorName}
                        </p>
                    </div>
                    <h3 class="font-bold text-xl">${title}</h3>
                    <p>${description}</p>
                    <hr class="decoration-dashed">
                    <div class="flex justify-between items-center p-1">
                        <div class="flex justify-between lg:min-w-80 gap-2">
                            <div class="flex justify-around items-center gap-1">
                                <img src="images/icons/Group 13.png" alt="">
                                <p>${comments}</p>
                            </div>
                            <div class="flex justify-around items-center gap-2">
                                <img src="images/icons/tabler-icon-eye.png" alt="">
                                <p>${views}</p>
                            </div>
                            <div class="flex justify-around items-center gap-2">
                                <img src="images/icons/tabler-icon-clock-hour-9.png" alt="">
                                <p>${posted} min</p>
                            </div>
                        </div>
                        <div>
                            <img onclick="handleBookmark('${title.replace(/'/g, "\\'")}', '${views}')" class="hover:cursor-pointer" src="images/icons/Group 40106.png" alt="">
                        </div>
                    </div>
                </div>
            `
        }
        else {

            postCard.innerHTML = `
        
                <div class="m-2">
                    <div class="indicator">
                        <span id="active-status" class="indicator-item badge bg-[#ff4343]"></span>
                        <div><img src="images/icons/Rectangle 4.png" alt=""></div>
                    </div>
                </div>
            
            
                <div class="space-y-3 lg:w-full">
                    <div>
                        <p class="font-semibold text-sm">#${category} &nbsp; &nbsp; Author: ${authorName}
                        </p>
                    </div>
                    <h3 class="font-bold text-xl">${title}</h3>
                    <p>${description}</p>
                    <hr class="decoration-dashed">
                    <div class="flex justify-between items-center p-1">
                        <div class="flex justify-between lg:min-w-80 gap-2">
                            <div class="flex justify-around items-center gap-1">
                                <img src="images/icons/Group 13.png" alt="">
                                <p>${comments}</p>
                            </div>
                            <div class="flex justify-around items-center gap-2">
                                <img src="images/icons/tabler-icon-eye.png" alt="">
                                <p>${views}</p>
                            </div>
                            <div class="flex justify-around items-center gap-2">
                                <img src="images/icons/tabler-icon-clock-hour-9.png" alt="">
                                <p>${posted} min</p>
                            </div>
                        </div>
                        <div>
                            <img onclick="handleBookmark('${title.replace(/'/g, "\\'")}', '${views}')" class="hover:cursor-pointer" src="images/icons/Group 40106.png" alt="">
                        </div>
                    </div>
                </div>
            `

        }

        postsContainer.appendChild(postCard)



    });

    if (postsContainer.textContent == '') {

        postsContainer.innerHTML = `
        
        <div class="flex justify-center items-center h-full text-xl lg:text-3xl font-bold text-gray-500">
            <h1>No Post Found</h1>
        </div>
        
        `

    }

    toggleLoadingSpinner(false);


}

const handleSearch = () => {

    toggleLoadingSpinner(true)

    const searchText = document.getElementById('search-text').value;


    console.log(searchText)

    loadSearch(searchText)


}



const toggleLoadingSpinner = isLoading => {

    const toggleLoading = document.getElementById('toggle-loading');
    const postsBookmarkSection = document.getElementById('post-bookmark-section');

    if (isLoading) {

        toggleLoading.classList.remove('hidden');
        postsBookmarkSection.classList.add('hidden')

    } else {

        toggleLoading.classList.add('hidden');
        postsBookmarkSection.classList.remove('hidden');

    }

}