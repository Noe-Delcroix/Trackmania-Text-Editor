var textInput
var myFonts=[]
var myFont

function preload(){
  
  //NORMAL
  myFonts.push([])
  myFonts[0].push(loadFont("fonts/Roboto-Regular.ttf"))
  myFonts[0].push(loadFont("fonts/Roboto-Bold.ttf"))
  myFonts[0].push(loadFont("fonts/Roboto-Italic.ttf"))
  myFonts[0].push(loadFont("fonts/Roboto-BoldItalic.ttf"))
  
  //NARROW
  myFonts.push([])
  myFonts[1].push(loadFont("fonts/steelfish.regular.ttf"))
  myFonts[1].push(loadFont("fonts/steelfish.extrabold.ttf"))
  myFonts[1].push(loadFont("fonts/steelfish.regular-italic.ttf"))
  myFonts[1].push(loadFont("fonts/steelfish.extrabold-italic.ttf"))
  
  //WIDE
  myFonts.push([])
  myFonts[2].push(loadFont("fonts/heading-pro-wide-trial.regular.ttf"))
  myFonts[2].push(loadFont("fonts/heading-pro-wide-trial.bold.ttf"))
  myFonts[2].push(loadFont("fonts/heading-pro-wide-trial.italic.ttf"))
  myFonts[2].push(loadFont("fonts/heading-pro-wide-trial.bold-italic.ttf"))
}

function setup(){
  createDom()
  let canvas=createCanvas(windowWidth,70)
  canvas.position(0,60)
  
  textInput=new Input(0,0,windowWidth,70,"Text Editor !")
  
}

function draw(){
  textInput.update()
  
}