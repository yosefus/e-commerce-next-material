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
    {
      slug: 'bracelets-set',
      name: { en: 'bracelets set', he: 'סט צמידים' },
      description: {
        en: 'amazing Silver and gold bracelet',
        he: 'צמידים מעוצבים מזהב וכסף',
      },
      price: 2500,
      discount: 0,
      material: 'silver',
      diamonds: false,
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      category: 'bracelet',
      image: '/images/br-silver.jpg',
    },
    {
      slug: 'silver-crown',
      name: { en: 'silver crown', he: 'כתר מכסף' },
      description: {
        en: 'great silver crown',
        he: 'כתר מטורלל מכסף',
      },
      price: 7500,
      discount: 0,
      material: 'gold',
      diamonds: true,
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      category: 'else',
      image: '/images/cr-sil.jpg',
    },
    {
      slug: 'gold-ring-1',
      name: { en: 'gold ring', he: 'טבעת זהב' },
      description: {
        en: 'gold ring with diamond',
        he: 'טבעת כסף משובצת',
      },
      price: 12500,
      discount: 0,
      material: 'gold',
      diamonds: true,
      rating: 4.9,
      numReview: 10,
      countInStock: 20,
      category: 'rings',
      image: '/images/ri-go-di.jpg',
    },
    {
      slug: 'gold-ring-2',
      name: { en: 'gold ring', he: 'טבעת זהב' },
      description: {
        en: 'free style gold ring',
        he: 'טבעת מזהב יצוק',
      },
      price: 500,
      discount: 0,
      material: 'gold',
      diamonds: false,
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      category: 'rings',
      image: '/images/ri-gol.jpg',
    },
    {
      slug: 'silver-ring',
      name: { en: 'silver rings', he: 'טבעות מעוצבות מכסף' },
      description: {
        en: 'free style silver ring',
        he: 'טבעות מעוצבות ומשובצות מכסף',
      },
      price: 4500,
      discount: 0,
      material: 'gold',
      diamonds: true,
      rating: 3.5,
      numReview: 10,
      countInStock: 20,
      category: 'rings',
      image: '/images/rings-silver.jpg',
    },
    {
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
    },
  ],
};

export default data;
