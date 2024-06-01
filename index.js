import express from 'express';
import path from 'path'
import multer from 'multer';
import ejsLayouts from 'express-ejs-layouts';
import { getUploadView, processUpload, readCSV, seeAllUploads } from './src/controller/csv.controller.js';

const app = express();

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}_${Date.now()}`);
    }
});

const upload = multer({storage});

app.use(express.static('public'));
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.get('/', seeAllUploads);
app.get('/upload', getUploadView);
app.post('/upload', upload.single('file'), processUpload);
app.get('/file/:fileName', readCSV);

app.listen(3000, () => {
    console.log('server is listening to port 3000');
})



