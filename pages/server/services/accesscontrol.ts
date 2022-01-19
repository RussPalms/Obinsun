// @ts-nocheck

// server/services/accesscontrol.js
// ----------------------------------------
import AccessControl from "accesscontrol";

// unique back-end instance of AccessControl
export const ac = new AccessControl();

// ac.grant("admin")
// 	// .extend("owner")
// 	.resource("users")
// 	.readAny()
// 	.createAny()
// 	.updateAny()
// 	.deleteAny()
// 	// .resource("app")
// 	// .readAny()
// 	// .createAny()
// 	// .updateAny()
// 	// .deleteAny();

// owners can manage all users
// ac.grant("owner").resource().readAny().createAny().updateAny().deleteAny();
ac.grant("owner")
	.resource("users")
	.readAny()
	.createAny()
	.updateAny()
	.deleteAny();

// guests can manage only their own profile
ac.grant("guest").resource("users").readOwn().updateOwn();

ac.grant("admin")
	.resource(["users", "app"])
	// .readAny()
	// .createAny()
	// .updateAny()
	// .deleteAny()
	// .resource("app")
	.readAny()
	.createAny()
	.updateAny()
	.deleteAny();

// owners can manage all users
// ac.grant("owner")
// 	.resource("users")
// 	.readAny()
// 	.createAny()
// 	.updateAny()
// 	.deleteAny();

// ac.grant("admin")
// 	.extend("owner")
// 	.resource("users")
// 	.readAny()
// 	.createAny()
// 	.updateAny()
// 	.deleteAny()
// 	.resource("app")
// 	.readAny()
// 	.createAny()
// 	.updateAny()
// 	.deleteAny();

// we lock ACL to avoid updates out of this file
ac.lock();
