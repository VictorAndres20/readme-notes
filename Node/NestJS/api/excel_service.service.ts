import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entity/organization.entity';
import { IMQuestionService } from 'src/api/im_question/service/im_question.service';
import { ISQuestionService } from 'src/api/is_question/service/is_question.service';
import { FSQuestionService } from 'src/api/fs_question/service/fs_question.service';
import { ASQuestionService } from 'src/api/as_question/service/as_question.service';
import { FuSQuestionService } from 'src/api/fus_question/service/fus_question.service';
import { IMQuestion } from 'src/api/im_question/entity/im_question.entity';
import { FSQuestion } from 'src/api/fs_question/entity/fs_question.entity';
import { ASQuestion } from 'src/api/as_question/entity/as_question.entity';
import { FuSQuestion } from 'src/api/fus_question/entity/fus_question.entity';
import { ISQuestion } from 'src/api/is_question/entity/is_question.entity';
import { deleteInternalFile, readBase64InternalFile } from 'src/_utils/files.util';
import { OrganizationDTO } from '../entity/organization.dto';
import { IRQuestionService } from 'src/api/ir_question/service/ir_question.service';
import { TRQuestionService } from 'src/api/tr_question/service/tr_question.service';
import { DepartmentService } from 'src/api/department/service/department.service';
import { IRQuestion } from 'src/api/ir_question/entity/ir_question.entity';
import { Initiative } from 'src/api/initiative/entity/initiative.entity';
import { OrganizationInitiativeService } from 'src/api/organization_initiative/service/organization_initiative.service';
import { TRQuestion } from 'src/api/tr_question/entity/tr_question.entity';
import { TrainerProgram } from 'src/api/trainer_program/entity/trainer_program.entity';
import { OrganizationTrainerProgramService } from 'src/api/organization_trainer_program/service/organization_trainer_program.service';
import { OrganizationService } from './organization.service';

@Injectable()
export class OrganizationReportService {

    constructor(
        @InjectRepository(Organization)
        protected repo: Repository<Organization>,
        protected orgService: OrganizationService,
        protected imQuestionService: IMQuestionService,
        protected isQuestionService: ISQuestionService,
        protected trQuestionService: TRQuestionService,
        protected fsQuestionService: FSQuestionService,
        protected asQuestionService: ASQuestionService,
        protected fusQuestionService: FuSQuestionService,
        protected irQuestionService: IRQuestionService,
        protected orgIniService: OrganizationInitiativeService,
        protected orgTrService: OrganizationTrainerProgramService,
        protected depService: DepartmentService,
    ) {}

    findAll(): Promise<Organization[]> {
        return this.repo.find({ relations: { innovation_management: { answer: true, organization: false } }});
    }

    async buildBytesExcelFullAnswersById(): Promise<OrganizationDTO>{
        const sheetNames = ['Ident.-Personas', 'Ident.-Organización', 'Percep.-Ecosistema', 'Sec.-Innovador', 'Sec.-Formador', 'Sec.-Facilitador', 'Sec.-Asesor', 'Sec.-Financiador', 'Sec.-Iniciativas', 'Completitud'];
        let pathFile = `${__dirname}`;
        let bytes = null;
        let fileName = `report_${new Date().getTime()}.xlsx`;
        const orgs = await this.findAll();
        let questions = [];
        let orgQuestions = [];
        let initiatives = [];
        let rolIndex = -1;
        let menu = new OrganizationDTO();
        let percent = 0;

        // Create Workbook
        let wb = xlsx.utils.book_new();


        let excelData = [];
        excelData.push(this.buildOrg1Columns());
        orgs.forEach( org => {
            excelData.push(this.buildOrg1Data(org));
        } );
        let ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[0]}`);

        excelData = [];
        excelData.push(this.buildOrg2Columns());
        orgs.forEach( org => {
            excelData.push(this.buildOrg2Data(org));
        } );
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[1]}`);

        
        excelData = [];
        questions = await this.imQuestionService.findAllPlain();
        excelData.push(this.buildIMColumns(questions));
        for (let index = 0; index < orgs.length; index++) {
            orgQuestions = await this.imQuestionService.findAllByOrganization(orgs[index].uuid);
            excelData.push(this.buildIMData(orgs[index], orgQuestions, questions));
        }
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[2]}`);

        excelData = [];
        questions = await this.isQuestionService.findAllPlain();
        excelData.push(this.buildISColumns(questions));
        for (let index = 0; index < orgs.length; index++) {
            if(orgs[index].innovation_management){
                rolIndex = orgs[index].innovation_management.findIndex( d => d.answer?.cod === '_B_16.');
                if(rolIndex !== -1){
                    orgQuestions = await this.isQuestionService.findAllByOrganization(orgs[index].uuid);
                    excelData.push(this.buildISData(orgs[index], orgQuestions, questions));
                }
            }
        }
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[3]}`);

        excelData = [];
        questions = await this.trQuestionService.findAllPlain();
        excelData.push(this.buildTRColumns(questions));
        for (let index = 0; index < orgs.length; index++) {
            if(orgs[index].innovation_management){
                rolIndex = orgs[index].innovation_management.findIndex( d => d.answer?.cod === '_C_16.');
                if(rolIndex !== -1){
                    initiatives = await this.orgTrService.findAllByOrganization(orgs[index].uuid);
                    if(initiatives.length === 0){
                        let cols = [];
                        cols.push(orgs[index].name);
                        cols.push('');
                        for (let index2 = 0; index2 < questions.length; index2++) {
                            cols.push('');
                        }
                        excelData.push(cols);
                    } else {
                        for (let index2 = 0; index2 < initiatives.length; index2++) {
                            orgQuestions = await this.trQuestionService.findAllByProgram(initiatives[index2].trainer_program.uuid);
                            excelData.push(this.buildTRData(orgs[index], initiatives[index2].trainer_program, orgQuestions, questions));
                        }
                    }     
                }
            }            
        }
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[4]}`);

        excelData = [];
        questions = await this.fsQuestionService.findAllPlain();
        excelData.push(this.buildFSColumns(questions));
        for (let index = 0; index < orgs.length; index++) {
            if(orgs[index].innovation_management){
                rolIndex = orgs[index].innovation_management.findIndex( d => d.answer?.cod === '_D_16.');
                if(rolIndex !== -1){
                    orgQuestions = await this.fsQuestionService.findAllByOrganization(orgs[index].uuid);
                    excelData.push(await this.buildFSData(orgs[index], orgQuestions, questions));
                }
            }
        }
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[5]}`);

        excelData = [];
        questions = await this.asQuestionService.findAllPlain();
        excelData.push(this.buildASColumns(questions));
        for (let index = 0; index < orgs.length; index++) {
            if(orgs[index].innovation_management){
                rolIndex = orgs[index].innovation_management.findIndex( d => d.answer?.cod === '_E_16.');
                if(rolIndex !== -1){
                    orgQuestions = await this.asQuestionService.findAllByOrganization(orgs[index].uuid);
                    excelData.push(this.buildASData(orgs[index], orgQuestions, questions));
                }
            }
        }
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[6]}`);

        excelData = [];
        questions = await this.fusQuestionService.findAllPlain();
        excelData.push(this.buildFuSColumns(questions));
        for (let index = 0; index < orgs.length; index++) {
            if(orgs[index].innovation_management){
                rolIndex = orgs[index].innovation_management.findIndex( d => d.answer?.cod === '_F_16.');
                if(rolIndex !== -1){
                    orgQuestions = await this.fusQuestionService.findAllByOrganization(orgs[index].uuid);
                    excelData.push(this.buildFuSData(orgs[index], orgQuestions, questions));
                }
            }
        }
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[7]}`);

        excelData = [];
        questions = await this.irQuestionService.findAllPlain();
        excelData.push(this.buildIRColumns(questions));
        for (let index = 0; index < orgs.length; index++) {
            initiatives = await this.orgIniService.findAllByOrganizationPlain(orgs[index].uuid);
            if(initiatives.length === 0){
                let cols = [];
                cols.push(orgs[index].name);
                cols.push('');
                for (let index2 = 0; index2 < questions.length; index2++) {
                    cols.push('');
                }
                excelData.push(cols);
            } else {
                for (let index2 = 0; index2 < initiatives.length; index2++) {
                    orgQuestions = await this.irQuestionService.findWithAnswersByInititative(initiatives[index2].initiative.uuid);
                    excelData.push(this.buildIRData(orgs[index], initiatives[index2].initiative, orgQuestions, questions));
                }
            }     
            
        }
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[8]}`);


        excelData = [];
        excelData.push(['Nombre de la organización', 'Porcentaje completo']);
        for (let index = 0; index < orgs.length; index++) {
            menu = new OrganizationDTO();
            percent = 0;
            menu = await this.orgService.getMenu(orgs[index].uuid);
            percent = (menu.answersIM + menu.answersIS + menu.answersFS + menu.answersAS + menu.answersFuS) / (menu.totalIM + menu.totalIS + menu.totalFS + menu.totalAS + menu.totalFuS);
            excelData.push([orgs[index].name, percent ? (percent * 100) > 100 ? 100 : (percent * 100) : 0]);
        }
        ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, `${sheetNames[9]}`);


        // Escribir el libro de trabajo en un archivo
        const buffer = xlsx.write(wb, { type: 'buffer' });
        fs.writeFileSync(path.join(pathFile, fileName), buffer);
        
        bytes = readBase64InternalFile(pathFile, fileName);       
        deleteInternalFile(pathFile, fileName);
        let res = new OrganizationDTO();
        res.bytes = bytes
        return res;
    }

    buildOrg1Columns(): string[] {
        let columns = ['Nombre de la organización', 'Nombre persona de contacto', 'Teléfono', 'Cargo', 'Correo electrónico'];
        return columns;
    }

    buildOrg1Data(org: Organization): string[] {
        let columns = [org.name, org.contact_name, org.phone, org.job, org.email];
        return columns;
    }

    buildOrg2Columns(): string[] {
        let columns = ['Nombre de la organización', 'Departamento', 'Municipio', 'Sector', 'Tipología'];
        return columns;
    }

    buildOrg2Data(org: Organization): string[] {
        let columns = [org.name, org.city?.department?.name, org.city?.name, org.sector?.name, org.typology?.name];
        return columns;
    }

    buildIMColumns(questions: IMQuestion[]): string[] {
        let columns = [];
        columns.push('Nombre de la organización');
        questions.forEach( q => {
            columns.push(q.label.replace("<=>", " ").replace("<=>", " "));
        } );
        return columns;
    }

    buildIMData(org: Organization, orgQuestions: IMQuestion[], questions: IMQuestion[]): string[] {
        let columns = [];
        columns.push(org.name);
        questions.forEach( q => {
            let index = orgQuestions.findIndex( i => i.cod === q.cod );
            if(index === -1){
                columns.push('');
            } else {
                if(orgQuestions[index].im_answers.length === 0){
                    columns.push('');
                } else {
                    let value = '';
                    orgQuestions[index].im_answers.forEach( ans => {
                        if(ans.label){
                            value += ans.label;
                            if(orgQuestions[index].im_answers.length > 1){
                                value += '|';    
                            }
                        }
                        if(ans.innovation_management.length > 0){
                            if(ans.label && ans.innovation_management[0].string_value){
                                value += "=";
                            }
                            value += ans.innovation_management[0].string_value ? ans.innovation_management[0].string_value : ''; 
                        }
                    });
                    columns.push(value);
                }                
            }
        });
        return columns;
    }

    buildISColumns(questions: ISQuestion[]): string[] {
        let columns = [];
        columns.push('Nombre de la organización');
        questions.forEach( q => {
            columns.push(q.label.replace("<=>", " ").replace("<=>", " "));
        } );
        return columns;
    }

    buildISData(org: Organization, orgQuestions: ISQuestion[], questions: ISQuestion[]): string[] {
        let columns = [];
        columns.push(org.name);
        questions.forEach( q => {
            let index = orgQuestions.findIndex( i => i.cod === q.cod );
            if(index === -1){
                columns.push('');
            } else {
                if(orgQuestions[index].is_answers.length === 0){
                    columns.push('');
                } else {
                    let value = '';
                    orgQuestions[index].is_answers.forEach( ans => {
                        if(ans.label){
                            value += ans.label;                            
                        }
                        if(ans.innovation_section.length > 0){
                            if(ans.label && ans.innovation_section[0].string_value){
                                value += "=";
                            }
                            value += ans.innovation_section[0].string_value ? ans.innovation_section[0].string_value : ''; 
                        }
                        if(orgQuestions[index].is_answers.length > 1){
                            value += '|';    
                        }
                    });
                    if(q.cod === 'A.19.1.'){
                        if(orgQuestions[index].is_answers.length > 1){
                            value += 'Innovación híbrida';
                        }
                    } 
                    columns.push(value);
                }                
            }
        });
        return columns;
    }

    buildFSColumns(questions: FSQuestion[]): string[] {
        let columns = [];
        columns.push('Nombre de la organización');
        questions.forEach( q => {
            columns.push(q.label.replace("<=>", " ").replace("<=>", " "));
        } );
        return columns;
    }

    async buildFSData(org: Organization, orgQuestions: FSQuestion[], questions: FSQuestion[]): Promise<string[]> {
        let columns = [];
        columns.push(org.name);
        for (let indexQ = 0; indexQ < questions.length; indexQ++) {
            const q = questions[indexQ];

            let index = orgQuestions.findIndex( i => i.cod === q.cod );
            if(index === -1){
                columns.push('');
            } else {
                let value = '';
                if(orgQuestions[index].fs_answers.length === 0){
                    columns.push('');
                } else {
                    if(q.cod === 'C.16.2.'){
                        orgQuestions[index].fs_answers.forEach( ans => {
                            if(ans.label){
                                value += ans.label;                                
                            }
                            if(ans.facilitator_section.length > 0){
                                if(ans.label && ans.facilitator_section[0].string_value){
                                    value += "=";
                                }
                                value += ans.facilitator_section[0].string_value ? ans.facilitator_section[0].string_value : ''; 
                            }
                            if(orgQuestions[index].fs_answers.length > 1){
                                value += '|';    
                            }
                        });
                        let deps = value.split(',');
                        value = '';
                        for (let indexd = 0; indexd < deps.length; indexd++) {
                            let depObj = await this.depService.findById(deps[indexd]);
                            if(depObj){
                                value += depObj.name;
                            }
                            if(deps.length !== indexd + 1){
                                value += ',';
                            }
                        }
                    } else {
                        orgQuestions[index].fs_answers.forEach( ans => {
                            if(ans.label){
                                value += ans.label;                                
                            }
                            if(ans.facilitator_section.length > 0){
                                if(ans.label && ans.facilitator_section[0].string_value){
                                    value += "=";
                                }
                                value += ans.facilitator_section[0].string_value ? ans.facilitator_section[0].string_value : ''; 
                            }
                            if(orgQuestions[index].fs_answers.length > 1){
                                value += '|';    
                            }
                        });
                    }
                    columns.push(value);
                }                
            }
            
        }
        return columns;
    }

    buildASColumns(questions: ASQuestion[]): string[] {
        let columns = [];
        columns.push('Nombre de la organización');
        questions.forEach( q => {
            columns.push(q.label.replace("<=>", " ").replace("<=>", " "));
        } );
        return columns;
    }

    buildASData(org: Organization, orgQuestions: ASQuestion[], questions: ASQuestion[]): string[] {
        let columns = [];
        columns.push(org.name);
        questions.forEach( q => {
            let index = orgQuestions.findIndex( i => i.cod === q.cod );
            if(index === -1){
                columns.push('');
            } else {
                if(orgQuestions[index].as_answers.length === 0){
                    columns.push('');
                } else {
                    let value = '';
                    orgQuestions[index].as_answers.forEach( ans => {
                        if(ans.label){
                            value += ans.label;                            
                        }
                        if(ans.advisor_section.length > 0){
                            if(ans.label && ans.advisor_section[0].string_value){
                                value += "=";
                            }
                            value += ans.advisor_section[0].string_value ? ans.advisor_section[0].string_value : ''; 
                        }
                        if(orgQuestions[index].as_answers.length > 1){
                            value += '|';    
                        }
                    });
                    columns.push(value);
                }                
            }
        });
        return columns;
    }

    buildFuSColumns(questions: FuSQuestion[]): string[] {
        let columns = [];
        columns.push('Nombre de la organización');
        questions.forEach( q => {
            columns.push(q.label.replace("<=>", " ").replace("<=>", " "));
        } );
        return columns;
    }

    buildFuSData(org: Organization, orgQuestions: FuSQuestion[], questions: FuSQuestion[]): string[] {
        let columns = [];
        columns.push(org.name);
        questions.forEach( q => {
            let index = orgQuestions.findIndex( i => i.cod === q.cod );
            if(index === -1){
                columns.push('');
            } else {
                if(orgQuestions[index].fus_answers.length === 0){
                    columns.push('');
                } else {
                    let value = '';
                    orgQuestions[index].fus_answers.forEach( ans => {
                        if(ans.label){
                            value += ans.label;                            
                        }
                        if(ans.funder_section.length > 0){
                            if(ans.label && ans.funder_section[0].string_value){
                                value += "=";
                            }
                            value += ans.funder_section[0].string_value ? ans.funder_section[0].string_value : ''; 
                        }
                        if(orgQuestions[index].fus_answers.length > 1){
                            value += '|';    
                        }
                    });
                    columns.push(value);
                }                
            }
        });
        return columns;
    }

    buildIRColumns(questions: FuSQuestion[]): string[] {
        let columns = [];
        columns.push('Nombre de la organización');
        columns.push('Nombre de la iniciativa');
        questions.forEach( q => {
            if(q.cod === 'A.IMS.'){
                columns.push('¿A qué modelo o modelos de innovación va dirigida su iniciativa?');
            } else {
                columns.push(q.label.replace("<=>", " ").replace("<=>", " "));
            }            
        } );
        return columns;
    }

    buildIRData(org: Organization, ini: Initiative, orgQuestions: IRQuestion[], questions: IRQuestion[]): string[] {
        let columns = [];
        columns.push(org.name);
        columns.push(ini.name);
        for (let indexQ = 0; indexQ < questions.length; indexQ++) {
            let value = '';
            const q = questions[indexQ];

            if(q.cod === 'A.IMS.'){
                if(ini.i_model.length > 0){
                    for (let indexM = 0; indexM < ini.i_model.length; indexM++) {
                        value += ini.i_model[indexM].innovation_model?.label;
                        if(indexM + 1 !== ini.i_model.length){
                            value += '|';
                        }
                    }
                }
                if(ini.i_model.length > 1){
                    value += '|Innovación híbrida';
                }

                columns.push(value);
            } else {
                let index = orgQuestions.findIndex( i => i.cod === q.cod );
                if(index === -1){
                    columns.push('');
                } else {                
                    if(orgQuestions[index].ir_answers.length === 0){
                        columns.push('');
                    } else {
                        orgQuestions[index].ir_answers.forEach( ans => {
                            if(ans.label){
                                value += ans.label;                                
                            }
                            if(ans.innovation_result.length > 0){
                                if(ans.label && ans.innovation_result[0].string_value){
                                    value += "=";
                                }
                                value += ans.innovation_result[0].string_value ? ans.innovation_result[0].string_value : ''; 
                            }
                            if(orgQuestions[index].ir_answers.length > 1){
                                value += '|';    
                            }
                            
                        });
                        columns.push(value);                   
                    }                
                }         
            }   
        }
        return columns;
    }

    buildTRColumns(questions: TRQuestion[]): string[] {
        let columns = [];
        columns.push('Nombre de la organización');
        columns.push('Nombre de la programa académico');
        questions.forEach( q => {
            columns.push(q.label.replace("<=>", " ").replace("<=>", " "));          
        } );
        return columns;
    }

    buildTRData(org: Organization, ini: TrainerProgram, orgQuestions: TRQuestion[], questions: TRQuestion[]): string[] {
        let columns = [];
        columns.push(org.name);
        columns.push(ini.name);
        for (let indexQ = 0; indexQ < questions.length; indexQ++) {
            let value = '';
            const q = questions[indexQ];

            let index = orgQuestions.findIndex( i => i.cod === q.cod );
            if(index === -1){
                columns.push('');
            } else {                
                if(orgQuestions[index].tr_answers.length === 0){
                    columns.push('');
                } else {
                    orgQuestions[index].tr_answers.forEach( ans => {
                        if(ans.label){
                            value += ans.label;                                
                        }
                        if(ans.trainer_result.length > 0){
                            if(ans.label && ans.trainer_result[0].string_value){
                                value += "=";
                            }
                            value += ans.trainer_result[0].string_value ? ans.trainer_result[0].string_value : ''; 
                        }
                        if(orgQuestions[index].tr_answers.length > 1){
                            value += '|';    
                        }
                        
                    });
                    columns.push(value);                   
                }                
            }   
        }
        return columns;
    }

}