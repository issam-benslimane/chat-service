import { ChannelVisibility } from "@prisma/client";

export type CreateChannelDto = {
  name: string;
  description?: string;
  visibility: ChannelVisibility;
  creatorUsername: string;
  workspaceId: string;
};
