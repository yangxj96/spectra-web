import { setupWorker } from "msw/browser";
import UserApiMock from "@/mocks/handlers/UserApiMock.ts";

export const server = setupWorker(...UserApiMock);
