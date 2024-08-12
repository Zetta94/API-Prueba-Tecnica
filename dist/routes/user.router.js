"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
//[GET] 🌐 /:uid/favourite/:mid
router.get('/:uid/favourite', user_controller_1.shearchFavourites);
// [PUT] 🌐 /:uid/favourite/:mid
router.put('/:uid/favourite/:mid', user_controller_1.addFavouriteMovie);
// [PUT] 🌐 /:uid/favourite/:mid
router.delete('/:uid/favourite/:mid', user_controller_1.removeFavouriteMovie);
exports.default = router;
