import { date, z } from "zod";
import {
  PaymentMethodEnum,
  RecurringIntervalEnum,
  TransactionTypeEnum,
} from "../models/transaction.model";

export const baseTransactionSchema = z.object({
  title: z.string().min(1, "Transaction title is required"),
  type: z.enum([TransactionTypeEnum.EXPENSE, TransactionTypeEnum.INCOME], {
    errorMap: () => ({ message: "Transaction type is required" }),
  }),
  amount: z.number().positive("Transaction amount must be positive").min(1),
  category: z.string().min(1, "Transaction category is required"),
  date: z
    .union([z.string().datetime({ message: "Invalid date string" }), z.date()])
    .transform((val) => new Date(val)),
  isRecurring: z.boolean().default(false),
  recurringInterval: z
    .enum([
      RecurringIntervalEnum.DAILY,
      RecurringIntervalEnum.WEEKLY,
      RecurringIntervalEnum.MONTHLY,
      RecurringIntervalEnum.YEARLY,
    ])
    .nullable()
    .optional(),
  receiptUrl: z.string().url("Invalid URL").optional(),
  paymentMethod: z
    .enum([
      PaymentMethodEnum.CARD,
      PaymentMethodEnum.BANK_TRANSFER,
      PaymentMethodEnum.AUTO_DEBIT,
      PaymentMethodEnum.CASH,
      PaymentMethodEnum.MOBILE_PAYMENT,
      PaymentMethodEnum.OTHER,
    ])
    .default(PaymentMethodEnum.CASH),
});

export const createTransactionSchema = baseTransactionSchema;

export const updateTransactionSchema = baseTransactionSchema.partial();

export type CreateTransactionType = z.infer<typeof createTransactionSchema>;

export type UpdateTransactionType = z.infer<typeof updateTransactionSchema>;
