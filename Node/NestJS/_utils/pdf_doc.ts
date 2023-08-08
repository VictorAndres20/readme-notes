import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { Initiative } from 'src/api/initiative/entity/initiative.entity';
import { IRQuestion } from 'src/api/ir_question/entity/ir_question.entity';

const totalDocWith = 615;
const totalDocHeight = 795;

const startPosXPage = 50;
const endPosXPage = 550;
const startPosYPage = 80;
const endPosYPage = 700;
const posYAddition = 20;

export const buildInitiativePDFDoc = (pathFile: string, data: Initiative, questions: IRQuestion[], answers: IRQuestion[]): Promise<boolean> => {
    return new Promise((resolve, reject) => {        
        let writeStream = fs.createWriteStream(`${pathFile}`);         
        let doc = new PDFDocument();
        doc.pipe(writeStream);

        // Write document with entity
        writeInitiativePdfContent(doc, data, questions, answers);

        finishPDFDocument(doc);
        writeStream.on('finish', function (err: Error) {
            if(err)
                reject(err);
            else
                resolve(true);
        });
    });
}

export const finishPDFDocument = (doc: typeof PDFDocument) => {
    doc.end();
}

export const validateAdditionPage = (doc: typeof PDFDocument, posY: number): number => {
    if(posY >= endPosYPage) {
        addPDFPage(doc);
        posY = startPosYPage;
    }
    return posY;
}

export const addPDFPage = (doc: typeof PDFDocument) => {
    doc.addPage();
}

export const writeBoldPDFDoc = (
    doc: typeof PDFDocument, 
    value: string, 
    posX: number, 
    posY: number,
    fonSize: number = 15,
    color: string = 'black') => {
    doc.font('Helvetica-Bold')
    .fillColor(color)
    .fontSize(fonSize)
    .text(value, posX, posY);
}

export const writePDFDoc = (
    doc: typeof PDFDocument, 
    value: string, 
    posX: number, 
    posY: number,
    fonSize: number = 15,
    color: string = 'black') => {
    doc.font('Helvetica')
    .fillColor(color)
    .fontSize(fonSize)
    .text(value, posX, posY);
}

export const writeLinePDFDoc = (
    doc: typeof PDFDocument,
    posY: number) => {
    doc.save()
    .moveTo(10, posY)
    .lineTo(550, posY)
    .fill('#000000');
}

export const writeImagePDFDoc = (
    doc: typeof PDFDocument, 
    pathImage: string,
    posX: number, 
    posY: number,
    fitW: number,
    fitH: number = fitW) => {
    doc.image(pathImage, posX, posY, {fit: [fitW, fitH], align: 'center', valign: 'center'});
}

export const writeInitiativePdfContent = (doc: typeof PDFDocument, data: Initiative, questions: IRQuestion[], answers: IRQuestion[]): void => {
    writeBG(doc);
    let posY = startPosYPage;
    posY = writeInitiative(doc, posY, data);
    posY = validateAdditionPage(doc, posY);   
    
}

export const writeBG = (doc: typeof PDFDocument) => {
    //writeImagePDFDoc(doc, './bg.jpg', 0, posY, fitW, fitH);

    //doc.polygon([0, 0], [totalDocWith, 0], [totalDocWith, totalDocHeight], [0, totalDocHeight]);
    //doc.fillAndStroke("#496552", "#496552");

    let grad = doc.linearGradient(0, 0, totalDocWith, totalDocHeight);
    grad.stop(0, '#56A26E')
        .stop(0.5, '#66766B')
        .stop(1, '#66766B');
    
    doc.polygon([0, 0], [totalDocWith, 0], [totalDocWith, totalDocHeight], [0, totalDocHeight]);
    doc.fillAndStroke(grad, grad);
}

export const writeInitiative = (doc: typeof PDFDocument, posY: number, data: Initiative) => {
    writeTitle(doc, 'Nombre', startPosXPage, posY);
    posY += posYAddition;
    buildRectangleAnswer(doc, posY, 1.5);
    writeNormal(doc, buildValueByChars(data.name, 100), startPosXPage, posY);
    posY += (posYAddition * 2.5);
    writeTitle(doc, 'Descripción corta', startPosXPage, posY);
    posY += posYAddition;
    buildRectangleAnswer(doc, posY, 5.1);
    writeNormal(doc, buildValueByChars(data.description, 400), startPosXPage, posY);
    posY += (posYAddition * 6.1);
    writeTitle(doc, 'Objetivos', startPosXPage, posY);
    posY += posYAddition;
    buildRectangleAnswer(doc, posY, 5.1);
    writeNormal(doc, buildValueByChars(data.goals, 400), startPosXPage, posY);
    posY += (posYAddition * 6.1);
    writeTitle(doc, 'Resultados logrados', startPosXPage, posY);
    posY += posYAddition;
    buildRectangleAnswer(doc, posY, 5.1);
    writeNormal(doc, buildValueByChars(data.achived_results, 400), startPosXPage, posY);
    posY += (posYAddition * 6.1);
    writeTitle(doc, 'Actores del ecosistema con los que se ha relacionado', startPosXPage, posY);
    posY += posYAddition;
    buildRectangleAnswer(doc, posY, 5.1);
    writeNormal(doc, buildValueByChars(data.ecosystem_actors, 400), startPosXPage, posY);
    posY += (posYAddition * 6.1);
    return posY;
}

export const writeTitle = (doc: typeof PDFDocument, value: string, posX: number, posY: number) => {
    writeBoldPDFDoc(doc, value, posX, posY, 13, 'white');
}

export const writeNormal = (doc: typeof PDFDocument, value: string, posX: number, posY: number) => {
    writePDFDoc(doc, value, posX, posY, 10, 'white');
}

export const buildValueByChars = (value: string, totalChars: number) => {
    let newVal = value;
    let initChars = value.length;
    let nextChars = totalChars - initChars;
    if(nextChars > totalChars){
        return newVal.slice(0, totalChars);
    } else {
        for (let index = 0; index < nextChars; index++) {
            newVal += '';
        }
        return newVal;
    }   
}

export const buildRectangleAnswer = (doc: typeof PDFDocument, posY: number, yAdd: number) => {
    doc.polygon([startPosXPage - 5, posY - 5], [endPosXPage + 5, posY - 5], [endPosXPage + 5, posY + (posYAddition * yAdd)], [startPosXPage - 5, posY + (posYAddition * yAdd)]);
    doc.fillAndStroke("#555", "#b5e800");
}

