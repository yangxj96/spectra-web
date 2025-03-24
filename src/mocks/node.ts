import { setupServer } from "msw/node";
import UserApiMock from "./handlers/UserApiMock.ts";

export const server = setupServer(...UserApiMock);
