const transactionModel = require("../models/transactionModel");
const moment = require("moment");
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type} = req.body;
    const transactions = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gte: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    // const transactions = await transactionModel.find({
    //   ...(frequency !== "custom"
    //     ? {
    //         date: {
    //           $gt: moment().subtract(Number(frequency), "d").toDate(),
    //         },
    //       }
    //     : {
    //         date: {
    //           $gte: selectedDate[0],
    //           $lte: selectedDate[1],
    //         },
    //       }),
    //   userid: req.body.userid,
    //   ...(type !== "all" && { type }),
    // });
    // const transactions = await transactionModel.find({userid:req.body.userid})
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Edited SUccessfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  // try {
  //   // const newTransection = new transectionModel(req.body);
  //   const newTransaction = new transactionModel(req.body);
  //   await newTransaction.save();
  //   res.status(201).send("Transaction Created");
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json(error);
  // }
  try {
    const newTransaction = new transactionModel(req.body);
    // const amount = req.body.amount;
    // const type = req.body.type;
    // const category = req.body.category;
    // const date = req.body.Date;
    // const reference = req.body.reference;
    // const description = req.body.description;
    // const transaction = new transactionModel({userId, amount, type, category, date, reference, description});
    // const result = await transaction.save();
    await newTransaction.save()
    res.status(201).send('Transaction Added')
    // res.status(201).json(newTransaction)
    // if(!result){
    //   res.status(404).json({
    //     success: false,
    //     error,
    //   });
    // }
    // else res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};