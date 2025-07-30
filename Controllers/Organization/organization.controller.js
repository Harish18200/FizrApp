const BusinessType = require('../../Model/BusinessType');
const { Op } = require('sequelize');

exports.businessTypes = async (req, res) => {
    try {
        const businessTypesDatas = await BusinessType.findAll({
            where: {
                status: 1,
                deleted_at: null
            }
        });

        if (!businessTypesDatas || businessTypesDatas.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No business types found.'
                
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Business types fetched successfully.',
            data: businessTypesDatas
        });

    } catch (error) {
        console.error('Error fetching business types:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};



