import { prisma } from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs";

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: { clerkId: user.id as string },
  });

  if (!match) {
    const newUser = await prisma.user.create({
      clerkId: user.id,
      email: user.email,
    });
  }
};

const NewUser = () => {
  return <div>Hi New User</div>;
};

export default NewUser;
