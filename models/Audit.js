const mongoose = require("mongoose");
const AuditSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: ["create", "update", "delete"],
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }, 
    status: {
        type: String,
        required: true,
        enum: ["success", "failure", "pending"],
    },
    erorr: {
        type: String,
        required: false,
    },
    user: {
        type: String,
        required: true,
    },
    auditOn: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Audit = mongoose.model("Audit", AuditSchema);
module.exports = { Audit };
