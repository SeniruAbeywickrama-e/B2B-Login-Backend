const InvestorModel = require('../model/investor');
const CompanyModel = require('../model/company');
const {logEvent} = require('../logger');
const {Sequelize, fn, col , Op} = require("sequelize");


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


const searchInvestorByName = async (req, res) => {
    const searchString = req.query.search;
    console.log(searchString)
    let params = {
        attributes: [
            [
                Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
                'name'
            ],
            'investment_industry_preferences1', 'investor_type', 'investment_type', 'status', 'id'
        ],
        where: {
            [Sequelize.Op.or]: {
                'first_name': {
                    [Sequelize.Op.like]: `%${searchString}%`
                },
                'last_name': {
                    [Sequelize.Op.like]: `%${searchString}%`
                }
            },
        },
    }

    try {
        const data = await InvestorModel.findAll(params);
        console.log(data)
        return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const investorFilter = async (req, res) => {
    const filterIndustry = req.query.industry;
    const filterInvestment = req.query.investment;
    console.log(filterInvestment);
    console.log(filterIndustry);
    const params_f = {
        attributes: [
            [
                Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
                'name'
            ],
            'investment_industry_preferences1', 'investor_type', 'investment_type', 'status', 'id'
        ],
        where: {
            'investment_industry_preferences1': {
                    [Op.like]: `${filterIndustry}%`
            },
            'investment_type': {
                    [Op.like]: `${filterInvestment}%`
            }
        },
    }

    try {
        const data = await InvestorModel.findAll(params_f);
        console.log(data)
        return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const approveInvestor = async (req, res) => {
    const filterIndustry = req.query.id;

    try {
        await InvestorModel.update({ status: 1 }, {
            where: {
                id: filterIndustry
            }
        });
        return res.status(200).json({message: 'Successfully investor approved.',status: 200});

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

module.exports = {
    getAllInvestors,getInvestorById,searchInvestorByName,investorFilter
}
