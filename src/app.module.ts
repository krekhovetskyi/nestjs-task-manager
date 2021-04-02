import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    TasksModule
  ]
})
export class AppModule {
}
