/*  
    Resize the ticker marquee to be the height of our intro header 
*/
const resizeTicker = () => {
    let headerHeight = document.querySelector(".header").offsetHeight;
    // console.log(headerHeight);
    document.querySelector(".ticker-right").style.width = `${headerHeight}px`;
    document.querySelector(".ticker-left").style.width = `${headerHeight}px`;
};

window.addEventListener("resize", resizeTicker);
setTimeout(resizeTicker, 100);
