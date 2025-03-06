import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("https://your-backend.com/api/auth/forgot-password", { email });
      setMessage("Check your email for a password reset link.");
    } catch (error) {
      setMessage("Error sending reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col ">
      <h1 className="text-white text-xl">This Page is still in Progress, It 'll not work.</h1>
      <p className="text-white">Thank You !</p>
      <div className= "bg-[#00000076]  text-white rounded-lg shadow-lg !px-10 !py-10">
        <h2 className="text-xl font-bold !my-4">Forgot Password?</h2>
        <p className="text-sm text-gray-300 !my-2">Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border-2 w-full placeholder:pl-2 border-[#4e0eff] bg-transparent rounded-sm !py-1 focus:border-2 focus:border-[#7046e4] outline-none !mb-6'
          />
          <button
            type="submit"
            className='bg-[#4e0eff] text-white font-semibold text-sm !py-2 rounded-sm tracking-widest cursor-pointer hover:bg-blue-600 w-full'
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
