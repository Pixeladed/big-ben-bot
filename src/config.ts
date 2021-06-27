function ensure(value: string | undefined): string {
  if (value == undefined) {
    throw new Error('Value does not exist')
  }
  return value
}

export const config = {
  botToken: ensure(process.env.BOT_TOKEN),
}
