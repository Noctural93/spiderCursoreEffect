let mainContainer = document.querySelector('.main-container');
let dotsCanvas = document.getElementById('dotsCanvas');

dotsCanvas.width = dotsCanvas.offsetWidth;
dotsCanvas.height = dotsCanvas.offsetHeight;

let context = dotsCanvas.getContext('2d');

let dots = [];
let arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

for (let i=0; i<50; i++ ){
    dots.push({
        x: Math.floor(Math.random() * dotsCanvas.width),
        y: Math.floor(Math.random() * dotsCanvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random()*5)]
    })
}

const drawDots = () => {
    dots.forEach(dot => {
        context.fillStyle = dot.color;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        context.fill();
    })
};

drawDots();

mainContainer.addEventListener('mousemove', (event) => {
    context.clearRect(0 ,0 , dotsCanvas.width, dotsCanvas.height);
    drawDots();
    let mouse = {
        x: event.pageX - mainContainer.getBoundingClientRect().left,
        y: event.pageY - mainContainer.getBoundingClientRect().top
    }
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if(distance < 300){
            context.strokeStyle = dot.color;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(dot.x, dot.y);
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    })
})

mainContainer.addEventListener('mouseout', (event) => {
    context.clearRect(0, 0, dotsCanvas.width, dotsCanvas.height);
    drawDots();
})

window.addEventListener('resize', () => {
    context.clearRect(0, 0, dotsCanvas.width, dots.height);
    drawDots();

    dotsCanvas.width = dotsCanvas.offsetWidth;
    dotsCanvas.height = dotsCanvas.offsetHeight;

    dots = [];

    for(let i = 0; i < 50; i++){
        dots.push({
            x: Math.floor(Math.random() * dotsCanvas.width),
            y: Math.floor(Math.random() * dotsCanvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random() * 5)]
        });
    }

    drawDots();
})