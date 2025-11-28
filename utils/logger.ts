import chalk from "chalk";
import dayjs from "dayjs";
import fs from "fs";

console.clear();

console.log(chalk.bgBlue("                                      "));
console.log(chalk.bgBlue(" © 2025 HUBMIFY  developed by Matyeu. "));
console.log(chalk.bgBlue("                                      "));
console.log("");

const format = "{tstamp} {tag} - {text}\n";

export function server(content: string) {
  write(content, "black", "bgGreen", "SERVER", false);
}

export function route(content: string) {
  write(content, "black", "bgBlue", "ROUTE", false);
}

export function error(content: string) {
  write(content, "black", "bgRed", "ERROR", true);
}

export function warn(content: string) {
  write(content, "black", "bgYellow", "WARN", false);
}

export function database(content: string) {
  write(content, "black", "bgWhite", "DATABASE", false);
}

function write(
  content: string,
  tagColor: string,
  bgTagColor: string,
  tag: string,
  error = false
) {
  const timestamp = `[${dayjs().format("DD/MM - HH:mm:ss")}]`;
  const logTag = `[${tag}]`;
  const stream = error ? process.stderr : process.stdout;

  const bgColorFn = (chalk as any)[bgTagColor] as typeof chalk;
  const colorFn = bgColorFn?.[
    tagColor as keyof typeof bgColorFn
  ] as typeof chalk;

  const item = format
    .replace(`{tstamp}`, chalk.gray(timestamp))
    .replace("{tag}", colorFn ? colorFn(logTag) : logTag)
    .replace(`{text}`, chalk.white(content));

  stream.write(item);

  const logFileName = `logs/${dayjs().format("DD-MM-YYYY")}.txt`;

  if (!fs.existsSync(logFileName)) {
    fs.writeFileSync(logFileName, "", "utf-8");
  }

  fs.appendFile(
    logFileName,
    `\n${timestamp} ${content}\n--------------------------------`,
    function (err: any) {
      if (err) throw err;
    }
  );
}

const logger = {
  server,
  route,
  error,
  warn,
  database,
};

export default logger;
