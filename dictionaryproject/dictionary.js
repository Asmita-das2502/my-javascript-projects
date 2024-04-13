let form = document.querySelector("form");
let resultdiv = document.querySelector(".result");
let input = document.querySelector("input");

const displayAntonyms = (antonyms) => {
  if (antonyms.length > 0) {
    let antonymsHTML = "<p><strong>Antonyms:</strong></p><ul>";
    antonyms.forEach((antonym) => {
      antonymsHTML += `<li>${antonym}</li>`;
    });
    antonymsHTML += "</ul>";
    return antonymsHTML;
  } else {
    return "<p> No Antonyms found</p>";
  }
};
const displaySynonyms = (synonyms) => {
  if (synonyms.length > 0) {
    let synonymsHTML = "<p><strong>Synonyms:</strong></p><ul>";
    synonyms.forEach((synonym) => {
      synonymsHTML += `<li>${synonym}</li>`;
    });
    synonymsHTML += "</ul>";
    return synonymsHTML;
  } else {
    return "<p>No synonyms found</p>";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});
const getWordInfo = async (word) => {
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let data = await response.json();
    let rest = data[0].meanings[0];
    let rest1 = data[0].meanings[1];
    resultdiv.innerHTML = ` <h2><strong>word:</strong>${data[0].word}</h2>
  <p class="partof">${rest.partOfSpeech}</p>
  <p><strong>Meaning:</strong>${
    rest.definitions[0].definition === undefined
      ? "Not Found"
      : rest.definitions[0].definition
  }</p>
  <p><strong>Example:</strong>${
    rest.definitions[0].example === undefined
      ? "Not Found"
      : rest.definitions[0].example
  }</p>
  `;
    resultdiv.innerHTML += displaySynonyms(rest.definitions[0].synonyms);
    resultdiv.innerHTML += displayAntonyms(rest.definitions[0].antonyms);

    resultdiv.innerHTML += `<div><a href=${data[0].sourceUrls}target=_bl>Read More<a/></div>`;
    console.log(data);
  } catch (error) {
    resultdiv.innerHTML = "word could not be found";
  }
};
