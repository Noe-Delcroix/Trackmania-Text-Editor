class Input{
  constructor(x,y,w,h,defaulttxt){
    this.x=x
    this.y=y
    this.w=w
    this.h=h
    
    //caracter, color, bold?, italic?, dropShadow?, uppercase?, font id
    this.data=[]
    
    for (let c of defaulttxt){
      this.data.push([c,color(255),false,false,false,false,0])
    }
    
    this.lspacing=5
    this.sspacing=this.h*0.05
    this.fsize=this.h*0.9
    
    this.sel=null
    
    this.timer=0
    
    this.allowed="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,?;.:/!-*+é#'()[]{}|è`_\çà@= <>ù%$£€§²"
  }
  update(){
    this.render()
    this.timer++
    
    if (mouseY>0 && this.sel!=null && mouseIsPressed){
      this.sel[1]=this.onLetter()
    }
  }
  onLetter(){
    let x=0
    for (let l=0;l<this.data.length;l++ ){
      let space=this.getBox(l).w+this.lspacing
      if (x+space+this.x>mouseX){
        return l
      }
      x+=space
    }
    return this.data.length
  }
  
  letterToPos(letter){
    let x=0
    for (let i=0;i<letter;i++){
      x+=this.getBox(i).w+this.lspacing
    }
    return x-this.lspacing
  }
  
  getFont(index){
    let d=this.data[index]
    let code=2*d[3]+d[2]
    return myFonts[d[6]][code]
  }
  getLetter(index){
    let d=this.data[index]
    let letter=d[0]
    if (d[5]){
      letter=letter.toUpperCase()
    }
    return letter
  }
  getBox(index){
    let font=this.getFont(index)
    let letter=this.getLetter(index)
    return font.textBounds(letter,0,0)
  }
  
  mouse(){
    if (mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h){
      let ol=this.onLetter()
      this.sel=[ol,ol]
      this.timer=0
    }else{
      this.sel=null
    }
  }
  
  moveCursor(pos){
    this.sel[0]=constrain(pos,0,this.data.length)
    this.sel[1]=constrain(pos,0,this.data.length)
  }
  
  keyPressed(key,keyCode){
    if (this.sel){
      this.timer=0
      if (keyCode==37){
        if (this.sel[0]==this.sel[1]){
          this.moveCursor(min(this.sel)-1)
        }else{
          this.moveCursor(min(this.sel))
        }
      }else if (keyCode==39){
        if (this.sel[0]==this.sel[1]){
          this.moveCursor(max(this.sel)+1)
        }else{
          this.moveCursor(max(this.sel))
        }
      }else if (keyCode==8 || (this.allowed.includes(key) && this.sel[0]!=this.sel[1])){
        for (let i=max(this.sel)-1;i>=min(this.sel)-(this.sel[0]==this.sel[1]);i--){
          this.data.splice(i,1)
        }
        if (this.sel[0]==this.sel[1]){
          this.moveCursor(min(this.sel)-1)
        }else{
          this.moveCursor(min(this.sel))
        }
        
      }
      if (this.allowed.includes(key)){
        let newData=[key]
        for (let s of this.cursorStyle(min(this.sel))){
          newData.push(s)
        }
        this.data.splice(min(this.sel),0,newData)
        this.moveCursor(min(this.sel)+1)
      }
    }
  }
  
  cursorStyle(pos){
    if (this.sel==null || pos==0){
      return [color(255),false,false,false,false,0]
    }else{
      let pos=min(this.sel)
      let res=[]
      for (let i=1;i<this.data[pos-1].length;i++){
        res.push(this.data[pos-1][i])
      }
      return res
    }
  }
  
  render(){
    push()
    translate(this.x,this.y)
    fill(6,109,68)
    noStroke()
    rectMode(CORNER)
    rect(0,0,this.w,this.h)
    
    noStroke()
    textAlign(LEFT,BOTTOM)
    textSize(this.fsize)
    
    fill(0, 123, 255,150)
    noStroke()
    rectMode(CORNERS)
    if (this.sel && this.sel[0]!=this.sel[1]){
      rect(max(0,this.letterToPos(this.sel[0])+this.lspacing/2),0,this.letterToPos(this.sel[1])+this.lspacing/2,this.h)
    }
    
    let x=0
    for (let i=0;i<this.data.length;i++){
      let d=this.data[i]
      let letter=this.getLetter(i)
      textFont(this.getFont(i))
      if (d[4]){
        fill(0,100)
        text(letter,x+this.sspacing,this.h+this.sspacing)
      }
      
      if (this.sel!=null && min(this.sel)<=i && max(this.sel)>i){
        fill(oppositeCol(d[1])) 
      }else{
        fill(d[1])
      }
      text(letter,x,this.h)
      x+=this.getBox(i).w+this.lspacing
    }
    let s=this.cursorStyle(min(this.sel))
    stroke(s[0])
    strokeWeight(this.lspacing/2+s[1]*this.lspacing/4)
    if (floor(this.timer/30)%2==0 && this.sel && this.sel[0]==this.sel[1]){
      let x=this.letterToPos(min(this.sel))+this.lspacing
      if (s[2]){
        line(x+this.lspacing,this.h*0.1,x-this.lspacing,this.h-this.h*0.1)
        if (s[3]){
          stroke(0,100)
          line(x+this.lspacing+this.sspacing,this.h*0.1+this.sspacing,x-this.lspacing+this.sspacing,this.h-this.h*0.1+this.sspacing)
        }
      }else{
        line(x,this.h*0.1,x,this.h-this.h*0.1)
        if (s[3]){
          stroke(0,100)
          line(x+this.sspacing,this.h*0.1+this.sspacing,x+this.sspacing,this.h-this.h*0.1+this.sspacing)
        }
      }
    }
  }
  
  
  setColor(col){
    if (this.sel && this.sel[0]!=this.sel[1]){
      for (let i=min(this.sel);i<max(this.sel);i++){
        this.data[i][1]=col
      }
    }
  }
  
  setGradient(from,to){
    if (this.sel && this.sel[0]!=this.sel[1]){
      for (let i=min(this.sel);i<max(this.sel);i++){
        
        let r=map(i,min(this.sel),max(this.sel),red(from),red(to))
        let g=map(i,min(this.sel),max(this.sel),green(from),green(to))
        let b=map(i,min(this.sel),max(this.sel),blue(from),blue(to))
        this.data[i][1]=color(r,g,b)
      }
    }
  }
  
  setProperty(index){
    //0=bold  1=italic  2=dropshadow
    if (this.sel && this.sel[0]!=this.sel[1]){
      let setTo=!this.data[min(this.sel)][index+2]
      for (let i=min(this.sel);i<max(this.sel);i++){
        this.data[i][index+2]=setTo
      }
    }
  }
  
  setFont(id){
    if (this.sel && this.sel[0]!=this.sel[1]){
      for (let i=min(this.sel);i<max(this.sel);i++){
        this.data[i][6]=id
      }
    }
  }
}

function mousePressed(){
  if (mouseY>0){
    textInput.mouse()
  }
}
function keyPressed(){
  textInput.keyPressed(key,keyCode)
}


function oppositeCol(col){
  return color(map(red(col),0,255,255,0),map(green(col),0,255,255,0),map(blue(col),0,255,255,0))
}