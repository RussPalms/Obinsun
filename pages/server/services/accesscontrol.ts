// @ts-nocheck

// server/services/accesscontrol.js
// ----------------------------------------
import AccessControl from "accesscontrol";

// unique back-end instance of AccessControl
export const ac = new AccessControl();

// ac.grant("admin")
// 	.resource("owner")
// 	.readAny()
// 	.createAny()
// 	.updateAny()
// 	.deleteAny();

// owners can manage all users
ac.grant("owner")
	.resource("users")
	.readAny()
	.createAny()
	.updateAny()
	.deleteAny();

// guests can manage only their own profile
ac.grant("guest").resource("users").readOwn().updateOwn();

// we lock ACL to avoid updates out of this file
ac.lock();
