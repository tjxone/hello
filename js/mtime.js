/**********弹出框框架***********/
//父元素.dropdown,触发元素，子元素dropdown-toggle,弹出子元素元素dropdown-menu（设置为dropdown的兄弟元素）
//登录弹出框
(function dropdown(){
  var dropdown=document.getElementsByClassName("dropdown");
  document.body.addEventListener("click",function(e){
      //判断当前元素不是dropdown，dropdown-toggle和input元素时，才可调用下面变量设置（关闭dropdown-menu）
      //遍历所有dropdown，设置dropdown下面的dropdown-menu关闭
      var elem=e.target;
      for( var i=0;i<dropdown.length;i++) {
        var ddMenu=dropdown[i].querySelector(".dropdown-menu");
        if(ddMenu.style.display== "block"&&
            !hasClassName("dropdown-menu",elem)&&
            !hasClassName("dropdown-menu",elem.parentNode)&&
            !hasClassName("dropdown-menu",elem.parentNode.parentNode)&&
            !hasClassName("dropdown-menu",elem.parentNode.parentNode.parentNode)
          ){
            e.preventDefault();//阻止默认行为！！！不改变网页地址！
            ddMenu.style.display = "none";
        }else if(e.target.className=="dropdown-toggle"){
          e.preventDefault();//阻止默认行为！！！不改变网页地址！
          ddMenu.style.display="block";

        }
      }
    },true
  );
  function hasClassName(classname,text){
    if(text==null||text.className==undefined||text===document.body||text.className===null){
      return false;
    }else{
      if(text.className.indexOf(classname)!==-1){
        return true;
      }else{
        return false;
      }
    }
  }
})();
/*****************搜索栏功能************************/
//搜索栏弹出框显示的功能
(function searchsel(){
//找到弹出内容选择栏
  var searchsel=document.getElementsByClassName("search-box-select")[0];
  var slMenu=document.getElementsByClassName("sl-menu")[0];
  //添加监听事件
  searchsel.addEventListener("mouseover",function(){
    slMenu.style.display="block";
  });
  searchsel.addEventListener("mouseout",function(){
    slMenu.style.display="none";
  });
  searchsel.addEventListener("click",function(e){
    var seltext=this.firstElementChild;
    if(e.target.nodeName=="LI")
    seltext.innerHTML= e.target.innerHTML;
    slMenu.style.display="none";
  })
})();
/*********************首页顶部轮播*************************/
//轮播功能
window.onload=function(){
  (function(){
  var slider=document.querySelector(".slider");
  var sliderImg=document.querySelectorAll(".slider-box>ul>li");
  var sliderBtn=document.querySelectorAll(".slider-button>i");
  var nextA=document.querySelector(".slider-control>.next");
  var prevA=document.querySelector(".slider-control>.prev");
  var time=2000;
  lunbo(slider,sliderImg,sliderBtn,nextA,prevA,time);
})();
function lunbo(slider,sliderImg,sliderBtn,nextBtn,prevBtn,time){
//查找轮播图片的位置,找出轮播按钮的位置
  var len=sliderBtn.length;
  var count=0;//轮播起始号；
  //设置定时器
  var timer=setInterval(changeCount,time);
  function changeImg(){//改变图片
    //遍历所有sliderImg,设置classname为空
    for(var i=0;i<len;i++){
      sliderImg[i].className="";
      sliderBtn[i].className="";
    }
    sliderImg[count].className="show";
    sliderBtn[count].className="cur";
  }
  function changeCount(){//改变数量
    count<len-1?count++:count=0;//先更改count，再更新图像，这样第一次轮播就不会隔双倍时间才更新
    changeImg();
  }
  //添加轮播小下标事件
  for(var i=0;i<len;i++){
    (function(k){//利用闭包原理，获取遍历中按钮类数组的下标
      sliderBtn[k].addEventListener("click",function (e) {
        if(e.target.nodeName=="I"){
          count=k;
          changeImg();
        }
      });
    })(i)
  }
 //添加左移prev点击事件
  prevBtn.addEventListener("click",function(){
    if(count>0){
      count--;
    }else{count=len-1;}
    changeImg();
  });
  //添加右移next点击事件
  nextBtn.addEventListener("click",function(){
    if(count<len-1){
      count++;
    }else{count=0;}
    changeImg();
  });
  //添加next和prev按钮鼠标移入和移出效果
  //遍历两个元素设置参数
  slider.addEventListener("mouseover",function(){
    clearInterval(timer);
    timer = null;
  });
  slider.addEventListener("mouseout",function(){
    timer = setInterval(changeCount,time);
  });
}
}


/***********************热评区轮播*******************************/
 (function(){
   var slider=document.querySelector(".hotcommentbox-lg");
   var sliderImg=document.querySelectorAll(".hotcommentbox-lg>ul");
   var sliderBtn=document.querySelectorAll(".sliderdot>i");
   var nextA=document.querySelector(".hotcommentbox-lg>.next");
   var prevA=document.querySelector(".hotcommentbox-lg>.prev");
   var time=3000;
   lunbo(slider,sliderImg,sliderBtn,nextA,prevA,time);
 })();

/*******************登录框正则验证（动态验证未写）************************/
//登录框正则(用对象方法书写)
var Regex={
//查找表单对象
  loginForm:document.forms[0],
  userInput:document.forms[0].username,
  pswInput:document.forms[0].password,
  btn:document.querySelector(".sub-login button.selbutton"),
  userInput_reg:/^[\w]+[@][\w]+[.](\w){2,3}[(\w){2,3}]*$|^1[34578]\d{9}$/,//邮箱和手机格式
  pswInput_reg:/^\w{8,16}$/,//正则不是太熟，所以分开两步判断，后续再加入if
//先判断是否\w位数合适，再分别判断是否有一个数字和有一个字母
  main:function(){
    this.usercheck();
    this.pswcheck();
    this.formSubmit();
    this.btnsubmit();
    this.btnRember();
  },
  usercheck:function(){
    ////绑定对象事件
    this.userInput.onfocus=this.getfocus;
    this.userInput.onblur=this.getblur;
    this.userInput.reg=this.userInput_reg;
  },
  pswcheck:function(){
    this.pswInput.onfocus=this.getfocus;
    this.pswInput.onblur=this.getblur;
    this.pswInput.reg=this.pswInput_reg;
  },
  getfocus:function(){
    this.className="focus";

  },
  getblur:function(){
    this.className="";
    Regex.vali(this,this.reg);
  },
  vali:function(txt,reg){
    var error=txt.
      previousElementSibling;
    if(txt.name=="password"){//如果是检测的是密码框，再加入条件判断字符串内是否至少包含一个数字或字母
      var regNum=/.*\d.*/;
      var regLetter=/.*[A-Za-z].*/;
      if(reg.test(txt.value)&&regNum.test(txt.value)&&regLetter.test(txt.value)){
        error.style.display="none";
        return true
      }else{
        error.style.display="block";
        return false
      }
      //否则直接按正则条件式来判断
    }else{
      if(reg.test(txt.value)){
        error.style.display="none";
        return true
      }else{
        error.style.display="block";
        return false
      }
    }
  },
  formSubmit:function(){
    this.loginForm.onsubmit=function(){
      if(Regex.vali(Regex.userInput,Regex.userInput_reg)&&
        Regex.vali(Regex.pswInput,Regex.pswInput_reg)){
        return true;
      }else{
        return false;
      }
    };
  },
  btnRember:function(){
    var btn=document.querySelector(".remeber i");
    btn.onclick=function(){
      if(this.className==""){
        this.className="on";
        remberMe.value="1";
      }else{
        this.className="";
        remberMe.value="0";
      }
    };
  },
  //验证登录信息正确性，错误则全部提示
  btnsubmit:function(){
    this.btn.onclick=function(){
      Regex.vali(Regex.userInput,Regex.userInput_reg);
      Regex.vali(Regex.pswInput,Regex.pswInput_reg);
    }
  }
};
Regex.main();

/**********************选票框左右移动效果框架***********************/
  //.select-content是遮罩框，.select-content下的dl是内容框
  //两个控制按钮放置在遮罩框同级中
//选票框功能
var ticket={
  //左右滑动功能
  //查找content1的左右按钮
  selNext:document.querySelectorAll(".sel-next"),
  selPrev:document.querySelectorAll(".sel-prev"),
  selBox:document.querySelectorAll(".select-content"),
  selContent:document.querySelectorAll(".select-content>dl"),
  navBar:document.querySelectorAll(".navbar li"),
  navMenu:document.querySelectorAll(".nav-menu>div"),
  left:0,
  main:function(){
    this.moveLeft();
    this.moveRight();
    this.navDisplay();
  },
  moveLeft:function(){
    for(var i=0;i<this.selNext.length;i++){
      (function(j){//形成闭包，将遍历时的i值传入点击函数内使用
        ticket.selNext[j].onclick=function(){
          var boxWidth=ticket.selBox[j].clientWidth;//遮罩框的可见宽度
          var contentWidth=ticket.selContent[j].clientWidth;
          var moveWidth=boxWidth-150;
          var canMoveWidth=contentWidth-boxWidth+ticket.left;
          if(contentWidth-(-ticket.left+boxWidth)>0||ticket.left==0){//left==0是初始启动条件，如果内功宽度减去(已移动的距离+遮罩框宽度)大于0，才可以继续左移，否则不能移动（防止溢出）
            if(canMoveWidth>moveWidth){//如果剩下可移动内容宽度跟遮罩框宽度大于"移动距离"，就按"移动距离移动
              ticket.left-=moveWidth;
            }else{
              ticket.left-=contentWidth-boxWidth+ticket.left;}//否则，移动内容减去遮罩框宽度再减去已移动宽度
          }
          //console.log(ticket.left);
          ticket.btnDisplay(j);
          ticket.selContent[j].style.left=ticket.left+"px";
        };
      })(i)
    }

  },
  moveRight:function(){
    //遍历每个Prev按钮
    for(var i=0;i<this.selPrev.length;i++){
      (function(j){
        ticket.selPrev[j].onclick=function(){
          console.log("in"+j);
          var boxWidth=ticket.selBox[j].clientWidth;//返回框的可见宽度
          var moveWidth=boxWidth-150;
          var canMoveWidth=-ticket.left;
          if(-ticket.left>0){//left==0是初始启动条件，如果内容宽度减去(已移动的距离+遮罩框宽度)大于0，才可以继续右移，否则不能移动（防止溢出）
            if(canMoveWidth>moveWidth){//如果剩下可移动内容宽度跟遮罩框宽度大于"移动距离"，就按"移动距离移动
              ticket.left+=moveWidth;
            }else{
              ticket.left+=-ticket.left;}//否则，移动  已经移动的距离
          }
          ticket.btnDisplay(j);
          ticket.selContent[j].style.left=ticket.left+"px";
        };
      })(i)
    }
  },
  //按钮显示函数
  btnDisplay:function(i){
    var tempWidth=this.selContent[i].clientWidth-this.selBox[i].clientWidth;
    if(this.left==0){//左边按钮到头后消失
      setTimeout(function(){ticket.selPrev[i].style.display="none";},600);//延时消失
    }else{
      this.selPrev[i].style.display="block";
    }
    if(-this.left==tempWidth){//右边按钮到头后消失
      setTimeout(function(){ticket.selNext[i].style.display="none";},600);//延时消失
    }else{
      this.selNext[i].style.display="block";
    }
  },
  //分区导航栏显示
  navDisplay:function(){
    for(var i=0;i<this.navBar.length;i++){
      (function(k){
        ticket.navBar[k].onmouseover=function(){
          for(var j=0,len=ticket.navMenu.length;j<len;j++){
            ticket.navMenu[j].style.display="none";
          }
          ticket.navMenu[k].style.display="block";
        }
      })(i)

    }
  }
};
ticket.main();
/************侧边导航栏,楼层跳转***************/
(function(){
  var asides=document.getElementsByClassName("aside");
  var fc=document.getElementsByClassName("fixcate")[0];
  var asbtns=document.getElementsByClassName("asbtn");
  var targetHeight=0;
  var tHarr=[];
  var timer=null;
  function countTH(lis,divs){
    for(var i=0,len=divs.length;i<len;i++){
      if(i==0){
        targetHeight=0;
      }else if(i==lis.length-1){
        targetHeight=divs[i].offsetTop-30;//因为scroll有上下按钮，所以要减去两个按钮的高度30
      } else{
        //计算目标位置，offsetTop为元素相对页面顶部高度，innerHeight为目前显示窗口高度，clientHeight为元素自身高度
        //targetHeight=divs[i].offsetTop-(innerHeight-divs[i].clientHeight)/2;
        targetHeight=divs[i].offsetTop;
      }
      tHarr.push(parseInt(targetHeight));//计算出各个目标块到顶部的高度！
    }
  }
  countTH(asbtns,asides);//计算各个目标高度
  window.onscroll=function(){
    var bodytop=document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
    //clearTimeout(timer);
    if(bodytop>100){
      fc.style.opacity=1;
      fc.style.visibility="visible";
    }else{
      fc.style.opacity=0;
      fc.style.visibility="hidden";
    }
    slider(asbtns,asides);
  };
//遍历四个按钮
  function btnScrollTo(btn,tHarr,speed){//设置三个参数，分别侧边栏按钮类数组，目标高度数组，滚动速度
    for(var i=0;i<btn.length;i++){
      (function(j){//使用闭包抓住遍历的i值来使用
        btn[j].onclick=function(e){
          e.preventDefault();
          ////计算目标位置，offsetTop为元素相对页面顶部高度，innerHeight为目前显示窗口高度，clientHeight为元素自身高度
          console.log(tHarr);
          targetHeight=tHarr[j];
          console.log("tH"+targetHeight);
          //}
          clearInterval(timer);//点击是清除定时器
          move(targetHeight,speed);
        };
      })(i)
    }
  }
  function move(targetHeight,speed){
      timer=setInterval(function(){
      var bodytop=document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;//获取当前body的相对页面顶部的高度
      if(bodytop>targetHeight){//如果bodytop大于目标高度
        bodytop-=speed;
        if(bodytop<=targetHeight){//如果超过了目标高度
          bodytop=targetHeight//就bodytop纠正道目标高度，并且清除定时器
          clearInterval(timer);
        }
      }else{
        bodytop+=speed;
        if(bodytop>=targetHeight){
          bodytop=targetHeight;
          clearInterval(timer);
        }
      }
      document.body.scrollTop=bodytop;
      document.documentElement.scrollTop=bodytop;
      window.pageYOffset=bodytop;
    },10);
  }
  function slider(lis,divs){
    var bodytop=document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
    for(var i=0,len=divs.length;i<len-1;i++){
      (function(k){
        if(bodytop<tHarr[0]){//小于第一个元素到顶部的高度时，侧边栏第一个按钮显示
          clearClass(lis);
          lis[0].className=lis[0].className+" show";
        }else if(bodytop>=tHarr[k]&&bodytop<tHarr[k+1]){//在下标为i和i+1元素到顶部的高度的范围内时，侧边栏下标为i的元素显示
          clearClass(lis);
          lis[k].className=lis[k].className+" show";
        }else if(bodytop>tHarr[k]){//大于最后一个元素到顶部的高度是，侧边栏最后一个按钮显示
          clearClass(lis);
          lis[len-1].className=lis[len-1].className+" show";
        }
      })(i)
    }
  }
  function clearClass(classes){
    for(var i=0,len=classes.length;i<len;i++){
      classes[i].className=classes[i].className.replace("show","");
    }
  }
  btnScrollTo(asbtns,tHarr,20);
})();
/****************正品商城商品box左右切换********************/
(function(){
  var boxs=document.querySelectorAll(".rollingbar>dl");
  var btns=document.querySelectorAll(".rollingbar>.selbtn");
  var count=0;
  function showBox(count){
    for(var i=0;i<boxs.length;i++){
      boxs[i].className="clear";
    }
    boxs[count].className="show clear";
  }
  btns[0].onclick=function(){
    count==0?count++:count=0;
    console.log(count);
    showBox(count);
  };
  btns[1].onclick=function(){
    count==1?count--:count=1;
    console.log(count);
    showBox(count);
  };
})();
/*************************电影票房菜单导航栏********************************/
var lis=document.querySelectorAll(".mboxoffice-nav li");
var dls=document.querySelectorAll(".mboxoffice-content dl");
for(var i=0;i<lis.length;i++){
  (function(k){
    lis[k].onmouseover=function(){
      for(var j=0;j<dls.length;j++){
        dls[j].className="";
      };
      dls[k].className="show";
    };
  })(i)
}
