const fs = require('fs')
const chalk = require('chalk')

global.zenzkey = "zenzkey_9e3466a12119"
global.apikey = "e7f3e24eb8ef9c480611ec8c"
global.creAtor = "6289516947204@s.whatsapp.net"
global.owner = ['6282116587165','6289516947204','6285866392388']
global.ownerNumber = ["6289516947204@s.whatsapp.net"]
global.nomerOwner = "6289516947204"
global.nomorOwn = "6289516947204"
global.NameBot = "Aira⚡"
global.namabotnya = 'Aira⚡'
global.namaownernya = 'Aira'
global.packname = '©️ Aira⚡||+62🇲🇨\nI`m From Indonesia'
global.author = 'Wa : 6289516947204\nYT : Aira'
global.sessionName = 'session'
global.email = 'berlianemas23@gmail.com'
global.group = 'https://chat.whatsapp.com/GOdtUKyFn04ECxqqOrFf4G'
global.myyt = 'https://youtube.com/@Aira'
global.website = 'https://www.ytAira.my.id'
global.mygit = 'https://github.com/ALBOTZ'
global.nomorowner = 'https://wa.me/6289516947204'
global.region = 'I`m From Indonesia'
global.tekspushkon = ""
global.tekspushkonv2 = ""
global.prefa = ['','!','.','#','-','•']
global.logo = fs.readFileSync(`./llogo.png`)
global.krmd = 
{
success: 'Success✅',
admin: 'Fitur Khusus Admin Group!!!',
botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!!!',
owner: 'Jirr Lu Siapa Cukk, DapDapBukan?',
group: 'Fitur Digunakan Hanya Untuk Group!!!',
private: 'Fitur Digunakan Hanya Untuk Private Chat!!!',
bot: 'Fitur Khusus Pengguna Nomor Bot!!!',
error: 'Mungkin Lagi Error Kak Harap Lapor Owner Biar Langsung Di Benerin🙏',
wait: 'Waittt...'
}
global.mess = {
  success: 'Sukses...',
  wait: 'Sedang di Proses...',
  admin: 'Perintah ini hanya bisa digunakan oleh Admin Group!',
  bot: 'Perintah ini khusus pengguna Bot!',
  botAdmin: 'Bot harus menjadi Admin terlebih dahulu!',
  error: {
    Iv: 'Link yang kamu berikan tidak Valid!',
    api: 'Maaf Fitur sedang Error!'
  },
  group: 'Perintah ini hanya bisa digunakan di Group!',
  owner: 'Perintah ini hanya dapat digunakan oleh Owner Bot!',
  premium: 'Perintah ini khusus member Premium!',
  private: 'Perintah ini hanya bisa digunakan di Private Message!',
  unduh: 'Sedang mengunduh media...',
  user: 'Maaf kamu belum Terdaftar di Database Amore Bot! Silahkan Daftar terlebih dahulu dengan mengetik #Daftar'
}
global.jumhal = '100000000000000'
global.jumlah = '1000000000'
global.akulaku = 'Bot By Aira⚡'
global.ownernomer = ['6289516947204','6289516947204']

global.thumb = fs.readFileSync('./ZassTdrjs/image/thumb.jpg')
global.thumb = fs.readFileSync('./ZassTdrjs/image/ytmp4.jpg')
global.thumb = fs.readFileSync('./ZassTdrjs/image/ytmp3.jpg')
// Url
global.myytv = 'https://youtube.com/@Aira'
// panel
global.domain = '' // Isi Domain Lu
global.apikey = '' // Isi Apikey Plta Lu
global.capikey = '' // Isi Apikey Pltc Lu
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location

//_______________________ [ DOC ] _______________________//
global.doc1 = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
global.doc2 =
 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
global.doc3 =
 "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
global.doc4 = "application/zip";
global.doc5 = "application/pdf";
global.doc6 = "application/vnd.android.package-archive";

//____________________ [ FAKE SIZE ] ____________________//
global.jumlha = '999'
global.jumhal = '100000000000000'
global.jumlah = '1000000000'
global.akulaku = 'Bot By Aira⚡'
global.ownernomer = ['6289516947204','6289516947204']
//
global.APIs = {
lol: 'https://api.lolhuman.xyz'
  }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})