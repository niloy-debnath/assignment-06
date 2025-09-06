// Containers

const categoriesContainer = document.getElementById("categories-container");

// Categories Fetching

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((category) => displayCategories(category.categories));
};

const displayCategories = (category) => {
  console.log(category);
  category.forEach((cat) => {
    console.log(cat.category_name);
    // const li = document.createElement("li");
    categoriesContainer.innerHTML += `
    <li class="cursor-pointer hover:bg-[#15803D] hover:py-2 hover:text-white hover:pl-2 hover:rounded-sm">
        ${cat.category_name}
      </li>
    `;
  });
};
loadCategories();
