import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { AbstractColor } from "./AbstractColor";
import { AbstractItem } from "./AbstractItem";

@Entity()
export default class Color implements AbstractColor {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("int", { array: true, nullable: true })
  cloth!: number[] | null;

  @Column("int", { array: true, nullable: true })
  leather!: number[] | null;

  @Column("int", { array: true, nullable: true })
  metal!: number[] | null;

  @Column("int", { array: true, nullable: true })
  fur!: number[] | null;

  @OneToOne("Item", "color")
  @JoinColumn()
  item!: AbstractItem;
}
