import mqtt from "mqtt";

let client: mqtt.MqttClient = mqtt.connect("mqtt://mqtt.kavanet.io");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

let leds = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
];

const availableColours = [
  // https://www.w3schools.com/colors/colors_picker.asp
  0xff4000, 0xff8000, 0xffbf00, 0xffff00, 0xbfff00, 0x80ff00, 0x40ff00, 0x00ff00, 0x00ff40, 0x00ff80, 0x00ffbf, 0x00ffff, 0x00bfff, 0x0080ff,
  0x0040ff, 0x0000ff, 0x4000ff, 0x8000ff, 0xbf00ff, 0xff00ff, 0xff00bf, 0xff0080, 0xff0040, 0xff0000,
];

let colours = [];

for (let i = 0; i < 20; i++) {
  const colour = availableColours[Math.floor(Math.random() * availableColours.length)];
  colours.push([hexToRgb(colour)[0], hexToRgb(colour)[1], hexToRgb(colour)[2]]);
}
colours.push([255, 0, 0]);

console.log(colours);

// write a function to convert hex to rgb values
function hexToRgb(hex: number): number[] {
  let r = (hex >> 16) & 0xff;
  let g = (hex >> 8) & 0xff;
  let b = hex & 0xff;
  return [r, g, b];
}

// for (let i = 0; i < 10; i++) {
console.log("Message sent");
// }
client.publish("Uplight Control", JSON.stringify(colours));

setInterval(() => {
  colours = [];

  for (let i = 0; i < 3; i++) {
    const colour = availableColours[Math.floor(Math.random() * availableColours.length)];
    colours.push([hexToRgb(colour)[0], hexToRgb(colour)[1], hexToRgb(colour)[2]]);
  }
  colours.push([255, 0, 0]);
  client.publish("Uplight Control", JSON.stringify(colours));
  console.log("boop");
}, 1000);
