const itemModel = require('../models/itemModel')
 const getItemController = async (req,res)=>{
    try {
        const items = await itemModel.find();
        res.status(200).send(items)
    } catch (error) {
        console.log(error);
    }

}
// add items
 const addItemController = async (req,res)=>{
    try {
        const newItems = new itemModel(req.body);
        await newItems.save();
        res.status(201).send("Item Created Successfully")
    } catch (error) {
        res.status(400).send("send",error);
        console.log(error);
    }
    }
    // Update items
    const editItemController = async (req,res)=>{
        try {
            await itemModel.findOneAndUpdate({_id: req.body.itemId},req.body);
            res.status(201).send("Item Updated Successfully")
        } catch (error) {
            res.status(400).send("send",error);
            console.log(error);
        }
    }
    // Delete items
    const deleteItemController = async (req,res)=>{
        try {
            await itemModel.findOneAndDelete({_id: req.body.itemId});
            res.status(200).send("Item Deleted Successfully")
        } catch (error) {
            res.status(400).send("send",error);
            console.log(error);
        }
    }
    
    
module.exports= {getItemController,addItemController,editItemController,deleteItemController}