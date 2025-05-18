// Масив для зберігання справ
let todos = [];

// Функція для додавання нової справи
function newTodo() {
    const input = document.getElementById('new-todo');
    const text = input.value.trim();
    
    if (text !== '') {
        // Створюємо новий об'єкт справи
        const todo = {
            id: Date.now(), // Унікальний ідентифікатор на основі поточного часу
            text: text,     // Текст справи
            completed: false // Статус виконання
        };
        
        // Додаємо до масиву
        todos.push(todo);
        
        // Очищаємо поле вводу
        input.value = '';
        
        // Виводимо в консоль для перевірки
        console.log('Додано нову справу:', todo);
        console.log('Всі справи:', todos);
        
        // Оновлюємо відображення списку та лічильників
        render(todos);
        updateCounter();
    }
}

// Функція для створення розмітки однієї справи
function renderTodo(todo) {
    return `
        <li class="${todo.completed ? 'completed' : ''}">
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" id="todo-${todo.id}" 
                    ${todo.completed ? 'checked' : ''} 
                    onchange="checkTodo(${todo.id})">
                <label for="todo-${todo.id}">${todo.text}</label>
            </div>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Видалити</button>
        </li>
    `;
}

// Функція для відображення всіх справ
function render(todos) {
    const todoList = document.getElementById('todo-list');
    
    // Перетворюємо масив справ на HTML-розмітку
    const todoHTML = todos.map(todo => renderTodo(todo)).join('');
    
    // Додаємо розмітку до списку
    todoList.innerHTML = todoHTML;
}

// Функція для оновлення лічильників
function updateCounter() {
    const totalCounter = document.getElementById('total-counter');
    const incompleteCounter = document.getElementById('incomplete-counter');
    
    // Загальна кількість справ
    totalCounter.textContent = todos.length;
    
    // Кількість незроблених справ (з completed: false)
    const incompleteTodos = todos.filter(todo => !todo.completed).length;
    incompleteCounter.textContent = incompleteTodos;
}

// Функція для видалення справи
function deleteTodo(id) {
    // Видаляємо справу з масиву за id
    todos = todos.filter(todo => todo.id !== id);
    
    // Оновлюємо відображення та лічильники
    render(todos);
    updateCounter();
}

// Функція для позначення справи як виконаної або невиконаної
function checkTodo(id) {
    // Знаходимо справу за id та змінюємо її статус
    todos = todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }
        return todo;
    });
    
    // Оновлюємо відображення та лічильники
    render(todos);
    updateCounter();
}

// Початкове відображення порожнього списку
render(todos);
updateCounter();

// Додавання нової справи при натисканні Enter у полі вводу
document.getElementById('new-todo').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        newTodo();
    }
});