const express = require('express');
const { getItemController, addItemController, editItemController, deleteItemController } = require('../controllers/ItemController');
const router =express.Router();
// Get Method route
router.get("/get-item",getItemController)
// add Method Route
router.post("/add-item",addItemController)
// update Method Route 
router.put("/edit-item",editItemController)
// Delete Method Route 
router.post("/delete-item",deleteItemController)
module.exports = router; 
