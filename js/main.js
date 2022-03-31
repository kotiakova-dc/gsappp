console.clear();

//  =============  xxxxx  ==========================	

gsap.set(".centered", {autoAlpha: 1, xPercent:-50, yPercent:-50});	
gsap.set("h1", {autoAlpha: 1, yPercent:-50});	
gsap.set(" .slide", {autoAlpha: 1, xPercent:0});	
gsap.set(".go", {autoAlpha: 1, yPercent:-50});	

var slides = $(".slide"),
    activeSlide = $(".slide.active"),
    next = $(".go-next"),
    prev = $(".go-prev"),
    moveSlideTL = gsap.timeline(),
    lines = $('h1');

// individual animations per slide ======

const allSlides = [].slice.call(slides); 
let animations = [];

for(let [i] of allSlides.entries()) {
  animations[i] = gsap.timeline({});
}

animations[0]
  .from('#slide01 .lines', {y:30, autoAlpha:0, duration:1, delay:0.5})
  .reverse();

animations[1]
  .from('.apple', {xPercent:-200, duration:0.6, ease: "elastic.out(0.5, 0.4)", stagger:-0.4})
  .from('#slide02 .lines', {y:120, duration:1, delay:1}, '-=1.5')
  .reverse();

animations[2]
  .from('#slide03 .lines', {y:30, autoAlpha:0, duration:1})
  .set('#slide03 span', {color:'green'})
  .reverse();

animations[3]
  .from('#slide04 .lines', {scale:0.2, transformOrigin:'center', duration:2})
  .reverse();

// ===========================

	

//==============================

function onMouseWheel(event) {
  //Normalize event wheel delta
  var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;
  
  if(delta < -1) {  //scrolling down -> next slide
    if(!moveSlideTL.isActive()) {
      var	slideFrom = $(".slide.active"),
          sectionToIndex = slides.index(slideFrom);

      if(sectionToIndex !== slides.length - 1) {
        slideTo = slides.eq(sectionToIndex + 1);
        moveToSlide(slideFrom, slideTo);
      }
    }

  } else if(delta > 1)  {  // -> prev
    if(!moveSlideTL.isActive()) {
      if(!moveSlideTL.isActive()) {
        var	slideFrom = $(".slide.active"),
            sectionToIndex = slides.index(slideFrom);

        if(sectionToIndex != 0) {
          slideTo = slides.eq(sectionToIndex - 1);
          moveToSlide(slideFrom, slideTo);
        }
      }
    }
  }
  //event.preventDefault();
}

// ============================
function dotClick() {

  var	slideFrom = $(".slide.active"),
      sectionToIndex = $(this).index(),
      sectionToIndex = $(this).index(),
      slideTo = slides.eq(sectionToIndex);

  var indexFrom = slideFrom.index();

  console.log(slideFrom, 'from: ' + indexFrom, 'to: ' + sectionToIndex, 'slideTo: ' + slideTo);

  //if(slideFrom !== slideTo && !moveSlideTL.isActive()) {  // not working

  if(indexFrom !== sectionToIndex && !moveSlideTL.isActive()) {
    moveToSlide(slideFrom, slideTo);
  }

}

// =============================
function nextClick() {
  if(!moveSlideTL.isActive()) {
    var	slideFrom = $(".slide.active"),
        sectionToIndex = slides.index(slideFrom);

    if(sectionToIndex !== slides.length - 1) {
      slideTo = slides.eq(sectionToIndex + 1);
      moveToSlide(slideFrom, slideTo);
    }
  }
}

function prevClick() {
  if(!moveSlideTL.isActive()) {
    var	slideFrom = $(".slide.active"),
        sectionToIndex = slides.index(slideFrom);

    if(sectionToIndex != 0) {
      slideTo = slides.eq(sectionToIndex - 1);
      moveToSlide(slideFrom, slideTo);
    }
  }
}

// ==============================
function moveToSlide(slideFrom, slideTo) {

  gsap.set('.go', {autoAlpha:0}) // ????

  if(slides.index(slideFrom) < slides.index(slideTo)) { // vorwärts

    moveSlideTL = gsap.timeline({onComplete: setActiveSlide, onCompleteParams: [slideTo, slideFrom]})
      .to(slideTo, {xPercent:-100, duration:0.8, className: "slide active"})
      .to(slideFrom, {xPercent:-200, duration:0.8, className: "slide"},0)
      .set(slideFrom, {xPercent:0})

  } else {

    moveSlideTL = gsap.timeline({onComplete: setActiveSlide, onCompleteParams: [slideTo, slideFrom]})
      .set(slideTo, {xPercent:-200, className: "slide active"})
      .to(slideTo, {xPercent:-100, duration:0.8})
      .to(slideFrom, {xPercent:0, duration:0.8, className: "slide"},0)
  }

}

function setActiveSlide(active, last) {
  
  var currentSlideIndex = slides.index(active);
  var lastSlideIndex = slides.index(last);

  animations[currentSlideIndex].reversed(false);
  animations[lastSlideIndex].progress(0).reversed(true);

  gsap.to(".navDot.active", {opacity: 0.5, scale:1});
  $(".navDot.active").removeClass("active");
  $(".navDot").eq(currentSlideIndex).addClass("active");
  gsap.to(".navDot.active", {opacity: 1, scale:1.3});
  
  if(currentSlideIndex == 0) {
    gsap.set('.go-prev', {autoAlpha:0})
  } else {
    gsap.set('.go-prev', {autoAlpha:1})
  }
  if(currentSlideIndex == slides.length-1) {
    gsap.set('.go-next', {autoAlpha:0})
  } else {
    gsap.set('.go-next', {autoAlpha:1})
  }
  
}

// ================================
function init() {

  for( var i = 0; i < slides.length; i++ ) {
    var navDots = $('<div></div>').addClass("navDot").appendTo('nav');
    gsap.set(".navDot:first-child", {className: "navDot active", opacity:1, scale:1.3, transformOrigin:'center'});
    navDots.on('click', dotClick);
  };

  if(slides[0]){
    gsap.set('.go-prev', {autoAlpha:0})
  }
  
  next.on('click', nextClick);
  prev.on('click', prevClick);
  
  $(window).on("mousewheel DOMMouseScroll", onMouseWheel);
   //$(window).on("touchmove", onMouseWheel);
 
  gsap.set($( ".slide:odd" ),{backgroundColor:"#0f8c0d", color: "#333333"});
  gsap.set(".slide.active", {xPercent:-100});
  animations[0].reversed(false);
}

init();


 
gsap.registerPlugin(ScrollTrigger);
let speed = 100;

/*  SCENE 1 */
let scene1 = gsap.timeline();
ScrollTrigger.create({
    animation: scene1,
    trigger: ".scrollElement",
    start: "top top",
    end: "45% 100%",
    scrub: 3,
});

// hills animation 
scene1.to("#grass1", { y: 3 * speed, scale: 2, ease: "power1.in" }, 0)
//scene1.to("#field1", { y:- 2 * speed,  ease: "power1.in" }, 0)


scene1.from("#grass2", { yPercent:100}, 0.03)
scene1.to("#grass2", { y: 0.2 * speed}, 0.03)
// scene1.to("#h1-4", { y: 3 * speed, x: 1 * speed }, 0.03)
// scene1.to("#h1-5", { y: 2 * speed, x: 1 * speed }, 0.03)
// scene1.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed }, 0)
// scene1.to("#h1-7", { y: 5 * speed, x: 1.6 * speed }, 0)
// scene1.to("#h1-8", { y: 3.5 * speed, x: 0.2 * speed }, 0)
// scene1.to("#h1-9", { y: 3.5 * speed, x: -0.2 * speed }, 0)

//animate text
//scene1.to("#info", { y: 8 * speed }, 0)



// /*   Bird   */
// gsap.fromTo("#bird", { opacity: 1 }, {
//     y: -250,
//     x: 800,
//     ease: "power2.out",
//     scrollTrigger: {
//         trigger: ".scrollElement",
//         start: "15% top",
//         end: "60% 100%",
//         scrub: 4,
//         onEnter: function() { gsap.to("#bird", { scaleX: 1, rotation: 0 }) },
//         onLeave: function() { gsap.to("#bird", { scaleX: -1, rotation: -15 }) },
//     }
// })


// /* Clouds  */
// let clouds = gsap.timeline();
// ScrollTrigger.create({
//     animation: clouds,
//     trigger: ".scrollElement",
//     start: "top top",
//     end: "70% 100%",
//     scrub: 1,
// });

// clouds.to("#cloud1", { x: 500 }, 0)
// clouds.to("#cloud2", { x: 1000 }, 0)
// clouds.to("#cloud3", { x: -1000 }, 0)
// clouds.to("#cloud4", { x: -700, y: 25 }, 0)



// /* Sun motion Animation  */
// let sun = gsap.timeline();
// ScrollTrigger.create({
//     animation: sun,
//     trigger: ".scrollElement",
//     start: "top top",
//     end: "2200 100%",
//     scrub: 1,
// });

// //sun motion 
// sun.to("#bg_grad", { attr: { cy: "330" } }, 0.00)

// //bg change
// sun.to("#sun", { attr: { offset: "0.15" } }, 0.00)
// sun.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" } }, 0.00)
// sun.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" } }, 0.00)
// sun.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" } }, 0.00)
// sun.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" } }, 0.00)
// sun.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#FF9171" } }, 0)



/*   SCENE 2  */
let scene2 = gsap.timeline();
ScrollTrigger.create({
    animation: scene2,
    trigger: ".scrollElement",
    start: "15% top",
    end: "40% 100%",
    scrub: 4,
});

// scene2.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0)
// scene2.fromTo("#h2-2", { y: 500 }, { y: 0 }, 0.1)
// scene2.fromTo("#h2-3", { y: 700 }, { y: 0 }, 0.1)
// scene2.fromTo("#h2-4", { y: 700 }, { y: 0 }, 0.2)
// scene2.fromTo("#h2-5", { y: 800 }, { y: 0 }, 0.3)
// scene2.fromTo("#h2-6", { y: 900 }, { y: 0 }, 0.3)



// /* Bats */
// gsap.fromTo("#bats", { opacity: 1, y: 400, scale: 0 }, {
//     y: 120,
//     scale: 0.8,
//     transformOrigin: "50% 50%",
//     ease: "power3.out",
//     scrollTrigger: {
//         trigger: ".scrollElement",
//         start: "40% top",
//         end: "70% 100%",
//         scrub: 3,
//         onEnter: function() {
//             gsap.utils.toArray("#bats path").forEach((item, i) => {
//                 gsap.to(item, { scaleX: 0.5, yoyo: true, repeat: 11, duration: 0.15, delay: 0.7 + (i / 10), transformOrigin: "50% 50%" })
//             });
//             gsap.set("#bats", { opacity: 1 })
//         },
//         onLeave: function() { gsap.to("#bats", { opacity: 0, delay: 2 }) },
//     }
// })


// /* Sun increase */
// let sun2 = gsap.timeline();
// ScrollTrigger.create({
//     animation: sun2,
//     trigger: ".scrollElement",
//     start: "2200 top",
//     end: "5000 100%",
//     scrub: 1,
// });

// sun2.to("#sun", { attr: { offset: "0.6" } }, 0)
// sun2.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.7" } }, 0)
// sun2.to("#sun", { attr: { "stop-color": "#ffff00" } }, 0)
// sun2.to("#lg4 stop:nth-child(1)", { attr: { "stop-color": "#623951" } }, 0)
// sun2.to("#lg4 stop:nth-child(2)", { attr: { "stop-color": "#261F36" } }, 0)
// sun2.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#45224A" } }, 0)



// /* Transition (from Scene2 to Scene3) */
// gsap.set("#scene3", { y: 580, visibility: "visible" })
// let sceneTransition = gsap.timeline();
// ScrollTrigger.create({
//     animation: sceneTransition,
//     trigger: ".scrollElement",
//     start: "70% top",
//     end: "bottom 100%",
//     scrub: 3,
// });

// sceneTransition.to("#h2-1", { y: -680, scale: 1.5, transformOrigin: "50% 50%" }, 0)
// sceneTransition.to("#bg_grad", { attr: { cy: "-80" } }, 0.00)
// sceneTransition.to("#bg2", { y: 0 }, 0)



// /* Scene 3 */
// let scene3 = gsap.timeline();
// ScrollTrigger.create({
//     animation: scene3,
//     trigger: ".scrollElement",
//     start: "80% 50%",
//     end: "bottom 100%",
//     scrub: 3,
// });

// //Hills motion
// scene3.fromTo("#h3-1", { y: 300 }, { y: -550 }, 0)
// scene3.fromTo("#h3-2", { y: 800 }, { y: -550 }, 0.03)
// scene3.fromTo("#h3-3", { y: 600 }, { y: -550 }, 0.06)
// scene3.fromTo("#h3-4", { y: 800 }, { y: -550 }, 0.09)
// scene3.fromTo("#h3-5", { y: 1000 }, { y: -550 }, 0.12)

// //stars
// scene3.fromTo("#stars", { opacity: 0 }, { opacity: 0.5, y: -500 }, 0)

// // Scroll Back text
// scene3.fromTo("#arrow2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.25)
// scene3.fromTo("#text2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.3)

// //gradient value change
// scene3.to("#bg2-grad", { attr: { cy: 600 } }, 0)
// scene3.to("#bg2-grad", { attr: { r: 500 } }, 0)


// /*   falling star   */
// gsap.to("#fstar", {
//     x: -700,
//     y: -250,
//     ease: "power4.out",
//     scrollTrigger: {
//         trigger: ".scrollElement",
//         start: "4000 top",
//         end: "6000 100%",
//         scrub: 5,
//         onEnter: function() { gsap.set("#fstar", { opacity: 1 }) },
//         onLeave: function() { gsap.set("#fstar", { opacity: 0 }) },
//     }
// })


//reset scrollbar position after refresh
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}


let fullscreen;
let fsEnter = document.getElementById('fullscr');
fsEnter.addEventListener('click', function (e) {
e.preventDefault();
if (!fullscreen) {
    fullscreen = true;
    document.documentElement.requestFullscreen();
    fsEnter.innerHTML = "Exit Fullscreen";
}
else {
    fullscreen = false;
    document.exitFullscreen();
    fsEnter.innerHTML = "Go Fullscreen";
}
});
/////////////////https://codepen.io/mikeK/pen/NWPJeyg?editors=0010