document.getElementById("root").innerHTML=`<div class="navbar">
    <!-- Left side -->
    <div class="navbar-left">
      <div class="nine-dot-icon">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </div>
      <div class="logo">
        <img src="assets/blues.png" alt="Logo">
        clockify
      </div>
      <span class="company">RootQuotient</span>
      <div class="icon more">⋯</div>
      <button class="upgrade-btn">UPGRADE</button>
    </div>

    <!-- Right side -->
    <div class="navbar-right">
      <div class="icon"><i class="fa-solid fa-gear"></i></div> <!-- settings -->
<div class="icon"><i class="fa-solid fa-bell"></i></div>  <!-- notifications -->
<div class="icon"><i class="fa-solid fa-circle-question"></i></div> <!-- help -->

      <div class="user">SU</div>
    </div>
  </div>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <ul>
        <li class="active"><i class="fa-regular fa-clock"></i> TIME TRACKER</li>
        <li><i class="fa-regular fa-calendar"></i> CALENDAR <i class="fa-regular fa-calendar drag-icon"></i></li>
  
        <p class="section-title">ANALYZE</p>
        <li><i class="fa-solid fa-table-cells"></i> DASHBOARD <i class="fa-regular fa-calendar drag-icon"></i></li>
        <li><i class="fa-solid fa-chart-column"></i> REPORTS <span class="arrow">›</span></li>
  
        <p class="section-title">MANAGE</p>
        <li><i class="fa-regular fa-file-lines"></i> PROJECTS<i class="fa-regular fa-calendar drag-icon"></i></li>
        <li><i class="fa-solid fa-users"></i> TEAM<i class="fa-regular fa-calendar drag-icon"></i></li>
        <li><i class="fa-regular fa-user"></i> CLIENTS<i class="fa-regular fa-calendar drag-icon"></i></li>
        <li><i class="fa-solid fa-tag"></i> TAGS<i class="fa-regular fa-calendar drag-icon"></i></li>
  
        <li class="toggle" id="toggle-btn" onclick="toggleMore()">
          <i class="fa-solid fa-angle-down"></i> SHOW MORE
        </li>
      </ul>
  
      <!-- Hidden items -->
      <ul id="more-items" class="hidden">
        <li><i class="fa-regular fa-calendar-days"></i> TIMESHEET</li>
        <li><i class="fa-solid fa-table-cells"></i> KIOSKS</li>
        <li><i class="fa-solid fa-diagram-project"></i> SCHEDULE</li>
        <li><i class="fa-regular fa-file-invoice"></i> EXPENSES</li>
        <li><i class="fa-regular fa-clock"></i> TIME OFF</li>
        <li><i class="fa-solid fa-chart-line"></i> ACTIVITY</li>
        <li><i class="fa-regular fa-circle-check"></i> APPROVALS</li>
        <li><i class="fa-regular fa-file-invoice-dollar"></i> INVOICES</li>
        
      </ul>
    </aside>
  
    <!-- Content -->
    <main class="content">
        <div class="tracker-bar">
            <input type="text" placeholder="What are you working on?" class="task-input">
          
            <div class="actions">
                <div class="project-dropdown">
                    <!-- Trigger -->
                    <button class="dropdown-toggle" id="drop-toggle">
                      <span class="plus-circle"><i class="fa-solid fa-plus"></i></span> Project
                    </button>
                  
                    <!-- Dropdown Menu -->
                    <div class="dropdown-menu hidden" id="projectMenu">
                      <!-- Search -->
                      <div class="search-box">
                        <i class="fa fa-search"></i>
                        <input type="text" id="searchInput" placeholder="Search Project or Client">
                      </div>
                  
                      <!-- Projects List -->
                      <div class="project-section">
                        <p class="section-label">NO CLIENT</p>
                        <div class="project-item">
                          <span class="dot"></span>
                          <span class="project-name">hello</span>
                          <span class="create-actions">
                            <a href="#" class="create-task">Create Task</a>
                            <i class="fa-regular fa-star"></i>
                          </span>
                        </div>
                      </div>
                  
                      <!-- Create New -->
                      <div class="create-new" id="createNewBtn">
                        <i class="fa-solid fa-plus"></i> Create new Project
                      </div>
                      
                      <!-- Modal -->
                      <div class="modal hidden" id="projectModal">
                        <div class="modal-content">
                          <span class="close-btn" id="closeModal">&times;</span>
                          <h2>Create new Project</h2>
                            <hr>
                          <form>
                            
                            <div class="form-row">
                              <input type="text" placeholder="Enter Project name">
                              
                            </div>
                            
                            <div class="form-row">
                                <div class="color-picker">
                                    <button class="color-btn" id="selectedColor" style="background: #4a5fc1;"></button>
                                    
                                    <div class="color-dropdown hidden" id="colorDropdown">
                                      <div class="swatch-grid">
                                        <!-- Preset Colors -->
                                        <div class="swatch" style="background:#4CAF50;" data-color="#4CAF50"></div>
                                        <div class="swatch" style="background:#E91E63;" data-color="#E91E63"></div>
                                        <div class="swatch" style="background:#9C27B0;" data-color="#9C27B0"></div>
                                        <div class="swatch" style="background:#3F51B5;" data-color="#3F51B5"></div>
                                        <div class="swatch" style="background:#2196F3;" data-color="#2196F3"></div>
                                        <div class="swatch" style="background:#00BCD4;" data-color="#00BCD4"></div>
                                        <div class="swatch" style="background:#FF5722;" data-color="#FF5722"></div>
                                        <div class="swatch" style="background:#795548;" data-color="#795548"></div>
                                      </div>
                                  
                                      <hr>
                                  
                                      <div class="custom-colors">
                                        <div class="swatch" style="background:#F44336;" data-color="#F44336"></div>
                                        <div class="swatch" style="background:#8BC34A;" data-color="#8BC34A"></div>
                                        <div class="swatch" style="background:#673AB7;" data-color="#673AB7"></div>
                                        <div class="swatch add-custom">+</div>
                                        
                                        <input type="color" id="customColorInput" class="hidden">
                                      </div>    
                                    </div>
                                  </div>
                                  
                      
                              
                      
                              
                            </div>
                            <hr>
                            <div class="form-actions">
                              <button type="button" class="cancel-btn">Cancel</button>
                              <button type="submit" class="create-btn">Create</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  
              
              <div class="divider"></div>
              <i class="fa-solid fa-tag tag"></i>
              <div class="divider"></div>
              <i class="fa-solid fa-dollar-sign dollar"></i>
              <div class="divider"></div>
              <span class="timer" id="timer">00:00:00</span>
<button class="start-btn" id="startStopBtn">START</button>
              <i class="fa-solid fa-ellipsis-vertical more"></i>
            </div>
          </div>
          <div class="timesheet">
           
          
            <div id="taskList"></div>
          </div>
          
    </main>
  </div>
  
  <div class="modal hidden" id="deleteModal">
    <div class="modal-content">
      <span class="close-btn" id="closeDeleteModal">&times;</span>
      <h2>Delete Task</h2>
      <hr>
      <p class="delete-confirm" id="delete-msg">Are you sure you want to delete this entry?</p>
      <hr>
      <div class="form-actions delete-actions">
        <button type="button" class="cancel-btn" id="cancelDelete">Cancel</button>
        <button type="button" class="delete-btn" id="confirmDelete">Delete</button>
      </div>
    </div>
    
  </div>
  <div id="toast" class="toast">
    <i class="fa-solid fa-circle-check"></i>
    <span id="toast-message">Time entry has been created</span>
    <span class="toast-close" onclick="closeToast()">&times;</span>
  </div>`;
let selectedProject={};
function toggleMore() {
    const moreItems = document.getElementById("more-items");
    const toggleBtn = document.getElementById("toggle-btn");

    moreItems.classList.toggle("hidden");

    if (moreItems.classList.contains("hidden")) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-angle-down"></i> SHOW MORE';
    } else {
      toggleBtn.innerHTML = '<i class="fa-solid fa-angle-up"></i> SHOW LESS';
    }
  }
  document.querySelector(".dropdown-toggle").addEventListener("click", () => {
    document.getElementById("projectMenu").classList.toggle("hidden");
  });
  
  const modal = document.getElementById("projectModal");
const openBtn = document.getElementById("createNewBtn");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});


document.querySelector(".cancel-btn").addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close on clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Select elements
const projectForm = document.querySelector("#projectModal form");
const projectInput = projectForm.querySelector("input[type='text']");
const projectSection = document.querySelector(".project-section");
const searchInput = document.getElementById("searchInput");


// Save project to localStorage
function saveProject(project) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Load projects into dropdown
function loadProjects() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Reset project list with label
  projectSection.innerHTML = `<p class="section-label">NO CLIENT</p>`;

  projects.forEach((p) => {
    const div = document.createElement("div");
    div.className = "project-item";
    div.innerHTML = `
     <span class="dot" style="background: ${p.color};"></span>
<span class="project-name" style="color: ${p.color};">${p.name}</span>

      
    `;

    div.addEventListener("click", () => {
        console.log("snds",p)
        const createNewBtn = document.getElementById("drop-toggle");
        createNewBtn.innerHTML = `
             <span class="dot" style="background: ${p.color};"></span>
<span class="project-name" style="color: ${p.color};">${p.name}</span>
        `;
        
        selectedProject={name:p.name,color:p.color};
        document.getElementById("projectMenu").classList.toggle("hidden");
        if (searchInput) searchInput.value = '';
      });
    projectSection.appendChild(div);
  });
}
function loadFilteredProjects(projects) {
  // let projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Reset project list with label
  projectSection.innerHTML = `<p class="section-label">NO CLIENT</p>`;

  projects.forEach((p) => {
    const div = document.createElement("div");
    div.className = "project-item";
    div.innerHTML = `
     <span class="dot" style="background: ${p.color};"></span>
<span class="project-name" style="color: ${p.color};">${p.name}</span>

      
    `;

    div.addEventListener("click", () => {
        console.log("snds",p)
        const createNewBtn = document.getElementById("drop-toggle");
        createNewBtn.innerHTML = `
             <span class="dot" style="background: ${p.color};"></span>
<span class="project-name" style="color: ${p.color};">${p.name}</span>
        `;
        
        selectedProject={name:p.name,color:p.color};
        document.getElementById("projectMenu").classList.toggle("hidden");
        if (searchInput) searchInput.value = '';
        loadProjects();
      });
    projectSection.appendChild(div);
  });
}


// Initial load of all projects
loadProjects();

// Handle form submit
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectName = projectInput.value.trim();
  if (!projectName) {
    alert("Please enter a project name!");
    return;
  }

  // Get selected color
  const colorBtn = document.getElementById("selectedColor");
  const projectColor = colorBtn.style.background || "#4a5fc1"; // fallback color

  // Save to localStorage
  selectedProject={name:projectName,color:projectColor};
  saveProject({ name: projectName, color: projectColor });

  // Reload project list
  loadProjects();

  // Update create button UI
  const createNewBtn = document.getElementById("drop-toggle");
  if (selectedProject.name==null) {
    createNewBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Project`;
  } else {
    createNewBtn.innerHTML = `
      <span class="dot" style="background: ${projectColor};"></span>
      <span class="project-name" style="color: ${projectColor};">${projectName}</span>
    `;
  }
  
  document.getElementById("projectMenu").classList.add("hidden");

  // Reset inputs
  projectInput.value = "";
  colorBtn.style.background = "#4a5fc1"; // reset color button
  modal.classList.add("hidden");
});


// Initial load on page refresh
window.addEventListener("DOMContentLoaded", loadProjects);

let debounceTimeout;

searchInput.addEventListener("input", function() {
  clearTimeout(debounceTimeout);
  
  const query = this.value.toLowerCase().trim();
  debounceTimeout = setTimeout(() => {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    const filteredProjects = projects.filter(p => 
      p.name.toLowerCase().includes(query)
    );
    console.log("filter",filteredProjects);
    loadFilteredProjects(filteredProjects);  // Reload filtered projects
  }, 300);  // Wait for 300ms after the user stops typing
});

const colorBtn = document.getElementById("selectedColor");
const colorDropdown = document.getElementById("colorDropdown");
const swatches = document.querySelectorAll(".swatch");
const addCustom = document.querySelector(".add-custom");
const customInput = document.getElementById("customColorInput");

// Toggle dropdown
colorBtn.addEventListener("click", (e) => {
  e.preventDefault();   // prevent form submit
  e.stopPropagation();  // stop event bubbling
  colorDropdown.classList.toggle("hidden");
});

swatches.forEach(swatch => {
  swatch.addEventListener("click", (e) => {
    e.stopPropagation(); // ✅ stop closing modal
    const color = swatch.getAttribute("data-color");
    if (color) {
      colorBtn.style.background = color;
      colorDropdown.classList.add("hidden");
    }
  });
});

addCustom.addEventListener("click", (e) => {
  e.stopPropagation(); // ✅ keep modal open
  customInput.click();
});


// Apply custom color
customInput.addEventListener("input", (e) => {
  const color = e.target.value;

  // 1️⃣ Update color button
  colorBtn.style.background = color;
  //colorDropdown.classList.add("hidden");

  // 2️⃣ Create new swatch in custom-colors
  const customColorsContainer = document.querySelector(".custom-colors");
  const newSwatch = document.createElement("div");
  newSwatch.className = "swatch";
  newSwatch.style.background = color;
  newSwatch.setAttribute("data-color", color);

  // Optional: add click handler to new swatch
  newSwatch.addEventListener("click", (e) => {
    e.stopPropagation();
    colorBtn.style.background = color;
    colorDropdown.classList.add("hidden");
  });

  // Insert before the "add-custom" button
  const addBtn = customColorsContainer.querySelector(".add-custom");
  customColorsContainer.insertBefore(newSwatch, addBtn);
});
window.addEventListener("click", (e) => {
  if (!colorDropdown.contains(e.target)) {
    colorDropdown.classList.add("hidden");
  }
});
addCustom.addEventListener("click", (e) => {
  e.stopPropagation();
  customInput.click(); 
  const rect = addCustom.getBoundingClientRect();
  customInput.style.top = `${addCustom.offsetTop}px`;
  customInput.style.left = `${addCustom.offsetLeft}px`;
  customInput.click(); // opens native color picker
});




let timerInterval;
let isRunning = false;
let seconds = 0;

const timerDisplay = document.getElementById("timer");
const startStopBtn = document.getElementById("startStopBtn");
const taskInput = document.querySelector(".task-input");
const projectBtn = document.getElementById("drop-toggle");

// Format seconds -> HH:MM:SS
function formatTime(sec) {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

let currentTaskId = null;  // 🔑 Track which task is being resumed
let startTime = null;
let endTime = null;

startStopBtn.addEventListener("click", () => {
  
  if (!isRunning) {
    // Start timer
    isRunning = true;
    startTime = new Date();
    startStopBtn.classList.add("stop-btn");
    startStopBtn.textContent = "STOP";

    timerInterval = setInterval(() => {
      seconds++;
      timerDisplay.textContent = formatTime(seconds);
    }, 1000);

  } else {
    // Stop timer
    console.log({})
    isRunning = false;
    endTime = new Date();
    startStopBtn.textContent = "START";
    startStopBtn.classList.remove("stop-btn");
    clearInterval(timerInterval);

    const taskName = taskInput.value.trim() || "Untitled Task";
    const projectName = projectBtn.textContent.trim() || "No Project";
    
    const duration = formatTime(seconds);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("mds",currentTaskId,startTime,endTime);
    if (currentTaskId) {
      // ✅ Append to existing task
      let task = tasks.find(t => t.id == currentTaskId);
      let ss=new Date(startTime);
      console.log("sbj",task.startTime.split("T")[0],ss.toISOString().split("T")[0]);
      if (task) {
        
        if(task.startTime.split("T")[0]==ss.toISOString().split("T")[0]){
        if (!task.durations) task.durations = [];
        task.durations.push({
            id: Math.floor(Math.random() * 100000) + 1,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration
        });
      }
      else{
        const record = {
          id: Math.floor(Math.random() * 1000) + 1,
          taskName:task.taskName,
          projectName:task.projectName,
          projectColor:task.projectColor,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration,
          durations: [
            {
              id: Math.floor(Math.random() * 100000) + 1,
              startTime: startTime.toISOString(),
              endTime: endTime.toISOString(),
              duration
            }
          ],
          createdAt: new Date().toISOString()
        };
        tasks.push(record);
      }
      }
    } else {
      // ✅ Create a new task
      const record = {
        id: Math.floor(Math.random() * 1000) + 1,
        taskName,
        projectName,
        projectColor:selectedProject.color,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration,
        durations: [
          {
            id: Math.floor(Math.random() * 100000) + 1,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            duration
          }
        ],
        createdAt: new Date().toISOString()
      };
      tasks.push(record);
      const createNewBtn = document.getElementById("drop-toggle");
      createNewBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Project`;
    }
    console.log("bhs",tasks);
    showToast();
    // Save back
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reset
    seconds = 0;
    timerDisplay.textContent = "00:00:00";
    taskInput.value = "";
    selectedProject={};
    
    currentTaskId = null;  // reset after stop
    console.log("tasks", tasks);

    renderTasks();
  }
});

function durationToSeconds(duration) {
    if (!duration) return 0; // safety
    const parts = duration.split(":").map(Number); // ["01","23","45"] → [1,23,45]
    const [hours, minutes, seconds] = parts;
    return (hours * 3600) + (minutes * 60) + seconds;
  }
  function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
  
    const formatDate = date => date.toISOString().split("T")[0];
    const durationToSeconds = dur => {
      const parts = dur.split(':').map(Number);
      return parts[0]*3600 + parts[1]*60 + (parts[2]||0);
    };
    const formatTime = sec => {
      const h = Math.floor(sec/3600);
      const m = Math.floor((sec%3600)/60);
      const s = sec%60;
      return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }
  
    // Group tasks by date
    const groups = {};
    tasks.forEach(task => {
      const day = task.startTime.split("T")[0];
      if (!groups[day]) groups[day] = [];
      groups[day].push(task);
    });
  
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6); // last 7 days
  
    const thisWeekDates = [];
    const previousDates = [];
  
    Object.keys(groups).sort((a,b)=>new Date(b) - new Date(a)).forEach(day => {
      const dayDate = new Date(day);
      if(dayDate >= weekAgo) thisWeekDates.push(day);
      else previousDates.push(day);
    });
  
    // Helper: render a week section
    function renderWeekSection(title, dates) {
      const section = document.createElement("div");
      section.className = "week-section";
  
      // Week header with total placeholder
      const weekHeader = document.createElement("div");
      weekHeader.className = "week-header";
      const spanTitle = document.createElement("span");
      spanTitle.textContent = title;
      const spanTotal = document.createElement("span");
      spanTotal.className = "week-total";
      spanTotal.innerHTML = `Week total: <b class="total">00:00:00</b>`;
      weekHeader.appendChild(spanTitle);
      weekHeader.appendChild(spanTotal);
      section.appendChild(weekHeader);
  
      let weekTotalSec = 0;
  
      dates.forEach(day => {
        const daySection = document.createElement("div");
        daySection.className = "day-section";

        groups[day].sort((a, b) => {
          const aTime = a.durations && a.durations.length > 0 
                        ? new Date(a.durations[a.durations.length - 1].startTime)
                        : new Date(a.startTime);
          const bTime = b.durations && b.durations.length > 0 
                        ? new Date(b.durations[b.durations.length - 1].startTime)
                        : new Date(b.startTime);
          return bTime - aTime; // descending
        });
  
        const dateHeader = document.createElement("div");
        dateHeader.className = "day-header";
        const h3 = document.createElement("h3");
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        if(day === formatDate(today)) h3.textContent = "Today";
        else if(day === formatDate(yesterday)) h3.textContent = "Yesterday";
        else h3.textContent = day;
        const spanDayTotal = document.createElement("span");
spanDayTotal.className = "day-total";
spanDayTotal.innerHTML = `Total: <b class="total">00:00:00</b>`;
dateHeader.appendChild(h3);
dateHeader.appendChild(spanDayTotal);
        daySection.appendChild(dateHeader);
  
        const table = document.createElement("table");
        table.className = "task-table";
        let dayTotalSec = 0;
        groups[day].forEach(task => {
          const row = document.createElement("tr");
          const latest = task.durations ? task.durations[task.durations.length-1] : task;
          const start = new Date(latest.startTime).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
          const end = new Date(latest.endTime).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
          const dur = latest.duration;
  
          // Add to week total
          if(task.durations && task.durations.length>0){
            task.durations.forEach(d => {
              weekTotalSec += durationToSeconds(d.duration)
              dayTotalSec+=durationToSeconds(d.duration)
            });
          } else {
            weekTotalSec += durationToSeconds(task.duration);
            dayTotalSec+=durationToSeconds(d.duration);
          }
  
          row.className = "record-row";
          row.innerHTML = `
            <td class="jui">
              <div class="task-inline">
                ${task.durations && task.durations.length>1 ? `<button class="show-more" data-id="${task.id}">${task.durations.length-1}</button>` : ""}
                <input type="text" class="row-task-input" value="${task.taskName}" />
              </div>
            </td>
            <td class="gty">
              <span class="project-dot" style="background: ${task.projectColor};"></span>
              <span class="project-name" style="color: ${task.projectColor};">${task.projectName}</span>
            </td>
            <td><i class="fa-solid fa-tag tag"></i></td>
            <td><i class="fa-solid fa-dollar-sign dollar"></i></td>
            <td>${start} - ${end} <i class="fa-regular fa-calendar"></i></td>
            <td class="duration">${dur}</td>
            <td><i class="fa-solid fa-play icon-btn" data-id="${task.id}"></i></td>
            <td class="action-cell">
              <i class="fa-solid fa-ellipsis-vertical icon-btn menu-toggle"></i>
              <div class="menu-popup hidden">
                <ul>
                  <li class="disabled">Split</li>
                  <li class="duplicate">Duplicate</li>
                  <li class="delete" data-id="${task.id}" task-length="${task.durations.length}">Delete</li>
                  <li class="favorite">Add as favorite</li>
                </ul>
              </div>
            </td>
          `;
          table.appendChild(row);
          const input = row.querySelector(".row-task-input");
          spanDayTotal.querySelector("b").textContent = formatTime(dayTotalSec);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent form submit if inside a form
    const newName = input.value.trim();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const idx = tasks.findIndex(t => t.id === task.id);

    if (idx !== -1) {
      tasks[idx].taskName = newName; // update the task name
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    renderTasks(); // rerender tasks
  }
});

  
          // Subrows for extra durations
          if(task.durations && task.durations.length>1){
            task.durations.slice(0,-1).forEach(d => {
              const subRow = document.createElement("tr");
              subRow.className = "record-row extra-duration hidden";
              const s = new Date(d.startTime).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
              const e = new Date(d.endTime).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
              subRow.innerHTML = `
                <td><input type="text" class="row-task-input subrow-task" value="${task.taskName}" /></td>
                <td><span class="project-dot" style="background: ${task.projectColor};"></span>
                <span class="project-name" style="color: ${task.projectColor};">${task.projectName}</span></td>
                <td class="rtg"><i class="fa-solid fa-tag tag"></i></td>
                <td class="rtg"><i class="fa-solid fa-dollar-sign dollar"></i></td>
                <td class="rtg">${s}  -  ${e} <i class="fa-regular fa-calendar"></i></td>
                <td class="duration  rtg">${d.duration}</td>
                <td class="rtg"><i class="fa-solid fa-play icon-btn" data-id="${task.id}"></i></td>
                <td class="action-cell rtg">
                  <i class="fa-solid fa-ellipsis-vertical icon-btn menu-toggle"></i>
                  <div class="menu-popup hidden">
                    <ul>
                      <li class="disabled">Split</li>
                      <li class="duplicate">Duplicate</li>
                      <li class="delete" data-id="${task.id}" duration-id="${d.id}">Delete</li>
                      <li class="favorite">Add as favorite</li>
                    </ul>
                  </div>
                </td>
              `;
              table.appendChild(subRow);
            });
          }
        });
  
        daySection.appendChild(table);
        section.appendChild(daySection);
      });
  
      // Update week total
      spanTotal.querySelector("b").textContent = formatTime(weekTotalSec);
      taskList.appendChild(section);
    }
  
    // Render this week
    if(thisWeekDates.length > 0) renderWeekSection("This Week", thisWeekDates);
  
    // Render previous weeks
    if(previousDates.length > 0){
      const prevGroups = {};
      previousDates.forEach(dayStr => {
        const date = new Date(dayStr);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Sunday
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        const key = `${weekStart.toLocaleDateString([], {day:'2-digit', month:'short'})} - ${weekEnd.toLocaleDateString([], {day:'2-digit', month:'short'})}`;
        if(!prevGroups[key]) prevGroups[key] = [];
        prevGroups[key].push(dayStr);
      });
  
      Object.keys(prevGroups).forEach(weekRange => {
        renderWeekSection(weekRange, prevGroups[weekRange]);
      });
    }
  }
  
  document.addEventListener("click", (e) => {
    // Close all open menus if clicked outside
    
    document.querySelectorAll(".menu-popup").forEach(menu => {
      
      if (!menu.contains(e.target) && !menu.previousElementSibling.contains(e.target)) {
        menu.classList.add("hidden");
        
      }
    });
    
  
    // Toggle the clicked menu
    if (e.target.classList.contains("menu-toggle")) {
      const menu = e.target.nextElementSibling;
      menu.classList.toggle("hidden");
      const rect = menu.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      
      if (spaceBelow < menu.offsetHeight+10) {
        menu.classList.add('upward'); // show above
      } else {
        menu.classList.remove('upward'); // show below
      }
  
      
    }
  });
  let pendingDelete = { taskId: null, durationId: null };

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const taskId = e.target.getAttribute("data-id");
      const durationId = e.target.getAttribute("duration-id");
      const durationLength = e.target.getAttribute("task-length");
  
      // Save for later confirmation
      pendingDelete = { taskId, durationId };
      console.log("dsd",durationLength,durationId);
      // Open modal
      if(durationLength!=null &&  durationLength>1 && durationId==null){
        document.getElementById("delete-msg").innerText= `Are you sure you want to delete ${durationLength-1} entries?`;
      }
      else{
        document.getElementById("delete-msg").innerText= `Are you sure you want to delete this entry?`;
      }
      
      document.getElementById("deleteModal").classList.remove("hidden");
    }
  });
  // Close modal
document.getElementById("closeDeleteModal").addEventListener("click", () => {
  document.getElementById("deleteModal").classList.add("hidden");
});

document.getElementById("cancelDelete").addEventListener("click", () => {
  document.getElementById("deleteModal").classList.add("hidden");
});

// Confirm delete
document.getElementById("confirmDelete").addEventListener("click", () => {
  if (pendingDelete.taskId) {
    deleteTask(pendingDelete.taskId, pendingDelete.durationId);
  }
  // Reset + close modal
  pendingDelete = { taskId: null, durationId: null };
  document.getElementById("deleteModal").classList.add("hidden");
});

  
  function deleteTask(id, durationId = null) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks = tasks.map(task => {
      if (task.id == id) {
        if (durationId) {
          // delete only one duration inside the task
          console.log("sjnd",task.durations[0].duration,durationId);
          task.durations = task.durations.filter(d => d.id != durationId);
          
        } else {
          // delete the whole task if no durationId is provided
          return null;
        }
      }
      
      return task;
    }).filter(Boolean); // remove nulls (whole tasks removed)
    console.log("snsddd",tasks);
    showToast("delete");
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
  

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-play")) {
      const taskId = e.target.getAttribute("data-id");
  
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const task = tasks.find(t => t.id == taskId);
  
      if (!task) return;
  
      // 🔹 If this task is already running → STOP it and save duration
      if (isRunning && currentTaskId === taskId) {
        clearInterval(timerInterval);
        isRunning = false;
        endTime = new Date();
        startStopBtn.classList.remove("stop-btn");
        startStopBtn.textContent = "START";
  
        const duration = formatTime(seconds);
        let ss=new Date(startTime);
        // ✅ Save duration into task
        if(task.startTime.split("T")[0]==ss.toISOString().split("T")[0]){
        if (!task.durations) task.durations = [];
        task.durations.push({
          id: Math.floor(Math.random() * 100000) + 1,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration
        });
      }
      else{
        const record = {
          id: Math.floor(Math.random() * 1000) + 1,
          taskName:task.taskName,
          projectName:task.projectName,
          projectColor:task.projectColor,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration,
          durations: [
            {
              id: Math.floor(Math.random() * 100000) + 1,
              startTime: startTime.toISOString(),
              endTime: endTime.toISOString(),
              duration
            }
          ],
          createdAt: new Date().toISOString()
        };
        tasks.push(record);
      }
  
        // Update localStorage
        showToast();
        localStorage.setItem("tasks", JSON.stringify(tasks));
  
        // Reset
        seconds = 0;
        timerDisplay.textContent = "00:00:00";
        currentTaskId = null;
  
        renderTasks();
        return;
      }
  
      // 🔹 If another task was running, stop it first
      if (isRunning && currentTaskId !== taskId) {
        clearInterval(timerInterval);
        let ss= new Date(startTime);
        // ⏸️ Save the previous running task before switching
        let prevTask = tasks.find(t => t.id == currentTaskId);
        if(task.startTime.split("T")[0]==ss.toISOString().split("T")[0]){
        if (prevTask) {
          if (!prevTask.durations) prevTask.durations = [];
          prevTask.durations.push({
            id: Math.floor(Math.random() * 100000) + 1,
            startTime: startTime.toISOString(),
            endTime: new Date().toISOString(),
            duration: formatTime(seconds)
          });
        }
      }
      else{
        const record = {
          id: Math.floor(Math.random() * 1000) + 1,
          taskName:task.taskName,
          projectName:task.projectName,
          projectColor:task.projectColor,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration,
          durations: [
            {
              id: Math.floor(Math.random() * 100000) + 1,
              startTime: startTime.toISOString(),
              endTime: endTime.toISOString(),
              duration
            }
          ],
          createdAt: new Date().toISOString()
        };
        tasks.push(record);
      }
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
  
      // 🔹 Start timer for this task
      isRunning = true;
      startTime = new Date();
      seconds = 0; // reset timer
      startStopBtn.classList.add("stop-btn");
      startStopBtn.textContent = "STOP";
  
      timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = formatTime(seconds);
      }, 1000);
  
      currentTaskId = taskId;
    }
  });
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("show-more")) {
      let rows = e.target.closest("tr").nextSibling;
  
      // toggle only rows under this task
      while (rows && rows.classList.contains("extra-duration")) {
        rows.classList.toggle("hidden");
        rows = rows.nextSibling;
      }
    }
  });
  function showToast(action="create") {
    let toast = document.getElementById("toast");
    if(action=="delete"){
      document.getElementById("toast-message").innerText="Entry Deleted"
    }
    else{
      document.getElementById("toast-message").innerText= "Time entry has been created";
    }
    toast.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }  
  function closeToast() {
    let toast = document.getElementById("toast");
    toast.classList.remove("show");
  }



