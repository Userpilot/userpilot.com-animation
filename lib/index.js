'use strict';

const staticPath = "https://static.userpilot.com/static/";
let mainContainer = '';
let animateHeaderModule = {};
animateHeaderModule.initialize = function(container) {

    let style = document.createElement("style");
    style.innerHTML = 'div#mainImageContainer{width:100%;height:325px;background-repeat:no-repeat!important;background-size:cover!important}div#animationImageContainer{width:185px;position:absolute;top:216px;left:232px}div#animationImageContainer img:last-child{top:9px;left:-12px;opacity:0;transition:opacity 0.5s,left 0.5s}div#animationImageContainer img{position:absolute;width:100%;left:0}div#animationImageContainer img:first-child{z-index:1;top:-25px;visibility:hidden;transition:top 0.5s,visibility 0.5s}div#animationImageContainer[type="modal"]{top:70px;bottom:auto;left:180px;width:285px}div#animationImageContainer[type="tooltip"]{left:500px;top:150px;width:120px}div#animationImageContainer[type="modal"] img:last-child{top:7px;left:-1px}div#animationImageContainer[type="tooltip"] img:last-child{top:5px;height:43px}div#animationImageContainer.active-animation img:last-child{opacity:1;left:0}div#animationImageContainer.active-animation img:first-child{top:0;visibility:visible}div#animationImageContainer.active-animation.animate img{animation-duration:2s;animation-iteration-count:infinite;animation-timing-function:linear;animation-direction:alternate;animation-delay:1s;transition:transform 2s}div#animationImageContainer.active-animation.animate img:last-child{transform:translateX(-3px);opacity:.8;animation-name:animateLeft,animateOpacity}div#animationImageContainer.active-animation.animate img:first-child{transform:translateY(-2px);animation-name:animateTop}@keyframes animateTop{from{transform:translateY(0)}to{transform:translateY(-3)}}@keyframes animateLeft{from{transform:translateX(0)}to{transform:translateX(-3)}}@keyframes animateOpacity{from{opacity:1}top{opacity:.4}}';
    container.appendChild(style);
    let mainImageContainer = document.createElement("div");
    mainImageContainer.style.background = 'url("'+staticPath + 'main.svg'+'")';
    mainImageContainer.id = "mainImageContainer";
    container.appendChild(mainImageContainer);
    mainContainer = mainImageContainer;
    load(0);
};

function load(num) {

    if (num < 3) {
        let imageContainer = document.createElement("div");
        imageContainer.id = "animationImageContainer";
        switch(num) {

            case 0: 
                imageContainer = generateImage(imageContainer, 'slideout');
                break;
            case 1:
                imageContainer = generateImage(imageContainer, 'modal');
                break;
            case 2: 
                imageContainer = generateImage(imageContainer, 'tooltip');
                break;
        }
        num++;
        setTimeout(() => {
            imageContainer.classList.add("active-animation");
            load(num);
        }, 290);
    } else {
        setTimeout(() => {
            Array.from(mainContainer.querySelectorAll(".active-animation")).forEach(element => {
                element.classList.add("animate");
            });
        }, 2000);
    }
}

function generateImage(container, type) {
    let imgTooltip = document.createElement("img");
    imgTooltip.src = staticPath + type+'.svg';        
    let imgTooltipShadow = document.createElement("img");
    imgTooltipShadow.src = staticPath + type+'-shadow.svg';     
    container.setAttribute("type", type);  
    container.appendChild(imgTooltip);
    container.appendChild(imgTooltipShadow);
    mainContainer.appendChild(container);
    return container;
}

module.exports.animateHeaderModule = animateHeaderModule;
