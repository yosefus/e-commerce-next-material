import bcrypt from "bcryptjs"

const data = {
  users: [
    {
      name: "john do",
      email: "a@gmail.com",
      password: bcrypt.hashSync("1234"),
      isAdmin: true
    },
    {
      name: "rina do",
      email: "b@gmail.com",
      password: bcrypt.hashSync("1234")
    }
  ],
  products: [

  ]
};

const ex = {
  slug: 'gold-diamonds-ring',

  name: { en: 'gold diamonds ring', he: 'טבעת משובצת' },
  description: {
    en: 'stylish silver ring',
    he: 'טבעות מעוצבות ומשובצות מזהב',
  },
  price: 14500,
  discount: 0,
  material: 'gold',
  diamonds: true,
  rating: 4.3,
  numReview: 10,
  countInStock: 20,
  category: 'rings',
  image: '/images/gol-dia.jpg',

}
ex.category = "d"
function get() {
  Array.from(Array(14)).forEach((e, i) => {
    let v = { ...ex }
    v.slug = `great nice car ${Math.ceil(Math.random() * 999)}`
    v.name.en = "simple car"
    v.name.he = "סובארו אברכים"
    v.description.en = "some fancy car with no special use, second hand from a doctor"
    v.description.he = "רכב חבוט ללא תכלית אשר שום יופי בו"
    v.price = Math.ceil(Math.random() * 99999)
    v.material = "gold"
    v.category = "cars"
    v.diamonds = false
    v.countInStock = Math.ceil(Math.random() * 100)
    v.image = `/images/car${i + 1}.jpg`
    data.products.push(v)
  })
}

get()

export default data;
