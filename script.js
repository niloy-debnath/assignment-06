// Containers

const categoriesContainer = document.getElementById("categories-container");

const cardContainer = document.getElementById("card-container");

const modalContainer = document.getElementById("modal-container");
const cartContainer = document.getElementById("cart-container");
let total = document.getElementById("total").innerText;
// console.log(total.innerText);
// Categories Fetching

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((category) => displayCategories(category.categories));
};

const displayCategories = (category) => {
  //   console.log(category);
  category.forEach((cat) => {
    // console.log(cat.category_name);
    // const li = document.createElement("li");
    categoriesContainer.innerHTML += `
    <li id="${cat.id}" class="cursor-pointer hover:bg-[#15803D] hover:py-2 hover:text-white hover:pl-2 hover:rounded-sm">
        ${cat.category_name}
      </li>
    `;
  });
};

categoriesContainer.addEventListener("click", (e) => {
  cardContainer.innerHTML = "";
  loadCategoriesDetails(e.target.id);
  // console.log(e.target.id);
  const allLi = document.querySelectorAll("li");
  allLi.forEach((li) => {
    li.classList.remove(
      "bg-[#15803D]",
      "py-2",
      "text-white",
      "rounded-sm",
      "pl-2"
    );
  });
  if (e.target.localName === "li") {
    e.target.classList.add(
      "bg-[#15803D]",
      "py-2",
      "text-white",
      "rounded-sm",
      "px-2"
    );
  }
});

loadCategories();

// categories details fetching

const loadCategoriesDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((categoriesCards) => displayCategoriesDetails(categoriesCards.plants))
    .catch((err) => {
      console.log(err);
    });
};

const displayCategoriesDetails = (categoriesCard) => {
  categoriesCard.forEach((card) => {
    cardContainer.innerHTML += `
   <div  class="bg-white p-3 rounded-md">
            <div class="md:aspect-[4/3] w-full">
              <img
                class="rounded-md w-full h-48 md:h-48 md:object-cover"
                src="${card.image}"
              />
            </div>
            <div class="flex-1 flex flex-col">
              <h2 onClick="loadPlantDetails(${card.id})" class="font-bold hover:text-xl md:my-3"> ${card.name} </h2>
              <p class="text-[#71717A] text-sm flex-1">
${card.description}
              </p>
            </div>
            <div class="flex justify-between mt-3 items-center">
              <div class="bg-[#DCFCE7] py-2 px-4 rounded-3xl">
                <h2 class="text-[#15803D]">${card.category}</h2>
              </div>
              <h2 class="font-bold">৳${card.price}</h2>
            </div>
            <button
              class="text-white add-to-cart-btn bg-[#15803D] w-full my-3 py-2 rounded-3xl"
            >
              Add to Cart
            </button>
          </div>
  `;
  });
};

const loadPlantDetails = (id) => {
  // console.log(id);
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((plant) => {
      // console.log(plant);
      showPlantDetails(plant.plants);
    });
};

const showPlantDetails = (plant) => {
  // console.log(plant);
  modalContainer.innerHTML = `
  
   <div class="bg-white p-3 rounded-md">
   <div class="flex-1 flex flex-col">
              <h2 onClick="loadPlantDetails(${plant.id})" class="font-bold hover:text-xl md:my-3"> ${plant.name} </h2>
              
            </div>
            <div class="md:aspect-[4/3] w-full">
              <img
                class="rounded-md w-full h-48 md:h-48 md:object-cover"
                src="${plant.image}"
              />
            </div>
            <p class="text-[#71717A] text-sm flex-1">
${plant.description}
              </p>
            <div class="flex justify-between mt-3 items-center">
              <div class="bg-[#DCFCE7] py-2 px-4 rounded-3xl">
                <h2 class="text-[#15803D]">${plant.category}</h2>
              </div>
              <h2 class="font-bold"><span>${plant.price}</span></h2>
            </div>
           
          </div>

  `;
  document.getElementById("my_modal_5").showModal();
};

cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    const name = e.target.parentNode.children[1].children[0].innerText;
    const priceText = e.target.parentNode.children[2].children[1].innerText; // "৳120"
    const price = parseInt(priceText.replace("৳", "")); // convert to number

    // update total
    let totalElement = document.getElementById("total");
    let currentTotal = parseInt(totalElement.innerText);
    totalElement.innerText = currentTotal + price;

    // ✅ move cartItem code INSIDE this block
    const cartItem = document.createElement("div");
    cartItem.className =
      "bg-[#F0FDF4] flex justify-between items-center p-2 my-2 rounded-md";
    cartItem.innerHTML = `
      <div>
        <h1>${name}</h1>
        <h2>৳${price}</h2>
      </div>
      <div>
        <h2 class="cursor-pointer">❌</h2>
      </div>
    `;

    // attach delete handler
    cartItem
      .querySelector("h2.cursor-pointer")
      .addEventListener("click", () => {
        deduct(price, cartItem);
      });

    cartContainer.appendChild(cartItem);
  }
});

const deduct = (price, cartItem) => {
  let totalElement = document.getElementById("total");
  let currentTotal = parseInt(totalElement.innerText);
  totalElement.innerText = currentTotal - price;

  // remove that specific div
  cartItem.remove();
};

// All Plants Load
const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((plants) => displayAllPlants(plants.plants));
};

const displayAllPlants = (plants) => {
  console.log(plants);
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    cardContainer.innerHTML += `
   <div  class="bg-white p-3 rounded-md">
            <div class="md:aspect-[4/3] w-full">
              <img
                class="rounded-md w-full h-48 md:h-48 md:object-cover"
                src="${plant.image}"
              />
            </div>
            <div class="flex-1 flex flex-col">
              <h2 onClick="loadPlantDetails(${plant.id})" class="font-bold hover:text-xl md:my-3"> ${plant.name} </h2>
              <p class="text-[#71717A] text-sm flex-1">
${plant.description}
              </p>
            </div>
            <div class="flex justify-between mt-3 items-center">
              <div class="bg-[#DCFCE7] py-2 px-4 rounded-3xl">
                <h2 class="text-[#15803D]">${plant.category}</h2>
              </div>
              <h2 class="font-bold">৳${plant.price}</h2>
            </div>
            <button
              class="text-white add-to-cart-btn bg-[#15803D] w-full my-3 py-2 rounded-3xl"
            >
              Add to Cart
            </button>
          </div>
  `;
  });
};
loadCategories();
loadAllPlants();
