import { Resend } from 'resend'
import 'dotenv/config'

const resend = new Resend(
    process.env.RESEND_API_KEY,
)

export async function sendResetEmail(email: string, otp: string) {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '重置你的 DevNav 密码',
        html: `
            <p>你好，${email}</p>
            <p>你的重置密码验证码是：<strong>${otp}</strong></p>
            <p>请在10分钟内输入验证码。</p>
        `,
    })
}


