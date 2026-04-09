
// Reusable get id Function
function getId(id){
    return document.getElementById(id);
}

// Reusable Add to Cart Function
const addToCartBtn = (tree) => {
    const priceCardContainer = getId('price-Card-Container');

    const priceDiv = document.createElement('div');
    priceDiv.innerHTML = `
        <div class="bg-[#dcfce7] p-4 md:p-2 rounded-[0.6rem] my-2 flex justify-between items-center gap-1">
            <div>
                <h3 class="font-semibold mb-1">${tree.name}</h3>
                <div class="text-[0.8rem]">৳<span>${tree.price}</span> X 1</div>
            </div>
            <div><i class="cross fa-solid fa-xmark"></i></div>
        </div>`;
    priceCardContainer.appendChild(priceDiv);

    //Normal Total Price Calculations
    const initialPrice = getId('totalPrice').innerText;
    const totalPrice = Number(initialPrice) + Number(tree.price);
    getId('totalPrice').innerText = totalPrice;

    //Remove Product Icon Functionalities
    const crossBtn = priceDiv.querySelector('.cross');
    crossBtn.addEventListener('click', ()=>{
        const initialPrice = getId('totalPrice').innerText;
        const totalPrice = Number(initialPrice) - Number(tree.price);
        getId('totalPrice').innerText = totalPrice;
        priceDiv.remove();
    });
}

//Reusable Modal Function
const displayTreeModal = (modal)=>{
    const treesModal = getId('trees_modal');
    treesModal.innerHTML = `
        <div class="modal-box shadow-lg">
            <div class="bg-white space-y-2">
                <h2 class="font-semibold text-2xl Black">${modal.name}</h2>
                <img class="rounded-[0.6rem] w-full h-56 md:h-52 object-cover" src="${modal.image}" alt="${modal.name}">
                <div class="font-semibold mt-3 Black">Category: <span class="font-normal">${modal.category}</span> </div>
                <div class="font-semibold Black">Price: <span class="font-normal">৳${modal.price}</span> </div>
                <div class="font-semibold Black">Description: <span class="font-normal">${modal.description}</span> </div>
            </div>
            <div class="modal-action">
                <form method="dialog"> <button class="btn Black">Close</button></form>
            </div>
        </div>`
    treesModal.showModal();
}

// Reusable Spinner Function
const manageSpinner =(status)=>{
    if(status == true){
        getId('spinner').classList.remove('hidden');
        getId('Trees-Card-Container').classList.add('hidden');
    }
    else{
        getId('spinner').classList.add('hidden');
        getId('Trees-Card-Container').classList.remove('hidden');
    }
}

// Reusable Alert Function
const addAlert = (name) => {
    alert(`${name.name} has been added to the cart.`);
};

// Load category left side buttons name from API
const loadCategories =()=> { 
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories));
}

// Load All trees card by default from API
const loadAllTrees = ()=>{
    // Spinner added  
    manageSpinner(true); 

    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        displayAllTrees(data.plants)

        // Spinner Removed
        manageSpinner(false);
    })
}

// Display by default All Trees Card
const displayAllTrees = (AllTrees)=>{
    const treesCardContainer = getId('Trees-Card-Container');
    treesCardContainer.innerHTML = '';

        AllTrees.forEach(AllTree => {
            const TreesCardDiv = document.createElement('div')
            TreesCardDiv.innerHTML = `
                <div class="bg-white rounded-[1rem] shadow-sm p-4 flex flex-col h-full">
                    <img class="rounded-[0.8rem] w-full h-56 md:h-52 object-cover" src="${AllTree.image}" alt="${AllTree.name}">
                    <h3 class="font-semibold  text-[1.1rem] mt-3 tree-Name cursor-pointer">${AllTree.name}</h3>
                    <p class="mt-2 text-[0.8rem] flex-grow">${AllTree.description}</p>
                    <div class="flex justify-between items-center my-3 ">
                        <div class="text-[#15803d] bg-[#dcfce7] text-[0.8rem] px-4 py-2 Geist-Font rounded-[1rem]">${AllTree.category}</div>
                        <div class="font-semibold">৳<span>${AllTree.price}</span></div>
                    </div>
                    <button class="addToCard btn btn-success shadow-none text-white w-full rounded-[0.8rem]">Add to Cart</button>
                </div>`
            treesCardContainer.appendChild(TreesCardDiv)

            // Add to Cart handle function
            TreesCardDiv.querySelector(".addToCard")
            .addEventListener('click', () => {
                addToCartBtn(AllTree)
                addAlert(AllTree);
            });

        // Only Name Click opens Modal
        TreesCardDiv.querySelector(".tree-Name")
        .addEventListener('click', () => displayTreeModal(AllTree));
    })
}

// Event listener for display All Trees card
getId('all-Trees-Btn').addEventListener('click', () => {
    // Remove active class
    clickRemoveActive();

    // Add active to All Trees btn
    getId('all-Trees-Btn').classList.add('active');

    loadAllTrees();
})
loadAllTrees();

// Reusable Remove active class
const clickRemoveActive =()=>{
    const clickRemove = document.querySelectorAll(".click-Remove");
    clickRemove.forEach(btn => btn.classList.remove('active'));
}

//Load specific category name from API
const loadTreesCard =(id)=> {  
    // Spinner added
    manageSpinner(true); 

    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
        //Remove all active class
        clickRemoveActive(); 

        //Add active class
        const clickBtn = getId(`Trees-id-${id}`);
        clickBtn.classList.add('active');

        displayTreesCard(data.plants);

        // Spinner Removed
        manageSpinner(false); 
    });
}

//Display selected category Card
const displayTreesCard =(TreesCards)=>{  
    const treesCardContainer = getId('Trees-Card-Container');
    treesCardContainer.innerHTML = '';

        TreesCards.forEach(TreesCard => {
            const TreesCardDiv = document.createElement('div')
            TreesCardDiv.innerHTML = `
                <div class="bg-white rounded-[1rem] shadow-sm p-4 flex flex-col h-full">
                    <img class="rounded-[0.8rem] w-full h-56 md:h-52 object-cover" src="${TreesCard.image}" alt="${TreesCard.name}">
                    <h3 class="font-semibold text-[1.1rem] mt-3 tree-Name cursor-pointer">${TreesCard.name}</h3>
                    <p class="mt-2 text-[0.8rem] flex-grow">${TreesCard.description}</p>
                    <div class="flex justify-between items-center my-3 ">
                        <div class="text-[#15803d] bg-[#dcfce7] text-[0.8rem] Geist-Font px-4 py-2 rounded-[1rem]">${TreesCard.category}</div>
                        <div class="font-semibold">৳<span>${TreesCard.price}</span></div>
                    </div>
                    <button class="addToCard btn btn-success shadow-none text-white w-full rounded-[0.8rem]">Add to Cart</button>
                </div>`
            treesCardContainer.appendChild(TreesCardDiv)

            // Add to Cart function
            TreesCardDiv.querySelector(".addToCard")
            .addEventListener('click', () => {
                addToCartBtn(TreesCard);
                addAlert(TreesCard);
            });

            // Only Name Click opens Modal
            TreesCardDiv.querySelector(".tree-Name")
            .addEventListener('click', () => displayTreeModal(TreesCard));
        });

}

// Display categories btn name 
const displayCategories =(Categories)=>{ 
    const categoriesContainer = getId('categories-Container');
    categoriesContainer.innerHTML = ''; 
        Categories.forEach(category => {
            const categoriesDiv = document.createElement('div');
            categoriesDiv.innerHTML = ` <button id="Trees-id-${category.id}" onclick="loadTreesCard('${category.id}')" class="btn btn-outline text-left justify-start border-none btn-success w-full Black my-1 click-Remove">${category.category_name}</button> `
            categoriesContainer.appendChild(categoriesDiv)
        });
}

loadCategories();
