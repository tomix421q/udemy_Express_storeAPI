const productName = document.querySelector('.product-name');
const productCompany = document.querySelector('.product-company');
const productRating = document.querySelector('.product-rating');
const productPrice = document.querySelector('.product-price');
const productCreatedat = document.querySelector('.product-createdat');
const container = document.querySelector('.container');


const showTasks = async() => {

    try {
        const {
            data: { products },
        } = await axios.get('/api/v1/products')
        if (products.length < 1) {
            container.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'

            return
        }
        const allProducts = products
            .map((product) => {
                const { price, rating, createAt, company, name } = product
                return `
            <div class="product">
            <div class="product-container">
            <h1 class="product-name">${name}</h1>
            <h3 class="product-company">Brand:${company}</h3>
            <h2 class="product-rating">${rating}Star</h2>
            <h2 class="product-price">${price}Eur</h2>
            <h3 class="product-createdat">${createAt}</h3>
             </div>
            </div>
           `
            })
            .join('')


        container.innerHTML = allProducts
    } catch (error) {
        container.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
    }

}

showTasks()