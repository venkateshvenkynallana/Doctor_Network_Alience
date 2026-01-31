import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import transporter from "../lib/mailer.js";


//Sign up form
export const signUp = async (req, res) => {

    const { fullName, email, password, bio, phoneNo, designation } = req.body;

    try {
        if (!fullName || !email || !password || !phoneNo || !designation) {
            return res.status(400).json({ message: "fields are missing." });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "User already exists." });
        }

        //password hashing
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio,
            phoneNo,
            designation,
        });

        const token = generateToken(newUser._id);

        res.status(200).json({ success: true, userData: newUser, token, message: "Account created successfully." });

    } catch (error) {
        console.log("create the user error", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

//login user 

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email });

        const isPassword = await bcrypt.compare(password, userData.password);

        if (!isPassword) {
            res.status(409).json({ message: "Invalid credentials." });
        }

        const token = generateToken(userData._id);

        res.status(200).json({ success: true, userData, token, message: "Login successful." });

    } catch (error) {
        console.log("login error", error);
        res.status(404).json({ message: "User not found." });
    }
}

//controller to check if user is authenticated 
export const checkAuth = async (req, res) => {
    res.status(200).json({ success: true, user: req.user });
}

//controller update user profile details
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            fullName,
            email,
            bio,
            phoneNo,
            designation,
            profile
        } = req.body || {}; // ✅ prevent crash

        const updateData = {};

        // ===== basic fields =====
        if (fullName) updateData.fullName = fullName;
        if (email) updateData.email = email;
        if (bio) updateData.bio = bio;
        if (phoneNo) updateData.phoneNo = phoneNo;
        if (designation) updateData.designation = designation;

        // ===== nested profile =====
        if (profile) {
            const parsedProfile =
                typeof profile === "string" ? JSON.parse(profile) : profile;

            if (parsedProfile.professionalHeadline)
                updateData["profile.professionalHeadline"] =
                    parsedProfile.professionalHeadline;

            if (parsedProfile.skills)
                updateData["profile.skills"] = parsedProfile.skills;

            if (parsedProfile.experience) {
                Object.entries(parsedProfile.experience).forEach(([key, value]) => {
                    if (value)
                        updateData[`profile.experience.${key}`] = value;
                });
            }

            if (parsedProfile.education) {
                Object.entries(parsedProfile.education).forEach(([key, value]) => {
                    if (value)
                        updateData[`profile.education.${key}`] = value;
                });
            }

            if (parsedProfile.certifications) {
                Object.entries(parsedProfile.certifications).forEach(([key, value]) => {
                    if (value)
                        updateData[`profile.certifications.${key}`] = value;
                });
            }

            if (parsedProfile.professionalInterests)
                updateData["profile.professionalInterests"] = parsedProfile.professionalInterests;

            if (parsedProfile.achievements)
                updateData["profile.achievements"] = parsedProfile.achievements;
        }

        // ===== image upload via multer =====
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
            );
            updateData.profilepic = uploadResult.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            updatedUser,
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.error("update profile error", error);
        res.status(500).json({ message: error.message });
    }
};



//controller to handle forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        user.resetOtp = otp;
        user.otpExpire = Date.now() + 10 * 60 * 1000; // ✅ 10 minutes

        await user.save();


        console.log("SMTP_USER:", process.env.SMTP_USER);
        console.log("SMTP_PASS:", process.env.SMTP_PASS ? "SET" : "NOT SET");


        await transporter.sendMail({
            from: `"DNA Support" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${otp}. Valid for 5 minutes.`
        });

        res.status(200).json({ message: "OTP sent to email " });
    } catch (error) {
        console.log("forget password error", error);
        res.status(500).json({ message: "Internal server error." });
    }
}


//verify otp controller
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (
            !user ||
            user.resetOtp !== Number(otp) ||
            user.otpExpire < Date.now()
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }

        res.status(200).json({ success: true, message: "OTP verified successfully." });

    } catch (error) {
        console.log("verify otp error", error);
        res.status(500).json({ message: "Internal server error." });
    }
}


//reset password controller
export const resetPassword = async (req, res) => {
    try {

        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        user.resetOtp = null;
        user.otpExpire = null;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully." });

    } catch (error) {
        console.log("reset password error", error);
        res.status(500).json({ message: "Internal server error." });
    }
}