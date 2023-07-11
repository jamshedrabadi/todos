const db = require('../../config/database/db-config.js');

exports.authenticateUser = async (email, password) => {
    try {
        await db.addLoadTime(1000);
        return await db.models.users.findOne({
            attributes: ['email', 'firstName', 'lastName', 'status'],
            where: {
                [db.Sequelize.Op.and]: [
                    { email },
                    db.sequelize.where(
                        db.sequelize.col('password'),
                        db.sequelize.fn('SHA1', password),
                    ),
                ],
            },
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error authenticating user from DB', error);
        throw error;
    }
};
