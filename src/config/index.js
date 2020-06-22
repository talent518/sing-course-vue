import dev from "@/config/dev";
import test from "@/config/test";
import pre from "@/config/pre";
import prod from "@/config/prod";
const env = process.env.VUE_APP_ENV;

let config = dev;
if (env === 'test') {
    config = test;
} else if (env === 'pre') {
    config = pre;
} else if (env === 'prod') {
    config = prod;
}
export default config;