const Order = require("../Models/BSOrder");
const fs = require("fs");

const GetStoreOrders = async (req, res) => 
{
    try
    {
        const storeId = req.params.id;
        const storeOrders = await Order.find({"storeNumber": storeId});

        res.status(200).json(storeOrders);
    }
    catch(err)
    {
        res.status(500).json(err.message);
    }
}

const GetOrder = async (req, res) => 
{
    try
    {
        const storeId = req.params.id;
        const orderNumber = req.params.order;
        
        const target = await Order.findOne({"_id": orderNumber, "storeNumber": storeId});

        if(!target) {throw new Error("Order not found")}

        res.status(200).json(target);
    }
    catch(err)
    {
        res.status(500).json(err.message);
    }
}

const CreateNewOrder = async (req, res) =>
{
    try
    {
        const data = req.body;
        console.log(data)

        const newOrder = new Order();
        
        newOrder.isComplete     = false; 
        newOrder.storeNumber    = data.storeNumber;
        newOrder.clientName     = data.clientName;
        newOrder.clientPhone    = data.clientPhone;
        newOrder.clientEmail    = data.clientEmail;
        newOrder.orderNumber    = data.orderNumber;
        newOrder.employee       = data.employee;
        newOrder.orderDetails   = data.orderDetails;
        newOrder.dateEntered    = data.dateEntered;
        newOrder.dateDue        = data.dateDue;
        newOrder.orderFiles     = data.orderFiles;

        await newOrder.save();

        res.status(200).json(newOrder);
    }
    catch(err)
    {
        res.status(500).json({message: err.message});
    }
}

const UpdateOrder = async (req, res) =>
{
    try
    {
        const data = req.body;
        const target = await FindOrderUsingReq(req, false);

        target.clientName     = data.clientName;
        target.clientPhone    = data.clientPhone;
        target.clientEmail    = data.clientEmail;
        target.orderNumber    = data.orderNumber;
        target.orderDetails   = data.orderDetails;
        target.dateDue        = data.dateDue;

        await target.save();
        res.status(200).json(target);
    }
    catch(err)
    {
        res.status(500).json(err);
        console.log(err)
    }
}

const CompleteOrder = async (req, res) =>
{
    try
    {
        const target = await FindOrderUsingReq(req, false);

        target.isComplete = true;

        await target.save();
        res.status(200).json(target);
    }
    catch(err)
    {
        res.status(500).json(err.message);
    }
}

const FindOrderUsingReq = async (req, status) =>
{
    const storeId = req.params.id;
    const orderNumber = req.params.order;
    
    const target = await Order.findOne({"_id": orderNumber, "storeNumber": storeId, "isComplete": status});
    if(!target) {throw new Error("Order not found")}

    return target;
}

module.exports = {
    GetOrder,
    GetStoreOrders,
    CreateNewOrder,
    UpdateOrder,
    CompleteOrder
}