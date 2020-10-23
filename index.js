// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const addTaskForm = document.querySelector(".js-addTaskForm"),
  taskInput = addTaskForm.querySelector("input"),
  pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";
let PENDINGS = [];
let FINISHEDS = [];

function deletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  //html에서 지우기
  pendingList.removeChild(li);

  //ls에서 지우기
  const cleanTasks = PENDINGS.filter(function filterFn(pending) {
    return pending.id !== parseInt(li.id);
  });
  PENDINGS = cleanTasks;
  savePendings();
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);

  // filter는 true인 item들만 가지고 새로운 array만듦
  const cleanTasks = FINISHEDS.filter(function filterFn(finished) {
    return finished.id !== parseInt(li.id);
  });
  FINISHEDS = cleanTasks;
  saveFinisheds();
}

function savePendings() {
  localStorage.setItem(PENDING_LS, JSON.stringify(PENDINGS));
}

function saveFinisheds() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(FINISHEDS));
}0

function returnPendings(event) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newPendingId = PENDINGS.length + 1;
  delBtn.innerText = "❌";
  finBtn.innerText = "✅";

  //html에
  span.innerText = event.target.parentNode.querySelector("span").innerText;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newPendingId;
  pendingList.appendChild(li);

  //ls에
  const taskObj = {
    id: newPendingId,
    text: event.target.parentNode.querySelector("span").innerText
  };
  PENDINGS.push(taskObj);

  delBtn.addEventListener("click", deletePending);
  finBtn.addEventListener("click", paintFinisheds);
  finBtn.addEventListener("click", deletePending);
  savePendings();
}

function paintPendings(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newPendingId = PENDINGS.length + 1;
  delBtn.innerText = "❌";
  finBtn.innerText = "✅";

  //html에
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newPendingId;
  pendingList.appendChild(li);

  //ls에
  const taskObj = {
    id: newPendingId,
    text: text
  };
  PENDINGS.push(taskObj);

  delBtn.addEventListener("click", deletePending);
  finBtn.addEventListener("click", paintFinisheds);
  finBtn.addEventListener("click", deletePending);
  savePendings();
}

function paintFinisheds(event) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const rtnBtn = document.createElement("button");
  const span = document.createElement("span");
  const newFinishedId = FINISHEDS.length + 1;
  delBtn.innerText = "❌";
  rtnBtn.innerText = "⏪";

  //html에
  span.innerText = event.target.parentNode.querySelector("span").innerText;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(rtnBtn);
  li.id = newFinishedId;
  finishedList.appendChild(li);

  //ls에
  const taskObj = {
    id: newFinishedId,
    text: event.target.parentNode.querySelector("span").innerText
  };
  FINISHEDS.push(taskObj);

  delBtn.addEventListener("click", deleteFinished);
  rtnBtn.addEventListener("click", returnPendings);
  rtnBtn.addEventListener("click", deleteFinished);

  saveFinisheds();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = taskInput.value;
  paintPendings(currentValue);
  taskInput.value = "";
}

function loadTasks() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pending) {
      paintPendings(pending.text);
    });
  }
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finished) {
      loadFinisheds(finished.text);
    });
  }
}

function loadFinisheds(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const rtnBtn = document.createElement("button");
  const span = document.createElement("span");
  const newFinishedId = FINISHEDS.length + 1;
  delBtn.innerText = "❌";
  rtnBtn.innerText = "⏪";

  //html에
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(rtnBtn);
  li.id = newFinishedId;
  finishedList.appendChild(li);

  //ls에
  const taskObj = {
    id: newFinishedId,
    text: text
  };
  FINISHEDS.push(taskObj);

  delBtn.addEventListener("click", deleteFinished);
  rtnBtn.addEventListener("click", returnPendings);
  rtnBtn.addEventListener("click", deleteFinished);

  saveFinisheds();
}

function init() {
  loadTasks();
  addTaskForm.addEventListener("submit", handleSubmit);
}

init();
