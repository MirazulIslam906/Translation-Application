const selectCountries = document.querySelectorAll('select');
const icone = document.querySelectorAll('.icone');
const from_text = document.querySelector('.from-text');
const to_text = document.querySelector('.to-text');
const trnslateBtn = document.querySelector('button');
const exchange = document.querySelector('.exchange');



selectCountries.forEach((countris, id) => {
  for (const country_code in countries) {
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected"
    } else if (id == 1 && country_code == "bn-BD") {
       selected = "selected"
    }
    let options = `<option value=${country_code} ${selected}>${countries[country_code]}</option>`;
    countris.insertAdjacentHTML('beforeend', options);
  }
})

function handleTranslate() {
  let text = from_text.value;
  let translatrFron = selectCountries[0].value;
  let translatrto = selectCountries[1].value;
  console.log(translatrFron, text, translatrto);
  
  const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatrFron}|${translatrto}`;
  fetch(url).then(res => res.json()).then(data => {
    console.log(data)
    to_text.value = data.responseData.translatedText;
  })
  
  trnslateBtn.classList.add("hoverBtn");

  setTimeout(() => {
    trnslateBtn.classList.remove("hoverBtn");
  }, 500);

}

trnslateBtn.addEventListener("click",handleTranslate)
exchange.addEventListener("click", () => {
  let tempt = selectCountries[0].value;
  selectCountries[0].value = selectCountries[1].value;
  selectCountries[1].value = tempt;
  let temptVal = from_text.value;
  from_text.value = to_text.value;
  to_text.value = temptVal;
})

icone.forEach(item => {
  item.addEventListener("click", ({target}) => {
    if (target.classList.contains("fa-copy")) {
     if (target.id == "fronText") {
       navigator.clipboard.writeText(from_text.value)
     } else {
         navigator.clipboard.writeText(to_text.value)
     }
    }
    else {
      let utterence;
           if (target.id == "fronText") {
             utterence = new SpeechSynthesisUtterance(from_text.value);
             utterence.lang = selectCountries[0].value;
             speechSynthesis.speak(utterence)
             console.log(utterence)
     } else {
             utterence = new SpeechSynthesisUtterance(to_text.value);
             utterence.lang = selectCountries[1].value;
             speechSynthesis.speak(utterence)
           }
    }
  })
})
