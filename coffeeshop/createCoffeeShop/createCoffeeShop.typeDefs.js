import { gql } from "apollo-server";

export default gql`
  type CreateCoffeeShopResult {
    ok: boolean!
    error: String
  }
  type Mutation {
    CreateCoffeeShop(
      name: String
      latitude: String
      longitude: String
      photos: [CoffeeShopPhoto]
      categories: [Category]
    ): CreateCoffeeShopResult!
  }
`;