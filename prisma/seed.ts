import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { uniqueId } from "../src/common/utils";

const prisma = new PrismaClient();

function seedUsers() {
  const promises = Array.from({ length: 3 }, () => {
    return prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
      },
    });
  });
  return Promise.all(promises);
}

function seedWorkspace(ownerUsername: string) {
  return prisma.workspace.create({
    data: {
      id: uniqueId(),
      name: "Succession",
      url: "succession.chat.com",
      ownerUsername,
    },
  });
}

function seedUserWorkspaceRelationship(username: string, workspaceId: string) {
  return prisma.userWorkspace.create({ data: { username, workspaceId } });
}

function seedChannels(workspaceId: string, creatorUsername: string) {
  const general = prisma.channel.create({
    data: {
      id: uniqueId(),
      name: "general",
      description:
        "This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.",
      workspaceId,
      creatorUsername,
    },
  });
  const random = prisma.channel.create({
    data: {
      id: uniqueId(),
      name: "random",
      description:
        "This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!",
      workspaceId,
      creatorUsername,
    },
  });
  return Promise.all([general, random]);
}

function seedUserChannelRelationship(username: string, channelId: string) {
  return prisma.userChannel.create({ data: { username, channelId } });
}

async function clearDatabase() {
  await prisma.userChannel.deleteMany();
  await prisma.userWorkspace.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await clearDatabase();
  const users = await seedUsers();
  const workspace = await seedWorkspace(users[0].username);
  const channels = await seedChannels(workspace.id, users[0].username);
  await Promise.all(
    users.map((user) =>
      seedUserWorkspaceRelationship(user.username, workspace.id)
    )
  );
  await Promise.all(
    users.map((user) =>
      Promise.all(
        channels.map((channel) =>
          seedUserChannelRelationship(user.username, channel.id)
        )
      )
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
