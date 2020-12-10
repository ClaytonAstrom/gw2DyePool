import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryColumn()
  name!: string;

  @Column()
  key!: string;
}
