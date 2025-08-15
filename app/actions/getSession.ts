// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/route';

// export default async function getSession() {
//   return await getServerSession(authOptions);
// }

import { authOptions } from '@/app/libs/auth';
import { getServerSession } from 'next-auth';

export default async function getSession() {
  return await getServerSession(authOptions);
}
