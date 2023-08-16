import mqtt from "async-mqtt";
import { EmitterContract } from "@ioc:Adonis/Core/Event";

export class Mqtt {
  private client: mqtt.AsyncMqttClient;

  constructor(config: any, emitter: EmitterContract) {
    this.client = mqtt.connect(
      `${config.protocol}://${config.broker}:${config.port}`
    );
    this.client.on("connect", () => {
      config.subscriber.topic.forEach((topic: string) => {
        this.client.subscribe(topic);
      });
    });
    this.client.on("message", (topic, message) => {
      emitter.emit("mqtt:message", { topic, message });
    });
  }

  public async publish(topic: string, message: string | Buffer): Promise<void> {
    return this.client.publish(topic, message);
  }

  public async end(force?: boolean | undefined): Promise<void> {
    return this.client.end(force);
  }
}
