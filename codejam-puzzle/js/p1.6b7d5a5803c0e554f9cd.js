(()=>{"use strict";const e=document.querySelector(".play-field-wrapper"),t=document.querySelector(".moves");class i{#e;#t;#i;typeF;moves;time;sound=!1;constructor(i,s){this.moves=0,t.textContent=`Moves: ${this.moves}`,this.typeF=s,this.matrix=i,this.renderField(this.matrix),this.#e=!1,e.addEventListener("click",this.moveTile.bind(this)),e.addEventListener("drag",(function(e){e.preventDefault()})),e.addEventListener("dragstart",this.dragTile.bind(this)),e.addEventListener("drop",this.dropTile.bind(this)),e.addEventListener("dragend",this.dropTile.bind(this))}moveTile(e){if(e.target.classList.contains("gem")&&!1===this.#e&&e.target!==document.querySelector("#e0")){this.#e=!0;let i=+e.target.textContent;if(!this.#i.some((t=>t.tile===e.target)))return void(this.#e=!1);{let t;this.#i.forEach((i=>{e.target===i.tile&&(t=i.direction)})),e.target.classList.add(`move${t}`)}this.updateMatrix(i),this.moves++,t.textContent=`Moves: ${this.moves}`,this.sound&&this.playAudio(),setTimeout(function(){this.renderField(this.matrix),this.#e=!1}.bind(this),200)}}dragTile(e){e.target.classList.add("dragging"),this.#t=e.target}dropTile(e){if(e.preventDefault(),e.target===document.querySelector("#e0")){if(e.target===document.querySelector("#e0")){let e=+this.#t.textContent;this.updateMatrix(e),this.sound&&this.playAudio(),this.moves++,t.textContent=`Moves: ${this.moves}`,this.renderField(this.matrix)}}else this.#t.classList.remove("dragging")}updateMatrix(e){let t=this.matrix.flat();const i=t.indexOf(0),s=t.indexOf(e);t.splice(i,1,e),t.splice(s,1,0);const r=[];for(let e=0;e<this.typeF;e++)r.push(t.slice(e*this.typeF,(e+1)*this.typeF));this.matrix=r}isDraggable(){this.#i=[],document.querySelectorAll(".gem").forEach((e=>{let t=+e.textContent;const i=this.getCoords(t),s=this.getCoords(0);s.x-i.x==1&&s.y===i.y&&this.#i.push({tile:e,direction:"Right"}),s.x-i.x==-1&&s.y===i.y&&this.#i.push({tile:e,direction:"Left"}),s.y-i.y==1&&s.x===i.x&&this.#i.push({tile:e,direction:"Bottom"}),s.y-i.y==-1&&s.x===i.x&&this.#i.push({tile:e,direction:"Top"})})),this.#i.forEach((e=>{e.tile.classList.add("draggable"),e.tile.setAttribute("draggable","true")}))}getCoords(e){let t={};return this.matrix.forEach(((i,s)=>{i.forEach(((i,s)=>{i===e&&(t.x=s)})),i.includes(e)&&(t.y=s)})),t}renderField(t){e.classList.remove("fieldSize3"),e.classList.remove("fieldSize4"),e.classList.remove("fieldSize8"),e.classList.remove("fieldRecords"),e.classList.add(`fieldSize${this.typeF}`),e.replaceChildren();let i=1;t.forEach((t=>t.forEach((t=>{e.insertAdjacentHTML("beforeend",`<div class="gem" id='e${t}' data-position='${i}'>${t}</div>`),i++})))),document.querySelector("#e0").classList.add("zero"),document.querySelector("#e0").addEventListener("dragover",(function(e){e.preventDefault()})),this.isDraggable()}paused(){e.replaceChildren(),e.insertAdjacentHTML("beforeend","<div class='pause'><h2>Game is Paused</h2></div>")}playAudio(){new Audio("../assets/audio/click.wav").play()}}const s=document.querySelector(".header-wrapper"),r=document.querySelector(".times"),o=document.querySelector(".pause"),a=document.querySelector(".play-field-wrapper");new class{type;PlayField;playTime;gameActive;records;sortType;constructor(){this.gameActive=!0,this.records=[],this.sortType="time",this.playTime=new Date(2e3,1,1,0,0,0),r.textContent="Time: 00:00:00",this.timer(),this.type=+document.querySelector(".field-size").value,this.matrix=this.checkSolvability(),this.PlayField=new i(this.matrix,this.type),s.addEventListener("click",this.controls.bind(this)),o.addEventListener("click",this.pause.bind(this)),a.addEventListener("click",this.chechWin.bind(this)),a.addEventListener("click",this.sortRecords.bind(this)),window.addEventListener("beforeunload",this.setLocal.bind(this)),window.addEventListener("load",this.getLocal.bind(this))}controls(e){e.target===document.querySelector(".new")&&this.newGame(),e.target===document.querySelector(".refresh")&&this.refresh(),e.target===document.querySelector(".sound")&&this.sound(e)}sound(e){this.PlayField.sound?(this.PlayField.sound=!1,e.target.textContent="Sound: Off"):(this.PlayField.sound=!0,e.target.textContent="Sound: On")}refresh(){this.matrix=this.checkSolvability(),this.PlayField.matrix=this.matrix,this.PlayField.renderField(this.matrix),this.PlayField.moves=0,document.querySelector(".moves").textContent="Moves: 0",this.playTime=new Date(2e3,1,1,0,0,0),r.textContent="Time: 00:00:00"}newGame(){this.type=+document.querySelector(".field-size").value,this.matrix=this.generateMatrix(),this.PlayField.matrix=this.matrix,this.PlayField.typeF=this.type,this.PlayField.moves=0,this.gameActive=!0,document.querySelector(".pause").textContent="Pause",this.playTime=new Date(2e3,1,1,0,0,0),r.textContent="Time: 00:00:00",document.querySelector(".moves").textContent="Moves: 0",this.PlayField.renderField(this.matrix)}pause(){this.gameActive?(this.gameActive=!1,document.querySelector(".pause").textContent="Play",this.paused()):(this.gameActive=!0,this.PlayField.renderField(this.matrix),document.querySelector(".pause").textContent="Pause")}generateMatrix(){let e=[];for(;e.length<Math.pow(this.type,2);){let t=this.getRandomInt(0,Math.pow(this.type,2)-1);e.includes(t)||e.push(t)}let t=[];for(let i=0;i<this.type;i++)t.push(e.slice(i*this.type,(i+1)*this.type));return t}checkSolvability(){let e=this.generateMatrix();for(;!this.isSolvable(e);)e=this.generateMatrix();return e}getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}setTime(e){return r.textContent=`Time: ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`,e}timer(){setInterval(function(){!0===this.gameActive&&(this.playTime=new Date(Date.parse(this.playTime)+1e3),this.setTime(this.playTime))}.bind(this),1e3)}paused(){a.replaceChildren(),a.classList.add("fieldRecords"),this.renderRecords()}renderRecords(){if(0===this.records.length)return void a.insertAdjacentHTML("beforeend","<div class='paused'><h2>Game is Paused</h2><h3>Top Results</h3><div class='records'><div class='records-head records-elem'><div class ='pos'>Position</div><div class='mov sort-mov'>Moves</div><div class='time sort-time'>Time</div></div></div>");let e;a.replaceChildren(),e="mov"===this.sortType?0:1,this.records.sort(((t,i)=>parseInt(t[e])-parseInt(i[e])));for(let e=0;e<=this.records.length;e++)if(0===e)a.insertAdjacentHTML("beforeend","<div class='paused'><h2>Game is Paused</h2><h3>Top Results</h3><div class='records'><div class='records-head records-elem'><div class ='pos'>Position</div><div class='mov sort-mov'>Moves</div><div class='time sort-time'>Time</div></div></div>");else{const t=new Date(+this.records[e-1][1]),i=`${t.getHours().toString().padStart(2,"0")}:${t.getMinutes().toString().padStart(2,"0")}:${t.getSeconds().toString().padStart(2,"0")}`;document.querySelector(".records").insertAdjacentHTML("beforeend",`<div class='records-elem'><div class ='pos'>${e}</div><div class='mov'>${this.records[e-1][0]}</div><div class='time'>${i}</div></div>`)}document.querySelector(`.sort-${this.sortType}`).classList.add("sorted")}chechWin(){const e=[];for(let t=1;t<Math.pow(this.type,2);t++)e.push(t);if(e.push(0),this.PlayField.matrix.flat().join("")===e.join("")){const e=Date.parse(this.playTime),t=`${this.playTime.getHours().toString().padStart(2,"0")}:${this.playTime.getMinutes().toString().padStart(2,"0")}:${this.playTime.getSeconds().toString().padStart(2,"0")}`,i=this.PlayField.moves;this.records.push([i,e]),this.records.sort(((e,t)=>parseInt(e[1])-parseInt(t[1]))),this.records=this.records.slice(0,10),this.refresh(),alert(`Hooray! You solved the puzzle in ${t} and ${i} moves!`)}}setLocal(){const e=this.records.join("@");localStorage.setItem("records",e),localStorage.setItem("type",this.type);const t=this.PlayField.matrix.flat();localStorage.setItem("matrix",t),localStorage.setItem("moves",this.PlayField.moves),localStorage.setItem("time",Date.parse(this.playTime))}getLocal(){if(localStorage.getItem("records")){const e=localStorage.getItem("records");this.records=e.split("@").map((e=>e.split(",")))}if(localStorage.getItem("type")?(this.type=+localStorage.getItem("type"),this.PlayField.typeF=+localStorage.getItem("type")):this.type=+document.querySelector(".field-size").value,localStorage.getItem("matrix")){const e=localStorage.getItem("matrix").split(",").map((e=>+e));let t=[];for(let i=0;i<this.type;i++)t.push(e.slice(i*this.type,(i+1)*this.type));this.matrix=t,this.PlayField.matrix=t,this.PlayField.renderField(t)}localStorage.getItem("moves")&&(this.PlayField.moves=+localStorage.getItem("moves"),document.querySelector(".moves").textContent=`Moves: ${this.PlayField.moves}`),localStorage.getItem("time")&&(this.playTime=new Date(+localStorage.getItem("time")),this.setTime(this.playTime)),localStorage.clear()}sortRecords(e){if(e.target===document.querySelector(".sort-mov")){if("mov"===this.sortType)return;this.sortType="mov",this.renderRecords()}if(e.target===document.querySelector(".sort-time")){if("time"===this.sortType)return;this.sortType="time",this.renderRecords()}}isSolvable(e){let t;e.forEach(((e,i)=>{e.includes(0)&&(t=i)}));const i=e.flat();i.splice(i.indexOf(0),1);const s=i.reduce(((e,t,i,s)=>(s.slice(i).forEach((i=>{i<t&&(e+=1)})),e)),0);return 3===e.length?!(s%2>0):4===e.length||e.length?(s+t)%2>0:void 0}}})();