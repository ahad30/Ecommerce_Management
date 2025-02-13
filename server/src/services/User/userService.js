const BcryptHasher = require("../../utility/BcryptPasswordHasher");

class UserService extends BcryptHasher {
  constructor(prismaClient) {
    super();
    this.prisma = prismaClient;
  }

  async createUser(data) {
    try {
      // Check if email already exists
      const existingEmailUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingEmailUser) {
        throw new Error("Email already exists. Please use a different email.");
      }

      // Check if phone already exists
      const existingPhoneUser = await this.prisma.user.findUnique({
        where: { phone: data.phone },
      });

      if (existingPhoneUser) {
        throw new Error("Phone number already exists. Please use a different phone number.");
      }

      // Hash the password
      const hashedPassword = await this.hash(data.password, 10);

      // Create the user
      return await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          phone: data.phone,
          role: data.role,
          name: data.name,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
  }

  async getAllUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Database error: Unable to fetch users");
    }
  }

  async getSingleUser(userId) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Database error: Unable to fetch user");
    }
  }

  async updateUser(userId, data) {
    try {
      if (data.password) {
        // Hash the password if it's being updated
        data.password = await this.hash(data.password, 10);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data,
      });

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Database error: Unable to update user");
    }
  }

  async updatePassword(userId, newPassword, confirmPassword) {
    try {
      // Validate that newPassword and confirmPassword match
      if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password do not match.");
      }

      // Hash the new password
      const hashedPassword = await this.hash(newPassword, 10);

      // Update the user's password in the database
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      return updatedUser;
    } catch (error) {
      console.error("Error updating password:", error);
      throw new Error(`Failed to update password: ${error.message}`);
    }
  }

  async deleteUser(userId) {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });

      return { message: `User with ID ${userId} deleted successfully` };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Database error: Unable to delete user");
    }
  }
}

module.exports = UserService;