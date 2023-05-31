import { Prisma } from "@prisma/client";

export type CreateChannelDto = Prisma.ChannelCreateArgs["data"];
