/**
 * @tidaly/mqtt
 *
 * @license MIT
 * @copyright Tidaly <contact@tidaly.fr>
 */

import mqtt from 'async-mqtt';
import { EmitterContract } from '@ioc:Adonis/Core/Event';
import { MqttConfig } from '@ioc:Tidaly/Mqtt';

export class Mqtt {
	private client: mqtt.AsyncMqttClient;

	constructor(config: MqttConfig, emitter: EmitterContract) {
		this.client = mqtt.connect(`${config.protocol}://${config.broker}:${config.port}`);
		this.client.on('connect', () => {
			this.client.subscribe(config.subscriber.topics);
		});
		this.client.on('message', (topic, message) => {
			emitter.emit('mqtt:message', { topic, message });
		});
	}

	public async publish(topic: string, message: string | Buffer): Promise<void> {
		return this.client.publish(topic, message);
	}

	public async subscribe(topic: string | string[]): Promise<void> {
		this.client.subscribe(topic);
	}

	public async end(force?: boolean | undefined): Promise<void> {
		return this.client.end(force);
	}
}
