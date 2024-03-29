import jwt from "jsonwebtoken";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;                     
    }
  } catch {
    return null;
  }
};
export const protectedResolver = (ourResolver) => (
  root,
  args,
  context,
  info
) => {
  console.log("text");
  if(!context.loggedInUser) {
    return {
      ok: false,
      error: "Please log in to perform this action",
    };
  }
  return ourResolver(root,args,context,info);
}