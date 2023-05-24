import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SearchModule } from "./search/search.module";

@Module({
  imports: [
    SearchModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../../.env.local",
    }),
  ],
})
export class AppModule {}
