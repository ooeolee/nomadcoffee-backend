import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils.js";
import { GraphQLUpload } from "graphql-upload-minimal"; // 수정된 부분


export const resolverFn = async(
  _,
  { username,name, email,location, password: newPassword ,avatarURL, githubUsername},
  { loggedInUser }
) =>{
  console.log("editProfile : resolverFn실행")
  console.log(`${loggedInUser} editporifle에 token이 입력되었습니다.`);

  
  let avatarUrl = null;

  if(avatarURL){
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    console.log(newFilename);
    const readStream = createReadStream();
    const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }


  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      name,
      email,
      location,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatarURL: avatarUrl }),
      githubUsername
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }

};


export default {

  Upload: GraphQLUpload,

  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};