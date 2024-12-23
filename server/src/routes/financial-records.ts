import express, { Request, Response } from "express";

import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

router.get(
  "/getAllByUserID/:userId",
  async (req: Request, res: Response): Promise<void | any> => {
    try {
      const { userId } = req.params;
      const records = await FinancialRecordModel.find({ userId });

      if (!records.length) {
        return res
          .status(404)
          .json({ message: "No records found for this user" });
      }

      res.status(200).json(records);
    } catch (error: any) {
      console.error("Error fetching records:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
);

router.post("/", async (req: Request, res: Response): Promise<void | any> => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).json(savedRecord);
  } catch (error: any) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<void | any> => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) return res.status(404).send();

    res.status(200).json(record);
  } catch (error: any) {
    res.status(500).send(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response): Promise<void | any> => {
    try {
      const id = req.params.id;
      const record = await FinancialRecordModel.findByIdAndDelete(id);
      if (!record) return res.status(404).send();
      res.status(200).json(record);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
);

export default router;
