const bcrypt = require('bcryptjs');
class BcryptHasher {
    async hash(password, saltRound) {
        return await bcrypt.hash(password, saltRound);

    }
}

module.exports = BcryptHasher