import { EntityRepository, Like, Repository } from 'typeorm';
import { Role, User } from '@api/database/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findUserByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }

  public async findUserById(id: number): Promise<User> {
    return this.findOne({ where: { id } });
  }

  public async findPaginated(page: number, pagePer: number, role: Role, text: string): Promise<[number, User[]]> {
    page = page ? page : 1;
    pagePer = pagePer ? pagePer : 5;

    let condition = [
      {
        ...(!!text && { firstName: Like(`%${text}%`) }),
        ...(!!role && { role }),
      },
      {
        ...(!!text && { firstName: Like(`%${text}%`) }),
        ...(!!role && { role }),
      },
      {
        ...(!!text && { email: Like(`%${text}%`) }),
        ...(!!role && { role }),
      },
    ];

    if (!text && !role) {
      condition = [];
    }

    const all = await this.count({where: condition});

    const data = await this.find({
      skip: pagePer * page - pagePer,
      take: pagePer,
      where: condition,
    });

    return [all, data]
  }
}
