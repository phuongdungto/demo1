import "reflect-metadata"
import * as path from "path";
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { NotFound } from 'http-errors';
import { AppDataSource } from "./core/database";
import userRouter from "./users/user.router";
import postRouter from "./posts/post.router";
import commentRouter from "./comments/comment.router"
import * as resUtil from "./core/utils/res.util";
import * as dotenv from "dotenv";
import http from "http";
import { Server, Socket } from 'socket.io';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

async function App() {
    // allow only certain origins
    const app = express();
    const port: number = parseInt(process.env.SERVER_PORT || '3004', 10);
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    app.use(cors({
        origin: "http://localhost:3000"
    }));
    io.on('connection', (socket: Socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on('comment', (data) => {
            console.log(data);
            io.emit('comment', data);
        });

        socket.on('post', (data) => {
            console.log(data);
            io.emit('post', data);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use('/static', express.static(path.join(__dirname, '..', 'public')));
    app.use(morgan('tiny'));
    await AppDataSource.initialize().then(() => {
        console.log("Connecting database successfully");
    }).catch((error) => console.log(error))
    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/comments', commentRouter);

    app.use((req: Request, res: Response, next: NextFunction) => {
        return next(new NotFound('Route not found'))
    });
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        return resUtil.handleError(res, error);
    })
    server.listen(port, () => {
        console.log('Listening at port: ' + port);
    })
}
App();