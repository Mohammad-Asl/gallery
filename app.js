const btnElem = document.querySelector('.btn')
const errorMessageElem = document.querySelector('.errorMessage');
const galleryElem = document.querySelector(".gallery");
const inputValue = document.querySelector('.input')
const nav = document.querySelector(".nav")
const navBtn = document.querySelector(".nav-icon")
const navBtnIcon = document.querySelector(".nav-icon i")


navBtn.addEventListener("click", function () {
  if (navBtnIcon.classList.contains("bi-list")) {
    nav.style.left = "0"
    navBtnIcon.classList = "bi-x"
  } else {
    nav.style.left = "-256px"
    navBtnIcon.classList = "bi-list"
  }
})


const fetchImage = async () => {

  const inpVal = inputValue.value

  if (inpVal > 12 || inpVal < 1) {
    errorMessageElem.style.display = 'block'
    errorMessageElem.innerHTML = 'Your number must be between 1 and 12'
    return
  }

  imgs = ''

  try {

    btnElem.style.display = "none";

    await fetch(
      `https://api.unsplash.com/photos?per_page=${inpVal}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=92kIgynLFOOAnw_ToHPdr5yaEGnyYCHvchIg3Qt6k2g`)
      .then((res) =>
        res.json()
          .then((data) => {
            if (data) {
              data.forEach((picture) => {
                imgs += `
                <img src=${picture.urls.small} class="img-fluid" alt="image"/>
                `;
                galleryElem.style.display = "block";
                galleryElem.innerHTML = imgs;
                btnElem.style.display = "block";
                errorMessageElem.style.display = "none";
              });
            }
          })
      );
  } catch (error) {

    errorMessageElem.style.display = "block";
    errorMessageElem.innerHTML = "An error happened, try again later";
    btnElem.style.display = "block";
    galleryElem.style.display = "none";
  }
}


window.addEventListener('keydown' , function(e){
  if(e.keyCode == '13'){
    fetchImage()
  }
})


btnElem.addEventListener("click", fetchImage);