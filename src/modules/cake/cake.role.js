import { roles } from "../../middleware/authentication.js";


export const endpoints = {
    admin:roles.admin,
    user:roles.user
}