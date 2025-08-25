import mongoose from "mongoose";

export enum ReportStatusEnum {
    PENDING = "PENDING",
    SENT = "SENT",
    FAILED = "FAILED",
}

export interface ReportDocument extends Document {
    userId: mongoose.Types.ObjectId;
    period: string;
    sendDate: Date;
    status: keyof typeof ReportStatusEnum;
    createdAt: Date;
    updatedAt: Date;
}

const reportSchema = new mongoose.Schema<ReportDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    period: {
        type: String,
        required: true,
    },
    sendDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(ReportStatusEnum),
        default: ReportStatusEnum.PENDING,
    }
}, {
    timestamps: true,
});

const ReportModel = mongoose.model<ReportDocument>("Report", reportSchema);

export default ReportModel;
