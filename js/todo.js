export const todo = () => {
  const todoForm = document.querySelector('#form-todo');
  const author = document.getElementById('author');
  const post = document.getElementById('post');
  const todoTitle = document.querySelector('.todo__title');
  const list = document.querySelector('.todo__list');


  const base = {
    init() {
      this.todo = this.getTodoLS();
      todoCounter();
    },
    todo: [],
    check(id) {
      for (let i = 0; i < this.todo.length; i++) {
        if (this.todo[i].id === id) {
          this.todo[i].ready = true;
        }
      }
      this.setTodoLS();
    },
    addTodo(author, post) {
      const todo = {
        id: 'td' + (Date.now()),
        author,
        post,
        ready: false,
      };

      this.todo.push(todo);
      this.setTodoLS();
      todoCounter();
      return todo;
    },
    getTodoLS() {
      if (localStorage.getItem('todo')) {
        return JSON.parse(localStorage.getItem('todo'))
      }

      return [];
    },

    setTodoLS() {
      localStorage.setItem('todo', JSON.stringify(this.todo))
    },

  };


  const addTodo = event => {
    event.preventDefault();

    const authorText = author.value;
    const postText = post.value;

    const objTodo = base.addTodo(authorText, postText);
    const todoLi = createTodo(objTodo);

    list.append(todoLi);
    todoForm.reset();
  }

  const createTodo = objTodo => {

    const {
      ready,
      author,
      post,
      id
    } = objTodo;

    const todoItem = `
      <article class="post ${ready ? 'post_complete' : ''}">
        <h3 class="post__author">${author}</h3>
        <p class="post__todo">${post}</p>
        ${!ready ? 
          `<button class="post__ready" type="button" data-id=${id}>✔</button>` :
          ''
        }    
      </article>
    `;

    const li = document.createElement('li');
    li.classList.add('todo__list-item')
    li.innerHTML = todoItem;

    return li;
  }

  const renderTodo = () => {
    for (let i = 0; i < base.todo.length; i++) {
      const todoLi = createTodo(base.todo[i]);
      list.append(todoLi);
    }
  }

  const checkTodo = event => {
    const btn = event.target.closest('.post__ready');

    if (btn) {
      const post = btn.closest('.post');
      btn.remove();
      post.classList.add('post_complete');
      const id = btn.dataset.id;
      base.check(id);
    }
  }

  const todoCounter = () => {
    let todoCount = document.querySelector('.todo__count');
    todoCount.textContent = base.todo.length;
  }

  todoForm.addEventListener('submit', addTodo);
  list.addEventListener('click', checkTodo);

  base.init();
  renderTodo();
}