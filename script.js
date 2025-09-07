// Containers

const categoriesContainer = document.getElementById("categories-container");

const cardContainer = document.getElementById("card-container");

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
   <div class="bg-white p-3 rounded-md">
            <div class="aspect-[4/3] w-full">
              <img
                class="rounded-md w-full h-48 object-cover"
                src="${card.image}"
              />
            </div>
            <div class="flex-1 flex flex-col">
              <h2 class="font-bold my-3"> ${card.name} </h2>
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
              class="text-white bg-[#15803D] w-full my-3 py-2 rounded-3xl"
            >
              Add to Cart
            </button>
          </div>
  `;
  });
};
loadCategoriesDetails();
