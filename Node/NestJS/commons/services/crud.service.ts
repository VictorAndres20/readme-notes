/**
 * OPTIONS https://orkhan.gitbook.io/typeorm/docs/find-options
 */

import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export abstract class BasicCrudService<T, ID, D>{

    protected repo: Repository<T>;

    // Do not forget contructor to inject repo with T entity

    abstract findById(id: ID): Promise<T>

    abstract buildBaseCreation(dto: D): T;

    abstract dataValidationBeforeCreate(dto: D): void;

    abstract buildBaseEdition(entity: T, dto: D): T;

    abstract dataValidationBeforeEdit(dto: D): void;

    findAll(): Promise<T[]> {
        try{
            return this.repo.find();
        } catch(err){
            throw new Error(err.message);
        }
    }

    findOne(options: FindOneOptions<T>): Promise<T> {
        try{
            return this.repo.findOne(options);
        } catch(err){
            throw new Error(err.message);
        }
    }

    findMany(options: FindManyOptions<T>): Promise<T[]>{
        try{
            return this.repo.find(options);
        } catch(err){
            throw new Error(err.message);
        }
    }
    
    createOne(dto: D): Promise<T>{
        try{
            this.dataValidationBeforeCreate(dto);
            let data = this.repo.save(this.buildBaseCreation(dto));
            return data;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async editOne(dto: D, id: ID): Promise<T>{
        try{
            this.dataValidationBeforeEdit(dto);
            let entity = await this.findById(id);
            if(entity == null){
                throw new Error('Entity not found for edition');
            }
            let data = this.repo.save(this.buildBaseEdition(entity, dto));
            return data;
        } catch(err){
            throw new Error(err.message);
        }
    }
}