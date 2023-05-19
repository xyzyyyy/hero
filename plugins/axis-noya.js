let axios = require('axios')
let handler = async (m, { conn, text, usedPrefix, command }) => {
	async function cekkuota() {
  return new Promise(async (resolve, reject) => {

    function bar(p) {
      let titik = "▒".repeat(10).split("");
      for (let i = 1; i <= p; i++) {
        if (i % 10 === 0) {
          titik[(i / 10) - 1] = "█";
        }
      }
      return "[ " + titik.join(" ") + " ]";
    }

    try {
      let quota = await axios({
        headers: {
          "x-app-version": "8.11.0",
          "Authorization": `f1f19476-e9c9-42f4-b91e-2bc1dec52506`, //ambil di https://tools.tutorialinjectid.my.id/auth-axis/index.php
          "User-Agent": "okhttp/4.2.2"
        },
        method: "GET",
        url: "https://quota.api.axis.co.id/quota"
      });
      console.log(quota)
      let { result } = JSON.parse(atob(quota.data.data));
      let sisakuota = "";
      for (let kuota of result.detail) {
        let dateberlaku = new Date(kuota.benefitData.activeUntil);
        let bulan0 = dateberlaku.toLocaleDateString('id', { month: 'long' });
        let bulan = bulan0[0] + bulan0[1] + bulan0[2];
        sisakuota += "*" + kuota.name + "*\n" + bar(kuota.percentRemaining) + "\n" + kuota.remaining + "/" + kuota.total + " s.d " + dateberlaku.getDate() + " " + bulan + " " + dateberlaku.getFullYear() + " " + dateberlaku.getHours() + ":" + dateberlaku.getMinutes() + "\n\n";
      }
      resolve(sisakuota);
    } catch (error) {
      reject(error);
    }
  });
  }
let data = await cekkuota ()
 m.reply(data)
  }
handler.command = /^axnoya$/i

module.exports = handler
