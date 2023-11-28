import dotenv from "dotenv";

dotenv.config();

/**
 * Env variables required for all environment (development, production, testing, staging)
 */
const requiredVariables = ["port"];

/**
 * Env variables required for both production and staging
 */
const productionAndStagingVariables = ["mongo_url"];

/**
 * Requires MongoDB in production and staging, else uses MongoDB connection string directly
 * in dev or any other environment
 */
if (["production", "staging"].includes(process.env.NODE_ENV as string)) {
    requiredVariables.push(...productionAndStagingVariables);
} else requiredVariables.push("mongodb_url");

const env = {
    /**
     * NodeJS runtime environment.
     * Possible values are "development" and "production".
     *
     * DON'T SET THIS MANUALLY
     */
    node_env: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 8000,

    mongodb_url: process.env.MONGO_URL || "mongodb://localhost:27017",
    db_name: process.env.DB_NAME || "student-registration",

    service_name: process.env.SERVICE_NAME || "Godgonklin Senior Secondary School",
    /**
     * This application's runtime environment
     * Possible values are "development", "test", "production", "staging"
     */
    app_env: process.env.APP_ENV || "development",
    
    jwt_secret: process.env.JWT_SECRET,
    expiresIn: process.env.EXPIRES_IN || "1d",
    
    adminSecret: process.env.ADMIN_SECRET,
    superAdminSecret: process.env.SUPER_ADMIN_SECRET,

    email: process.env.EMAIL_ADDRESS,
    email_service: process.env.EMAIL_SERVICE,
    email_app_password: process.env.EMAIL_AUTH_PASSWORD
};

const missingVariables = requiredVariables.reduce(
    (acc, varName) => (!env[varName] ? acc.concat(varName.toUpperCase()) : acc),
    []
);

if (!!missingVariables.length)
    throw new Error(
        `The following required variables are missing: ${missingVariables}`
    );

export default env;
