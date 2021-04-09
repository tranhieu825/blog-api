import crypto from "crypto";

import { RSA_ALGORITHM, RSA_PASSWORD, RSA_IV } from "../config/env";

export function encryptRegister(text: any) {
  const algorithm = RSA_ALGORITHM;
  const password = RSA_PASSWORD;
  const iv = RSA_IV;

  const cipher = crypto.createCipheriv(algorithm, password, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();
  return {
    content: encrypted,
    tag: tag,
  };
}

export function decryptRegister(encrypted: any) {
  const algorithm = RSA_ALGORITHM;
  const password = RSA_PASSWORD;
  const iv = RSA_IV;
  let decipher = crypto.createDecipheriv(algorithm, password, iv);
  decipher.setAuthTag(encrypted.tag);
  let dec = decipher.update(encrypted.content, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}
