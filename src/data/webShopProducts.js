export class ProductCategory {
  static VEGETABLES = "vegetables";
  static DAIRY = "dairy";
  static CANNED = "canned";

  static cattegories = [this.VEGETABLES, this.DAIRY, this.CANNED];

  static isCategory(category = "") {
    return this.cattegories.includes(category);
  }
}

const products = [
  {
    name: "Tomato",
    description: "Red, round, soft and hard",
    price: 10,
    category: ProductCategory.VEGETABLES,
    id: 1,
  },
  {
    name: "Cuecumber",
    description: "Green, oval? ovalish?",
    price: 8,
    category: ProductCategory.VEGETABLES,
    id: 2,
  },
  {
    name: "Tomato paste",
    description: "Liquid previous round red thing",
    price: 4,
    category: ProductCategory.VEGETABLES,
    id: 3,
  },
  {
    name: "Milk",
    description: "Liquid sorta like Oat-milk",
    price: 7,
    category: ProductCategory.DAIRY,
    id: 4,
  },
];

export default products;
