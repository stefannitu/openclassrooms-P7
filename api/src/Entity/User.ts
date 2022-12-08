import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  userEmail!: string

  @Column()
  userPassword!: string

  @Column({ unique: true })
  userDisplayName!: string

  @CreateDateColumn()
  createDate!: Date

  @DeleteDateColumn()
  deletedDate!: Date
}
