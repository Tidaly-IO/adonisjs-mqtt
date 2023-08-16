import { Mqtt } from "../src/Mqtt";
import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class MqttProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton("Tidaly/Mqtt", () => {
      const Event = this.app.container.use("Adonis/Core/Event");
      const { mqttConfig } = this.app.config.get("mqtt");
      return {
        MqttClient: new Mqtt(mqttConfig, Event),
      };
    });
  }
}
