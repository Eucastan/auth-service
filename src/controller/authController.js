import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import { SignToken } from "../utils/authToken.js";
import { logger } from "../config/logger.js";


export const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(401).json({message: "All credentials required"});
        }

        const hash = await bcrypt.hash(password, 10);

        const inUse = await User.findOne({where: {email}});
        if (inUse) return res.status(403).json({message: "Email already exist"});

        const user = await User.create({ 
            username, 
            email, 
            password: hash,
            role: "user"
        });

        logger.info("User created successfully", { userId: user.id, role: user.role });

        res.status(201).json({
            message: "User registered successfully",
            success: true
        });

    } catch (error) {
        logger.error(`An error occured while creating a user: ${error.message}`);
        res.status(500).json({
            error: "Internal server error creating a user"
        });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(401).json({message: "All credentials required"});
        }

        const exists = await User.findOne({where: {email}});
        if(!exists) return res.status(400).json({message: "Invalid email"});

        const isValid = await bcrypt.compare(password, exists.password);
        if(!isValid) return res.status(403).json({message: "Invalid password"});

        const token = SignToken({ id: exists.id });

        logger.info(`User login successfully, ${exists.id}`);

        res.json({
            token,
            message: "User login successfully",
            success: true
        });
    } catch (error) {
        logger.error(`Internal server error trying to login", ${error.message}`);
        res.status(500).json({error: "Internal server error trying to login"});
    }
}

export const removeUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if(!user) return res.status(404).json({message: "User not found"});

        const remove = await user.destroy();
        logger.info(`User ${userId} : ${user.username} removed`);

        res.json({message: `User ${userId} : ${user.username} removed`});
    } catch (error) {
        res.status(500).json({message: `Server error removing ${userId}`, error});
    }
}

export const Profile = async (req, res) => {
    res.json({
        message: "User profile",
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
    });
}