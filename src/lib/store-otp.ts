const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


export async function saveOtp(email: string, otp: string) {

    // const db = prisma;
  try {
    const expiresAt = Date.now() + 60 * 1000; // 1 minute expiry

    const result = await prisma.otp.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });
    return result;
  } catch (error) {
    console.error('Error saving OTP:', error);
    throw error;
  }
}

export async function verifyOtp(Email: string, Otp: string): Promise<boolean> {
  try {
    // Find the OTP record matching the email and otp
    const otpRecord = await prisma.otp.findFirst({
      where: {
        email:Email,
        otp:Otp,
      },
    });

    console.log(otpRecord);

    // If no record is found, the OTP is invalid
    if (!otpRecord) {
      return false;
    }

    // Check if the OTP has expired
    const currentTime = Date.now();
    if (currentTime > otpRecord.expiresAt) {
      return false; // OTP has expired
    }

    return true; // OTP is valid
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error; // Let the caller handle the error
  } 
}