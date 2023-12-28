const accessKey = "Sdk6vdLgQXt4DrWw73PDb9QNoC8ZTITJ1c-gI0N4Zpo"

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const resultEl = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

var inputData = ""
let page = 2;
var data = null

function searchImage(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?=${page}&query=${inputData}&client_id=${accessKey}`

    let fetchRes = fetch(url); 
        fetchRes.then(res => 
            res.json()
            ).
            
            then(d => {
                console.log(d) 
                data = d.results
                if(data.length>0) {
                    resultImage()
                }
            }) 
               
    const results = data

    if (page === 1) {
        resultEl.innerHTML = ""
    }

    page++
    if(page > 1) {
        showMore.style.display = "block" 
    }
}

function resultImage() {
    data.map((result) => {
                const imageWrapper = document.createElement('div')
                imageWrapper.classList.add("search-result")
                const image = document.createElement('img')
                image.src = result.urls.small
                image.alt = result.alt_description
                const imageLink = document.createElement('a')
                imageLink.href = result.links.html
                imageLink.target = "_blank"
                imageLink.textContent = result.alt_description
            
                
                imageLink.appendChild(image);
                imageWrapper.appendChild(imageLink);
                resultEl.appendChild(imageWrapper);
            });         

}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault()
    page = 1;
    searchImage()
})

showMore.addEventListener("click", () =>{
    searchImage()
})

