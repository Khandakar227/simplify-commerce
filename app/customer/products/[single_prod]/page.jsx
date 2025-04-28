import ProductPage from "./example";

const ExampleProductPage = () => {
  const product = {
    id: '123',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4,
    reviewCount: 128,
    stock: 15,
    sku: 'HP-2023-BLK',
    brand: 'AudioMaster',
    images: [
      '/headphones-1.jpg',
      '/headphones-2.jpg',
      '/headphones-3.jpg',
      '/headphones-4.jpg',
    ],
    variants: ['Black', 'White', 'Blue'],
  };

  return <ProductPage product={product} />;
};

export default ExampleProductPage;