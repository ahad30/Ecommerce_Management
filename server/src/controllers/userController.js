const ALLOWED_ROLES = ["user", "seller", "admin"];
const ALWAYS_PROTECTED_FIELDS = ["id", "verificationToken"];
const ADMIN_ONLY_FIELDS = ["role", "isVerified", "tokenExpiresAt"];

class UserController {
    constructor(userService) {
      this.userService = userService; 
    }
  
    // Create a new user
    async createUser(req, res, next) {
      try {
        let role = "user";
        if (req.user?.role === "admin" && req.body.role !== undefined) {
          if (!ALLOWED_ROLES.includes(req.body.role)) {
            return res.status(400).json({ success: false, message: "Invalid role" });
          }
          role = req.body.role;
        }
        const result = await this.userService.createUser(req.body, role);
        res.status(201).json({
          success: true,
          message: 'User registered  successfully',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  
    // Get all users
    async getAllUsers(req, res, next) {
      try {
        const result = await this.userService.getAllUsers();
        res.status(200).json({
          success: true,
          message: 'Users fetched successfully',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  
    async getCurrentUser(req, res, next) {
      try {
        const user = await this.userService.findUserById(req.user.id);
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
          success: true,
          message: "Current user fetched successfully",
          data: user,
        });
      } catch (error) {
        next(error);
      }
    }

    // Get a single user by ID
    async getSingleUser(req, res, next) {
      try {
        const userId = req.params.id; 
        const result = await this.userService.getSingleUser(userId);
        res.status(200).json({
          success: true,
          message: `User with ID ${userId} fetched successfully`,
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  
    // Update a user by ID
    async updateUser(req, res, next) {
      try {
        const userId = req.params.id; 
        const isAdmin = req.user?.role === "admin";
        const data = { ...req.body };
        for (const field of ALWAYS_PROTECTED_FIELDS) delete data[field];
        if (!isAdmin) {
          for (const field of ADMIN_ONLY_FIELDS) delete data[field];
        } else if (data.role !== undefined && !ALLOWED_ROLES.includes(data.role)) {
          return res.status(400).json({ success: false, message: "Invalid role" });
        }
        const result = await this.userService.updateUser(userId, data);
        res.status(200).json({
          success: true,
          message: `User with ID ${userId} updated successfully`,
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }


    async updatePassword(req, res, next) {
    try {
      const userId = req.params.id;
      const { newPassword, confirmPassword } = req.body;

      // Validate that newPassword and confirmPassword are provided
      if (!newPassword || !confirmPassword) {
        throw new Error("New password and confirm password are required.");
      }

      // Call the service to update the password
      const result = await this.userService.updatePassword(
        userId,
        newPassword,
        confirmPassword
      );

      res.status(200).json({
        success: true,
        message: `Password for user with ID ${userId} updated successfully`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  
    // Delete a user by ID
    async deleteUser(req, res, next) {
      try {
        const userId = req.params.id; 
        await this.userService.deleteUser(userId);
        res.status(200).json({
          success: true,
          message: `User with ID ${userId} deleted successfully`,
        });
      } catch (error) {
        next(error);
      }
    }

    async verifyUser(req, res, next) {
  try {
    const { token } = req.params;
    const result = await this.userService.verifyUser(token);

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User verified successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
  } 
  
  module.exports = UserController;
  