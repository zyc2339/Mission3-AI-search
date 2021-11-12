const btn = document.getElementById("btn");
const input = document.getElementById("no-punctuation");
const show = document.getElementById("show-result");

function noPunctuation(e) {
  return e.replace(/[^a-zA-Z ]/g, " ");
}

btn.addEventListener("click", () => {
  show.innerHTML = noPunctuation(input.value);
});
S;
