import { catchAsyncErrors } from "../middleware/catchAsyncerror.js"
import ErrorHandler from "../middleware/errorMiddleware.js"
import { User } from "../models/userSchema.js";
import { generateTokens } from "../utils/jwtTokens.js"
import cloudinary from "cloudinary"

export const pateintRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;


    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role) {
        return next(new ErrorHandler("please fill full form", 400))
    }
    let user = await User.findOne({ email })
    if (user) {
        return next(new ErrorHandler("User already exists", 400))
    }
    user = await user.create({ firstName, lastName, email, phone, password, gender, dob, nic, role });
    generateTokens(user, "User registered successfully", 200, res)
    // res.status(200).json({
    //     success: true,
    //     message: 'User registered successfully'
    // });
});



export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("please fill full form", 400))
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirmPassword did not match", 400))
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("invalid Password of Email", 400))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid Password of Email", 400))
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found", 400))
    }
    generateTokens(user, "User logged in successfully", 200, res)
    // res.status(200).json({
    //     success: true,
    //     message: 'User loggedIn successfully'
    // });
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;


    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
        return next(new ErrorHandler("please fill full form", 400))
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exist`))
    }

    const admin = await User.create({ firstName, lastName, email, phone, password, gender, dob, nic, role: "Admin" })
    res.status(200).json({
        success: true,
        message: 'New admin created successfully'
    });
});


export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" })
    res.status(200).json({
        success: true,
        doctors
    });
});


export const getuserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin logged out successfully"
    });
});



export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient logged out successfully"
    });
});


export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    // Check if the file is present in the request
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("Doctor With This Email Already Exists!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return next(new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500));
    }

    console.log("Cloudinary Upload Response:", cloudinaryResponse);

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Doctor",
        doctorDepartment,
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor,
    });
});
