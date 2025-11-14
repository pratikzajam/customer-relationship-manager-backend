import LeadLog from '../Models/LeadLog.model.js'


export let addLeadLog = async (req, res) => {
    try {
        const { action, message, notes } = req.body;
        const { leadId } = req.params;
        const { userId } = req.user;

        if (!leadId) {
            return res.status(404).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }

        if (!userId) {
            return res.status(404).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }

        if (!action || !message) {
            return res.status(404).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        let addLeadLog = await LeadLog.create({
            leadId: leadId,
            userId: userId,
            action: action,
            message: message,
            notes: notes
        })

        if (addLeadLog.id) {
            return res.status(201).json({
                status: true,
                message: "Log Added Sucessfully",
                data: null
            })
        } else {
            return res.status(500).json({
                status: false,
                message: "Something went wrong while adding the logs",
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


export let getAllLeadLogs = async (req, res) => {
    try {

        let { adminId } = req.user;

        if (req.user.role == "Admin") {
            adminId = req.user.userId
        }

        if (!adminId) {
            return res.status(404).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }

        let allLeadLogs = await LeadLog.findAll({
            where: {
                userId: adminId
            },
            attributes: ['id','action', 'message', 'notes']  
        });



        if (allLeadLogs.length == 0) {
            return res.status(404).json({
                status: false,
                message: "No Logs Found",
                data: null
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Logs Fetched Sucessfully",
                data: allLeadLogs
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



export let deleteLeadLog = async (req, res) => {
    try {
        const { leadLogId } = req.params;


        if (!leadLogId) {
            return res.status(404).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }

        const isLogExists = await LeadLog.findOne({
            where: { id: leadLogId }
        });

        if (!isLogExists) {
            return res.status(404).json({
                status: false,
                message: "Log Does Not Exists",
                data: null
            })
        }

        const DeleteLogs = await LeadLog.destroy({
            where: { id: leadLogId }
        });

        if (DeleteLogs == 1) {
            return res.status(200).json({
                status: true,
                message: "Log Deleted Sucessfully",
                data: null
            })
        } else {
            return res.status(500).json({
                status: false,
                message: "Something went wrong while deleteing  the logs",
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