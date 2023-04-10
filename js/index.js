const todoContainerEl = document.querySelector("#todoContainer");
const todoInputEl = document.querySelector("#todoInput");
const todoButtonEl = document.querySelector("#todoButton");
const logoutButtonEl = document.querySelector("#logoutButton");

const isLogin = () => {
  const loginedUser = localStorage.getItem("login");
  if (!loginedUser) {
    alert("로그인이 필요합니다!");
    location.href = "./signin.html";
  }
};

const readTodo = () => {
  // 처음부터 다 날리고 새로 그리는 것임
  todoContainerEl.innerHTML = "";

  const todos = JSON.parse(localStorage.getItem("todos")).reverse();

  todos.forEach((todo) => {
    const divEl = document.createElement("div");
    const completeEl = document.createElement("input");
    const userEl = document.createElement("p");
    const deleteEl = document.createElement("button");
    const contentEl = document.createElement("label");

    divEl.className = "todoItem";

    completeEl.type = "checkbox";
    completeEl.className = "checkbox";
    completeEl.id = todo.id;
    completeEl.addEventListener("click", () => {
      updateComplete(todo.id, completeEl.checked); // 렉시컬 스코프
    });
    completeEl.checked = todo.complete; // boolean 값을 입력

    deleteEl.type = "button";
    deleteEl.textContent = "X";
    deleteEl.className = "deleteButton";
    deleteEl.addEventListener("click", () => deleteTodo(todo.id));

    contentEl.textContent = todo.content;
    contentEl.htmlFor = todo.id;

    userEl.textContent = todo.user;

    divEl.append(completeEl, contentEl, userEl, deleteEl); // 순서대로 append
    todoContainerEl.append(divEl); // divEl을 todoContainer에 append
  });
};

const createTodo = () => {
  const todoText = todoInputEl.value;
  const todos = JSON.parse(localStorage.getItem("todos"));
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1; // 길이가 0 이상이면, 맨 마지막 todo에 있는 id를 보고 그 id에 +1 한것을 todo에 넣고, 그렇지 않다면, 그냥 1을 대입한다는 의미
  const newTodo = {
    id: newId,
    complete: false,
    content: todoText,
    user: localStorage.getItem("login"),
  };

  todos.push(newTodo);
  // [{..}, newTodo]
  localStorage.setItem("todos", JSON.stringify(todos));
  todoInputEl.value = "";

  readTodo();
};

const deleteTodo = (deleteId) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const filteredTodos = todos.filter((todo) => todo.id !== deleteId); // 필터링을 통해 삭제하려는 id를 제외하고 새로운 배열 생성
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  readTodo();
};

const updateComplete = (updateId, isChecked) => {
  // updateId와 체크유무를 인자로 받음
  const todos = JSON.parse(localStorage.getItem("todos"));
  const updateTodos = todos.map((element) => {
    if (element.id === updateId) {
      element.complete = isChecked;
      return element;
    } else {
      return element;
    }
  });
  localStorage.setItem("todos", JSON.stringify(updateTodos));
  readTodo();
};
// 체크를 했을 때, 새로고침 했을 때 체크된 표시가 유지되어 있어야함.

const logout = () => {
  //로그아웃 버튼 클릭시 로그아웃! 메시지와 함께 ‘login’로컬스토리지 자체를 ‘삭제’해야합니다! 그 후 signin.html로 이동해야합니다

  alert("로그아웃!");
  localStorage.removeItem("login");
  location.href = "./signin.html";
};
// 원래 짰던 코드
// const loginedUser = localStorage.getItem("login");
// if (loginedUser) {
//   alert("로그아웃!");
//   localStorage.setItem("login", "");
//   location.href = "./signin.html";

const init = () => {
  isLogin();

  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }

  readTodo();

  todoButtonEl.addEventListener("click", createTodo);
  logoutButtonEl.addEventListener("click", logout);
};

document.addEventListener("DOMContentLoaded", init);
