import Lead from "../Models/Leads.model.js";
import User from "../models/User.model.js";

export let addLead = async (req, res) => {
    try {

        const { title, company, contact_name, contact_email, status, source } = req.body;
        const { adminId, userId, createdBy, role } = req.user;

        console.log(req.user)

        if (!userId) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }

        if (!title || !company || !contact_name || !contact_email || !status || !source) {
            return res.status(404).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }


        let newLead;

        if (role == "Admin") {

            newLead = await Lead.create({
                title: title,
                company: company,
                contact_name: contact_name,
                contact_email: contact_email,
                status: status,
                source: source,
                adminId: userId,
                createdBy: userId
            });
        } else {

            newLead = await Lead.create({
                title: title,
                company: company,
                contact_name: contact_name,
                contact_email: contact_email,
                status: status,
                source: source,
                adminId: adminId,
                createdBy: createdBy
            });
        }



        if (newLead.dataValues.id) {
            return res.status(201).json({
                status: true,
                message: "Lead Added Sucessfully",
                data: null
            })
        } else {
            return res.status(500).json({
                status: false,
                message: "Something Went Wrong While Adding The Lead",
                data: null
            })

        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}


export let deleteLead = async (req, res) => {
    try {

        const { leadId } = req.params;

        if (!leadId) {
            return res.status(404).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }

        const isLeadExists = await Lead.findOne({
            where: { id: leadId }
        });


        if (!isLeadExists) {
            return res.status(404).json({
                status: false,
                message: "Lead Does Not Exists",
                data: null
            })
        }


        let deleteLead = await Lead.destroy({
            where: { id: leadId },
        });

        if (deleteLead == 1) {
            return res.status(404).json({
                status: true,
                message: "Lead Deleted Sucessfully",
                data: null
            })
        } else {
            return res.status(500).json({
                status: false,
                message: "Something Went Wrong While Deleting The Lead",
                data: null
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}



export let getLeadDetails = async (req, res) => {
    try {
        const { leadId } = req.params;

        if (!leadId) {
            return res.status(404).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }

        const isLeadExists = await Lead.findOne({
            where: { id: leadId },
            attributes: { exclude: ["adminId", "createdBy", "updated_at", "id"] }
        });

        if (!isLeadExists) {
            return res.status(404).json({
                status: false,
                message: "Lead Does Not Exists",
                data: null
            })
        }

        if (isLeadExists) {
            return res.status(200).json({
                status: false,
                message: "Leads Data Fetched Sucessfully",
                data: {
                    Leads: isLeadExists
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}



export let getAllLeads = async (req, res) => {
    try {
        const { adminId } = req.params;

        if (!adminId) {
            return res.status(404).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }

        const isAdminExists = await User.findOne({
            where: { id: adminId }
        });

        if (!isAdminExists?.id) {
            return res.status(404).json({
                status: false,
                message: "Admin Not Found",
                data: null
            })
        }

        let getLeads = await Lead.findAll({ where: { adminId: adminId } });


        if (getLeads.length == 0) {
            return res.status(404).json({
                status: true,
                message: "No Leads Found",
                data: null
            })
        } else {
            return res.status(200).json({
                status: false,
                message: "Leads Fetched Sucessfully",
                data: {
                    Leads: getLeads
                }
            })
        }



    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}


export let updateLeadDetails = async (req, res) => {
    try {
        const { leadId } = req.params;
        let { title, company, contact_name, contact_email, status, source } = req.body

        if (!leadId) {
            return res.status(404).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }



        const isLeadExists = await Lead.findOne({
            where: { id: leadId },
            attributes: { exclude: ["adminId", "createdBy", "updated_at", "id"] }
        });

        if (!isLeadExists) {
            return res.status(404).json({
                status: false,
                message: "Lead Does Not Exists",
                data: null
            })
        }


        title = req.body.title || isLeadExists.title;
        company = req.body.company || isLeadExists.company;
        contact_name = req.body.contact_name || isLeadExists.contact_name;
        contact_email = req.body.contact_email || isLeadExists.contact_email;
        status = req.body.status || isLeadExists.status;
        source = req.body.source || isLeadExists.source;


        let updateLeads = await Lead.update(
            {
                title: title,
                company: company,
                contact_name: contact_name,
                contact_email: contact_email,
                status: status,
                source: source

            },
            {
                where: { id: leadId }
            }
        );


        if (updateLeads == 1) {
            return res.status(200).json({
                status: false,
                message: "Lead Updated Sucessfully",
                data: null
            })
        } else {
            return res.status(500).json({
                status: false,
                message: "Something went wrong while updating the Leads",
                data: null
            })
        }




    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}










