import { useState } from "react";
import { Box, Card, CardContent, TextField, Typography, Alert } from "@mui/material";
import Path from "../common/Path";
import { sendOtpApi, verifyOtpApi } from "../common/apiHelper";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");

    const handleSendOtp = async () => {
        if (!email) return setError("Email is required.");
        setError("");
        setOtpSent(true);
        try {
            await sendOtpApi({ email });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP.");
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) return setError("OTP is required.");
        try {
            const res = await verifyOtpApi({ email, otp });
            localStorage.setItem("token", res.data.data.token);
            window.location.href = Path.DASHBOARD;
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP.");
        }
    };
    return (
        <Box className="login_wrapper">
            <Card className="login_card">
                <CardContent className="login_card_content">
                    <Typography variant="h5" className="login_title">Kryonix Admin</Typography>
                    <Typography variant="body2" className="login_subtitle">
                        {otpSent ? "Enter the OTP sent to your email" : "Sign in to your account"}
                    </Typography>

                    {error && <Alert severity="error" className="login_error">{error}</Alert>}

                    {!otpSent ? (
                        <>
                            <TextField fullWidth label="Email" type="email"
                                value={email} onChange={(e) => setEmail(e.target.value)} className="login_field"
                            />
                            <button className="btn btn_main w-100 mt-2" onClick={handleSendOtp}>Send OTP</button>
                        </>
                    ) : (
                        <>
                            <TextField fullWidth label="Enter OTP" type="text"
                                value={otp} onChange={(e) => setOtp(e.target.value)} className="login_field"
                            />
                            <button className="btn btn_main w-100 mt-2" onClick={handleVerifyOtp}>Verify OTP</button>
                            <button className="btn btn_outline w-100 mt-2" onClick={() => { setOtpSent(false); setError(""); }}>Back</button>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
