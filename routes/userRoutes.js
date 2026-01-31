<<<<<<< HEAD
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { updateProfile, getProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth'); // Assuming you have auth middleware

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/profilepics';
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
            console.log('Created uploads directory:', uploadPath);
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Profile Routes
router.put('/update-profile', protect, upload.single('profilepic'), updateProfile);
router.get('/profile', protect, getProfile);
router.get('/profile/:userId', getProfile); // Public profile view

module.exports = router;
=======
import express from "express";
import { checkAuth, forgotPassword, Login, resetPassword, signUp, updateProfile, verifyOtp } from "../controller/userController.js";
import { protectRoute } from "../middleware/auth.js";
import { uploadMulter } from "../middleware/multer.js";

const userRouter = express.Router();

//user routes 
userRouter.post("/signup", signUp);
userRouter.post("/login", Login);
userRouter.put("/update-profile", protectRoute, uploadMulter.single("profilepic"), updateProfile);
userRouter.get("/check", protectRoute, checkAuth);
 
//reset password routes
userRouter.post("/forget-password", forgotPassword);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/reset-password", resetPassword)

export default userRouter;
>>>>>>> 02e8f542f6d756f6b93a56aaab54a54acddf26b1
