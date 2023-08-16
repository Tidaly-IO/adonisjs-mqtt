import { BaseCommand } from "@adonisjs/core/build/standalone";
import Event from "@ioc:Adonis/Core/Event";

export default class MqttSub extends BaseCommand {
  public static commandName = "mqtt:sub";
  public static description =
    "Subscribe to all topics in config file and log messages";

  public static settings = {
    loadApp: true,
    stayAlive: true,
  };

  public async run() {
    this.logger.info("Listen to all topics in configuration file");
    Event.on("mqtt:message", ({ topic, message }) => {
      this.logger.info(`${topic}: ${message}`);
    });
  }
}
