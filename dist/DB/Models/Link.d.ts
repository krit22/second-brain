import mongoose from "mongoose";
export declare const linkSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    hash: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    hash: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: mongoose.Types.ObjectId;
    hash: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    hash: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Link.d.ts.map