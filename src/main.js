import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";


gsap.registerPlugin(ScrollTrigger, TextPlugin);

const heading = document.querySelector(".intro-text")
const text = heading.innerText

heading.innerText = "";

gsap.from(".our-offerings", {
    x : -500,
    duration : 1,
    scrollTrigger : {
        trigger : ".our-offerings",
        start :  "top 80%",
    }
})

gsap.to(".intro-text", {
    duration : 10,
    text : text,
    delay : 0.5,
})


const openSection = document.getElementById("open-section")
const closeSection = document.getElementById("close-section")
const overlay = document.getElementById("overlay")
const sideMenu = document.getElementById("side-menu")

const toggleMenu = () => {
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

openSection.addEventListener('click', toggleMenu);
closeSection.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);