## Nest.js HTTP API SampleCode

Nest.js를 이용한 백엔드 HTTP API 서버입니다.<br>
팀 프로젝트 [TapPlace](http://tapplace.co.kr)의 일부 코드입니다.

## 기능

1. Middleware - `LoggerMiddleWare`
2. Filter - `HttpExceptionFilter`
3. Guards - `passport-jwt`
4. Custom Parameter Decorator - `@GetUser`
5. Custom Pipe - `userPipe`, `adminPipe`
6. class-validator - `Dto validation`
7. Custom Method Decorator - `@HandleSqlError`
8. Typeorm - `Entity`, `Repository`

## 구조

1. `main.ts`
2. `AppModule`
3. `StoreModule`
4. `StoreController`
5. `StoreService`
6. `StroeMapper`(repository)

![flow.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/flow.png)

## 기능

### Middleware - `LoggerMiddleWare`

[logger.middleware.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/logger/logger.middleware.ts)

![logger.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/logger.png)

[winston.util.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/logger/winston.util.ts)

![winston.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/winston.png)

### Filter - `HttpExceptionFilter`

[http-exception.filter.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/exception/http-exception.filter.ts)

![exceptionFilter.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/exceptionFilter.png)

### Guards - `passport-jwt`

[jwt.strategy.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/auth/jwt.strategy.ts)

![jwt.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/jwt.png)

### Custom Parameter Decorator - `@GetUser`

[get-user.decorator.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/auth/get-user.decorator.ts)

![parameterDecorator.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/parameterDecorator.png)

### Custom Pipe - `userPipe`, `adminPipe`

[auth.pipe.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/auth/auth.pipe.ts)

![authPipe.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/authPipe.png)

### class-validator - `Dto validation`

[around-store.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/dto/around-store.ts)

![validation.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/validation.png)

### Custom Method Decorator - `@HandleSqlError`

[handleSqlError.decorator.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/exception/http-exception.filter.ts)

![errorDecorator.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/errorDecorator.png)

### Typeorm - `Entity`, `Repository`

[store.entity.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/entities/store.entity.ts)

![entity.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/entity.png)

[store.repository.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/repositories/store.repository.ts)

![repository.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/repository.png)

## 구조

### [main.ts](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/main.ts)

![mainTs.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/mainTs.png)

### [AppModule](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/app.module.ts)

![appModule.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/appModule.png)

### [StoreModule](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/store.module.ts)

![module.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/module.png)

### [StoreController](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/store.controller.ts)

![controller.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/controller.png)

### [StoreService](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/store.service.ts)

![service.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/service.png)

### [StroeMapper](https://github.com/tlqhrm/TapPlace-sample/blob/61e5717f26d41d5bd975299f5188e8fc2ba059c8/src/store/store.mapper.ts)

![mapper.png](readme%2024a7daff03fb4522afac11c9e2dd6d78/mapper.png)
