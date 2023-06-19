import {createLogger, format, transports, config} from "winston"
import path from "path"
import util from "util"

let level ="debug"
if(process.env.NODE_ENV==="production"){
  level="info"
}

const transformEx = format((info, opts)=>{
  const args = info[Symbol.for('splat')];
  if (args) { info.message = util.format(info.message, ...args); }
  return info;
})

const Logger = (s?:string)=>{
  return createLogger({
    level,
    format: format.combine(
      format.splat(),
      // Định dạng time cho log
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      transformEx(),
      // thêm màu sắc
      format.colorize(),
      // thiết lập định dạng của log
      format.printf(
        log => {
          if(s){
            if(log.stack) return `[${log.timestamp}] [${log.level}] [${s}] ${log.stack}`;
            return  `[${log.timestamp}] [${log.level}] [${s}] ${log.message}`;
          }else{
            if(log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
            return  `[${log.timestamp}] [${log.level}] ${log.message}`;
          }
        },
      ),
    ),
    transports: [
      // hiển thị log thông qua console
      new transports.Console(),
      // Thiết lập ghi các errors vào file 
      new transports.File({
        level: 'error',
        filename: path.join(__dirname, 'errors.log')
      })
    ],
  })
}
export default Logger;