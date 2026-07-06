import mongoose, { Schema } from "mongoose";
const subscriptionSchema = new Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
subscriptionSchema.index({ subscriber: 1, channel: 1 }, { unique: true });
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
//# sourceMappingURL=Subscription.js.map