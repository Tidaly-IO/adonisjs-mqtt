<p align="center">
  <img src="https://imgcdn.dev/i/98Z8l" alt="@tidaly/mqtt">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@tidaly/mqtt"><img src="https://img.shields.io/npm/dm/@tidaly/mqtt.svg?style=flat-square" alt="Download"></a>
  <a href="https://www.npmjs.com/package/@tidaly/mqtt"><img src="https://img.shields.io/npm/v/@tidaly/mqtt.svg?style=flat-square" alt="Version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/@tidaly/mqtt.svg?style=flat-square" alt="License"></a>
</p>

`@tidaly/mqtt` is a mqtt client based on [Async-Mqtt](https://github.com/mqttjs/async-mqtt)
for [AdonisJS](https://adonisjs.com/).

> **Note**
>
> You must have a Mqtt broker running to use this package. If you don't have one, you can use [EMQX](https://www.emqx.io/).

---

## Getting Started

This package is available in the npm registry.

```bash
npm install @tidaly/mqtt
```

Next, configure the package by running the following command.

```bash
node ace configure @tidaly/mqtt
```

## Usage

### Subscribe to a topic

To subscribe to a topic you can simply add the topic to the `topics` array in the `config/mqtt.ts` file.

```ts
subscriber: {
    topics: ["my/topic"],
},
```

Then, when a message is received the `mqtt:message` event will be emitted.

Create a event listener to handle the message.

```ts
import Event from "@ioc:Adonis/Core/Event";
import Logger from "@ioc:Adonis/Core/Logger";

Event.on("mqtt:message", (topic: string, message: string) => {
    Logger.info(`Message received on topic ${topic}: ${message}`);
});
```

### Publish to a topic

To publish to a topic you can use the `publish` method.

```ts
import Mqtt from "@tidaly/mqtt";

class MyController {
    public async publish({ request }: HttpContextContract) {
        const { topic, message } = request.only(["topic", "message"]);

        await Mqtt.publish(topic, message);
    }
}
```

## Command line

### Subscribe to a topic

To subscribe to a topic you can use the `mqtt:sub` command.
The command will subscribe to all topics in the `topics` array in the `config/mqtt.ts` file.

```bash
node ace mqtt:sub
```

Messages will be logged to the console.

### Publish to a topic

To publish to a topic you can use the `mqtt:pub` command and pass the topic and message as arguments.

```bash
node ace mqtt:pub my/topic "Hello World"
```
