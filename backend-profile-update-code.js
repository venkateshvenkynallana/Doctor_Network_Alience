// Backend Middleware Setup for Profile Image Upload
// Add this to your backend server file (e.g., server.js or app.js)

const express = require('express');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profilepics/'); // Make sure this folder exists
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

// Profile Update Route - UPDATED VERSION with payload structure
app.put('/api/auth/update-profile', upload.single('profilepic'), async (req, res) => {
    try {
        console.log('Profile update request received');
        console.log('File:', req.file);
        console.log('Body:', req.body);

        // Get user ID from authenticated user (you should have middleware for this)
        const userId = req.user?.id || req.body.userId;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // Prepare update data
        const updateData = {};
        
        // Handle profile picture
        if (req.file) {
            updateData.profilepic = `/uploads/profilepics/${req.file.filename}`;
            console.log('Profile picture path:', updateData.profilepic);
        }
        
        // Parse payload from FormData
        let payload = {};
        if (req.body.payload) {
            try {
                payload = JSON.parse(req.body.payload);
                console.log('Parsed payload:', payload);
            } catch (error) {
                console.error('Error parsing payload:', error);
            }
        }
        
        // Handle bio (professional summary)
        if (payload.bio) {
            updateData.bio = payload.bio;
        }
        
        // Handle basic fields
        const basicFields = ['specialization', 'professionalHeadline'];
        basicFields.forEach(field => {
            if (payload[field]) {
                updateData[field] = payload[field];
            }
        });
        
        // Handle skills array
        if (payload.skills && Array.isArray(payload.skills)) {
            updateData.skills = payload.skills;
        }
        
        // Handle experience object
        if (payload.experience && typeof payload.experience === 'object') {
            updateData.experience = payload.experience;
        }
        
        // Handle education object
        if (payload.education && typeof payload.education === 'object') {
            updateData.education = payload.education;
        }
        
        // Handle certifications object
        if (payload.certifications && typeof payload.certifications === 'object') {
            updateData.certifications = payload.certifications;
        }
        
        // Handle empty fields - send empty strings/arrays if required
        // This ensures backend receives empty data when user clears fields
        if (payload.bio === '') updateData.bio = '';
        if (payload.specialization === '') updateData.specialization = '';
        if (payload.professionalHeadline === '') updateData.professionalHeadline = '';
        if (payload.skills && Array.isArray(payload.skills) && payload.skills.length === 0) {
            updateData.skills = [];
        }

        console.log('Final update data:', updateData);

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log('User updated successfully:', updatedUser);

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating profile'
        });
    }
});

// Alternative: If you're not using multer, use express-fileupload
/*
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 },
}));

app.put('/api/auth/update-profile', async (req, res) => {
    try {
        console.log('Profile update request received');
        console.log('Files:', req.files);
        console.log('Body:', req.body);

        const userId = req.user?.id || req.body.userId;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const updateData = {};
        
        // Handle profile picture
        if (req.files && req.files.profilepic) {
            const profilepic = req.files.profilepic;
            const uploadPath = __dirname + '/uploads/profilepics/' + profilepic.name;
            
            await profilepic.mv(uploadPath);
            updateData.profilepic = '/uploads/profilepics/' + profilepic.name;
            console.log('Profile picture saved to:', uploadPath);
        }
        
        // Handle other form fields
        const allowedFields = [
            'fullName', 'email', 'specialization', 'professionalSummary',
            'professionalHeadline', 'jobTitle', 'hospital', 'duration',
            'experienceDescription', 'degree', 'university', 'educationYear',
            'licenseName', 'issuingOrganization', 'validUntil'
        ];
        
        allowedFields.forEach(field => {
            if (req.body[field]) {
                updateData[field] = req.body[field];
            }
        });

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating profile'
        });
    }
});
*/

// Make sure to create the uploads directory
const fs = require('fs');
const uploadsDir = 'uploads/profilepics';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory:', uploadsDir);
}
