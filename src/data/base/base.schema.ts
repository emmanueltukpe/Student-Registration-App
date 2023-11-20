import { Schema, SchemaDefinition, SchemaOptions, SchemaTypes } from "mongoose";

import { readMapper, timestamps, uuid } from "./utils";

export const SchemaFactory = <T>(
    schemaFields: SchemaDefinition<T>,
    options?: SchemaOptions
) => {
    if (!schemaFields || Object.keys(schemaFields).length === 0) {
        throw new Error("Please specify schemaFields");
    }

    return new Schema<T>(
        {
            _id: { ...uuid, required: true },
            deleted_at: { type: SchemaTypes.Date },
            ...schemaFields
        },
        {
            ...options,
            ...readMapper,
            ...timestamps,
            // @ts-ignore
            selectPopulatedPaths: false
        }
    );
};
