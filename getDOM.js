// getDOM.js

// This gets DOM
function getDOM() {
  return new Promise((resolve, reject) => {
    const html = document.documentElement.outerHTML;
    resolve(html);
  });
}

// This uses DOM
getDOM().then(dom => {
  console.log("Tsau!" + dom)
});