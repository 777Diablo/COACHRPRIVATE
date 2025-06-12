import bcrypt from "bcryptjs";

async function hashPassword(inputPassword: string): Promise<string> {
  try {
    const salt: string = await bcrypt.genSalt(10); // Type `string` is inferred
    const hashedPassword: string = await bcrypt.hash(inputPassword, salt); // Type `string` is inferred
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error("Error generating hashed password");
  }
}

export default hashPassword;
