import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  key!: string;
}
