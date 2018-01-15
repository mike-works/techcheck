export function indentError(
  message: string,
  prefix: string,
  nextMessage: string
) {
  return `${message}\n${prefix}${nextMessage.replace(/\n/g, `\n${prefix}`)}`;
}
