The package has been configured successfully. The mqtt configuration stored inside `config/mqtt.ts` file relies on the following environment variables and hence we recommend validating them.

**Open the `env.ts` file and paste the following code inside the `Env.rules` object.**

```ts
MQTT_BROKER: Env.schema.string({ format: 'host' }),
MQTT_PORT: Env.schema.number(),
```