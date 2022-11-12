const { query } = require('express')
const Product = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({ name: '2' })
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async(req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    // SORT
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createAt')
    }
    // FIELDS 
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    // PAGINATION 
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    // NUMERIC FILTERS REGEX 
    if (numericFilters) {
        const operatorMap = { '>': '$gt', '>=': '$gte', '=': '$eq', '<': '$lt', '<=': '$lte' }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = {
                    [operator]: Number(value)
                }
            }
        })
    }
    console.log(queryObject);
    // RESULT AWAIT
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}


module.exports = { getAllProductsStatic, getAllProducts }