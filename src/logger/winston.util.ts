import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const env = process.env.NODE_ENV;
const logDir = __dirname + '/../../logs';

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, //30일치 로그파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  };
};

export const winstonLogger = WinstonModule.createLogger({
  // 로그파일에 찍힐 포맷
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 로그 파일에 시간이 이런 형태로 기록됨
    winston.format.printf((info) => {
      // 데이터를 어떤 형태로 받을지 직접 커스텀 할 수 있음
      return `${info.timestamp} ${info.level}: ${info.message}`;
    }),
  ),
  transports: [
    // 콘솔창에 찍힐 로그 설정
    new winston.transports.Console({
      level: env === 'prod' ? 'http' : 'silly',
      format:
        env === 'prod'
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp(),
              utilities.format.nestLike('tapplace', {
                prettyPrint: true,
              }),
            ),
    }),
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});
