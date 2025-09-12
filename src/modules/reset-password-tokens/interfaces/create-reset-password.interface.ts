export interface ICreateResetPassword {
    token: string;
    user_id: string;
    expires_at: Date;
}