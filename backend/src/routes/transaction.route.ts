import { Router } from "express";
import {
  bulkDeleteTransactionController,
  bulkTransactionController,
  createTransactionController,
  deleteTransactionController,
  duplicateTransactionController,
  getAllTransactionController,
  getTransactionController,
  updateTransactionController,
} from "../controllers/transaction.controller";

const transactionRoutes = Router();

transactionRoutes.post("/create", createTransactionController);
transactionRoutes.post("/bulk-transaction", bulkTransactionController);

transactionRoutes.put("/duplicate/:id", duplicateTransactionController);
transactionRoutes.put("/update/:id", updateTransactionController);

transactionRoutes.get("/all", getAllTransactionController);
transactionRoutes.get("/:id", getTransactionController);

transactionRoutes.delete("/delete/:id", deleteTransactionController);
transactionRoutes.delete("/bulk-delete", bulkDeleteTransactionController);

export default transactionRoutes;
