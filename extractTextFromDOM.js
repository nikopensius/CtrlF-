const paragraphs = document.getElementsByTagName('p');

for (let i = 0; i < paragraphs.length; i++) {
  const paragraphText = paragraphs[i].textContent;
  console.log(paragraphText);
}
