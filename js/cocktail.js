const loadData = async(searchText,dataLimit) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.drinks, dataLimit)
}

const toggleLoader = isLoading => {
    const toggleLoader = document.getElementById('toggle-loader')
    if(isLoading === true){
        toggleLoader.classList.remove('hidden')
    }
    else{
        toggleLoader.classList.add('hidden')
    }
}

const displayData = (drinks, dataLimit) => {
    // console.log(drinks)
    const showMoreButton = document.getElementById('show-more-btn') 
    const drinksContainer = document.getElementById('drinks-container')
    drinksContainer.textContent = '';
    if(dataLimit && drinks.length > 3){
        drinks = drinks.slice(0,3)
        showMoreButton.classList.remove('hidden')
    }
    else{
        showMoreButton.classList.add('hidden')
    }
    drinks.forEach(drink => {
        // console.log(drink)
        const drinkDiv = document.createElement('div')
        drinkDiv.classList.add('bg-[#0E1B34]', 'text-white','px-6','py-6', 'rounded-lg')
        drinkDiv.innerHTML = `
            <h2 class="text-2xl font-semibold text-center mb-4">${drink.strDrink}</h2>
            <div class="flex items-center gap-5">
                <img class="w-1/2" src="${drink.strDrinkThumb}" alt="">
                <div class="border-l-2 pl-3">
                    <p><strong>Quality: </strong><span>${drink.strAlcoholic}</span></p>
                    <p><strong>Glass: </strong><span>${drink.strGlass}</span></p>
                    <p><strong>City: </strong><span>Washington</span></p>
                    <p><strong>Date: </strong><span>${drink.dateModified}</span></p>
                    <p><strong>Ingredients: </strong><span>${drink.strIngredient1
                    }</span></p>
                </div>
            </div>
            <p><strong>Source:</strong><span>${drink.idDrink}</span></p>
                <div class="w-1/2 mx-auto mt-4">
                <label onclick="loadCocktail(${drink.idDrink})" for="my-modal" class="btn bg-white text-black w-full rounded-lg font-medium">Details</label>
                </div>
        `
        drinksContainer.appendChild(drinkDiv)
    })

    // eikhane loader stop hobe coz data dekhano shesh
    toggleLoader(false)
}

const processSearch = (dataLimit) => {
    toggleLoader(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    loadData(searchText, dataLimit)
}

document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(3)
})

const loadCocktail = async(id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayCocktailDetail(data.drinks[0])
}

const displayCocktailDetail = (cocktail) => {
    // console.log(cocktail)
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
    <div class="modal-box">
        <h3 class="font-bold text-lg mb-3">${cocktail.strDrink}</h3>
        <img class="w-full rounded-lg" src="${cocktail.strDrinkThumb}">
        <p class="py-4"><strong>Description: </strong>${cocktail.strInstructions}</p>
        <div class="modal-action">
            <label for="my-modal" class="btn">Close</label>
        </div>
    </div>
    `
}

document.getElementById('btn-show-more').addEventListener('click', function(){
    toggleLoader(true)
    processSearch()
})

// loadData('margarita')