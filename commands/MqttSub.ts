/**
 * @tidaly/mqtt
 *
 * @license MIT
 * @copyright Tidaly <contact@tidaly.fr>
 */

import { BaseCommand } from '@adonisjs/core/build/standalone';
//import Event from '@ioc:Adonis/Core/Event';

export default class MqttSub extends BaseCommand {
	public static commandName = 'mqtt:sub';
	public static description = 'Subscribe to all topics in config file and log messages';

	public static settings = {
		loadApp: true,
		stayAlive: true,
	};

	public async run() {
		this.application.container.resolveBinding('Tidaly/Mqtt');
		const Event = this.application.container.resolveBinding('Adonis/Core/Event');
		this.logger.info('Listen to all topics in configuration file');
		Event.on('mqtt:message', ({ topic, message }: any) => {
			this.logger.info(`${topic}: ${message}`);
		});
	}
}
