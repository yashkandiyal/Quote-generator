let quotes = [];
const voice_btn = document.querySelector("#voice");
let textQuote = document.querySelector("#text_quote");
let author = document.querySelector("#author");
let quoteBtn = document.querySelector(".new_quote");
let twitBtn = document.querySelector("#twitter");

function newQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  if (random.text.length > 120) {
    textQuote.classList.add("long-quote");
  } else {
    textQuote.classList.remove("long-quote");
  }
  textQuote.innerHTML = random.text;
  author.innerHTML = "~" + random.author;
}
function tweetQuote() {
  const url = `https://twitter.com/intent/tweet?text=${textQuote.textContent} - ${author.textContent}`;
  window.open(url, "_blank");
}
quoteBtn.addEventListener("click", newQuote);
twitBtn.addEventListener("click", tweetQuote);

voice_btn.addEventListener("click", function () {
  let msg = new SpeechSynthesisUtterance(textQuote.textContent);
  window.speechSynthesis.speak(msg);
});

async function getter() {
  try {
    const data = await fetch(
      "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    );
    quotes = await data.json();
    newQuote();
  } catch (error) {
    console.log(error.message);
  }
}
getter();
