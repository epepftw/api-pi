import { Request, Response, NextFunction, Router } from 'express';
import * as logsym from 'log-symbols';

// Services
import { clearContentsTable, downloadContents, getAllContents, saveContents } from '../services/MediaFile.service';

const MediaFileRoutes: Router = Router();

MediaFileRoutes.post('/pi/media/save', async(req: Request, res: Response) => {
    try {
        console.log(req.body);
        const clear = await clearContentsTable();
        console.log(clear);
        await saveContents(req.body);
        console.log('Player Data Saved');
        await downloadContents(req.body);
        console.log('Contents Downloaded');
        res.status(200).send({ message: 'Player Data Successfully Saved!'})
    } catch (error) {
        console.log(error)
        res.status(500);
    }
})

MediaFileRoutes.get('/pi/media/getAll', async (req: Request, res:Response) => {
    try {
        res.send(await getAllContents());
    } catch (err) {
        console.log(logsym.error, err);
        res.status(500);
    }
})

// MediaFileRoutes.get('/media/getMedia/:id', async (req: Request, res:Response) => {
//     try {
//         res.send(await getContentById(req.params.id));
//     } catch (err) {
//         console.log(logsym.error, err);
//         res.status(500);
//     }
// })

// MediaFileRoutes.post('/media/saveUploadedMediaInfo', async (req: Request, res: Response) => {
//     try {
//         console.log('Submitted Data', req.body);
//         const result = await saveUploadedMediaInfo(req.body);
//         res.send(result)
//     } catch (err) {
//         console.log(logsym.error, err);
//         res.status(500);
//     }
// })

export default MediaFileRoutes;