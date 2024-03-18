const products = [
  {
    name: 'LG C3 65" 4K TV',
    image: '/images/products/lgc3.jpg',
    description:
      'The LG C3 is a high-end smart TV that offers stunning visuals and advanced features. With its 4K OLED display, HDR support, and wide color gamut, it delivers breathtaking picture quality. The TV also features a powerful α9 Gen 2 processor, which provides seamless performance and smooth navigation. ',
    brand: 'LG',
    category: "tvs",
    price: 1999.99,
    countInStock: 5,
    rating: 4.9,
    numReviews: 11,
  },
  {
    name: 'Samsung Galaxy s23 Ultra',
    image: '/images/products/samsungs23.jpg',
    description:
      'The Samsung Galaxy S23 Ultra is a high-end Android smartphone with a massive 6.8-inch Dynamic AMOLED display, and a long-lasting 5000mAh battery. It features a quad-camera setup with a 108MP primary sensor and supports 8K video recording and 5G connectivity.',
    brand: 'Samsung',
    category: 'phones',
    price: 1399.99,
    countInStock: 15,
    rating: 3.8,
    numReviews: 20,
  },
  {
    name: 'Cannon EOS 80D',
    image: '/images/products/canon80d.jpg',
    description:
      'With its 24.2MP APS-C sensor, Dual Pixel AF, and vari-angle touchscreen LCD, the 80D is perfect for capturing stunning images and videos in a variety of settings.',
    brand: 'Cannon',
    category: 'cameras',
    price: 999.99,
    countInStock: 6,
    rating: 4,
    numReviews: 5,
  },
  {
    name: 'HyperX Cloud Alpha',
    image: '/images/products/cloudAlpha.jpg',
    description:
      'The HyperX Alpha cloud headphones are a top-notch gaming headset that offers exceptional sound quality, long-lasting comfort, and crystal-clear communication.',
    brand: 'HyperX',
    category: 'sound',
    price: 99.99,
    countInStock: 22,
    rating: 5,
    numReviews: 10,
  },
  {
    name: 'Playstation 5',
    image: '/images/products/ps5.jpg',
    description:
      'The PlayStation 5 (PS5) is offering breathtaking graphics, lightning-fast load times, and immersive gameplay experiences. With its powerful AMD Zen 2 CPU and Radeon RDNA 2 GPU, the PS5 delivers stunning visuals and seamless performance, making it a must-have for any gaming enthusiast.',
    brand: 'Sony',
    category: 'gaming',
    price: 599.99,
    countInStock: 3,
    rating: 4.8,
    numReviews: 9,
  },
  {
    name: 'Nintendo Switch Oled',
    image: '/images/products/switchOled.jpg',
    description:
      'The Nintendo Switch OLED is a powerful and portable gaming console that features a stunning 6.2-inch OLED display, delivering vibrant and crisp visuals on the go. With its innovative detachable Joy-Con controllers and a long-lasting battery, the Switch OLED offers an unparalleled gaming experience whether you are at home or on the go.',
    brand: 'Nintendo',
    category: 'gaming',
    price: 299.99,
    countInStock: 20,
    rating: 5,
    numReviews: 22,
  },
  {
  name: 'Lenovo Legion 9i',
  image: '/images/products/Lenovo_Legion.jpg',
  description:
    'This laptop is the world’s first 16-inch gaming laptop in the Lenovo Legion’s ecosystem, featuring a groundbreaking self-contained liquid-cooling system. It’s a game-changer in every sense. Equipped with a 13th Gen Intel® Core™ i9-13980HX processor and up to an NVIDIA® GeForce RTX™ 4090 Laptop GPU, it boasts remarkable processing power.',
  brand: 'Lenovo',
  category: 'computers',
  price: 2999.99,
  countInStock: 5,
  rating: 4.9,
  numReviews: 3,
},
{
  name: 'Ipad 64gb blue',
  image: '/images/products/Ipad.jpg',
  description:
    "Experience the perfect blend of power and portability with the iPad 64GB. Immerse yourself in the stunning 10.2-inch Retina display, where every image, video, and game comes to life with vivid detail and clarity. With ample storage space, you can download your favorite apps, store thousands of photos, and keep all your essential documents close at hand. Whether you're streaming your favorite shows, sketching your next masterpiece with Apple Pencil, or tackling productivity tasks on the go, the iPad 64GB offers the performance and versatility to elevate your digital experience. With sleek design, intuitive features, and all-day battery life, it's the ultimate companion for work, play, and everything in between",
  brand: 'Apple',
  category: 'phones',
  price: 649.99,
  countInStock: 11,
  rating: 4.5,
  numReviews: 25,
},
{
  name: 'Cannon EOS 80D',
  image: '/images/products/canon80d.jpg',
  description:
    'With its 24.2MP APS-C sensor, Dual Pixel AF, and vari-angle touchscreen LCD, the 80D is perfect for capturing stunning images and videos in a variety of settings.',
  brand: 'Cannon',
  category: 'cameras',
  price: 999.99,
  countInStock: 6,
  rating: 4,
  numReviews: 5,
},
{
  name: 'Sony WH1000XM4',
  image: '/images/products/wh1000xm4.jpg',
  description:
    'The Sony WH-1000XM4 are popular wireless over-ear headphones featuring industry-leading noise cancellation, exceptional sound quality, and long battery life. They are compatible with multiple devices and offer touch control, making them a top choice for many users.',
  brand: 'Sony',
  category: 'sound',
  price: 299.99,
  countInStock: 30,
  rating: 4.4,
  numReviews: 22,
},
{
  name: 'LG C3 65" 4K TV',
  image: '/images/products/lgc3.jpg',
  description:
    'The LG C3 is a high-end smart TV that offers stunning visuals and advanced features. With its 4K OLED display, HDR support, and wide color gamut, it delivers breathtaking picture quality. The TV also features a powerful α9 Gen 2 processor, which provides seamless performance and smooth navigation. ',
  brand: 'LG',
  category: "tvs",
  price: 1999.99,
  countInStock: 5,
  rating: 4.9,
  numReviews: 11,
},
{
  name: 'Asus ROG Strix Scar 15 G533 i9',
  image: '/images/products/Asus_Rog.jpg',
  description:
    `The Asus ROG Strix Scar 15 G533 i9 is a high-performance gaming laptop, featuring a 15.6" FHD IPS display, Intel Core i9 processor, NVIDIA GeForce RTX 3080 GPU, and 32GB DDR4 RAM. This powerful configuration ensures smooth gameplay and quick rendering for demanding applications. The laptop's design is optimized for cooling and offers customizable RGB lighting, providing both functionality and style.`,
  brand: 'Asus',
  category: 'computers',
  price: 3499.99,
  countInStock: 4,
  rating: 4.9,
  numReviews: 2,
},
]

export default products
