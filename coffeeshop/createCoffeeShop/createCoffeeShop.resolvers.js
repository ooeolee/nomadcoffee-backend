import client from "../../client.js";


export default {
  Mutation: {
    createCoffeeShop: async (_,
      { name, latitude, longitude, photos, categories },
      {loggedInuser}) => {
      try {
        let categories = [];
        if(!categories){
          
        }
      return client.coffeeshop.create({
        data: {
          name,
          latitude,
          longitude,
          photos,
          categories
        },
      });
    } catch(e){
      return e;
    }
      }
  }
}