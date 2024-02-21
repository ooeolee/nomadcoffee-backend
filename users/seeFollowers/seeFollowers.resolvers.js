import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: {id: true},
      });
      if(!ok){
        return {
          ok:false,
          error:"User not found",
        };
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      //간단히 말하면 some,every차이는 여기서 every를 쓴다는 것은
      //모든 팔로워가 지정된 사용자 아이디를 가진 사용자를 찾게 된다
      //팔로워들중 모두가 지정 사용자를 팔로우 해야한다.
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};


/*
pagenation - offset pagenation, cursor-based pagenation
offset pagenation(take, skip)
cursor-based pagenation
- DB에 마지막으로 본 결과물이 뭔지 알려줘야 함?

*/
/*
count(해당 필드의 개수 가져오긴) - some vs every , none
  some : 하나 이상의 관련 레코드가 필터링 기준과 일치하는 모든 레코드 반환
  every : 모든 관련 레코드가 필터링 기준과 일치하는 모든 레코드 반환
  none: 필터링 기준과 일치하는 관련 레코드가 하나도 없는 모든 레코드 반환
*/
//Math.ceil
