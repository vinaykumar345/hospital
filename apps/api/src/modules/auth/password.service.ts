import { Injectable } from "@nestjs/common";
import { pbkdf2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const pbkdf2Async = promisify(pbkdf2);
const HASH_ALGORITHM = "sha512";
const HASH_ITERATIONS = 210_000;
const KEY_LENGTH = 64;

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("base64url");
    const derived = await pbkdf2Async(password, salt, HASH_ITERATIONS, KEY_LENGTH, HASH_ALGORITHM);
    return `pbkdf2_${HASH_ALGORITHM}$${HASH_ITERATIONS}$${salt}$${derived.toString("base64url")}`;
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [scheme, iterationText, salt, digest] = storedHash.split("$");
    if (scheme !== `pbkdf2_${HASH_ALGORITHM}` || !iterationText || !salt || !digest) {
      return false;
    }

    const derived = await pbkdf2Async(password, salt, Number(iterationText), KEY_LENGTH, HASH_ALGORITHM);
    const expected = Buffer.from(digest, "base64url");
    return expected.length === derived.length && timingSafeEqual(expected, derived);
  }
}
