import { setupWorker } from "msw/browser";
import UserApiMock from "@/mocks/handlers/UserApiMock.ts";
import SystemApiMock from "@/mocks/handlers/SystemApiMock.ts";

export const server = setupWorker(...UserApiMock, ...SystemApiMock);
