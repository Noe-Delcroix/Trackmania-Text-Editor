var c1,c2,cswap,cgrad
var fitalic,fbold,fdropshadow,fuppercase,ffont

var output,generate

const options=["Normal","Narrow","Wide"]

function createDom(){
  createColorPickers(color(255),color(0))
  
  cswap=createButton("⟷")
  cswap.position(107.5,5)
  cswap.mousePressed(swapColors)
  
  cgrad=createButton("Gradient")
  cgrad.position(107.5,30)
  cgrad.mousePressed(setFromGradient)
  
  
  fbold=createButton("𝗕𝗼𝗹𝗱")
  fbold.position(325,0)
  fbold.mousePressed(setBold)
  fitalic=createButton("𝐼𝑡𝑎𝑙𝑖𝑐")
  fitalic.position(325,25)
  fitalic.mousePressed(setItalic)
  fdropshadow=createButton("Shadow")
  fdropshadow.position(425,0)
  fdropshadow.mousePressed(setShadow)
  fuppercase=createButton("Uppercase")
  fuppercase.position(425,25)
  fuppercase.mousePressed(setUpper)
  ffont=createSelect()
  ffont.position(525,0)
  ffont.option("Normal")
  ffont.option("Narrow")
  ffont.option("Wide")
  ffont.input(setFont)
  
  output=createInput()
  output.position(625,0)
  output.attribute("disabled",true)
  output.attribute("placeholder","> Your code here <")
  output.class("output")
  generate=createButton("Generate Trackmania code")
  generate.position(625,25)
  generate.mousePressed(generateTMCode)
  generate.class("output")
}

function createColorPickers(col1,col2){
  c1=createColorPicker(col1)
  c1.position(0,0)
  c1.input(setFromColor1)
  c1.mousePressed(setFromColor1)
  c2=createColorPicker(col2)
  c2.position(200,0)
  c2.input(setFromColor2)
  c2.mousePressed(setFromColor2)
}
function swapColors(){
  let col1=c2.color()
  let col2=c1.color()
  c1.remove()
  c2.remove()
  createColorPickers(col1,col2)
}

function setFromColor1(){
  textInput.setColor(c1.value())
}
function setFromColor2(){
  textInput.setColor(c2.value())
}
function setFromGradient(){
  textInput.setGradient(c1.value(),c2.value())
}


function setBold(){
  textInput.setProperty(0)
}
function setItalic(){
  textInput.setProperty(1)
}
function setShadow(){
  textInput.setProperty(2)
}
function setUpper(){
  textInput.setProperty(3)
}
function setFont(){
  textInput.setFont(options.indexOf(ffont.value()))
}

function generateTMCode(){
  let res=""
  
  let prevStyle=["$FFF",false,false,false,false,0]
  let nextStyle
  
  
  for (let i=0;i<textInput.data.length;i++){
    nextStyle=getStyle(i)
    let d=textInput.data[i]
    if (d[0]!=" "){
      let reset=false
      for (let j=1;j<6;j++){
        if (prevStyle[j]!=nextStyle[j]){
          print(!nextStyle[j])
          if ((j==5 && nextStyle[j]==0) || !nextStyle[j]){
            reset=true
            break
          }
        }
      }
      if(reset){
        res+="$z"
      }
      if (prevStyle[1]!=nextStyle[1] && nextStyle[1]){
         res+="$o"
      }
      if (prevStyle[2]!=nextStyle[2] && nextStyle[2]){
         res+="$i"
      }
      if (prevStyle[3]!=nextStyle[3] && nextStyle[3]){
         res+="$s"
      }
      if (prevStyle[4]!=nextStyle[4] && nextStyle[4]){
         res+="$t"
      }
      if (prevStyle[5]!=nextStyle[5]){
        if (nextStyle[5]==1){
           res+="$n"
        }else if (nextStyle[5]==2){
           res+="$w"
        }
      }
        
      if (reset || prevStyle[0]!=nextStyle[0]){
        if (!(nextStyle[0]=="$FFF" && reset))
        if (nextStyle[0]=="$FFF"){
          res+="$g"
        }else{
          res+=nextStyle[0]
        }
      }
        
      if (d[0]=="$"){
        res+="$"
      }
        
      prevStyle=nextStyle.slice()
    }
    res+=d[0]
  }
  output.value(res)
}
  
function getStyle(letter){
  let d=textInput.data[letter]
  let res=[getColorCode(d[1])]
  for (let i=2;i<d.length;i++){
    res.push(d[i])
  }
  return res
}

function getColorCode(col){
  let res="$"
  let chars="0123456799ABCDEF"
  
  res+=chars[floor(map(red(col),0,255,0,15))]
  res+=chars[floor(map(green(col),0,255,0,15))]
  res+=chars[floor(map(blue(col),0,255,0,15))]

  return res
}
