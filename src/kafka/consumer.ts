import { Kafka } from 'kafkajs';
import Course from '../models/course.model';

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKERS],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  }
});

const consumer = kafka.consumer({ groupId: 'course-service' });

async function processMessage(message) {
  const event = JSON.parse(message.value.toString());
  
  // MySQL transaction with isolation level
  const transaction = await sequelize.transaction({
    isolationLevel: 'REPEATABLE READ'
  });

  try {
    await Course.update(
      { status: event.status },
      { where: { id: event.courseId }, transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
