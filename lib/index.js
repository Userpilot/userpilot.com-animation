'use strict';

const staticPath = "static/";
let mainContainer = '';
let animateHeaderModule = {};
animateHeaderModule.initialize = function(container) {

    let style = document.createElement("style");
    style.innerHTML = 'div#container{position:relative;width:800px}div#animationImageContainer{width:200px;position:absolute;top:64%;left:28%}div#animationImageContainer img:last-child{top:9px;left:-12px;opacity:0;transition:opacity 0.5s,left 0.5s}div#animationImageContainer img{position:absolute;width:100%;left:0}div#animationImageContainer img:first-child{z-index:1;top:-25px;visibility:hidden;transition:top 0.5s,visibility 0.5s}div#animationImageContainer[type="modal"]{top:19%;bottom:auto;left:26%;width:285px}div#animationImageContainer[type="tooltip"]{left:63%;top:44%;width:120px}div#animationImageContainer[type="modal"] img:last-child{top:7px;left:-1px}div#animationImageContainer[type="tooltip"] img:last-child{top:5px;height:43px}div#animationImageContainer.active-animation img:last-child{opacity:1;left:0}div#animationImageContainer.active-animation img:first-child{top:0;visibility:visible}div#animationImageContainer.active-animation.animate img{animation-duration:2s;animation-iteration-count:infinite;animation-timing-function:linear;animation-direction:alternate;transition:transform 2s}div#animationImageContainer.active-animation.animate img:last-child{transform:translateX(-3px);opacity:.5;animation-name:animateLeft,animateOpacity}div#animationImageContainer.active-animation.animate img:first-child{transform:translateY(-2px);animation-name:animateTop}@keyframes animateTop{from{transform:translateY(0)}to{transform:translateY(-3)}}@keyframes animateLeft{from{transform:translateX(0)}to{transform:translateX(-3)}}@keyframes animateOpacity{from{opacity:1}top{opacity:.4}}';
    container.appendChild(style);

    let imgMain = document.createElement("img");
    imgMain.src = staticPath + 'main.svg';
    mainContainer = container;
    container.appendChild(imgMain);
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
        }, 100);
    } else {
        setTimeout(() => {
            Array.from(mainContainer.querySelectorAll(".active-animation")).forEach(element => {
                element.classList.add("animate");
            });
        }, 1000);
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
