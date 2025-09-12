let fly1, fly2, fly3, fly4, fly5, fly6, fly7, fly8, fly9, fly10, fly11, fly12, fly13, fly14, fly15, fly16, fly17, fly18, fly19, fly20, fly21, fly22, fly23, fly24, fly25, fly26, fly27, fly28, fly29, fly30, fly31, fly32, fly33, fly34, fly35, fly36, fly37, fly38, fly39, fly40, fly41, fly42, fly43, fly44, fly45, fly46, fly47, fly48, fly49, fly50, fly51, fly52, fly53, fly54, fly55, fly56, fly57, fly58, fly59, fly60; // flyer ids
let flyers = []; //empty array for ids

function preload(){
  //load flyers individually
  fly1 = loadImage("flyer1.jpg");
  fly2 = loadImage("flyer2.jpg");
  fly3 = loadImage("flyer3.jpg");
  fly4 = loadImage("flyer4.jpg");
  fly5 = loadImage("flyer5.jpg");
  fly6 = loadImage("flyer6.jpg");
  fly7 = loadImage("flyer7.jpg");
  fly8 = loadImage("flyer8.jpg");
  fly9 = loadImage("flyer9.jpg");
  fly10 = loadImage("flyer10.jpg");
  fly11 = loadImage("flyer11.jpg");
  fly12 = loadImage("flyer12.jpg");
  fly13 = loadImage("flyer13.jpg");
  fly14 = loadImage("flyer14.jpg");
  fly15 = loadImage("flyer15.jpg");
  fly16 = loadImage("flyer16.jpg");
  fly17 = loadImage("flyer17.jpg");
  fly18 = loadImage("flyer18.jpg");
  fly19 = loadImage("flyer19.jpg");
  fly20 = loadImage("flyer20.jpg");
  fly21 = loadImage("flyer21.jpg");
  fly22 = loadImage("flyer22.jpg");
  fly23 = loadImage("flyer23.jpg");
  fly24 = loadImage("flyer24.jpg");
  fly25 = loadImage("flyer25.jpg");
  fly26 = loadImage("flyer26.jpg");
  fly27 = loadImage("flyer27.jpg");
  fly28 = loadImage("flyer28.jpg");
  fly29 = loadImage("flyer29.jpg");
  fly30 = loadImage("flyer30.jpg");
  fly31 = loadImage("flyer31.jpg");
  fly32 = loadImage("flyer32.jpg");
  fly33 = loadImage("flyer33.jpg");
  fly34 = loadImage("flyer34.jpg");
  fly35 = loadImage("flyer35.jpg");
  fly36 = loadImage("flyer36.jpg");
  fly37 = loadImage("flyer37.jpg");
  fly38 = loadImage("flyer38.jpg");
  fly39 = loadImage("flyer39.jpg");
  fly40 = loadImage("flyer40.jpg");
  fly41 = loadImage("flyer41.jpg");
  fly42 = loadImage("flyer42.jpg");
  fly43 = loadImage("flyer43.jpg");
  fly44 = loadImage("flyer44.jpg");
  fly45 = loadImage("flyer45.jpg");
  fly46 = loadImage("flyer46.jpg");
  fly47 = loadImage("flyer47.jpg");
  fly48 = loadImage("flyer48.jpg");
  fly49 = loadImage("flyer49.jpg");
  fly50 = loadImage("flyer50.jpg");
  fly51 = loadImage("flyer51.jpg");
  fly52 = loadImage("flyer52.jpg");
  fly53 = loadImage("flyer53.jpg");
  fly54 = loadImage("flyer54.jpg");
  fly55 = loadImage("flyer55.jpg");
  fly56 = loadImage("flyer56.jpg");
  fly57 = loadImage("flyer57.jpg");
  fly58 = loadImage("flyer58.jpg");
  fly59 = loadImage("flyer59.jpg");
  fly60 = loadImage("flyer60.jpg");

  flyers = [fly1, fly2, fly3, fly4, fly5, fly6, fly7, fly8, fly9, fly10, fly11, fly12, fly13, fly14, fly15, fly16, fly17, fly18, fly19, fly20, fly21, fly22, fly23, fly24, fly25, fly26, fly27, fly28, fly29, fly30, fly31, fly32, fly33, fly34, fly35, fly36, fly37, fly38, fly39, fly40, fly41, fly42, fly43, fly44, fly45, fly46, fly47, fly48, fly49, fly50, fly51, fly52, fly53, fly54, fly55, fly56, fly57, fly58, fly59, fly60]; //adding flyer ids to the array
}

function setup() {
  createCanvas(500, 600);
  noLoop(); //one loop draw once
}

function draw() {
  background(220);

  let randomFly = random(flyers); //picks a random flyer

  imageMode(CENTER);
  image(randomFly, width / 2, height / 2, width, height);
}

function mousePressed(){
  redraw();
}