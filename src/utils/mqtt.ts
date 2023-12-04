import * as mqtt from "mqtt/dist/mqtt.min";

export const client = mqtt.connect("wss://222.201.144.170:9001", {
  username: "b3351",
  password: "scutb3351-mqtt",
  clientId: "smarthome_c" + Date.now(),
  clean: false,
  // ...other options
});

export interface Subscription {
  topic: string;
  qos: number;
}

export interface Publishment {
  topic: string;
  payload: string;
  qos: number;
}

export type QoS = 0 | 1 | 2;

export const subscribe = (subscription: Subscription) => {
  const { topic, qos } = subscription;
  client.subscribe(topic, { qos: qos as QoS }, (error: any, granted: any) => {
    if (error) {
      console.log("subscribe error:", error);
      return;
    }
    console.log("subscribe successfully:", granted);
  });
};

export const unsubscribe = (subscription: Subscription) => {
  const { topic, qos } = subscription;
  client.unsubscribe(topic, { qos: qos as QoS }, (error: any) => {
    if (error) {
      console.log("unsubscribe error:", error);
      return;
    }
    console.log(`unsubscribed topic: ${topic}`);
  });
};

export const publish = (publishment: Publishment) => {
  const { topic, qos, payload } = publishment;
  client.publish(topic, payload, { qos: qos as QoS }, (error: any) => {
    if (error) {
      console.log("publish error:", error);
      return;
    }
    console.log(`published message: ${payload}`);
  });
};

client.on("message", (topic: string, message: any) => {
  console.log(`received message: ${message} from topic: ${topic}`);
});

export const disconnect = () => {
  if (client.connected) {
    try {
      client.end(false, () => {
        console.log("disconnected successfully");
      });
    } catch (error) {
      console.log("disconnect error:", error);
    }
  }
};
