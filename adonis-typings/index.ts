/**
 * @tidaly/mqtt
 *
 * @license MIT
 * @copyright Tidaly <contact@tidaly.fr>
 */

declare module '@ioc:Tidaly/Mqtt' {
	interface MqttClientContract {
		publish(topic: string, message: string | Buffer): Promise<void>;
		end(force?: boolean | undefined): Promise<void>;
	}
	const MqttClient: MqttClientContract;

	export { MqttClient };

	export type MqttConfig = {
		broker: string;
		protocol: string;
		port: string;
		subscriber: {
			topics: string[];
		};
	};
}
