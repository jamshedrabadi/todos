const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

exports.initPassportConfig = () => {
    try {
        passport.use(new LocalStrategy((email, password, done) => {
            return done(null, {
                email: 'jamshedrabadi@gmail.com',
                firstName: 'Jamshed',
                lastName: 'Rabadi',
            });
            /*
             * var user = await db.executevaluesquery("select usr_id _id,user_org_id org_id,usr_first_name first_name,usr_last_name
             * last_name,user_profile_image profile_image ,role_access.menu as menu from mst_user join role_access on
             * mst_user.usr_role_code = role_access.role_code where user_status=1 and usr_email_id=? and
             * usr_password=sha1(?)", [email, password]);
             * if (user.lenght == 0) {
             *     return done(null, false, { msg: `UserName and Password not found` });
             * } else {
             *     if (user[0] == undefined) {
             *         user.menues = JSON.parse(user[0].menu);
             *         return done(null, false, { msg: `UserName and Password not found` });
             *     } else {
             *         user[0].menues = JSON.parse(user[0].menu);
             *     }
             * }
             */
        }));

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user, done) => {
            done(null, user);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error looking for user in DB', error);
        throw error;
    }
};

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};
