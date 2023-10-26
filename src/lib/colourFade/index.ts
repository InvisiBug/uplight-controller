import { MqttClient } from "mqtt";
export default class ColourFade {
  totalLEDs: number;
  client: MqttClient;
  colours = [
    // https://www.w3schools.com/colors/colors_picker.asp
    0xff4000, 0xff8000, 0xffbf00, 0xffff00, 0xbfff00, 0x80ff00, 0x40ff00, 0x00ff00, 0x00ff40, 0x00ff80, 0x00ffbf, 0x00ffff, 0x00bfff, 0x0080ff,
    0x0040ff, 0x0000ff, 0x4000ff, 0x8000ff, 0xbf00ff, 0xff00ff, 0xff00bf, 0xff0080, 0xff0040, 0xff0000,
  ];

  leds: [[number, number, number]];

  oldRed: number = 0;
  oldGreen: number = 0;
  oldBlue: number = 0;

  newRed: number = 0;
  newGreen: number = 0;
  newBlue: number = 0;

  currentMillis: number = 0;
  lastMillis: number = 0;

  constructor(client: MqttClient, totalLEDs: number) {
    this.totalLEDs = totalLEDs;
    this.client = client;
  }

  run(wait: number = 50) {
    this.lastMillis = this.currentMillis;

    if (this.newRed - this.oldRed != 0 || this.newGreen - this.oldGreen != 0 || this.newBlue - this.oldBlue != 0) {
      this.oldRed = this.upDown(this.newRed, this.oldRed);
      this.oldGreen = this.upDown(this.newGreen, this.oldGreen);
      this.oldBlue = this.upDown(this.newBlue, this.oldBlue);
    } else if (this.newRed - this.oldRed == 0 && this.newGreen - this.oldGreen == 0 && this.newBlue - this.oldBlue == 0) {
      this.chooseNewColour();
    }

    // for (let i = 0; i < this.totalLEDs; i++) {
    //   currentLED[i].setRGB(oldRed, oldGreen, oldBlue);
    // }
    // FastLED.show();

    // let colours = [];

    // for (let i = 0; i < 3; i++) {
    //   const colour = availableColours[Math.floor(Math.random() * availableColours.length)];
    //   colours.push([hexToRgb(colour)[0], hexToRgb(colour)[1], hexToRgb(colour)[2]]);
    // }

    this.leds = [[this.oldRed, this.oldGreen, this.oldBlue]];

    this.client.publish("Uplight Control", JSON.stringify(this.leds));
    console.log(this.leds);
    console.log("Uplights updated");
  }

  upDown(newVal: number, oldVal: number): number {
    if (newVal - oldVal > 0) return oldVal + 1;
    else if (newVal - oldVal < 0) return oldVal - 1;
    else if (newVal - oldVal == 0) return newVal;
    return 0;
  }

  chooseNewColour() {
    const newColour = this.colours[Math.floor(Math.random() * this.colours.length)]; // Pick a random colour from the table

    this.newRed = (newColour & 0xff0000) >> 16;
    this.newGreen = (newColour & 0x00ff00) >> 8;
    this.newBlue = newColour & 0x0000ff;
  }
}
