import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import uniqid from "uniqid";

export default class BaseModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Index('key_idx')
    @Column()
    public key: string;

    @CreateDateColumn()
    public createdOn: Date;

    @UpdateDateColumn()
    public updatedOn: Date;

    @Column({
        default: true
    })
    public active: boolean;

    @Column({
        default: false
    })
    public deleted: boolean;

    constructor(keyPrefixOrKey: string, generate = true) {
        super();
        this.key = generate ? uniqid(keyPrefixOrKey + "-") : keyPrefixOrKey;
    }

    public baseModeltoJSON() {
        return {
            id: this.id,
            key: this.key,
            active: this.active,
            deleted: this.deleted,
            createdOn: this.createdOn,
            updatedOn: this.updatedOn,
        }
    }
}