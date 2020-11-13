(()=>{"use strict";window.GameConstants={Fireball:{size:fireballSize||24,speed:getFireballSpeed||function(e){return e?2:5}},Wizard:{speed:wizardSpeed||2,width:wizardWidth||61,getHeight:getWizardHeight||function(e){return 1.377*e},getX:getWizardX||function(e){return e/3},getY:getWizardY||function(e){return e-100}}},window.Game=function(){var e=300,t=700,n=["Кекс","Катя","Игорь"],i={},s="-reversed";i[0]={width:61,height:84,url:"img/wizard.gif"},i[0+s]={width:61,height:84,url:"img/wizard-reversed.gif"},i[1]={width:24,height:24,url:"img/fireball.gif"};var r={0:function(n,i,s){i.keysPressed.UP&&n.y>0&&(n.direction=-9&n.direction,n.direction=4|n.direction,n.y-=n.speed*s*2),i.keysPressed.UP||n.y<e-n.height&&(n.direction=-5&n.direction,n.direction=8|n.direction,n.y+=n.speed*s/3),i.keysPressed.LEFT&&(n.direction=-3&n.direction,n.direction=1|n.direction,n.x-=n.speed*s),i.keysPressed.RIGHT&&(n.direction=-2&n.direction,n.direction=2|n.direction,n.x+=n.speed*s),n.y<0&&(n.y=0),n.y>e-n.height&&(n.y=e-n.height),n.x<0&&(n.x=0),n.x>t-n.width&&(n.x=t-n.width)},1:function(e,n,i){1&e.direction&&(e.x-=e.speed*i),2&e.direction&&(e.x+=e.speed*i),(e.x<0||e.x>t)&&(e.state=1)}},a={CONTINUE:0,WIN:1,FAIL:2,PAUSE:3,INTRO:4},o={0:function(e){return e.garbage.filter((function(e){return 1===e.type})).filter((function(e){return e.x<10&&e.y>240}))[0]?a.WIN:a.CONTINUE}},d={0:function(n){return n.objects.push({direction:2,height:window.GameConstants.Wizard.getHeight(window.GameConstants.Wizard.width),speed:window.GameConstants.Wizard.speed,sprite:i[0],state:0,type:0,width:window.GameConstants.Wizard.width,x:window.GameConstants.Wizard.getX(t),y:window.GameConstants.Wizard.getY(e)}),n}},c=function(e){this.container=e,this.canvas=document.createElement("canvas"),this.canvas.width=e.clientWidth,this.canvas.height=e.clientHeight,this.container.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._pauseListener=this._pauseListener.bind(this),this.setDeactivated(!1)};c.prototype={level:0,setDeactivated:function(e){this._deactivated!==e&&(this._deactivated=e,e?this._removeGameListeners():this._initializeGameListeners())},getInitialState:function(){return{currentStatus:a.CONTINUE,garbage:[],lastUpdated:null,keysPressed:{ESC:!1,LEFT:!1,RIGHT:!1,SPACE:!1,UP:!1},levelStartTime:null,objects:[],startTime:null}},initializeLevelAndStart:function(e){(e=void 0===e||e)||!this.state?(this._imagesArePreloaded=void 0,this.state=this.getInitialState(),this.state=d[this.level](this.state)):this.state.currentStatus=a.CONTINUE,this.state.levelStartTime=Date.now(),this.state.startTime||(this.state.startTime=this.state.levelStartTime),this._preloadImagesForLevel(function(){this.render(),this._initializeGameListeners(),this.update()}.bind(this))},pauseLevel:function(e){e&&(this.state.currentStatus=e),this.state.keysPressed.ESC=!1,this.state.lastUpdated=null,this._removeGameListeners(),window.addEventListener("keydown",this._pauseListener),this._drawPauseScreen()},_pauseListener:function(e){if(32===e.keyCode&&!this._deactivated){e.preventDefault();var t=this.state.currentStatus===a.WIN||this.state.currentStatus===a.FAIL;this.initializeLevelAndStart(t),window.removeEventListener("keydown",this._pauseListener)}},_drawPauseScreen:function(){var e;switch(this.state.currentStatus){case a.WIN:if(window.renderStatistics){var t=this._generateStatistics(new Date-this.state.startTime),n=this._shuffleArray(Object.keys(t));return void window.renderStatistics(this.ctx,n,n.map((function(e){return t[e]})))}e="Вы победили Газебо!\nУра!";break;case a.FAIL:e="Вы проиграли!";break;case a.PAUSE:e="Игра на паузе!\nНажмите Пробел, чтобы продолжить";break;case a.INTRO:e="Добро пожаловать!\nНажмите Пробел для начала игры"}this._drawMessage(e)},_generateStatistics:function(e){for(var t={Вы:e},i=0;i<n.length;i++){var s=e+(3e3*Math.random()-1500);s<1e3&&(s=1e3),t[n[i]]=s}return t},_shuffleArray:function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),i=e[t];e[t]=e[n],e[n]=i}return e},_drawMessage:function(e){var t=this.ctx,n=function(e,n,i,s){t.beginPath(),t.moveTo(e,n),t.lineTo(e+10,n+s/2),t.lineTo(e,n+s),t.lineTo(e+i/2,n+s-10),t.lineTo(e+i,n+s),t.lineTo(e+i-10,n+s/2),t.lineTo(e+i,n),t.lineTo(e+i/2,n+10),t.lineTo(e,n),t.stroke(),t.closePath(),t.fill()};t.fillStyle="rgba(0, 0, 0, 0.7)",n(190,40,320,100),t.fillStyle="rgba(256, 256, 256, 1.0)",n(180,30,320,100),t.fillStyle="#000",t.font="16px PT Mono",e.split("\n").forEach((function(e,n){t.fillText(e,200,80+20*n)}))},_preloadImagesForLevel:function(e){if(void 0===this._imagesArePreloaded&&(this._imagesArePreloaded=[]),this._imagesArePreloaded[this.level])e();else for(var t=Object.keys(i),n=t.length,s=this,r=function(t){var i=new Image(t.width,t.height);i.onload=function(){t.image=i,0==--n&&(s._imagesArePreloaded[s.level]=!0,e())},i.src=t.url},a=0;a<t.length;a++)r(i[t[a]])},updateObjects:function(e){var t=this.state.objects.filter((function(e){return 0===e.type}))[0];this.state.keysPressed.SHIFT&&(this.state.objects.push({direction:t.direction,height:window.GameConstants.Fireball.size,speed:window.GameConstants.Fireball.speed(!!(1&t.direction)),sprite:i[1],type:1,width:window.GameConstants.Fireball.size,x:2&t.direction?t.x+t.width:t.x-window.GameConstants.Fireball.size,y:t.y+t.height/2}),this.state.keysPressed.SHIFT=!1),this.state.garbage=[];var n=this.state.objects.filter((function(t){return r[t.type](t,this.state,e),1!==t.state||(this.state.garbage.push(t),!1)}),this);this.state.objects=n},checkStatus:function(){if(this.state.currentStatus===a.CONTINUE){this.commonRules||(this.commonRules=[function(e){return 1===e.objects.filter((function(e){return 0===e.type}))[0].state?a.FAIL:a.CONTINUE},function(e){return e.keysPressed.ESC?a.PAUSE:a.CONTINUE},function(e){return Date.now()-e.startTime>18e4?a.FAIL:a.CONTINUE}]);for(var e=this.commonRules.concat(o[this.level]),t=a.CONTINUE;t===a.CONTINUE&&e.length;)t=e.shift()(this.state);this.state.currentStatus=t}},setGameStatus:function(e){this.state.currentStatus!==e&&(this.state.currentStatus=e)},render:function(){this.ctx.clearRect(0,0,t,e),this.state.objects.forEach((function(e){if(e.sprite){var t=1&e.direction,n=i[e.type+(t?s:"")]||i[e.type];this.ctx.drawImage(n.image,e.x,e.y,e.width,e.height)}}),this)},update:function(){this.state.lastUpdated||(this.state.lastUpdated=Date.now());var e=(Date.now()-this.state.lastUpdated)/10;switch(this.updateObjects(e),this.checkStatus(),this.state.currentStatus){case a.CONTINUE:this.state.lastUpdated=Date.now(),this.render(),requestAnimationFrame(function(){this.update()}.bind(this));break;case a.WIN:case a.FAIL:case a.PAUSE:case a.INTRO:this.pauseLevel()}},_onKeyDown:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!0;break;case 39:this.state.keysPressed.RIGHT=!0;break;case 38:this.state.keysPressed.UP=!0;break;case 27:this.state.keysPressed.ESC=!0}e.shiftKey&&(this.state.keysPressed.SHIFT=!0)},_onKeyUp:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!1;break;case 39:this.state.keysPressed.RIGHT=!1;break;case 38:this.state.keysPressed.UP=!1;break;case 27:this.state.keysPressed.ESC=!1}e.shiftKey&&(this.state.keysPressed.SHIFT=!1)},_initializeGameListeners:function(){window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp)},_removeGameListeners:function(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp)}},c.Verdict=a;var l=new c(document.querySelector(".demo"));return window.restartGame=function(e,t){i[0].url=e,i[0+s].url=t,l.initializeLevelAndStart(),l.setGameStatus(a.INTRO)},window.restartGame("img/wizard.gif","img/wizard-reversed.gif"),l}(),window.debounce=function(e){let t=null;return function(...n){t&&window.clearTimeout(t),t=setTimeout((function(){e(...n)}),500)}},(()=>{const e=function(e,t){return Math.round(e+Math.random()*(t-e))};window.util={getRandRange:e,getRandElement:function(t,n=!1){const i=!1===n?t.length-1:t.length;return t[e(0,i)]},clearAllChildren:function(e){e.innerHTML=""},createErrorMessage:function(e){const t=document.createElement("div");t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.backgroundColor="red",t.style.textAlign="center",t.style.width="100%",t.style.height="40px",t.style.lineHeight="40px",0===e.length&&(e="Ошибка загрузки"),t.textContent=e,document.body.append(t),setTimeout((function(){t.remove()}),1e4)}}})(),window.renderStatistics=function(e,t,n){!function(e,t,n,i,s){e.fillStyle=s,e.fillRect(110,20,420,270),e.fillStyle="#fff",e.fillRect(100,10,420,270)}(e,0,0,0,"rgba(0, 0, 0, 0.7)"),e.font="16px PT Mono",e.fillStyle="#000",e.textBaseline="hanging",e.fillText("Ура вы победили!",125,30),e.fillText("Список результатов:",125,46),e.translate(0,window.Game.canvas.height);const i=function(e){let t=e[0];for(let n=1;n<e.length;n++)e[n]>t&&(t=e[n]);return t}(n);for(let s=0;s<t.length;s++){e.fillStyle="#000",e.fillText(t[s],125+90*s,-46),e.rotate(-Math.PI/2);let r=150*n[s]/i;"Вы"===t[s]?e.fillStyle="rgba(255, 0, 0, 1)":e.fillStyle=`hsl(240, ${Math.round(100*Math.random())}%, 50%)`,e.fillRect(60,125+90*s,r,40),e.rotate(Math.PI/2)}},window.backend={load:function(e,t){const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(function(){e(n.response)})),n.addEventListener("error",(function(){t(n.statusText)})),n.addEventListener("timeout",(function(){t("Превышено время ожидания")})),n.open("GET","https://21.javascript.pages.academy/code-and-magick/data"),n.send()},save:function(e,t,n){const i=new XMLHttpRequest;i.responseType="json",i.addEventListener("load",(function(){t()})),i.addEventListener("error",(function(){n(i.statusText)})),i.addEventListener("timeout",(function(){n("Превышено время ожидания")})),i.open("POST","https://21.javascript.pages.academy/code-and-magick"),i.send(e)}},(()=>{const e=document.querySelector(".setup-user-name"),t=document.querySelector(".setup"),n=document.querySelector(".setup-open"),i=t.querySelector(".setup-close");e.addEventListener("keydown",(function(t){"Escape"===t.key&&(t.stopPropagation(),e.blur())}));const s=function(e){"Escape"===e.key&&(e.preventDefault(),o())},r=function(e){"Enter"===e.key&&(e.preventDefault(),o())},a=function(){t.style.top="80px",t.style.left="50%",t.classList.remove("hidden"),document.addEventListener("keydown",s),i.addEventListener("keydown",r)},o=function(){t.classList.add("hidden"),document.removeEventListener("keydown",s),i.removeEventListener("keydown",r)};n.addEventListener("click",(function(){a()})),n.addEventListener("keydown",(function(e){"Enter"===e.key&&a()})),i.addEventListener("click",(function(){o()}));const d=t.querySelector(".setup-wizard-form");d.addEventListener("submit",(function(e){e.preventDefault(),window.backend.save(new FormData(d),(function(){o()}),window.util.createErrorMessage)})),window.dialog={setup:t,closePopup:o}})(),(()=>{const e=window.dialog.setup,t=e.querySelector(".setup-similar"),n=e.querySelector(".setup-similar-list"),i=document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item"),s=function(e){let t=i.cloneNode(!0);t.querySelector(".setup-similar-label").textContent=e.name;const n=t.querySelector(".setup-similar-wizard");return n.querySelector(".wizard-coat").style.fill=e.colorCoat,n.querySelector(".wizard-eyes").style.fill=e.colorEyes,t};window.render=function(e){window.util.clearAllChildren(n);const i=document.createDocumentFragment();for(let t=0;t<4;t++)i.appendChild(s(e[t]));n.appendChild(i),t.classList.remove("hidden")}})(),(()=>{const e=["rgb(101, 137, 164)","rgb(241, 43, 107)","rgb(146, 100, 161)","rgb(56, 159, 117)","rgb(215, 210, 55)","rgb(0, 0, 0)"],t=["black","red","blue","yellow","green"],n=["#ee4830","#30a8ee","#5ce6c0","#e848d5","#e6e848"];let i=[],s="rgb(101, 137, 164)",r="black";const a=function(e){let t=0;return e.colorCoat===s&&(t+=2),e.colorEyes===r&&(t+=1),t},o=function(){const e=i.sort((function(e,t){let n=a(t)-a(e);var i,s;return 0===n&&(n=(i=e.name)>(s=t.name)?1:i<s?-1:0),n}));window.render(e)},d=window.debounce(o),c=window.debounce(o),l=document.querySelector(".setup-wizard-appearance"),u=l.querySelector(".setup-wizard"),h=u.querySelector(".wizard-coat"),f=l.querySelector("[name=coat-color]");h.addEventListener("click",(function(){let t=window.util.getRandElement(e);h.style.fill=t,f.value=t,s=t,d()}));const w=u.querySelector(".wizard-eyes"),y=l.querySelector("[name=eyes-color]");w.addEventListener("click",(function(){let e=window.util.getRandElement(t);w.style.fill=e,y.value=e,r=e,c()}));const m=document.querySelector(".setup-fireball-wrap"),p=m.querySelector("[name=fireball-color]");m.addEventListener("click",(function(){let e=window.util.getRandElement(n);m.style.backgroundColor=e,p.value=e})),window.backend.load((function(e){i=e,o()}),window.util.createErrorMessage)})(),(()=>{const e=window.dialog.setup,t=e.querySelector(".upload");t.addEventListener("mousedown",(function(n){n.preventDefault();let i=!1,s={x:n.clientX,y:n.clientY};const r=function(t){i=!0;const n=s.x-t.clientX,r=s.y-t.clientY;s={x:t.clientX,y:t.clientY},e.style.left=e.offsetLeft-n+"px",e.style.top=e.offsetTop-r+"px"},a=function(){if(document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",a),i){const e=function(n){n.preventDefault(),t.removeEventListener("click",e)};t.addEventListener("click",e)}};document.addEventListener("mousemove",r),document.addEventListener("mouseup",a)}))})()})();