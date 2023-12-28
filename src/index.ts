import mqtt from "mqtt";
import ColourFade from "./lib/colourFade";

let client: mqtt.MqttClient = mqtt.connect("mqtt://uplights.kavanet.io");

const colourFade = new ColourFade(client);

client.on("connect", () => {
  console.log("📡 Connected to uplights MQTT broker 📡");
});

setInterval(() => {
  colourFade.run();

  // let colours = [];
  // for (let i = 0; i < 3; i++) {
  //   const colour = availableColours[Math.floor(Math.random() * availableColours.length)];
  //   colours.push([hexToRgb(colour)[0], hexToRgb(colour)[1], hexToRgb(colour)[2]]);
  // }
  // colours[2] = [255, 0, 0];
  // client.publish("Uplight Control", JSON.stringify(colours));
  // console.log(colours);
  // console.log("Uplights updated");
}, 20);
