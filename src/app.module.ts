import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/users.entity';
import { PostsModel } from './posts/entities/posts.entity';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres', // database: 'postgres',
			database: 'typeorm',
			synchronize: true,
			entities: [UsersModel, PostsModel],
		}),
		PostsModule,
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
