import jwt from 'jsonwebtoken';


let auth = (req,res,next) => {
    try {

        const { authorization } = req.headers;

        let token = authorization.split(" ")[1];

        if (!token) {
            return res.status(200).json({
                status: null,
                message: "No Token Found",
                data: null
            })
        }

        try {
            let decoded = jwt.decode(token);

            console.log(decoded)
            req.user = decoded;

            next()
        } catch (error) {
            return res.status(500).json({
                status: null,
                message: error.message,
                data: null
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: null,
            message: error.message,
            data: null
        })
    }
}


export default auth