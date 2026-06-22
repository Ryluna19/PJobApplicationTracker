import { createRequire } from "node:module";
import {
describe,
expect,
it,
vi
} from "vitest";
import request from "supertest";

const require = createRequire(import.meta.url);
const createApp = require("../app");

function createFakePool() {
return {
query: vi.fn()
};
}

describe("GET /", () => {
it("returns the API status message", async () => {
const fakePool = createFakePool();
const app = createApp(fakePool);


    const response = await request(app)
        .get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("API rodando");

    expect(fakePool.query).not.toHaveBeenCalled();
});


});
