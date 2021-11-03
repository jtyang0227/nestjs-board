import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BoardsModule,
    UserModule,
  ],
})
export class AppModule {
}
