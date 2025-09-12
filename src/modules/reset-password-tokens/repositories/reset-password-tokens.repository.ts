import { PasswordResetToken } from "@prisma/client";
import { ICreateResetPassword } from "../interfaces/create-reset-password.interface";

export interface IResetPasswordTokensRepository {
    createPasswordResetToken(data: ICreateResetPassword): Promise<PasswordResetToken>;

    findResetPasswordByToken(token: string): Promise<PasswordResetToken | null>;

    updateExpiresAt(token_id: string): Promise<PasswordResetToken>
}
