import { BaseCommand, args } from "@adonisjs/core/build/standalone";

export default class MqttPub extends BaseCommand {
  public static commandName = "mqtt:pub";
  public static description = "Publish a message to a topic";

  @args.string({ description: "Topic to publish to" })
  public topic: string;

  @args.string({ description: "Message to publish" })
  public message: string;

  public static settings = {
    loadApp: true,
    stayAlive: false,
  };

  public async run() {
    const { MqttClient } =
      this.application.container.resolveBinding("Tidaly/Mqtt");
    await MqttClient.publish(this.topic, this.message);
  }
}
