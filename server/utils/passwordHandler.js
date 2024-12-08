import bcrypt from "bcrypt";

// Hansh or Compare password
export const passwordHandler = async (password, hashPassword = undefined) => {
  try {
    if (hashPassword === undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } else {
      const matchedPassword = await bcrypt.compare(password, hashPassword);
      return matchedPassword;
    }
  } catch (error) {
    console.log(error);
  }
};
