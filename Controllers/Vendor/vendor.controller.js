const Vendor = require('../../Model/Vendor');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.createVendor = async (req, res) => {
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
        const foundVendor = await Vendor.findOne({
            where: {
                [Op.or]: [
                    { mobile },
                    { email }
                ],
                deleted_flag: null,
                deleted_at: null
            }
        });

        if (foundVendor) {
            return res.status(409).json({
                success: false,
                message: 'Mobile number or email already exists.',
            });
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);


        const newVendor = await Vendor.create({
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
            message: 'Vendor created successfully.',
            data: newVendor
        });

    } catch (error) {
        console.error('Error creating vendor:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

