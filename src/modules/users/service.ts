import db from "../../db";

const getUsers = (query: { workspaceId?: string; channelId?: string }) => {
  const { workspaceId, channelId } = query;
  if (workspaceId) {
    return db.user.findMany({
      where: { userWorkspace: { some: { workspaceId } } },
    });
  } else if (channelId) {
    return db.user.findMany({
      where: { userChannel: { some: { channelId } } },
    });
  } else return db.user.findMany();
};

export const usersService = { getUsers };
