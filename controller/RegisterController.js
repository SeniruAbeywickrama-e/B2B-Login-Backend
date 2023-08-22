const InvestorModel = require('../model/investor');
const CompanyModel = require('../model/company');
const {logEvent} = require('../logger');


const registerInvestor = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            country,
            address,
            companyRole,
            numberOfEmployees,
            assetsUnderManagement,
            investorType,
            investorTypeDescription,
            investmentType,
            investmentTypeDescription,
            investmentIndustryPreference1,
            investmentIndustryPreference2,
            investmentIndustryPreference3,
            investmentIndustryPreference4,
        } = req.body;

        // Validate fields
        // if (firstName.length <= 3 || lastName.length <= 3 || address.length <= 3) {
        //     return res.status(400).json({ message: 'Fields must contain more than 3 characters' });
        // }

        try {
            const newInvestment = {
                first_name: firstName,
                last_name: lastName,
                country: country,
                address: address,
                company_role: companyRole,
                total_employees: numberOfEmployees,
                assets_value: assetsUnderManagement,
                investor_type: investorType,
                investor_type_description: investorTypeDescription,
                investment_type: investmentType,
                investment_type_description: investmentTypeDescription,
                investment_industry_preferences1: investmentIndustryPreference1,
                investment_industry_preferences2: investmentIndustryPreference2,
                investment_industry_preferences3: investmentIndustryPreference3,
                investment_industry_preferences4: investmentIndustryPreference4,
            };
            // Add data to company table
            await InvestorModel.create(newInvestment);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }

        // Log the successful registration
        logEvent(`Investor successfully registerd`);

        // Respond with success message
        res.status(201).json({ message: 'Investor registered successfully' });
    } catch (error) {
        console.error('Error registering investor:', error);
        res.status(500).json({ message: 'An error occurred' });
    }

}

const registerCompany = async (req, res) => {
    const formData = req.body;

    // Define validation rules
    const validationRules = [
        { field: 'elevatorPitch', message: 'Elevator Pitch must contain at least 3 characters' },
        { field: 'productDescription', message: 'Product Description must contain at least 3 characters' },
        { field: 'businessProblemSolved', message: 'Business Problem Solved must contain at least 3 characters' },
        { field: 'natureOfBusiness', message: 'Nature of Business must contain at least 3 characters' },
        { field: 'keyValueProposition', message: 'Key Value Proposition must contain at least 3 characters' },
    ];

    // Check validation results
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    console.log(formData);

    try {
        const newCompany = {
                date_Of_Incorporation: formData.dateOfIncorporation,
                partnership_Type: formData.partnershipType,
                investment_Type: formData.investmentType,
                investment_Type_Description: formData.investmentTypeDescription,
                elevator_Pitch: formData.elevatorPitch,
                partnership_Requirement: formData.partnershipRequirement,
                what_on_Offer: formData.whatOnOffer,
                is_Sustainable: formData.isSustainable,
                number_Of_Employees: formData.numberOfEmployees,
                product_Maturity: formData.productMaturity,
                product_Description: formData.productDescription,
                collaterals: formData.collaterals && formData.collaterals.length > 0 ? JSON.stringify(formData.collaterals) : null,
                referrals: formData.referrals && formData.referrals.length > 0 ? JSON.stringify(formData.referrals) : null,
                product_Industry1: formData.productIndustry1,
                product_Industry2: formData.productIndustry2,
                product_Industry3: formData.productIndustry3,
                nature_Of_Business: formData.natureOfBusiness,
                company_Industry: formData.companyIndustry1,
                company_Industry2: formData.companyIndustry2,
                company_Industry3: formData.companyIndustry3,
                business_Process: formData.businessProcess,
                company_Products: formData.companyProducts,
                company_Resources: formData.companyResources,
                management_Employee: formData.managementEmployee,
                management_Experience: formData.managementExperience,
                technical_Employee: formData.technicalEmployee,
                technical_Experience: formData.technicalExperience,
                admin_Employees: formData.adminEmployees,
                admin_Experience: formData.adminExperience,
                marketing_Employees: formData.marketingEmployees,
                marketing_Experience: formData.marketingExperience,
                other_Hr_Field: formData.otherHrField,
                other_Hr_Employee: formData.otherHrEmployee,
                other_Hr_Experience: formData.otherHrExperience,
                key_Value_Proposition : formData.keyValueProposition,
                stakeholders : formData.stakeholders && formData.stakeholders.length > 0 ? JSON.stringify(formData.stakeholders) : null,
                company_Collaterals: formData.companyCollaterals && formData.companyCollaterals.length > 0 ? JSON.stringify(formData.companyCollaterals) : null,
                company_Referrals: formData.companyReferrals && formData.companyReferrals.length > 0 ? JSON.stringify(formData.companyReferrals) : null,
        };

        await CompanyModel.create(newCompany);

        // Log the successful registration
        logEvent(`Company successfully registerd`);

        return res.status(201).json({ message: 'Registration data saved', status : 201 });
    } catch (error) {
        logEvent(`Registration error`);
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'An error occurred during registration' });
    }
}



module.exports = {
    registerInvestor , registerCompany
}
