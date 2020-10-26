const AccessControl = require('accesscontrol');
const ac = new AccessControl();

/**
 * Definindo AccessControll para cada tipo de usuario da plataforma.
 */
exports.roles = (function () {
    ac.grant("User")
        .createOwn("hotel")
        .deleteOwn("hotel")
        .readAny("hotel")
        .createOwn("rating")
    .grant("Admin")
        .extend("User")
        .updateAny("user")
        .updateAny("hotel")
        .updateAny("rating");
    return ac;
})();
