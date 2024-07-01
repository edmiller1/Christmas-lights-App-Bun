import { z } from "zod";
import { insertDecorationSchema } from "../db/schema";

export const createDecorationSchema = insertDecorationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
