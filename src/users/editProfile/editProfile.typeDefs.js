import { gql } from "apollo-server";

export default gql`
  scalar Upload

  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  ##DB반영
  type Mutation {
    editProfile(
      username: String
      name: String
      email: String
      location: String
      password: String
      avatarURL: Upload
      githubUsername: String
    ): EditProfileResult!
  }
  
`;

