declare module "@ioc:Tidaly/Mqtt" {
  import { Mqtt } from "./src/Mqtt";

  const MqttClient: Mqtt;

  export { MqttClient };

  export type MqttConfig = {
    broker: string;
    protocol: string;
    port: string;
    subscriber: {
      topic: string[];
    };
  };
}
