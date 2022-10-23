## Nest.js HTTP API SampleCode

Nest.js를 이용한 백엔드 HTTP API 서버입니다.
팀 프로젝트 `[TapPlace](http://tapplace.co.kr)`의 일부 코드입니다.

## 기능

1. [Middleware - `LoggerMiddleWare`](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)
2. [Filter - `HttpExceptionFilter`](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)
3. [Guards - `passport-jwt`](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)
4. [Custom Parameter Decorator - `@GetUser`](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)
5. [Custom Pipe - `userPipe`, `adminPipe`](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)
6. [class-validator - `Dto validation`](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)
7. [Custom Method Decorator - `@HandleSqlError`](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)
8. [Typeorm - `Entity`, `Repository`](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)

## 구조

1. `[main.ts](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)`
2. `[AppModule](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)`
3. `[StoreModule](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)`
4. `[StoreController](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)`
5. `[StoreService](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)`
6. `[StroeMapper`(repository)](https://www.notion.so/24a7daff03fb4522afac11c9e2dd6d78)

![flow.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/flow.png)

## 기능

### Middleware - `LoggerMiddleWare`

[logger.middleware.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/logger/logger.middleware.ts)

![logger.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/logger.png)

[winston.util.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/logger/winston.util.ts)

![winston.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/winston.png)

### Filter - `HttpExceptionFilter`

[http-exception.filter.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/exception/http-exception.filter.ts)

![exceptionFilter.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/exceptionFilter.png)

### Guards - `passport-jwt`

[jwt.strategy.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/auth/jwt.strategy.ts)

![jwt.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/jwt.png)

### Custom Parameter Decorator - `@GetUser`

[get-user.decorator.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/auth/get-user.decorator.ts)

![parameterDecorator.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/parameterDecorator.png)

### Custom Pipe - `userPipe`, `adminPipe`

[auth.pipe.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/auth/auth.pipe.ts)

![authPipe.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/authPipe.png)

### class-validator - `Dto validation`

[around-store.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/dto/around-store.ts)

![validation.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/validation.png)

### Custom Method Decorator - `@HandleSqlError`

[handleSqlError.decorator.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/exception/http-exception.filter.ts)

![errorDecorator.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/errorDecorator.png)

### Typeorm - `Entity`, `Repository`

[store.entity.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/entities/store.entity.ts)

![entity.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/entity.png)

[store.repository.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/repositories/store.repository.ts)

![repository.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/repository.png)

## 구조

### `[main.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/main.ts)`

![mainTs.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/mainTs.png)

### `[AppModule](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/app.module.ts)`

![appModule.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/appModule.png)

### `[StoreModule](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/store.module.ts)`

![module.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/module.png)

### `[StoreController](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/store.controller.ts)`

![controller.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/controller.png)

### `[StoreService](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/store.service.ts)`

![service.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/service.png)

### `[StroeMapper](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/store.mapper.ts)`

![mapper.png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%2024a7daff03fb4522afac11c9e2dd6d78/mapper.png)
