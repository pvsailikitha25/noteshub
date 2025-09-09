let loggedUser = {};
const users = [];
let heroText = "Learn. Practice. Master.";
let i = 0;

// Hero typing effect
function typeHero(){
  if(i < heroText.length){
    document.getElementById("hero-text").innerHTML += heroText.charAt(i);
    i++;
    setTimeout(typeHero,100);
  }
}

// Login
document.getElementById("login-btn").addEventListener("click", ()=>{
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const year = document.getElementById("degree-year").value;

  if(username.toLowerCase() === "admin"){
    document.getElementById("login-error").innerText = "Admin login not allowed!";
    return;
  }
  if(!username || !password || !year){
    document.getElementById("login-error").innerText = "All fields required!";
    return;
  }

  loggedUser = { username, password, year, score:0, certificates:[] };
  users.push(loggedUser);

  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("main-app").classList.remove("hidden");
  typeHero();
  initChapters();
  openTab("Python");
  updateProfile();
});

// Tabs
function openTab(tabName){
  document.querySelectorAll(".tabcontent").forEach(tab=>tab.style.display="none");
  document.querySelectorAll(".tablink").forEach(btn=>btn.classList.remove("active"));
  document.getElementById(tabName).style.display="block";
  const btn = Array.from(document.getElementsByClassName("tablink"))
              .find(b=>b.textContent===tabName);
  if(btn) btn.classList.add("active");
}

// Notes Data
const notesData = {
  "1": { "Python": { "Basics": "Variables, print(), indentation...", "DataTypes":"Numbers, Strings, Lists...", "ControlFlow":"if, for, while..." },
         "Java": { "Basics": "Variables, Types...", "ControlFlow":"if, switch, loops..." },
         "C": { "Basics": "printf, scanf...", "ControlFlow":"Loops, if else..." } },
  "2": { "Python": { "Functions":"def, lambda...", "OOP":"Classes, Objects..." }, "Java":{ "OOP":"Classes, Objects, Polymorphism..." }, "C":{ "Functions":"Functions, Pointers..." } },
  "3": { "Python":{ "Advanced":"Decorators, Generators, File I/O..." }, "Java":{ "Advanced":"Multithreading, Streams..." }, "C":{ "Advanced":"Memory management, File I/O..." } },
  "4": { "Python": {}, "Java": {}, "C": {} }
};

// Initialize Chapters
function initChapters(){
  ["Python","Java","C"].forEach(lang=>{
    const div = document.getElementById(`${lang}-chapters`);
    div.innerHTML = "";
    const chapters = notesData[loggedUser.year][lang] || {};
    for(let chap in chapters){
      const btn = document.createElement("button");
      btn.textContent = chap;
      btn.onclick = ()=>showNote(lang, chap);
      div.appendChild(btn);
    }
  });
}

function showNote(lang, chap){
  const note = notesData[loggedUser.year][lang][chap];
  document.getElementById(`${lang}-Notes`).innerHTML = 
    `<h3>${chap}</h3><p>${note}</p>
     <button onclick="downloadNote('${lang}','${chap}')">Download Note</button>`;
}

function downloadNote(lang, chap){
  const content = notesData[loggedUser.year][lang][chap];
  const a = document.createElement("a");
  const file = new Blob([content], {type:"text/plain"});
  a.href = URL.createObjectURL(file);
  a.download = `${lang}-${chap}-Note.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Profile
function updateProfile(){
  document.getElementById("profile-section").innerHTML=
    `<p><strong>Username:</strong> ${loggedUser.username}</p>
     <p><strong>Degree Year:</strong> ${loggedUser.year}</p>
     <p><strong>Score:</strong> ${loggedUser.score}</p>
     <p><strong>Certificates:</strong> ${loggedUser.certificates.join(", ") || "None"}</p>`;
}

// Initialize first tab
openTab("Python");
