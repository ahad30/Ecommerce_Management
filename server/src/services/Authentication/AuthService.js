class AuthService {
    prisma
    constructor(prismaClient, hasher) {
        this.prisma = prismaClient;
        this.hasher = hasher;
    }

    async varifyUser(email, password) {
        try {
            const user = await this.prisma.user.findUnique(
                {
                    where: {
                        email
                    },
                    omit: { password: false }
                }
            )

            if (!user) {
                return null;
            }
            const isPasswordValid = await this.hasher.compare(password, user.password)

            if (!isPasswordValid) return null;

            const { password: _password, verificationToken: _token, ...safeUser } = user;
            return safeUser;

        } catch (error) {
            console.error("Error verifying user:", error);
            return null;
        }
    }
}
module.exports = AuthService
