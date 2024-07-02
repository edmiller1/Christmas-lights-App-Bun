import { z } from "zod";
import { insertDecorationSchema, insertUserSchema } from "../db/schema";

export const createUserSchema = insertUserSchema.omit({
  id: true,
  createdAt: true,
});

export const createDecorationSchema = insertDecorationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
