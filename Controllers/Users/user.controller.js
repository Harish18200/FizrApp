const User = require('../../Model/User');
const UserType = require('../../Model/UserType');
const Vendor = require('../../Model/Vendor');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();





exports.createUser = async (req, res) => {
    const { firstName, lastName, mobile, email, password, gender, address, profile, status } = req.body;
    if (!firstName || !mobile || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'First name, mobile, email and password are required.',
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long.',
        });
    }

    try {
        const foundUser = await User.findOne({
            where: {
                [Op.or]: [
                    { mobile },
                    { email }
                ],
                deleted_flag: null,
                deleted_at: null
            }
        });

        if (foundUser) {
            return res.status(409).json({
                success: false,
                message: 'Mobile number or email already exists.',
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            first_name: firstName,
            last_name: lastName,
            mobile,
            email,
            password: hashedPassword,
            gender,
            address,
            profile,
            status: status || 1
        });

        return res.status(201).json({
            success: true,
            message: 'User created successfully.',
            data: newUser
        });

    } catch (error) {
        console.error('Error creating vendor:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
exports.userTypes = async (req, res) => {
    try {
        const userTypesDatas = await UserType.findAll({
            where: {
                status: 1,
                deleted_at: null
            }
        });

        if (!userTypesDatas || userTypesDatas.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No user types found.'

            });
        }

        return res.status(200).json({
            success: true,
            message: 'user types fetched successfully.',
            data: userTypesDatas
        });

    } catch (error) {
        console.error('Error fetching business types:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


exports.login = async (req, res) => {
    const { userTypeId, mobile, password } = req.body;

    if (!userTypeId || !mobile || !password) {
        return res.status(400).json({
            success: false,
            message: 'User type, mobile, and password are required.',
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long.',
        });
    }

    try {
        let foundUser;

        if (userTypeId === 1) {
            foundUser = await User.findOne({
                where: {
                    mobile,
                    status: 1,
                    deleted_flag: null,
                    deleted_at: null,
                },
            });
        } else if (userTypeId === 2) {
            foundUser = await Vendor.findOne({
                where: {
                    mobile,
                    status: 1,
                    deleted_flag: null,
                    deleted_at: null,
                },
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid user type provided.',
            });
        }

        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: 'Invalid mobile number or password.',
            });
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password.',
            });
        }

        const token = jwt.sign(
            {
                id: foundUser.id,
                mobile: foundUser.mobile,
                userType: userTypeId === 1 ? 'user' : 'vendor',
            },
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            userType: userTypeId === 1 ? 'user' : 'vendor',
            token,
            data: {
                id: foundUser.id,
                name: foundUser.name,
                mobile: foundUser.mobile,
                email: foundUser.email,
            },
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
