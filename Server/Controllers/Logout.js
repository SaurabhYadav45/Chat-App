// async function logout(req, res){
//     try {
//         const cookieOptions={
//             http:true,
//             secure:true
//         }
    
//         return res.cookie('token', '', cookieOptions).status(200).json({
//             success:true,
//             message:"user Logout Successfully"
//         })
//     } catch (error) {
//         console.log("Failed to logout, Try again later")
//         return res.status(500).json({
//             success:false,
//             message:error.message || error
//         })
//     }
// }

// module.exports = logout