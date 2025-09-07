// Containers

const categoriesContainer = document.getElementById("categories-container");

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
    <li class="cursor-pointer hover:bg-[#15803D] hover:py-2 hover:text-white hover:pl-2 hover:rounded-sm">
        ${cat.category_name}
      </li>
    `;
  });
};

categoriesContainer.addEventListener("click", (e) => {
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
    console.log();
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
