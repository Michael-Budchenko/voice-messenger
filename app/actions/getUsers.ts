import Prisma from '@/app/libs/prismadb';
import getSession from './getSession';
const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  try {
    const users = await Prisma.user.findMany({
      orderBy: {
        createAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
