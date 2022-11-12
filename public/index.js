const productName = document.querySelector('.product-name');
const productCompany = document.querySelector('.product-company');
const productRating = document.querySelector('.product-rating');
const productPrice = document.querySelector('.product-price');
const productCreatedat = document.querySelector('.product-createdat');
const container = document.querySelector('.container');


const showTasks = async() => {

    try {
        const {
            data: { tasks },
        } = await axios.get('/api/v1/products')
        if (tasks.length < 1) {
            container.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'

            return
        }
        const allTasks = tasks
            .map((task) => {
                const { completed, _id: taskID, name } = task
                return `<div class="single-task ${completed && 'task-completed'}">
        <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
        <div class="task-links">
        <!-- edit link -->
        <a href="task.html?id=${taskID}"  class="edit-link">
        <i class="fas fa-edit"></i>
        </a>
        <!-- delete btn -->
        <button type="button" class="delete-btn" data-id="${taskID}">
        <i class="fas fa-trash"></i>
        </button>
        </div>
        </div>`
            })
            .join('')
        tasksDOM.innerHTML = allTasks
    } catch (error) {
        tasksDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
}

showTasks()