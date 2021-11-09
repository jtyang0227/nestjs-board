import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig : TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host || process.env.ROS_HOSTNAME,
  port: dbConfig.port || process.env.ROS_PORT,
  username: dbConfig.name || process.env.ROS_NAME,
  password: dbConfig.password || process.env.ROS_PASSWORD,
  database: dbConfig.database || process.env.ROS_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize
}
// process.env AWS 설정
