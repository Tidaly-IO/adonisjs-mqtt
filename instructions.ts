/**
 * @tidaly/mqtt
 *
 * @license MIT
 * @copyright Tidaly <contact@tidaly.fr>
 */

import { join } from 'node:path';
import * as sinkStatic from '@adonisjs/sink';
import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

function getStub(...relativePaths: string[]) {
	return join(__dirname, 'templates', ...relativePaths);
}

export default async function instructions(
	projectRoot: string,
	app: ApplicationContract,
	sink: typeof sinkStatic
) {
	// Setup config
	const configPath = app.configPath('mqtt.ts');
	new sink.files.MustacheFile(projectRoot, configPath, getStub('config.txt')).commit();
	const configDir = app.directoriesMap.get('config') || 'config';
	sink.logger.action('create').succeeded(`${configDir}/mqtt.ts`);

	// Setup environment
	const env = new sink.files.EnvFile(projectRoot);
	env.set('MQTT_BROKER', 'localhost');
	env.set('MQTT_PORT', '1883');
	env.commit();
	sink.logger.action('update').succeeded('.env,.env.example');
}
