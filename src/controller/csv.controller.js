import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export const seeAllUploads = async(req, res, next)=>{
    fs.readdir('uploads', (err, files) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(files)
        res.render('uploadsListView', { files });
    });
}

export const getUploadView = async(req, res, next) =>{
    res.status(200).render('uploadView');
}

export const processUpload = async(req, res, next)=>{
    res.redirect('/');
}

export const readCSV = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join('uploads', fileName);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
};