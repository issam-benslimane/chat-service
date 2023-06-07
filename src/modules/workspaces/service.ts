import db from "../../db";

const getWorkspace = (id: string) => {
  return db.workspace.findUnique({ where: { id } });
};

export const workspaceService = { getWorkspace };
