// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',

    data: {
      products: {
        list: Product.getList(),
        isEmpty: list.length === 0,
      }
    }
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

class Product {
  static #list = []

  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 90000) + 10000
    this.createDate = new Date().toISOString()
  }

  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => this.#list

  static getById = (id) => this.#list.find((product) => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const product = this.getById(id);

    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }
}

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description);

  Product.add(product)

  console.log(Product.getList())

  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
    info: "Продукт створений"
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.post('/product-create', function (req, res) {
//   const { name, price, description } = req.body

//   const product = new Product(name, price, description);

//   Product.add(product)

//   console.log(Product.getList())

//   res.render('product-create', {
//     style: 'product-create',
//     info: "Продукт створений"
//   })
// })

// ================================================================


// Підключаємо роутер до бек-енду
module.exports = router
