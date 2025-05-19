import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

class Course extends Model {
  static async validStatusTransition(previousStatus: string, newStatus: string) {
    const validTransitions = {
      draft: ['review'],
      review: ['draft', 'published'],
      published: ['archived']
    };
    return validTransitions[previousStatus].includes(newStatus);
  }
}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'review', 'published', 'archived'),
    defaultValue: 'draft',
    validate: {
      async isValidTransition(value: string) {
        if (!await Course.validStatusTransition(this.previous('status'), value)) {
          throw new Error('Invalid status transition');
        }
      }
    }
  },
  // Other fields...
}, {
  sequelize,
  tableName: 'courses',
  engine: 'InnoDB',
  indexes: [
    {
      fields: ['status'],
      using: 'BTREE'
    }
  ]
});

export default Course;
