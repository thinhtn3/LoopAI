export const signin = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};