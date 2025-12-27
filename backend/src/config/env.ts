import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(5000),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.coerce.number().default(6450),
    DB_USER: z.string().default('postgres'),
    DB_PASSWORD: z.string().default('postgres'),
    DB_NAME: z.string().default('realtime_chat_app'),
    CLERK_SECRET_KEY: z.string(),
    CLERK_PUBLISHABLE_KEY: z.string(),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
}

const env = parsed.data;
export default env;