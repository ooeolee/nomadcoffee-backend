
export default {

  Category: {
    totalShops: ({id}, _, {client}) => 
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
      shops: ({id}, {lastId}, {client}) => 
        client.Category
          .findUnique({
            where: {id},
          })
          .shops({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && {cursor: { id: lastId } }),
          }),
  },
}