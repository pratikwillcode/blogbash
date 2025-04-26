import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../appwrite/auth'; // adjust the path if needed

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // extract userId and secret from URL
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const secret = queryParams.get('secret');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (!password || !confirmPassword) {
            setError("Please fill all fields.");
            return;
        }

        try {
            await authService.updateRecovery(userId, secret, password, password);
            setSuccess("Password updated successfully!");
            setError('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.message || "Failed to reset password");
            setSuccess('');
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Reset Your Password</h2>
                <form onSubmit={handleResetPassword} className='space-y-4'>
                    <input
                        type="password"
                        placeholder="New Password"
                        className='p-2 border w-full'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className='p-2 border w-full'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'>
                        Reset Password
                    </button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
