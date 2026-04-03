import mongoose from "mongoose";
export declare const contentTypes: string[];
export declare const Content: mongoose.Model<{
    type: string;
    link: string;
    title: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    type: string;
    link: string;
    title: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    type: string;
    link: string;
    title: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    link: string;
    title: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    type: string;
    link: string;
    title: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    type: string;
    link: string;
    title: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: string;
    link: string;
    title: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    type: string;
    link: string;
    title: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=content.d.ts.map