const InvestorModel = require('../model/investor');
const CompanyModel = require('../model/company');
const {logEvent} = require('../logger');
const {Sequelize, fn, col} = require("sequelize");


const getAllInvestors = async (req, res) => {
    let params = {
        attributes: [
            [
                Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
                'name'
            ],
            'investment_industry_preferences1',
            'investor_type',
            'investment_type',
            'status',
            'id'
        ],
    }

    try {
        const data = await InvestorModel.findAll(params);
        return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const getInvestorById = async (req, res) => {
    const invId = req.query.id ? req.query.id: 'empty';

    if (invId === 'empty') {
        return res.status(200).json({message: 'UnAuthorized Request Detected!',status: 401});
    }

    let params = {
        where : {
            id: invId
        },
        attributes: [
            [
                Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
                'name'
            ],
            'investment_industry_preferences1',
            'investor_type',
            'investment_type',
            'status',
        ],
    }

    try {
        const data = await InvestorModel.findAll(params);
        return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }


}










module.exports = {
    getAllInvestors,getInvestorById
}
