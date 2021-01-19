/// <reference lib="dom" />

const header = document.createElement("header");

header.innerHTML = "<span>Dorfladen</span><span>BBZW</span>";

const bodyElement = document.querySelector("body");

if (bodyElement) {
    bodyElement.prepend(header);
}



