import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { AUTHORS } from "../constant";

@Entity(AUTHORS)
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
    type: "varchar",
    length: "255",
  })
  name!: string;

  @Column({
    nullable: false,
    unique: true,
    type: "varchar",
    length: "255",
  })
  email!: string;

  @Column({
    nullable: true,
    type: "varchar",
    length: "255",
  })
  bio!: string;

  @Column({
    nullable: true,
    type: "varchar",
    length: "255",
  })
  image!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
